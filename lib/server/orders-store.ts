/**
 * orders-store.ts — persistência dos pedidos.
 * ------------------------------------------------------------------
 * Usa o Redis do Upstash (lib/server/redis.ts) como banco: cada pedido
 * vira uma chave `gh:order:{id}` com o JSON do pedido, e um sorted set
 * `gh:orders:index` guarda os ids ordenados por data de criação (score =
 * timestamp) pra listOrders() devolver mais recente primeiro sem
 * precisar ler tudo e ordenar na mão.
 *
 * Isso resolve o problema que existia com o array em memória: na Vercel,
 * cada rota de API roda numa função serverless, e duas requisições podem
 * cair em instâncias diferentes — um array local "esquecia" pedidos
 * entre o checkout e o webhook do Mercado Pago. Com o Redis (um serviço
 * externo, não memória do processo), toda instância enxerga os mesmos
 * dados.
 *
 * SEM as variáveis do Upstash configuradas (`redis` é `null` — ver
 * lib/server/redis.ts), cai de volta pro array em memória de antes. Isso
 * só deve acontecer em desenvolvimento local sem as credenciais
 * copiadas; em produção (Vercel com a integração conectada) o Redis
 * sempre está disponível.
 *
 * O resto do projeto (checkout, webhook, painel admin) só conhece as
 * funções exportadas abaixo — nunca fala com o Redis diretamente. Se um
 * dia trocar por um banco relacional (Postgres via Prisma/Drizzle), só
 * este arquivo muda.
 */

import { redis } from "@/lib/server/redis";
import { MOCK_ORDERS } from "@/lib/admin/mock-data";
import type { Order, OrderItem, OrderShippingMethod, OrderStatus, ShippingAddress } from "@/lib/admin/types";

const ORDER_KEY = (id: string) => `gh:order:${id}`;
const INDEX_KEY = "gh:orders:index";
const SEEDED_KEY = "gh:orders:seeded";

// Fallback só usado quando o Redis não está configurado (ver acima).
const memoryOrders: Order[] = [...MOCK_ORDERS];

export type NewOrderInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCPF: string;
  shippingAddress: ShippingAddress;
  shippingMethod?: OrderShippingMethod;
  items: OrderItem[];
  total: number;
};

// Semeia o Redis com os pedidos de exemplo, uma única vez (pra não
// "zerar" a tela de Pedidos de quem já estava usando o painel mockado).
// `set(..., { nx: true })` garante que, se duas requisições chegarem ao
// mesmo tempo no primeiro acesso, só uma delas semeia — as outras veem
// a chave já criada e desistem.
let seedPromise: Promise<void> | null = null;
function seedIfNeeded(): Promise<void> {
  if (!redis) return Promise.resolve();
  if (!seedPromise) {
    seedPromise = (async () => {
      const acquired = await redis!.set(SEEDED_KEY, "1", { nx: true });
      if (!acquired) return;
      await Promise.all(
        MOCK_ORDERS.map((order) =>
          Promise.all([
            redis!.set(ORDER_KEY(order.id), order),
            redis!.zadd(INDEX_KEY, { score: new Date(order.createdAt).getTime(), member: order.id }),
          ])
        )
      );
    })();
  }
  return seedPromise;
}

/**
 * Cria um pedido novo com status "aguardando_pagamento" — chamada pela
 * rota de checkout (app/api/checkout/route.ts) assim que a Preference é
 * criada no Mercado Pago, ANTES de o cliente pagar. O `id` devolvido vira
 * o `external_reference` mandado pro Mercado Pago, que é como o webhook
 * (mais tarde) vai saber qual pedido atualizar.
 */
export async function createOrder(input: NewOrderInput): Promise<Order> {
  const order: Order = {
    id: `PED-${Date.now()}`,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerEmail: input.customerEmail,
    customerCPF: input.customerCPF,
    shippingAddress: input.shippingAddress,
    shippingMethod: input.shippingMethod,
    items: input.items,
    total: input.total,
    status: "aguardando_pagamento",
    createdAt: new Date().toISOString(),
  };

  if (redis) {
    await seedIfNeeded();
    await Promise.all([
      redis.set(ORDER_KEY(order.id), order),
      redis.zadd(INDEX_KEY, { score: Date.now(), member: order.id }),
    ]);
  } else {
    memoryOrders.unshift(order); // mais novo primeiro, igual a tela de Pedidos já espera
  }

  return order;
}

/**
 * Grava o id da Preference do Mercado Pago no pedido, logo depois de
 * criá-la — é esse id que vira o `external_reference` da preference.
 */
export async function attachMercadoPagoPreference(orderId: string, preferenceId: string): Promise<void> {
  if (redis) {
    const order = await redis.get<Order>(ORDER_KEY(orderId));
    if (!order) return;
    order.mpPreferenceId = preferenceId;
    await redis.set(ORDER_KEY(orderId), order);
    return;
  }

  const order = memoryOrders.find((o) => o.id === orderId);
  if (order) order.mpPreferenceId = preferenceId;
}

/**
 * Atualiza o status de um pedido a partir do `external_reference` — é
 * assim que o webhook (que só recebe um id de PAGAMENTO do Mercado
 * Pago, não sabe nada do nosso pedido) encontra o pedido certo pra
 * atualizar: toda Preference criada guarda `external_reference =
 * order.id`, e o Mercado Pago devolve esse mesmo valor no pagamento.
 */
export async function updateOrderStatus(
  externalReference: string,
  status: OrderStatus,
  extra?: { mpPaymentId?: string }
): Promise<Order | null> {
  if (redis) {
    const order = await redis.get<Order>(ORDER_KEY(externalReference));
    if (!order) return null;
    order.status = status;
    if (extra?.mpPaymentId) order.mpPaymentId = extra.mpPaymentId;
    await redis.set(ORDER_KEY(externalReference), order);
    return order;
  }

  const order = memoryOrders.find((o) => o.id === externalReference);
  if (!order) return null;
  order.status = status;
  if (extra?.mpPaymentId) order.mpPaymentId = extra.mpPaymentId;
  return order;
}

export async function getOrderByExternalReference(externalReference: string): Promise<Order | undefined> {
  if (redis) {
    await seedIfNeeded();
    const order = await redis.get<Order>(ORDER_KEY(externalReference));
    return order ?? undefined;
  }
  return memoryOrders.find((o) => o.id === externalReference);
}

/** Lista completa, mais recente primeiro — usada pelo painel Admin. */
export async function listOrders(): Promise<Order[]> {
  if (redis) {
    await seedIfNeeded();
    const ids = await redis.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
    if (ids.length === 0) return [];
    const orders = await redis.mget<Order[]>(...ids.map(ORDER_KEY));
    return orders.filter((o): o is Order => o !== null);
  }
  return [...memoryOrders];
}
