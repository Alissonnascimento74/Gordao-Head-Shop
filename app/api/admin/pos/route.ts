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
import { PRODUCTS } from "@/app/products";
import { createOrder } from "@/lib/server/orders-store";
import { adjustStock, getStock } from "@/lib/server/stock-store";
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

  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }
  if (!PAYMENT_METHODS.includes(body.paymentMethod)) {
    return NextResponse.json({ error: "Forma de pagamento inválida." }, { status: 400 });
  }

  const orderItems: OrderItem[] = [];

  for (const cartItem of body.items) {
    const product = PRODUCTS.find((p) => p.id === cartItem.id);
    if (!product) {
      return NextResponse.json({ error: `Produto ${cartItem.id} não encontrado.` }, { status: 400 });
    }
    if (cartItem.quantity < 1) continue;

    const currentStock = await getStock(product.id);
    if (currentStock < cartItem.quantity) {
      return NextResponse.json({ error: `"${product.name}" não tem estoque suficiente.` }, { status: 409 });
    }

    orderItems.push({
      productId: product.id,
      productName: product.name,
      quantity: cartItem.quantity,
      unitPrice: product.price,
    });
  }

  if (orderItems.length === 0) {
    return NextResponse.json({ error: "Nenhum item válido no carrinho." }, { status: 400 });
  }

  const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const order = await createOrder({
    customerName: "Venda no balcão",
    customerPhone: "",
    customerEmail: "",
    customerCPF: "",
    items: orderItems,
    total,
    source: "fisico",
    status: "despachado",
    paymentMethodPhysical: body.paymentMethod,
  });

  // Baixa o estoque agora — venda física é na hora, não tem "confirmação"
  // separada como o webhook do Mercado Pago. Se uma baixa falhar no meio
  // do caminho (bem raro, seria uma falha do Redis), o pedido já foi
  // criado — melhor investigar depois do que travar a venda no balcão.
  try {
    await Promise.all(orderItems.map((item) => adjustStock(item.productId, -item.quantity)));
  } catch (stockErr) {
    console.error(`PDV: falha ao baixar estoque do pedido ${order.id}:`, stockErr);
  }

  return NextResponse.json({ order });
}
