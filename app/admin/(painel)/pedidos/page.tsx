import type { Metadata } from "next";
import OrdersClient from "@/components/admin/orders/OrdersClient";
import { MOCK_ORDERS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Pedidos — Painel Gordão HeadShop",
};

export default function PedidosPage() {
  return <OrdersClient initialOrders={MOCK_ORDERS} />;
}
