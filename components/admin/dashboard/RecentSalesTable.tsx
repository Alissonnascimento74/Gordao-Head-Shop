import type { Order } from "@/lib/admin/types";
import StatusBadge from "@/components/admin/StatusBadge";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function RecentSalesTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Últimas vendas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase text-slate-400">
              <th className="px-5 py-3 font-medium">Pedido</th>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Data</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-700">{order.id}</td>
                <td className="px-5 py-3 text-slate-600">{order.customerName}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(order.createdAt)}</td>
                <td className="px-5 py-3 font-medium text-slate-700">{formatCurrency(order.total)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
