/**
 * CashClosingTable — fechamento de caixa mensal (Dashboard).
 * ------------------------------------------------------------------
 * Uma linha por mês, somando Vendas Online + Vendas Balcão = Total —
 * é a tabela que o lojista pediu pra "fechar o caixa com precisão"
 * juntando os dois canais. Só considera pedidos com dinheiro de
 * verdade confirmado (mesmo filtro do Dashboard: pago/despachado/
 * separando pro online, todo pedido físico já é confirmado na hora).
 */

type MonthlyRow = {
  month: string; // "2026-09"
  online: number;
  fisico: number;
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatMonthLabel(month: string) {
  const [year, monthNum] = month.split("-").map(Number);
  const date = new Date(year, monthNum - 1, 1);
  const label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function CashClosingTable({ rows }: { rows: MonthlyRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Fechamento de caixa mensal</h2>
        <p className="text-xs text-slate-500">Vendas online + vendas de balcão, mês a mês.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase text-slate-400">
              <th className="px-5 py-3 font-medium">Mês</th>
              <th className="px-5 py-3 font-medium">Vendas online</th>
              <th className="px-5 py-3 font-medium">Vendas balcão</th>
              <th className="px-5 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.month} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-700">{formatMonthLabel(row.month)}</td>
                <td className="px-5 py-3 text-slate-600">{formatCurrency(row.online)}</td>
                <td className="px-5 py-3 text-slate-600">{formatCurrency(row.fisico)}</td>
                <td className="px-5 py-3 font-semibold text-slate-900">{formatCurrency(row.online + row.fisico)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-400">
                  Nenhuma venda registrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
