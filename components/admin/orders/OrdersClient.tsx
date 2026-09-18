"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/admin/types";
import StatusBadge from "@/components/admin/StatusBadge";
import ShipOrderModal from "./ShipOrderModal";

const FILTERS: { value: OrderStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "aguardando_pagamento", label: "Aguardando pagamento" },
  { value: "pago", label: "Pago" },
  { value: "separando", label: "Separando" },
  { value: "despachado", label: "Despachado" },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");
  const [orderToShip, setOrderToShip] = useState<Order | null>(null);

  const visibleOrders = filter === "todos" ? orders : orders.filter((order) => order.status === filter);

  function handleConfirmShip(orderId: string, trackingCode: string) {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "despachado", trackingCode } : order))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Pedidos</h1>
        <p className="text-sm text-slate-500">Acompanhe e despache os pedidos recebidos.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              filter === item.value
                ? "bg-brand-forest text-brand-cream"
                : "border border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="px-5 py-3 font-medium">Pedido</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleOrders.map((order) => {
                const canShip = order.status === "pago" || order.status === "separando";
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-slate-700">{order.id}</td>
                    <td className="px-5 py-3">
                      <p className="text-slate-700">{order.customerName}</p>
                      <p className="text-xs text-slate-400">{order.customerPhone}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="px-5 py-3 font-medium text-slate-700">{formatCurrency(order.total)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                      {order.trackingCode && (
                        <p className="mt-1 text-xs text-slate-400">Rastreio: {order.trackingCode}</p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {canShip ? (
                        <button
                          onClick={() => setOrderToShip(order)}
                          className="flex items-center gap-1.5 rounded-lg bg-brand-green px-3 py-1.5 text-xs font-semibold text-brand-darker hover:bg-brand-greenLight"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          Marcar como despachado
                        </button>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ShipOrderModal order={orderToShip} onClose={() => setOrderToShip(null)} onConfirm={handleConfirmShip} />
    </div>
  );
}
