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
import { calculateShippingOptions } from "@/lib/shipping/calculate";
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
  /** Id da opção escolhida em ShippingCalculator.tsx (ex.: "pac", "99-entrega") — nunca o preço. */
  shippingOptionId: string;
};

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://SEU-SITE.vercel.app";

// O Mercado Pago exige que `back_urls.success` seja uma URL pública de
// verdade quando `auto_return` está ligado — com `localhost` ele recusa a
// Preference inteira (`auto_return invalid. back_url.success must be
// defined`). Em dev local isso não tem jeito (localhost nunca é público),
// então só ligamos `auto_return` quando o SITE_URL não for localhost. Sem
// isso, o cliente só não volta sozinho pro site depois de pagar — ainda dá
// pra testar o resto do fluxo (o Mercado Pago sempre mostra um botão
// "Voltar ao site" manual).
const IS_PUBLIC_SITE_URL = !/^https?:\/\/localhost/.test(SITE_URL);

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
  if (!body.shippingOptionId) {
    return NextResponse.json({ error: "Selecione uma opção de frete." }, { status: 400 });
  }

  // --- Recalcula o frete a partir do CEP, no servidor — nunca confia no
  //     preço de frete vindo do navegador (mesma lógica de segurança do
  //     preço dos produtos, logo abaixo). O front só manda QUAL opção
  //     foi escolhida (ex.: "99-entrega"); o preço vem sempre daqui. ---
  const { options: shippingOptions } = await calculateShippingOptions(address.cep);
  const shippingOption = shippingOptions.find((opt) => opt.id === body.shippingOptionId);
  if (!shippingOption) {
    // Cobre tanto id inventado quanto o caso de o 99 Entrega ter sido
    // escolhido pro CEP errado (ex.: fora da região metropolitana) —
    // nesse caso ele nem aparece na lista recalculada, então some aqui.
    return NextResponse.json({ error: "Opção de frete inválida para esse CEP." }, { status: 400 });
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

  // Frete entra como um item a mais na Preference — sem isso, o valor
  // cobrado pelo Mercado Pago ficaria menor que o total mostrado no
  // pedido (a soma dos `items` é o que define quanto o MP cobra).
  if (shippingOption.price > 0) {
    mpItems.push({
      id: `frete-${shippingOption.id}`,
      title: `Frete — ${shippingOption.label}`,
      quantity: 1,
      unit_price: shippingOption.price,
      currency_id: "BRL",
    });
  }

  const itemsTotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = itemsTotal + shippingOption.price;

  // --- Cria o pedido no nosso "banco" (mock — ver lib/server/orders-store.ts) ---
  const order = createOrder({
    customerName: body.customer.name.trim(),
    customerPhone: body.customer.phone.trim(),
    customerEmail: body.customer.email.trim(),
    customerCPF: body.customer.cpf.replace(/\D/g, ""),
    shippingAddress: address,
    shippingMethod: {
      carrier: shippingOption.carrier,
      label: shippingOption.label,
      price: shippingOption.price,
      isExpress: shippingOption.isExpress,
    },
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
        ...(IS_PUBLIC_SITE_URL ? { auto_return: "approved" as const } : {}),
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
