"use client";

/**
 * AdminShell — moldura de toda tela do Admin (Sidebar + Header + conteúdo).
 * ------------------------------------------------------------------
 * `print:hidden` na Sidebar e no Header: quando alguma tela do Admin
 * dispara `window.print()` (ex.: a etiqueta de envio em
 * components/admin/orders/ShippingLabel.tsx), ninguém quer o menu lateral
 * e o cabeçalho do painel saindo na folha impressa — só o conteúdo que a
 * própria tela decidiu mostrar pra impressão (via `hidden print:flex`,
 * escondido na tela normal e só visível no modo impressão) deve aparecer.
 * Como é aqui na moldura compartilhada, vale pra QUALQUER tela do Admin
 * que um dia precisar imprimir algo, não só Pedidos.
 */

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 print:block print:bg-white">
      <div className="print:hidden">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col print:block">
        <div className="print:hidden">
          <Header onMenuClick={() => setMobileOpen(true)} />
        </div>
        <main className="flex-1 p-4 sm:p-6 print:p-0">{children}</main>
      </div>
    </div>
  );
}
