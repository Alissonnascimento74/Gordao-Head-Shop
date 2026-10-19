"use client";

// Modal que confirma a conclusão de um pedido e devolve (orderId,
// trackingCode) pro componente pai — quem realmente marca o pedido como
// despachado/retirado é OrdersClient.tsx (handleConfirmShip), este modal
// só cuida do formulário.
//
// Pedidos de "Retirar na loja" não têm código de rastreio (não existe
// Correios/motoboy quando o cliente busca pessoalmente) — pra esses, o
// campo nem aparece, e o texto do modal muda pra falar de retirada em
// vez de despacho.
import { useState, type FormEvent } from "react";
import Modal from "@/components/admin/ui/Modal";
import type { Order } from "@/lib/admin/types";

type ShipOrderModalProps = {
  order: Order | null;
  onClose: () => void;
  onConfirm: (orderId: string, trackingCode: string) => Promise<void>;
};

export default function ShipOrderModal({ order, onClose, onConfirm }: ShipOrderModalProps) {
  const [trackingCode, setTrackingCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isPickup = order?.shippingMethod?.carrier === "Retirada";

  function handleClose() {
    setTrackingCode("");
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!order) return;
    setSaving(true);
    setError("");
    try {
      await onConfirm(order.id, trackingCode);
      handleClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={!!order} onClose={handleClose} title={isPickup ? "Marcar como retirado" : "Marcar como despachado"}>
      {order && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <p className="text-sm text-slate-600">
            Pedido <span className="font-medium text-slate-800">{order.id}</span> — {order.customerName}
          </p>

          {isPickup ? (
            <p className="text-sm text-slate-600">
              Confirma que o cliente já retirou esse pedido na loja? Sem código de rastreio — não há
              envio nesse caso.
            </p>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Código de rastreio</label>
              <input
                required
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
                placeholder="Ex.: BR123456789BR"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight"
            >
              {saving ? "Salvando..." : isPickup ? "Confirmar retirada" : "Confirmar despacho"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
