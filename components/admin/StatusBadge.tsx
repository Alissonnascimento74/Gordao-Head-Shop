import type { OrderStatus } from "@/lib/admin/types";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  aguardando_pagamento: {
    label: "Aguardando pagamento",
    className: "bg-amber-100 text-amber-700",
  },
  pago: {
    label: "Pago",
    className: "bg-sky-100 text-sky-700",
  },
  separando: {
    label: "Separando",
    className: "bg-violet-100 text-violet-700",
  },
  despachado: {
    label: "Despachado",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
