import type { Metadata } from "next";
import { DollarSign, PackageX, Truck } from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import RecentSalesTable from "@/components/admin/dashboard/RecentSalesTable";
import { MOCK_ORDERS, MOCK_PRODUCTS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Dashboard — Painel Gordão HeadShop",
};

const LOW_STOCK_THRESHOLD = 5;

export default function DashboardPage() {
  const totalVendas = MOCK_ORDERS.filter((order) => order.status !== "aguardando_pagamento").reduce(
    (sum, order) => sum + order.total,
    0
  );
  const pedidosPendentes = MOCK_ORDERS.filter((order) => order.status === "pago" || order.status === "separando").length;
  const estoqueBaixo = MOCK_PRODUCTS.filter((product) => !product.soldOut && product.stock <= LOW_STOCK_THRESHOLD).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Visão geral</h1>
        <p className="text-sm text-slate-500">Resumo rápido da loja com dados de exemplo.</p>
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

      <RecentSalesTable orders={MOCK_ORDERS.slice(0, 5)} />
    </div>
  );
}
