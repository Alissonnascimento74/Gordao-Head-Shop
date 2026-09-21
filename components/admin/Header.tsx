"use client";

// Cabeçalho do painel — nome/inicial do avatar vêm de ADMIN_CREDENTIALS
// (mock, ver lib/admin/auth-config.ts), não de uma sessão de usuário de
// verdade. O sininho de notificações é só decorativo por enquanto (sem
// lista/dropdown por trás).
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { ADMIN_CREDENTIALS } from "@/lib/admin/auth-config";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const initial = ADMIN_CREDENTIALS.username.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-green" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-brand-cream">
            {initial}
          </div>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">
            {ADMIN_CREDENTIALS.username}
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
