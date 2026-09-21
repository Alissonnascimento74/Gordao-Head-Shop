/**
 * POST /api/checkout — cria o pedido e a Preference de pagamento no Mercado Pago.
 * ------------------------------------------------------------------
 * O que essa rota faz, passo a passo:
 * 1) Recebe os itens do carrinho + dados do cliente (components/checkout/CheckoutForm.tsx).
 * 2) Recalcula o preço de cada item NO SERVIDOR, consultando o catálogo real
 *    (app/products.ts) — nunca confia no preço que o navegador mandou. Sem
 *    isso, alguém poderia abrir o DevTools e mudar o preço antes de enviar.
 * 3) Grava um pedido novo, com status "aguardando_pagamento", no nosso
 *    "banco" (lib/server/orders-store.ts — troque por Prisma/Drizzle
 *    quando for pra produção de verdade).
 * 4) Cria uma Preference no Mercado Pago (SDK oficial `mercadopago`), usando
 *    o id do pedido como `external_reference` — é esse campo que o webhook
 *    (app/api/webhooks/mercadopago/route.ts) usa depois pra achar o pedido
 *    certo e marcar como pago.
 * 5) Devolve o `init_point`: o navegador redireciona o cliente pra lá.
 */

import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { PRODUCTS } from "@/app/products";
import { createOrder, attachMercadoPagoPreference } from "@/lib/server/orders-store";
import { isValidCPF } from "@/utils/validators";
import type { OrderItem, ShippingAddress } from "@/lib/admin/types";

type CheckoutItemInput = {
  id: string;
  quantity: number;
};

type CheckoutRequestBody = {
  items: CheckoutItemInput[];
  customer: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
};

// Frete fixo de exemplo — troque por uma cotação real (Correios, Melhor
// Envio etc.) quando for integrar cálculo de frete de verdade.
const FLAT_SHIPPING_FEE = 0; // "frete grátis" por enquanto

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://SEU-SITE.vercel.app";

export async function POST(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "MERCADOPAGO_ACCESS_TOKEN não configurado no servidor." }, { status: 500 });
  }

  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  // --- Validação básica dos dados obrigatórios -----------------------
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }
  if (!body.customer?.name?.trim() || !body.customer?.email?.trim() || !body.customer?.phone?.trim()) {
    return NextResponse.json({ error: "Preencha nome, e-mail e telefone." }, { status: 400 });
  }
  if (!isValidCPF(body.customer.cpf || "")) {
    return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
  }
  const address = body.shippingAddress;
  if (!address?.cep || !address?.street || !address?.number || !address?.city || !address?.state) {
    return NextResponse.json({ error: "Preencha o endereço de entrega completo." }, { status: 400 });
  }

  // --- Recalcula os preços a partir do catálogo real (nunca confia no
  //     preço vindo do navegador) -------------------------------------
  const orderItems: OrderItem[] = [];
  const mpItems: { id: string; title: string; quantity: number; unit_price: number; currency_id: string }[] = [];

  for (const cartItem of body.items) {
    const product = PRODUCTS.find((p) => p.id === cartItem.id);
    if (!product) {
      return NextResponse.json({ error: `Produto ${cartItem.id} não encontrado.` }, { status: 400 });
    }
    if (cartItem.quantity < 1) continue;
    if ((product.stock ?? 0) < cartItem.quantity) {
      return NextResponse.json({ error: `"${product.name}" não tem estoque suficiente.` }, { status: 409 });
    }

    orderItems.push({ productName: product.name, quantity: cartItem.quantity, unitPrice: product.price });
    mpItems.push({
      id: product.id,
      title: product.name,
      quantity: cartItem.quantity,
      unit_price: product.price,
      currency_id: "BRL",
    });
  }

  if (mpItems.length === 0) {
    return NextResponse.json({ error: "Nenhum item válido no carrinho." }, { status: 400 });
  }

  const itemsTotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = itemsTotal + FLAT_SHIPPING_FEE;

  // --- Cria o pedido no nosso "banco" (mock — ver lib/server/orders-store.ts) ---
  const order = createOrder({
    customerName: body.customer.name.trim(),
    customerPhone: body.customer.phone.trim(),
    customerEmail: body.customer.email.trim(),
    customerCPF: body.customer.cpf.replace(/\D/g, ""),
    shippingAddress: address,
    items: orderItems,
    total,
  });

  // --- Instancia o SDK oficial e cria a Preference no Mercado Pago ---
  const client = new MercadoPagoConfig({ accessToken });
  const preferenceClient = new Preference(client);

  // Separa nome/sobrenome de forma simples — o Mercado Pago aceita os
  // dois campos separados, mas não exige; se não houver sobrenome, tudo
  // bem deixar em branco.
  const [firstName, ...rest] = body.customer.name.trim().split(" ");
  const surname = rest.join(" ");

  try {
    const preference = await preferenceClient.create({
      body: {
        items: mpItems,
        external_reference: order.id, // <- é ISSO que liga o pagamento ao nosso pedido
        payer: {
          name: firstName,
          surname: surname || undefined,
          email: body.customer.email.trim(),
          phone: { number: body.customer.phone.replace(/\D/g, "") },
          identification: { type: "CPF", number: body.customer.cpf.replace(/\D/g, "") },
        },
        notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
        back_urls: {
          success: `${SITE_URL}/pedido-confirmado?pedido=${order.id}`,
          failure: `${SITE_URL}/checkout`,
          pending: `${SITE_URL}/checkout`,
        },
        auto_return: "approved",
        statement_descriptor: "GORDAO HEADSHOP",
      },
    });

    if (preference.id) attachMercadoPagoPreference(order.id, preference.id);

    return NextResponse.json({
      orderId: order.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    });
  } catch (err) {
    // O pedido já foi criado (status "aguardando_pagamento") mesmo se o
    // Mercado Pago falhar aqui — fica registrado, e o cliente pode tentar
    // de novo. Em produção, isso é um bom lugar pra logar num serviço de
    // observabilidade (Sentry etc.).
    return NextResponse.json(
      { error: "Falha ao criar a preferência de pagamento.", details: String(err), orderId: order.id },
      { status: 502 }
    );
  }
}
