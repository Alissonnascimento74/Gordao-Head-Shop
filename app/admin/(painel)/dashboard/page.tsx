import type { Metadata } from "next";
import { DollarSign, PackageX, Truck } from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import RecentSalesTable from "@/components/admin/dashboard/RecentSalesTable";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";
import { listOrders } from "@/lib/server/orders-store";

export const metadata: Metadata = {
  title: "Dashboard — Painel Gordão HeadShop",
};

// O catálogo (Produtos) ainda é só mock em memória — não persiste edição
// nem reflete vendas de verdade (ver seção 26 do Obsidian, é uma
// pendência à parte). Os PEDIDOS, porém, já vêm do orders-store (Redis)
// desde 21/09 — por isso só o estoque baixo continua usando MOCK_PRODUCTS.
const LOW_STOCK_THRESHOLD = 5;

// Sem nenhuma API dinâmica (cookies/searchParams/etc.), o Next tentaria
// pré-renderizar essa página como estática — mesmo motivo do
// `force-dynamic` em app/admin/(painel)/pedidos/page.tsx.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const orders = await listOrders();

  const totalVendas = orders
    .filter((order) => order.status !== "aguardando_pagamento" && order.status !== "cancelado")
    .reduce((sum, order) => sum + order.total, 0);
  const pedidosPendentes = orders.filter((order) => order.status === "pago" || order.status === "separando").length;
  const estoqueBaixo = MOCK_PRODUCTS.filter((product) => !product.soldOut && product.stock <= LOW_STOCK_THRESHOLD).length;

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

      <RecentSalesTable orders={orders.slice(0, 5)} />
    </div>
  );
}
