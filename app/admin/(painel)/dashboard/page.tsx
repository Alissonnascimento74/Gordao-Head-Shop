import type { Metadata } from "next";
import { DollarSign, Monitor, PackageX, Store, Truck } from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import RecentSalesTable from "@/components/admin/dashboard/RecentSalesTable";
import CashClosingTable from "@/components/admin/dashboard/CashClosingTable";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";
import { listOrders } from "@/lib/server/orders-store";
import { getStockMap } from "@/lib/server/stock-store";
import type { Order } from "@/lib/admin/types";

const LOW_STOCK_THRESHOLD = 5;

// Sem nenhuma API dinâmica (cookies/searchParams/etc.), o Next tentaria
// pré-renderizar essa página como estática — mesmo motivo do
// `force-dynamic` em app/admin/(painel)/pedidos/page.tsx.
export const dynamic = "force-dynamic";

// Só conta como "venda confirmada" (pra Total/Online/Balcão e pro
// fechamento de caixa) pedidos que não estão mais esperando pagamento
// nem foram cancelados — vendas físicas (PDV) já nascem confirmadas
// (ver app/api/admin/pos/route.ts), então sempre entram.
function isConfirmed(order: Order) {
  return order.status !== "aguardando_pagamento" && order.status !== "cancelado";
}

function monthKey(iso: string) {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export default async function DashboardPage() {
  const [orders, stockMap] = await Promise.all([listOrders(), getStockMap()]);

  const confirmed = orders.filter(isConfirmed);
  const onlineOrders = confirmed.filter((order) => (order.source ?? "online") === "online");
  const fisicoOrders = confirmed.filter((order) => order.source === "fisico");

  const vendasOnline = onlineOrders.reduce((sum, order) => sum + order.total, 0);
  const vendasBalcao = fisicoOrders.reduce((sum, order) => sum + order.total, 0);
  const totalVendas = vendasOnline + vendasBalcao;

  const pedidosPendentes = orders.filter((order) => order.status === "pago" || order.status === "separando").length;

  // Estoque real (Redis, lib/server/stock-store.ts) — o mesmo número que
  // o PDV e o checkout online usam. Produtos sem valor no Redis ainda
  // (nunca vendidos/ajustados) caem no estoque original do catálogo.
  const estoqueBaixo = MOCK_PRODUCTS.filter((product) => {
    const stock = stockMap[product.id] ?? product.stock;
    return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
  }).length;

  // Fechamento de caixa mensal — agrupa os pedidos confirmados por
  // "YYYY-MM" e soma online/balcão separado, mais recente primeiro.
  const monthlyMap = new Map<string, { online: number; fisico: number }>();
  for (const order of confirmed) {
    const key = monthKey(order.createdAt);
    const entry = monthlyMap.get(key) ?? { online: 0, fisico: 0 };
    if ((order.source ?? "online") === "online") entry.online += order.total;
    else entry.fisico += order.total;
    monthlyMap.set(key, entry);
  }
  const monthlyRows = Array.from(monthlyMap.entries())
    .map(([month, totals]) => ({ month, ...totals }))
    .sort((a, b) => (a.month < b.month ? 1 : -1));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Visão geral</h1>
        <p className="text-sm text-slate-500">Resumo rápido da loja.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total de vendas"
          value={totalVendas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          icon={DollarSign}
          accent="green"
        />
        <MetricCard
          label="Pedidos pendentes de despacho"
          value={String(pedidosPendentes)}
          icon={Truck}
          accent="amber"
        />
        <MetricCard
          label="Produtos com estoque baixo"
          value={String(estoqueBaixo)}
          icon={PackageX}
          accent="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          label="Vendas Online (R$)"
          value={vendasOnline.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          icon={Monitor}
          accent="blue"
        />
        <MetricCard
          label="Vendas Balcão (R$)"
          value={vendasBalcao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          icon={Store}
          accent="violet"
        />
      </div>

      <CashClosingTable rows={monthlyRows} />

      <RecentSalesTable orders={orders.slice(0, 5)} />
    </div>
  );
}
