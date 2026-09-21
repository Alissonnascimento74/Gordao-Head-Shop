/**
 * orders-store.ts — "banco de dados" TEMPORÁRIO dos pedidos.
 * ------------------------------------------------------------------
 * ⚠️ MOCK — leia isso antes de mexer em qualquer coisa aqui.
 *
 * Isso é um array em memória, dentro do processo do Node.js. Funciona
 * certinho enquanto você roda `npm run dev` na sua máquina (um processo
 * só, que fica de pé o tempo todo). Só que NA VERCEL EM PRODUÇÃO, cada
 * rota de API roda numa função serverless — o Node pode ser reiniciado
 * a qualquer momento, e duas requisições podem cair em instâncias
 * diferentes, cada uma com sua própria cópia desse array. Ou seja: em
 * produção, um pedido criado aqui pode "sumir" antes do webhook do
 * Mercado Pago confirmar o pagamento.
 *
 * Pra funcionar de verdade em produção, troque as 4 funções exportadas
 * abaixo por chamadas ao seu ORM (Prisma, Drizzle, etc.) apontando pra
 * um banco de verdade (Postgres, MySQL...). A ASSINATURA das funções
 * (o que elas recebem e devolvem) foi pensada pra continuar igual —
 * troque só o "miolo" de cada uma:
 *
 *   createOrder(input)                      -> INSERT
 *   updateOrderStatus(externalReference, …) -> UPDATE ... WHERE mp_preference_id = ...
 *   getOrderByExternalReference(ref)         -> SELECT ... WHERE mp_preference_id = ...
 *   listOrders()                             -> SELECT ... ORDER BY created_at DESC
 *
 * O resto do projeto (checkout, webhook, painel admin) só conhece essas
 * 4 funções — nunca acessa o array `orders` diretamente. Assim, quando
 * você plugar o banco real, só este arquivo muda.
 */

import { MOCK_ORDERS } from "@/lib/admin/mock-data";
import type { Order, OrderItem, OrderShippingMethod, OrderStatus, ShippingAddress } from "@/lib/admin/types";

// Semeado com os pedidos de exemplo que já existiam, pra não "zerar" a
// tela de Pedidos pra quem já está usando o painel mockado.
const orders: Order[] = [...MOCK_ORDERS];

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

/**
 * Cria um pedido novo com status "aguardando_pagamento" — chamada pela
 * rota de checkout (app/api/checkout/route.ts) assim que a Preference é
 * criada no Mercado Pago, ANTES de o cliente pagar. O `id` devolvido vira
 * o `external_reference` mandado pro Mercado Pago, que é como o webhook
 * (mais tarde) vai saber qual pedido atualizar.
 */
export function createOrder(input: NewOrderInput): Order {
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
  orders.unshift(order); // mais novo primeiro, igual a tela de Pedidos já espera
  return order;
}

/**
 * Grava o id da Preference do Mercado Pago no pedido, logo depois de
 * criá-la — é esse id que vira o `external_reference` da preference.
 */
export function attachMercadoPagoPreference(orderId: string, preferenceId: string): void {
  const order = orders.find((o) => o.id === orderId);
  if (order) order.mpPreferenceId = preferenceId;
}

/**
 * Atualiza o status de um pedido a partir do `external_reference` — é
 * assim que o webhook (que só recebe um id de PAGAMENTO do Mercado
 * Pago, não sabe nada do nosso pedido) encontra o pedido certo pra
 * atualizar: toda Preference criada guarda `external_reference =
 * order.id`, e o Mercado Pago devolve esse mesmo valor no pagamento.
 */
export function updateOrderStatus(
  externalReference: string,
  status: OrderStatus,
  extra?: { mpPaymentId?: string }
): Order | null {
  const order = orders.find((o) => o.id === externalReference);
  if (!order) return null;

  order.status = status;
  if (extra?.mpPaymentId) order.mpPaymentId = extra.mpPaymentId;
  return order;
}

export function getOrderByExternalReference(externalReference: string): Order | undefined {
  return orders.find((o) => o.id === externalReference);
}

/** Lista completa, mais recente primeiro — usada pelo painel Admin. */
export function listOrders(): Order[] {
  return [...orders];
}
