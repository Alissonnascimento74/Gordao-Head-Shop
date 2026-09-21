/**
 * ShippingLabel — etiqueta de envio, só pra impressão.
 * ------------------------------------------------------------------
 * Fica INVISÍVEL na tela o tempo todo (`hidden`) e só aparece na folha
 * impressa (`print:flex`) — é assim que dá pra ter uma etiqueta bonita
 * sem ela atrapalhar o resto da tela de Pedidos.
 *
 * Só existe UM desse componente na página (renderizado uma vez no fim de
 * OrdersClient.tsx), não um por pedido — o pedido que aparece nele é
 * controlado pelo estado `printingOrder` do componente pai. Isso importa:
 * se cada linha da tabela tivesse a sua própria etiqueta escondida com
 * `print:flex`, imprimir UM pedido imprimiria as etiquetas de TODOS ao
 * mesmo tempo (todas ficariam visíveis juntas no modo impressão).
 *
 * Endereço da loja (remetente) hardcoded aqui de propósito — é só texto
 * de exibição, não lógica de cálculo. Se a loja mudar de endereço, troque
 * aqui E em `lib/shipping/calculate.ts` (constante `STORE_ORIGIN`).
 */

import type { Order } from "@/lib/admin/types";

const STORE_ADDRESS_LINE_1 = "Rua Joaquim Felício, 118 — Alvorada";
const STORE_ADDRESS_LINE_2 = "Guarulhos/SP — CEP 07242-310";

export default function ShippingLabel({ order }: { order: Order | null }) {
  if (!order || !order.shippingAddress) return null;
  const address = order.shippingAddress;

  return (
    <div className="hidden print:flex print:min-h-screen print:items-start print:justify-center print:p-10">
      {/* @page/print-color-adjust não têm classe utilitária no Tailwind —
          só dá pra fazer via <style>. Escopado só a esse componente. */}
      <style jsx>{`
        @page {
          size: auto;
          margin: 1.5cm;
        }
        .label-accent {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      `}</style>

      <div className="w-full max-w-xl overflow-hidden rounded-2xl border-2 border-brand-forest">
        {/* Remetente */}
        <div className="label-accent flex items-center gap-3 rounded-t-xl bg-brand-forest px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-brand-darker">
            G
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-cream">GORDÃO HEADSHOP</p>
            <p className="text-xs text-brand-sage">
              {STORE_ADDRESS_LINE_1} · {STORE_ADDRESS_LINE_2}
            </p>
          </div>
        </div>

        {/* Número do pedido, em destaque */}
        <div className="label-accent flex items-center justify-between border-b-2 border-dashed border-slate-300 bg-brand-green/10 px-6 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Pedido</span>
          <span className="font-mono text-lg font-bold text-brand-forest">{order.id}</span>
        </div>

        {/* Destinatário */}
        <div className="space-y-1 px-6 py-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Entregar para</p>
          <p className="text-xl font-bold text-slate-900">{order.customerName}</p>
          <p className="text-base text-slate-700">
            {address.street}, {address.number}
          </p>
          <p className="text-base text-slate-700">
            {address.neighborhood} — {address.city}/{address.state}
          </p>
          <p className="text-base font-semibold text-slate-900">CEP: {address.cep}</p>
          {order.customerPhone && <p className="mt-2 text-sm text-slate-500">Tel.: {order.customerPhone}</p>}
        </div>

        {order.shippingMethod?.isExpress && (
          <div className="label-accent rounded-b-xl bg-amber-100 px-6 py-2 text-center text-xs font-bold uppercase tracking-wide text-amber-800">
            🏍️ Entrega expressa — 99 Entrega
          </div>
        )}
      </div>
    </div>
  );
}
