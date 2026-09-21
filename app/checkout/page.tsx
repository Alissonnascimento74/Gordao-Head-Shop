"use client";

/**
 * Gordão HeadShop — Checkout completo
 * ------------------------------------------------------------------
 * O carrinho de verdade vive como estado React dentro de app/page.tsx
 * (a landing page) — ele não existe mais aqui quando o navegador troca
 * de página. Pra essa tela saber o que está no carrinho, a landing page
 * grava os itens no `sessionStorage` (chave `gordao-checkout-cart`)
 * antes de mandar o cliente pra cá (ver o botão "Finalizar compra" no
 * CartDrawer, dentro de app/page.tsx). `sessionStorage` é por aba e some
 * ao fechar — não precisa de um gerenciador de estado global só pra isso.
 *
 * Se a pessoa cair aqui sem carrinho (ex.: abriu o link direto), mostra
 * um aviso com um botão pra voltar pra loja, em vez de um formulário
 * vazio sem sentido.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import LeafWatermark from "@/components/LeafWatermark";
import CheckoutForm, { type CheckoutCartItem } from "@/components/checkout/CheckoutForm";
import { readCheckoutCart } from "@/utils/checkoutCart";

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutCartItem[] | null>(null);

  useEffect(() => {
    setItems(readCheckoutCart());
  }, []);

  return (
    <div className="min-h-screen text-[#1f2b23] antialiased">
      <GlobalStyles />
      <LeafWatermark />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#5f7767]">
          <Lock className="h-4 w-4" />
          Checkout seguro
        </div>

        {items === null ? (
          // Primeiro render no servidor / antes do useEffect ler o
          // sessionStorage — evita um "flash" do aviso de carrinho vazio.
          <p className="text-sm text-[#5f7767]">Carregando...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[#e3e6de] bg-white p-10 text-center">
            <p className="text-[#1f2b23]">Seu carrinho está vazio.</p>
            <p className="mt-1 text-sm text-[#5f7767]">Volte pra loja e adicione alguns produtos antes de continuar.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#4caf6d] px-6 py-2.5 text-sm font-semibold text-[#0a0d0a] hover:bg-[#5fc47f]"
            >
              Voltar pra loja
            </Link>
          </div>
        ) : (
          <CheckoutForm items={items} />
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8ea395]">
          <ShieldCheck className="h-4 w-4" />
          Pagamento processado com segurança pelo Mercado Pago
        </div>
      </div>
    </div>
  );
}

// `<style jsx global>` (não uma tag `<style>` comum) — achado testando o
// frete: uma tag `<style>` comum com aspas dentro do texto (o `@import
// url("...")`) faz o React escapar as aspas em `&quot;` na renderização
// do servidor, mas o navegador não decodifica entidades HTML dentro de
// `<style>` (é um elemento de "texto cru" pela spec) — dá erro de
// hidratação ("Text content does not match") porque o servidor manda
// `&quot;` literal e o cliente espera aspas de verdade. `style jsx`
// (styled-jsx, já embutido no Next.js) processa isso do jeito certo.
function GlobalStyles() {
  return (
    <style jsx global>{`
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
