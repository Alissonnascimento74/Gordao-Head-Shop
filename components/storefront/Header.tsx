"use client";

/**
 * Header — cabeçalho da landing page (logo, busca, carrinho e categorias).
 * ------------------------------------------------------------------
 * Extraído de app/page.tsx pra poder usar o hook useSecretAdminAccess no
 * logo sem inflar ainda mais aquele arquivo. Mantém exatamente a mesma
 * aparência/comportamento de antes — a única coisa nova é o easter egg:
 * 5 cliques rápidos no logo revelam um link discreto "Painel Admin".
 *
 * O logo usa `cursor-default` (em vez do cursor de "mãozinha" padrão de
 * link) justamente pra não dar nenhuma pista visual de que ali tem uma
 * ação escondida.
 */

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import type { CategoryId } from "@/utils/categoryParser";
import { useSecretAdminAccess } from "@/hooks/useSecretAdminAccess";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  cartCount: number;
  onCartClick: () => void;
  activeCategory: CategoryId | "todos";
  onCategoryChange: (id: CategoryId | "todos") => void;
  categories: { id: CategoryId; label: string }[];
};

export default function Header({
  query,
  onQueryChange,
  cartCount,
  onCartClick,
  activeCategory,
  onCategoryChange,
  categories,
}: HeaderProps) {
  const { showAdmin, handleSecretClick } = useSecretAdminAccess();

  return (
    <header className="sticky top-0 z-40 border-b border-[#1f2b23] bg-[#0a0d0a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo: continua levando pro topo da página (href="#topo"), mas
            cada clique também alimenta o contador do easter egg. */}
        <a href="#topo" onClick={handleSecretClick} className="flex shrink-0 items-center gap-3 cursor-default">
          <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#2c4a37]">
            <Image src="/logo-gordao.jpg" alt="Gordão HeadShop" fill sizes="44px" className="object-cover" priority />
          </span>
          <span className="hidden font-display text-lg tracking-wide text-[#f3efe3] sm:block">
            GORDÃO <span className="text-[#4caf6d]">HEADSHOP</span>
          </span>
        </a>

        {/* Link secreto — só existe no DOM depois dos 5 cliques, e entra
            com fade-in (ver keyframe "fadeIn" em tailwind.config.ts). */}
        {showAdmin && (
          <Link
            href="/admin"
            className="animate-fadeIn shrink-0 rounded-full border border-[#2c4a37] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#4caf6d] transition hover:border-[#4caf6d] hover:bg-[#4caf6d]/10"
          >
            Painel Admin
          </Link>
        )}

        <div className="relative ml-2 hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f8a78]" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar tabaco, sedas, piteiras…"
            className="w-full rounded-full border border-[#1f2b23] bg-[#10150f] py-2.5 pl-10 pr-4 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none transition focus:border-[#4caf6d]"
          />
        </div>

        <div className="flex flex-1 items-center gap-2 sm:hidden">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f8a78]" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar…"
              className="w-full rounded-full border border-[#1f2b23] bg-[#10150f] py-2 pl-9 pr-3 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onCartClick}
          aria-label="Abrir carrinho"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1f2b23] bg-[#10150f] text-[#f3efe3] transition hover:border-[#4caf6d] hover:text-[#4caf6d]"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4caf6d] px-1 text-[11px] font-semibold text-[#0a0d0a]">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* ---------------- Menu de categorias ---------------- */}
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
        <CategoryPill label="Tudo" active={activeCategory === "todos"} onClick={() => onCategoryChange("todos")} />
        {categories.map((c) => (
          <CategoryPill key={c.id} label={c.label} active={activeCategory === c.id} onClick={() => onCategoryChange(c.id)} />
        ))}
      </nav>
    </header>
  );
}

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "border-[#4caf6d] bg-[#4caf6d]/10 text-[#4caf6d]"
          : "border-[#1f2b23] bg-transparent text-[#8ea395] hover:border-[#2c4a37] hover:text-[#f3efe3]"
      }`}
    >
      {label}
    </button>
  );
}
