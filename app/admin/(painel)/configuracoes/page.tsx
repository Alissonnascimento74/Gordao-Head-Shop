import type { Metadata } from "next";
import { ADMIN_CREDENTIALS } from "@/lib/admin/auth-config";

export const metadata: Metadata = {
  title: "Configurações — Painel Gordão HeadShop",
};

export default function ConfiguracoesPage() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500">Esqueleto da tela — falta plugar salvamento na API.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Dados da loja</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nome da loja</label>
          <input
            defaultValue="Gordão HeadShop"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">WhatsApp de contato</label>
          <input
            defaultValue="5511997306428"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Acesso ao painel</h2>
        <p className="text-sm text-slate-500">
          Usuário atual: <span className="font-medium text-slate-700">{ADMIN_CREDENTIALS.username}</span>
        </p>
        <p className="text-xs text-slate-400">
          Login mockado — troque as credenciais em <code>lib/admin/auth-config.ts</code> ou nas variáveis de
          ambiente <code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code>.
        </p>
      </div>

      <button
        disabled
        className="rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-darker opacity-60"
      >
        Salvar alterações (a plugar)
      </button>
    </div>
  );
}
