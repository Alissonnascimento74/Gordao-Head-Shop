"use client";

/**
 * OrdersClient — tela "Pedidos" do Admin.
 * ------------------------------------------------------------------
 * De onde vêm os pedidos: `initialOrders` chega pronto do Server
 * Component (app/admin/(painel)/pedidos/page.tsx), que lê
 * `listOrders()` direto de lib/server/orders-store.ts — sem passar por
 * API nenhuma nesse primeiro carregamento.
 *
 * Depois de montada, a tela também busca `GET /api/orders` a cada 15s
 * (e no botão "Atualizar"). É esse polling que faz um pedido pago pelo
 * Mercado Pago "aparecer sozinho" aqui: o webhook
 * (app/api/webhooks/mercadopago/route.ts) grava o pagamento aprovado no
 * MESMO orders-store, e o próximo polling desta tela já traz o pedido
 * atualizado. Não é "tempo real" de verdade (isso pediria WebSocket ou
 * Server-Sent Events) — é um intervalo curto, suficiente pra um painel
 * de admin.
 */

import { Fragment, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, RefreshCw, Truck } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/admin/types";
import StatusBadge from "@/components/admin/StatusBadge";
import ShipOrderModal from "./ShipOrderModal";

const FILTERS: { value: OrderStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "aguardando_pagamento", label: "Aguardando pagamento" },
  { value: "pago", label: "Pago" },
  { value: "cancelado", label: "Cancelado" },
  { value: "separando", label: "Separando" },
  { value: "despachado", label: "Despachado" },
];

const POLL_INTERVAL_MS = 15_000;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function formatCPF(cpf: string) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");
  const [orderToShip, setOrderToShip] = useState<Order | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchOrders() {
    setRefreshing(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setLastUpdated(new Date());
      }
    } catch {
      // Falha silenciosa — o próximo polling tenta de novo. Não vale a
      // pena incomodar o admin com um erro por causa de uma requisição
      // de atualização em segundo plano.
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    // Busca uma vez assim que a tela monta — sem isso, o admin ficava até
    // 15s olhando pra `initialOrders` (o snapshot do primeiro carregamento
    // no servidor) antes do primeiro polling rodar.
    fetchOrders();
    const interval = setInterval(fetchOrders, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const visibleOrders = filter === "todos" ? orders : orders.filter((order) => order.status === filter);

  function handleConfirmShip(orderId: string, trackingCode: string) {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "despachado", trackingCode } : order))
    );
    // TODO quando plugar banco de dados real: chamar uma rota tipo
    // PATCH /api/orders/[id] pra persistir o despacho no servidor —
    // hoje essa atualização só existe na memória desta aba.
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Pedidos</h1>
          <p className="text-sm text-slate-500">Acompanhe e despache os pedidos recebidos.</p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={refreshing}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {lastUpdated ? `Atualizado ${formatDate(lastUpdated.toISOString())}` : "Atualizar"}
        </button>
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
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleOrders.map((order) => {
                const canShip = order.status === "pago" || order.status === "separando";
                const expanded = expandedOrderId === order.id;
                const hasDetails = Boolean(order.customerEmail || order.customerCPF || order.shippingAddress);
                return (
                  <Fragment key={order.id}>
                    <tr className="hover:bg-slate-50">
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
                      <td className="px-5 py-3">
                        {hasDetails && (
                          <button
                            onClick={() => setExpandedOrderId(expanded ? null : order.id)}
                            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Ver detalhes do pedido"
                          >
                            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expanded && hasDetails && (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                            <div>
                              <p className="mb-1 font-semibold text-slate-500">Contato</p>
                              {order.customerEmail && <p className="text-slate-700">{order.customerEmail}</p>}
                              {order.customerCPF && <p className="text-slate-700">CPF: {formatCPF(order.customerCPF)}</p>}
                            </div>
                            {order.shippingAddress && (
                              <div>
                                <p className="mb-1 font-semibold text-slate-500">Endereço de entrega</p>
                                <p className="text-slate-700">
                                  {order.shippingAddress.street}, {order.shippingAddress.number}
                                </p>
                                <p className="text-slate-700">
                                  {order.shippingAddress.neighborhood} — {order.shippingAddress.city}/
                                  {order.shippingAddress.state}
                                </p>
                                <p className="text-slate-700">CEP: {order.shippingAddress.cep}</p>
                                {order.shippingMethod && (
                                  <p className="mt-1 font-medium text-slate-700">
                                    {order.shippingMethod.isExpress ? "🏍️ " : "📦 "}
                                    {order.shippingMethod.label} —{" "}
                                    {formatCurrency(order.shippingMethod.price)}
                                  </p>
                                )}
                              </div>
                            )}
                            <div>
                              <p className="mb-1 font-semibold text-slate-500">Itens</p>
                              {order.items.map((item, i) => (
                                <p key={i} className="text-slate-700">
                                  {item.quantity}x {item.productName} — {formatCurrency(item.unitPrice * item.quantity)}
                                </p>
                              ))}
                              {order.mpPaymentId && (
                                <p className="mt-1 text-slate-400">Pagamento MP: #{order.mpPaymentId}</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">
                    Nenhum pedido nesse status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ShipOrderModal order={orderToShip} onClose={() => setOrderToShip(null)} onConfirm={handleConfirmShip} />
    </div>
  );
}
