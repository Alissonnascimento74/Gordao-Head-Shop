"use client";

import { useState, type FormEvent } from "react";
import Modal from "@/components/admin/ui/Modal";
import type { Order } from "@/lib/admin/types";

type ShipOrderModalProps = {
  order: Order | null;
  onClose: () => void;
  onConfirm: (orderId: string, trackingCode: string) => void;
};

export default function ShipOrderModal({ order, onClose, onConfirm }: ShipOrderModalProps) {
  const [trackingCode, setTrackingCode] = useState("");

  function handleClose() {
    setTrackingCode("");
    onClose();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!order) return;
    onConfirm(order.id, trackingCode);
    handleClose();
  }

  return (
    <Modal open={!!order} onClose={handleClose} title="Marcar como despachado">
      {order && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-slate-600">
            Pedido <span className="font-medium text-slate-800">{order.id}</span> — {order.customerName}
          </p>

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

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight"
            >
              Confirmar despacho
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
