/**
 * Gordão HeadShop — Criação de preferência de pagamento (Mercado Pago)
 * ------------------------------------------------------------------
 * Como usar:
 * 1) Salve este arquivo como app/api/create-preference/route.ts no seu projeto Next.js.
 * 2) Na Vercel, vá em Project Settings → Environment Variables e crie:
 *      MERCADOPAGO_ACCESS_TOKEN = <seu access token>
 *    (pegue em https://www.mercadopago.com.br/developers/panel — nunca cole o token
 *    direto no código nem me mande ele aqui no chat).
 * 3) Rode `npm install mercadopago` no seu projeto (SDK oficial) — opcional, este
 *    arquivo já funciona só com fetch, sem precisar da lib.
 * 4) Chame esta rota do front-end (veja app/page.tsx e app/checkout/page.tsx)
 *    passando os itens do pedido e o método ("pix" ou "cartao"). A resposta traz
 *    o campo `init_point`: redirecione o navegador pra essa URL.
 * ------------------------------------------------------------------
 */

import { NextResponse } from "next/server";

type PreferenceItem = {
  title: string;
  quantity: number;
  unit_price: number;
};

type RequestBody = {
  items: PreferenceItem[];
  payerName?: string;
  externalReference?: string;
  method?: "pix" | "cartao";
};

// URLs pra onde o Mercado Pago manda o cliente de volta depois do pagamento.
// Troque pelo domínio real do seu site em produção.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://SEU-SITE.vercel.app";

// Restrições de meio de pagamento por botão, pra manter os dois CTAs separados
// (Pix de um lado, Cartão do outro) mesmo usando a mesma API.
const EXCLUDED_PAYMENT_TYPES: Record<"pix" | "cartao", { id: string }[]> = {
  pix: [{ id: "credit_card" }, { id: "debit_card" }, { id: "ticket" }, { id: "atm" }],
  cartao: [{ id: "bank_transfer" }, { id: "ticket" }, { id: "atm" }],
};

export async function POST(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "MERCADOPAGO_ACCESS_TOKEN não configurado no servidor." },
      { status: 500 }
    );
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Nenhum item enviado." }, { status: 400 });
  }

  const method = body.method === "cartao" ? "cartao" : "pix";

  const preferencePayload = {
    items: body.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "BRL",
    })),
    payer: body.payerName ? { name: body.payerName } : undefined,
    external_reference: body.externalReference,
    payment_methods: {
      excluded_payment_types: EXCLUDED_PAYMENT_TYPES[method],
      installments: method === "cartao" ? 12 : 1,
    },
    back_urls: {
      success: `${SITE_URL}/pedido-confirmado`,
      failure: `${SITE_URL}/checkout`,
      pending: `${SITE_URL}/checkout`,
    },
    auto_return: "approved",
  };

  try {
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferencePayload),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: "Erro ao criar preferência no Mercado Pago.", details: data },
        { status: mpResponse.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Falha de conexão com o Mercado Pago.", details: String(err) },
      { status: 502 }
    );
  }
}
