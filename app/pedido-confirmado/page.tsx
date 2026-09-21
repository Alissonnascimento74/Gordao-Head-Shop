/**
 * /pedido-confirmado — pra onde o Mercado Pago manda o cliente de volta
 * depois de pagar (back_urls.success, com auto_return: "approved" — ver
 * app/api/checkout/route.ts).
 * ------------------------------------------------------------------
 * Server Component: lê o status do pedido direto do orders-store (mesmo
 * processo Node, sem precisar de fetch). Importante notar que esse
 * redirecionamento e o webhook (app/api/webhooks/mercadopago/route.ts)
 * são dois caminhos INDEPENDENTES — o cliente pode cair nessa página
 * antes mesmo de o webhook ter processado a confirmação. Por isso o
 * texto é propositalmente cauteloso ("estamos confirmando") em vez de
 * cravar "pagamento aprovado" só por causa do redirecionamento.
 */

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import LeafWatermark from "@/components/LeafWatermark";
import { getOrderByExternalReference } from "@/lib/server/orders-store";

export default async function PedidoConfirmadoPage({
  searchParams,
}: {
  searchParams: Promise<{ pedido?: string }>;
}) {
  const { pedido } = await searchParams;
  const order = pedido ? getOrderByExternalReference(pedido) : undefined;
  const alreadyConfirmed = order?.status === "pago";

  return (
    <div className="min-h-screen text-[#1f2b23] antialiased">
      <LeafWatermark />

      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
        <div className="rounded-2xl border border-[#e3e6de] bg-white p-10">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#4caf6d]" />
          <h1 className="mt-4 font-display text-2xl text-[#1f2b23]">
            {alreadyConfirmed ? "Pagamento confirmado!" : "Recebemos seu pedido"}
          </h1>
          {order && <p className="mt-2 text-sm text-[#5f7767]">Pedido {order.id}</p>}
          <p className="mt-4 text-sm text-[#5f7767]">
            {alreadyConfirmed
              ? "Já recebemos a confirmação do Mercado Pago. Vamos preparar tudo pra enviar!"
              : "Estamos confirmando o pagamento com o Mercado Pago — isso costuma levar só alguns segundos. Você não precisa fazer mais nada."}
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#4caf6d] px-6 py-2.5 text-sm font-semibold text-[#0a0d0a] hover:bg-[#5fc47f]"
          >
            Voltar pra loja
          </Link>
        </div>
      </div>
    </div>
  );
}
