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
import { PRODUCTS } from "../../products";

// OBSERVAÇÃO: formatos aceitos pelo endpoint. O cliente envia somente o ID
// do produto e a quantidade; nome e preço são definidos no servidor.
type CheckoutItem = {
  productId: string;
  quantity: number;
};

type RequestBody = {
  items: CheckoutItem[];
  payerName?: string;
  method?: "pix" | "cartao";
};

// OBSERVAÇÃO: limites para evitar pedidos acidentais ou requisições abusivas.
const MAX_ITEMS = 20;
const MAX_QUANTITY_PER_PRODUCT = 20;

// Restrições de meio de pagamento por botão, pra manter os dois CTAs separados
// (Pix de um lado, Cartão do outro) mesmo usando a mesma API.
const EXCLUDED_PAYMENT_TYPES: Record<"pix" | "cartao", { id: string }[]> = {
  pix: [{ id: "credit_card" }, { id: "debit_card" }, { id: "ticket" }, { id: "atm" }],
  cartao: [{ id: "bank_transfer" }, { id: "ticket" }, { id: "atm" }],
};

export async function POST(request: Request) {
  // OBSERVAÇÃO: este é o único ponto de entrada da API de pagamento.
  // Ele valida o pedido, cria a preferência no Mercado Pago e devolve a URL
  // segura para onde o navegador deve redirecionar o cliente.

  // Bloco 1: lê a credencial privada apenas no servidor.
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN não configurado.");
    return NextResponse.json(
      { error: "O pagamento está indisponível no momento." },
      { status: 500 }
    );
  }

  // Bloco 2: valida a URL da loja usada nos retornos de pagamento.
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    console.error("SITE_URL ausente ou inválida.");
    return NextResponse.json(
      { error: "O pagamento está indisponível no momento." },
      { status: 500 }
    );
  }

  // Esta rota é usada pelo navegador da própria loja. Bloqueia chamadas
  // originadas por outro site (não substitui autenticação em uma API pública).
  const origin = request.headers.get("origin");
  if (origin && origin !== siteUrl) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }

  // Bloco 3: lê e valida o JSON enviado pelo carrinho.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = parseCheckout(body);
  if (!parsed) {
    return NextResponse.json({ error: "Itens do pedido inválidos." }, { status: 400 });
  }

  // Bloco 4: procura cada produto no catálogo e monta os itens confiáveis.
  const method = parsed.method === "cartao" ? "cartao" : "pix";
  const items = [] as { title: string; quantity: number; unit_price: number; currency_id: string }[];

  for (const item of parsed.items) {
    const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
    const stockLimit = Math.min(product?.stock ?? MAX_QUANTITY_PER_PRODUCT, MAX_QUANTITY_PER_PRODUCT);

    if (!product || stockLimit < 1 || item.quantity > stockLimit) {
      return NextResponse.json({ error: "Um ou mais produtos não estão disponíveis." }, { status: 400 });
    }

    // Nome e preço vêm exclusivamente do catálogo no servidor. Nunca confie
    // em title/unit_price recebidos do navegador.
    items.push({
      title: product.name,
      quantity: item.quantity,
      unit_price: product.price,
      currency_id: "BRL",
    });
  }

  // Bloco 5: prepara o formato exigido pela API do Mercado Pago.
  const preferencePayload = {
    items,
    payer: parsed.payerName ? { name: parsed.payerName } : undefined,
    external_reference: `gordao-${crypto.randomUUID()}`,
    payment_methods: {
      excluded_payment_types: EXCLUDED_PAYMENT_TYPES[method],
      installments: method === "cartao" ? 12 : 1,
    },
    back_urls: {
      success: `${siteUrl}/pedido-confirmado`,
      failure: `${siteUrl}/checkout`,
      pending: `${siteUrl}/checkout`,
    },
    auto_return: "approved",
  };

  try {
    // Bloco 6: envia a preferência com o token no cabeçalho Authorization.
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferencePayload),
    });

    const data = await mpResponse.json().catch(() => null);

    if (!mpResponse.ok) {
      console.error("Mercado Pago recusou a preferência:", mpResponse.status, data);
      return NextResponse.json(
        { error: "Não foi possível iniciar o pagamento. Tente novamente." },
        { status: mpResponse.status }
      );
    }

    // Bloco 7: devolve somente os dados necessários para iniciar o checkout.
    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err) {
    console.error("Falha ao comunicar com o Mercado Pago:", err);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento. Tente novamente." },
      { status: 502 }
    );
  }
}

function getSiteUrl() {
  // OBSERVAÇÃO: impede URLs inválidas ou HTTP em produção nos links de retorno.
  const value = process.env.SITE_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && !(process.env.NODE_ENV === "development" && url.protocol === "http:")) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function parseCheckout(body: unknown): RequestBody | null {
  // OBSERVAÇÃO: transforma dados desconhecidos da internet em um pedido seguro.
  // Retorna null quando faltar campo, o tipo estiver errado ou os limites excederem.
  if (!body || typeof body !== "object") return null;

  const value = body as Record<string, unknown>;
  if (!Array.isArray(value.items) || value.items.length === 0 || value.items.length > MAX_ITEMS) {
    return null;
  }

  const items: CheckoutItem[] = [];
  for (const item of value.items) {
    if (!item || typeof item !== "object") return null;
    const candidate = item as Record<string, unknown>;
    if (
      typeof candidate.productId !== "string" ||
      !Number.isInteger(candidate.quantity) ||
      (candidate.quantity as number) < 1 ||
      (candidate.quantity as number) > MAX_QUANTITY_PER_PRODUCT
    ) {
      return null;
    }
    items.push({ productId: candidate.productId, quantity: candidate.quantity as number });
  }

  const payerName = typeof value.payerName === "string" ? value.payerName.trim().slice(0, 120) : undefined;
  const method = value.method === "cartao" ? "cartao" : "pix";
  return { items, payerName, method };
}
