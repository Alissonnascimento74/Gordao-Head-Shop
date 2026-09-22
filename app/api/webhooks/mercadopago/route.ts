/**
 * POST /api/webhooks/mercadopago — recebe a notificação de pagamento.
 * ------------------------------------------------------------------
 * É AQUI que o Mercado Pago "avisa" o site quando algo muda num
 * pagamento (aprovado, recusado, pendente...). Configure essa URL no
 * painel deles em: Sua integração → Webhooks →
 * `https://SEU-SITE.vercel.app/api/webhooks/mercadopago`.
 *
 * Passo a passo desta rota:
 * 1) Confere a ASSINATURA da notificação (`x-signature`) — sem isso,
 *    qualquer pessoa poderia mandar um POST fake pra essa URL fingindo
 *    que um pedido foi pago. O segredo vem do mesmo painel de Webhooks
 *    (campo "Assinatura secreta"), guardado em `MERCADOPAGO_WEBHOOK_SECRET`.
 * 2) A notificação só manda o ID do pagamento — NUNCA o status. Por
 *    segurança, buscamos o pagamento completo de volta na API do
 *    Mercado Pago (`Payment.get`) em vez de confiar em qualquer coisa
 *    que veio no corpo da requisição.
 * 3) Se o pagamento está `approved`, atualiza o pedido correspondente
 *    (achado pelo `external_reference`, que é o id do nosso pedido — ver
 *    app/api/checkout/route.ts) pra status "pago" no orders-store.
 * 4) Devolve 200 rapidinho. O Mercado Pago reenvia a notificação várias
 *    vezes se não receber 200 — por isso a rota responde OK mesmo em
 *    casos que a gente decide ignorar (ex.: notificação de um tipo que
 *    não tratamos), só not-OK quando é claramente um problema nosso.
 */

import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment, WebhookSignatureValidator } from "mercadopago";
import { getOrderByExternalReference, updateOrderStatus } from "@/lib/server/orders-store";
import { adjustStock } from "@/lib/server/stock-store";
import type { OrderStatus } from "@/lib/admin/types";

// Mapeia os status do Mercado Pago pros status que o painel Admin entende.
// "in_process"/"pending" ficam como "aguardando_pagamento" — nada muda
// até o pagamento realmente ser aprovado ou recusado.
function mapPaymentStatus(mpStatus: string | undefined): OrderStatus | null {
  switch (mpStatus) {
    case "approved":
      return "pago";
    case "rejected":
    case "cancelled":
      return "cancelado";
    case "pending":
    case "in_process":
    case "authorized":
      return "aguardando_pagamento";
    default:
      return null; // status desconhecido — não mexe no pedido
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  // O Mercado Pago manda o id do pagamento na query string. Aceita os
  // dois formatos que eles já usaram (o novo `type`/`data.id` e o antigo
  // `topic`/`id`), pra funcionar independente de qual o painel do
  // cliente estiver configurado pra mandar.
  const notificationType = url.searchParams.get("type") || url.searchParams.get("topic");
  const paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");

  if (notificationType !== "payment" || !paymentId) {
    // Outros tópicos (ex.: merchant_order) ou notificação incompleta —
    // não é erro nosso, só não é algo que a gente processa. Devolve 200
    // pra o Mercado Pago não ficar reenviando.
    return NextResponse.json({ received: true, ignored: true });
  }

  // --- 1) Confere a assinatura -----------------------------------------
  const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (webhookSecret) {
    try {
      WebhookSignatureValidator.validate({
        xSignature: request.headers.get("x-signature"),
        xRequestId: request.headers.get("x-request-id"),
        dataId: paymentId,
        secret: webhookSecret,
        toleranceSeconds: 300, // 5 minutos de tolerância contra replay
      });
    } catch {
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Em produção, sem segredo configurado a rota fica aberta pra
    // qualquer um forjar "pagamento aprovado" — melhor recusar e avisar
    // no log do que aceitar notificações não verificadas.
    console.error("MERCADOPAGO_WEBHOOK_SECRET não configurado em produção — webhook recusado.");
    return NextResponse.json({ error: "Webhook não configurado." }, { status: 500 });
  }
  // Em desenvolvimento, sem o segredo configurado, a validação é pulada
  // (com o aviso acima) só pra facilitar testar localmente.

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "MERCADOPAGO_ACCESS_TOKEN não configurado." }, { status: 500 });
  }

  // --- 2) Busca o pagamento completo na API do Mercado Pago ------------
  const client = new MercadoPagoConfig({ accessToken });
  const paymentClient = new Payment(client);

  try {
    const payment = await paymentClient.get({ id: paymentId });
    const orderId = payment.external_reference;
    const newStatus = mapPaymentStatus(payment.status);

    if (!orderId || !newStatus) {
      return NextResponse.json({ received: true, skipped: true });
    }

    // Busca o pedido ANTES de atualizar — preciso saber se ele já estava
    // "pago" pra não baixar estoque duas vezes (o Mercado Pago reenvia a
    // mesma notificação várias vezes até receber 200; sem essa checagem,
    // cada reenvio decrementaria o estoque de novo pro mesmo pagamento).
    const before = await getOrderByExternalReference(orderId);
    const wasAlreadyPaid = before?.status === "pago";

    // --- 3) Atualiza o pedido no orders-store (troque por UPDATE no seu
    //     banco de verdade quando plugar o ORM — ver lib/server/orders-store.ts) ---
    const updated = await updateOrderStatus(orderId, newStatus, {
      mpPaymentId: payment.id ? String(payment.id) : undefined,
    });

    if (!updated) {
      // Pedido não encontrado — pode acontecer se o orders-store tiver
      // "esquecido" (reinício do servidor, instância serverless
      // diferente — ver o aviso no topo de orders-store.ts). Com um
      // banco de verdade isso não aconteceria.
      console.warn(`Webhook: pedido ${orderId} não encontrado no orders-store.`);
    } else if (newStatus === "pago" && !wasAlreadyPaid) {
      // Pagamento confirmado pela primeira vez — agora sim baixa o
      // estoque de verdade (ver o "porquê não decrementar no checkout"
      // em lib/server/stock-store.ts). Falha ao baixar estoque não deve
      // derrubar a confirmação do pagamento (o pedido já está marcado
      // como pago, o que importa mais) — só loga pra investigar depois.
      try {
        await Promise.all(updated.items.map((item) => adjustStock(item.productId, -item.quantity)));
      } catch (stockErr) {
        console.error(`Webhook: falha ao baixar estoque do pedido ${orderId}:`, stockErr);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Erro ao processar webhook do Mercado Pago:", err);
    // 500 faz o Mercado Pago tentar de novo mais tarde — correto aqui,
    // já que o erro é nosso (falha ao buscar o pagamento), não deles.
    return NextResponse.json({ error: "Falha ao processar notificação." }, { status: 500 });
  }
}
