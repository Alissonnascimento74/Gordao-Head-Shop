"use client";

/**
 * Gordão HeadShop — Checkout
 * ------------------------------------------------------------------
 * Como usar:
 * 1) Salve este arquivo como app/checkout/page.tsx no seu projeto Next.js.
 * 2) Salve também app/api/create-preference/route.ts (rota que este componente chama).
 * 3) Configure MERCADOPAGO_ACCESS_TOKEN nas variáveis de ambiente da Vercel.
 * 4) Rode `npm install lucide-react` se ainda não tiver a biblioteca.
 * 5) Ajuste os dados do pedido em ORDER, logo abaixo.
 *
 * Por que não são mais 2 links fixos: um "Link de Pagamento" do Mercado Pago
 * (tipo link.mercadopago.com.br/...) tem o preço travado no momento em que é
 * criado no painel — não dá pra passar o valor pela URL. Pra cobrar o valor
 * certo a cada pedido, os botões abaixo chamam a rota /api/create-preference,
 * que gera um link novo (com o valor certo) na hora, via API do Mercado Pago.
 * ------------------------------------------------------------------
 */

import { useState } from "react";
import { QrCode, CreditCard, ShieldCheck, Lock, ArrowRight, Loader2 } from "lucide-react";
import LeafWatermark from "@/components/LeafWatermark";

/* ------------------------------------------------------------------ */
/* Dados do pedido exibidos no resumo — ajuste aqui                   */
/* ------------------------------------------------------------------ */

const ORDER = {
  productName: "Kit Sessão Gordão",
  description: "Seda king size, piteira de vidro e dichavador de alumínio.",
  price: 89.9,
};

/* ------------------------------------------------------------------ */

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CheckoutPage() {
  const [loadingMethod, setLoadingMethod] = useState<"pix" | "cartao" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(method: "pix" | "cartao") {
    setError(null);
    setLoadingMethod(method);
    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              title: ORDER.productName,
              quantity: 1,
              unit_price: ORDER.price,
            },
          ],
          externalReference: `checkout-${Date.now()}`,
          method,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.init_point) {
        throw new Error(data.error || "Não foi possível iniciar o pagamento.");
      }
      window.location.href = data.init_point;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o pagamento.");
      setLoadingMethod(null);
    }
  }

  return (
    <div className="min-h-screen text-[#1f2b23] antialiased">
      <GlobalStyles />
      <LeafWatermark />

      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-12 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-center gap-2 text-sm text-[#5f7767]">
          <Lock className="h-4 w-4" />
          Checkout seguro
        </div>

        {/* Resumo do pedido */}
        <div className="rounded-2xl border border-[#e3e6de] bg-white p-6 sm:p-8">
          <p className="text-xs font-medium text-[#5f7767]">Resumo do pedido</p>

          <h1 className="mt-3 font-display text-2xl leading-snug text-[#1f2b23] sm:text-3xl">
            {ORDER.productName}
          </h1>
          <p className="mt-2 text-sm text-[#5f7767]">{ORDER.description}</p>

          <div className="mt-6 flex items-baseline justify-between border-t border-[#e3e6de] pt-6">
            <span className="text-sm text-[#5f7767]">Total</span>
            <span className="font-display text-3xl text-[#1f2b23]">
              {formatBRL(ORDER.price)}
            </span>
          </div>
        </div>

        {/* Métodos de pagamento */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => handlePay("pix")}
            disabled={loadingMethod !== null}
            className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-[#4caf6d] px-6 py-5 text-left transition hover:bg-[#5fc47f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a0d0a]/10">
                {loadingMethod === "pix" ? (
                  <Loader2 className="h-6 w-6 animate-spin text-[#0a0d0a]" />
                ) : (
                  <QrCode className="h-6 w-6 text-[#0a0d0a]" />
                )}
              </span>
              <span>
                <span className="block font-display text-base text-[#0a0d0a]">
                  {loadingMethod === "pix" ? "Gerando Pix..." : "Pagar com Pix"}
                </span>
                <span className="block text-xs text-[#0a0d0a]/70">Aprovação imediata</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-[#0a0d0a] transition group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => handlePay("cartao")}
            disabled={loadingMethod !== null}
            className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-[#1e3a5f] px-6 py-5 text-left transition hover:bg-[#254b79] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                {loadingMethod === "cartao" ? (
                  <Loader2 className="h-6 w-6 animate-spin text-[#f3efe3]" />
                ) : (
                  <CreditCard className="h-6 w-6 text-[#f3efe3]" />
                )}
              </span>
              <span>
                <span className="block font-display text-base text-[#f3efe3]">
                  {loadingMethod === "cartao" ? "Preparando..." : "Pagar com Cartão"}
                </span>
                <span className="block text-xs text-[#c9d6e6]">Crédito em até 12x</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-[#f3efe3] transition group-hover:translate-x-1" />
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-[#e08585]">{error}</p>
        )}

        {/* Selo de confiança */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8ea395]">
          <ShieldCheck className="h-4 w-4" />
          Pagamento processado com segurança pelo Mercado Pago
        </div>
      </div>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap");
      .font-display {
        font-family: "Anton", "Inter", sans-serif;
        font-weight: 400;
        letter-spacing: 0.01em;
      }
      body {
        font-family: "Inter", sans-serif;
        background: #ffffff;
      }
    `}</style>
  );
}
