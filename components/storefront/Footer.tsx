"use client";

/**
 * Footer — rodapé da landing page (logo, endereço e aviso legal).
 * ------------------------------------------------------------------
 * Extraído de app/page.tsx, com o mesmo easter egg do Header: 5 cliques
 * rápidos no logo revelam o link discreto "Painel Admin". Cada instância
 * do hook (uma no Header, uma aqui) tem sua própria contagem — clicar no
 * logo do topo não soma com cliques no logo do rodapé, e vice-versa.
 */

import Link from "next/link";
import Image from "next/image";
import { useSecretAdminAccess } from "@/hooks/useSecretAdminAccess";

export default function Footer() {
  const { showAdmin, handleSecretClick } = useSecretAdminAccess();

  return (
    <footer className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-[#e3e6de] pt-8 sm:flex-row">
        <button
          type="button"
          onClick={handleSecretClick}
          className="flex items-center gap-3 border-0 bg-transparent p-0 text-left cursor-default"
        >
          <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-[#c3cec0]">
            <Image src="/logo-gordao.jpg" alt="Gordão HeadShop" fill className="object-cover" />
          </span>
          <div>
            <span className="block font-display text-sm tracking-wide text-[#5f7767]">
              GORDÃO HEADSHOP © {new Date().getFullYear()}
            </span>
            <span className="block text-xs text-[#8ea395]">Rua Joaquim Felício, 118 — Parque Alvorada</span>
          </div>
        </button>

        <div className="flex items-center gap-4">
          {/* Mesmo link secreto do Header, com fade-in próprio. */}
          {showAdmin && (
            <Link
              href="/admin"
              className="animate-fadeIn rounded-full border border-[#c3cec0] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#4caf6d] transition hover:border-[#4caf6d] hover:bg-[#4caf6d]/10"
            >
              Painel Admin
            </Link>
          )}

          <p className="text-xs text-[#4f6558]">Venda proibida para menores de 18 anos. Produtos de uso adulto.</p>
        </div>
      </div>
    </footer>
  );
}
