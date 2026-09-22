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
  cancelado: {
    label: "Cancelado",
    className: "bg-red-100 text-red-700",
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

export default function StatusBadge({
  status,
  isPickup,
  isPhysical,
}: {
  status: OrderStatus;
  /** true = pedido de retirada na loja — "despachado" vira "Retirado" (não existe despacho pra quem busca pessoalmente). */
  isPickup?: boolean;
  /** true = venda física registrada no PDV — "despachado" vira "Venda balcão" (não existe despacho nem retirada, o cliente já levou o produto). */
  isPhysical?: boolean;
}) {
  const config = STATUS_CONFIG[status];
  const label =
    status === "despachado" && isPhysical
      ? "Venda balcão"
      : status === "despachado" && isPickup
        ? "Retirado"
        : config.label;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
      {label}
    </span>
  );
}
