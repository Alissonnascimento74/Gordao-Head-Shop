"use client";

import { useState } from "react";
import type { StoreSettings } from "@/lib/server/store-settings";

export default function ConfiguracoesClient({ initialSettings, username }: { initialSettings: StoreSettings; username: string }) {
  const [storeName, setStoreName] = useState(initialSettings.storeName);
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsappNumber);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ error: boolean; text: string } | null>(null);

  async function handleSave() {
    setSaving(true); setFeedback(null);
    try {
      const response = await fetch("/api/store-settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeName, whatsappNumber }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível salvar as configurações.");
      setStoreName(data.storeName); setWhatsappNumber(data.whatsappNumber);
      setFeedback({ error: false, text: "Configurações salvas." });
    } catch (error) {
      setFeedback({ error: true, text: error instanceof Error ? error.message : "Erro ao salvar." });
    } finally { setSaving(false); }
  }

  return <div className="max-w-xl space-y-6">
    <div><h1 className="text-xl font-semibold text-slate-900">Configurações</h1><p className="text-sm text-slate-500">Dados usados pela loja e pelo contato com clientes.</p></div>
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Dados da loja</h2>
      <div><label className="mb-1 block text-sm font-medium text-slate-700">Nome da loja</label><input value={storeName} onChange={(event) => setStoreName(event.target.value)} maxLength={80} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green" /></div>
      <div><label className="mb-1 block text-sm font-medium text-slate-700">WhatsApp de contato (com DDI)</label><input value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value)} inputMode="tel" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green" /></div>
      <button onClick={handleSave} disabled={saving} className="rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-darker disabled:opacity-60">{saving ? "Salvando..." : "Salvar alterações"}</button>
      {feedback && <p role={feedback.error ? "alert" : "status"} className={`text-sm ${feedback.error ? "text-red-600" : "text-emerald-700"}`}>{feedback.text}</p>}
    </div>
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-semibold text-slate-900">Acesso ao painel</h2><p className="text-sm text-slate-500">Usuário atual: <span className="font-medium text-slate-700">{username}</span></p><p className="text-xs text-slate-400">As credenciais de acesso são configuradas em <code>lib/admin/auth-config.ts</code> ou pelas variáveis <code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code>.</p></div>
  </div>;
}
