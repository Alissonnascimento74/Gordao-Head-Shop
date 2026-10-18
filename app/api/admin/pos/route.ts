/**
 * POST /api/admin/pos — registra uma venda física (balcão) no PDV.
 * ------------------------------------------------------------------
 * Chamada por components/admin/pos/PosClient.tsx ao clicar "Finalizar
 * Venda Física". Duas coisas cruciais, na ordem certa:
 *
 *   1) Confere e recalcula tudo a partir do catálogo real (app/products.ts)
 *      — nunca confia em preço/nome vindos do navegador, mesma lógica de
 *      segurança do checkout online (app/api/checkout/route.ts).
 *   2) Cria o pedido já com status "despachado" e source: "fisico" (não
 *      precisa de despacho nem confirmação de pagamento — o cliente já
 *      levou o produto e pagou na hora) e baixa o estoque na mesma hora
 *      (lib/server/stock-store.ts) — diferente do checkout online, que só
 *      baixa quando o Mercado Pago confirma o pagamento (aqui já é
 *      dinheiro/Pix/cartão physicamente recebido, não tem "pendente").
 *
 * Protegida pelo mesmo cookie de sessão das outras rotas de admin.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { getCatalogProducts } from "@/lib/server/products-store";
import { createOrder } from "@/lib/server/orders-store";
import { commitStockReservation, releaseStockReservation, reserveStock } from "@/lib/server/stock-store";
import type { OrderItem, PhysicalPaymentMethod } from "@/lib/admin/types";

const PAYMENT_METHODS: PhysicalPaymentMethod[] = ["dinheiro", "pix", "cartao_credito", "cartao_debito"];

type PosItemInput = { id: string; quantity: number };
type PosRequestBody = {
  items: PosItemInput[];
  paymentMethod: PhysicalPaymentMethod;
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  let body: PosRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 100) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }
  if (!PAYMENT_METHODS.includes(body.paymentMethod)) {
    return NextResponse.json({ error: "Forma de pagamento inválida." }, { status: 400 });
  }

  const orderItemsById = new Map<string, OrderItem>();
  const products = await getCatalogProducts();

  for (const cartItem of body.items) {
    if (!cartItem || typeof cartItem.id !== "string" || !Number.isSafeInteger(cartItem.quantity) || cartItem.quantity < 1) {
      return NextResponse.json({ error: "Item ou quantidade inválida no carrinho." }, { status: 400 });
    }
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) {
      return NextResponse.json({ error: `Produto ${cartItem.id} não encontrado.` }, { status: 400 });
    }
    const existing = orderItemsById.get(product.id);
    orderItemsById.set(product.id, {
      productId: product.id,
      productName: product.name,
      quantity: (existing?.quantity ?? 0) + cartItem.quantity,
      unitPrice: product.price,
    });
  }

  const orderItems = [...orderItemsById.values()];

  if (orderItems.length === 0) {
    return NextResponse.json({ error: "Nenhum item válido no carrinho." }, { status: 400 });
  }

  const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const reservationId = `PED-${crypto.randomUUID()}`;
  const reserved = await reserveStock(reservationId, orderItems.map(({ productId, quantity }) => ({ productId, quantity })));
  if (!reserved) return NextResponse.json({ error: "Estoque insuficiente para um ou mais produtos." }, { status: 409 });

  let order;
  try {
    order = await createOrder({
      id: reservationId,
      customerName: "Venda no balcão",
      customerPhone: "",
      customerEmail: "",
      customerCPF: "",
      items: orderItems,
      total,
      source: "fisico",
      status: "despachado",
      paymentMethodPhysical: body.paymentMethod,
      stockReserved: true,
    });
    await commitStockReservation(reservationId);
  } catch (error) {
    await releaseStockReservation(reservationId);
    throw error;
  }

  return NextResponse.json({ order });
}
