import type { Metadata } from "next";
import OrdersClient from "@/components/admin/orders/OrdersClient";
import { listOrders } from "@/lib/server/orders-store";

export const metadata: Metadata = {
  title: "Pedidos — Painel Gordão HeadShop",
};

// Sem nenhuma API dinâmica (cookies/searchParams/etc.), o Next tentaria
// pré-renderizar essa página como estática — ou seja, `listOrders()` só
// rodaria uma vez (no build) e o primeiro carregamento da tela ficaria
// congelado nos pedidos daquele momento, ignorando vendas novas até o
// polling do OrdersClient alcançar. `force-dynamic` garante que o server
// component roda de novo a cada request.
export const dynamic = "force-dynamic";

// Server Component: lê os pedidos direto do orders-store (mesmo processo
// Node, sem precisar de fetch) pro primeiro carregamento da tela. Depois
// disso, OrdersClient assume e busca atualizações via GET /api/orders.
export default function PedidosPage() {
  return <OrdersClient initialOrders={listOrders()} />;
}
