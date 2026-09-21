"use client";

/**
 * Gordão HeadShop — Landing Page / Vitrine
 * ------------------------------------------------------------------
 * Como usar:
 * 1) Salve este arquivo como app/page.tsx no seu projeto Next.js (App Router).
 * 2) Coloque a logo enviada em /public/logo-gordao.jpg (mesmo nome usado abaixo).
 * 3) O número do WhatsApp já está configurado (WHATSAPP_NUMBER). Troque se precisar.
 * 4) Ajuste PRODUCTS com o catálogo real (nome, preço, categoria, imagem).
 *
 * Sem dependências externas além de Next/React/Tailwind (já usados no seu projeto).
 * Ícones feitos em SVG inline — não depende de lucide-react nem de libs de terceiros.
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PRODUCTS, type Product } from "./products";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import LeafWatermark from "@/components/LeafWatermark";
import { getAvailableCategories, parseProductCategory, type CategoryId } from "@/utils/categoryParser";
import { saveCheckoutCart } from "@/utils/checkoutCart";

const FEATURED_PRODUCTS: { id: string; image: string }[] = [
  { id: "000046-1", image: "/products/bandeja-narcos.jpg" }, // Bandeja Narcos
  { id: "000075", image: "/products/rick-and-morty-tray.jpg" }, // Case Rick and Morty
  { id: "000300-1", image: "/products/vault77-bag.jpg" }, // Bag Vault transversal
];

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "5511997306428"; // Número do WhatsApp Business do Gordão HeadShop (DDI+DDD+número, só dígitos)

// Categorias calculadas a partir do NOME de cada produto (utils/categoryParser.ts),
// a mesma inteligência usada no Painel Admin e na Vitrine de demonstração — troca
// as 3 categorias fixas de antes (Tabaco/Sedas e Piteiras/Acessórios) por todas as
// que realmente aparecem no catálogo de 482 produtos.
const CATEGORIES: { id: CategoryId; label: string }[] = getAvailableCategories(PRODUCTS.map((p) => p.name));

const SLOGAN_LINE_1 = "Se você não gosta,";
const SLOGAN_LINE_2 = "conhece alguém que gosta.";
const SLOGAN_LINE_3 = "Tudo para sua sessão ficar mais leve.";

/* ------------------------------------------------------------------ */
/* Ícones (SVG inline)                                                 */
/* ------------------------------------------------------------------ */

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconMinus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.52 3.62 1.42 5.12L2 22l5.13-1.5a9.86 9.86 0 004.91 1.32h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 01-4.17-1.14l-.3-.18-3.05.89.9-2.97-.2-.31a8.19 8.19 0 01-1.26-4.44c0-4.53 3.68-8.21 8.2-8.21 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 012.4 5.8c0 4.53-3.68 8.16-8.31 8.16zm4.48-6.13c-.24-.12-1.44-.71-1.67-.8-.22-.08-.38-.12-.55.12-.16.24-.63.8-.77.97-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function IconLeaf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C7 3 3 7 3 13c0 3.5 2.2 6.2 5 7.5C7 15 8.5 9 12 5c-1 4-1 9 1.5 13.5C17 17.5 19 14 19 10c0-4-3-7-7-8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tipos de carrinho                                                   */
/* ------------------------------------------------------------------ */

type CartItem = { product: Product; qty: number };

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export default function GordaoHeadShopPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "todos">("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "todos" || parseProductCategory(p.name) === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  // Ao trocar de categoria, rola pro topo da seção de produtos — sem isso, quem
  // já tinha descido a página fica olhando pro meio de uma lista diferente,
  // sem ver os primeiros itens da categoria nova.
  function handleCategoryChange(id: CategoryId | "todos") {
    setActiveCategory(id);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.product.price, 0);

  function addToCart(product: Product) {
    if (product.stock === 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function changeQty(productId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  /**
   * Leva pro checkout completo (Pix ou cartão pelo Mercado Pago, com nota
   * fiscal de verdade dos dados do cliente). Salva os itens no
   * sessionStorage (utils/checkoutCart.ts) porque o carrinho é só estado
   * React aqui, e some ao trocar de página.
   */
  function goToFullCheckout() {
    if (cart.length === 0) return;
    saveCheckoutCart(
      cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.qty,
        imageUrl: item.product.imageUrl,
      }))
    );
    setCartOpen(false);
    router.push("/checkout");
  }

  return (
    <div className="min-h-screen text-[#1f2b23] antialiased selection:bg-[#4caf6d] selection:text-[#0a0d0a]">
      <GlobalStyles />
      <LeafWatermark />

      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={CATEGORIES}
      />

      {/* ---------------- Hero ---------------- */}
      <section id="topo" className="relative overflow-hidden border-b border-[#e3e6de]">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div
            className={`transition-all duration-700 ease-out ${
              heroIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-4 text-sm tracking-wide text-[#5f7767]">
              Estabelecido em 2024 · Tabacaria &amp; headshop
            </p>
            <h1 className="font-display text-4xl leading-[1.05] text-[#1f2b23] sm:text-5xl lg:text-6xl">
              {SLOGAN_LINE_1}
              <br />
              <span className="bg-gradient-to-r from-[#8fbf6f] via-[#4caf6d] to-[#1f6f4a] bg-clip-text text-transparent">
                {SLOGAN_LINE_2}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base text-[#5f7767] sm:text-lg">{SLOGAN_LINE_3}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#produtos"
                className="rounded-full bg-[#4caf6d] px-7 py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] active:scale-[0.98]"
              >
                Ver ofertas
              </a>
              <a
                href="#produtos"
                className="text-sm font-medium text-[#5f7767] underline decoration-[#c3cec0] underline-offset-4 transition hover:text-[#4caf6d]"
              >
                Conhecer o catálogo
              </a>
            </div>
          </div>

          <div
            className={`relative mx-auto transition-all delay-150 duration-700 ease-out ${
              heroIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="relative aspect-square w-64 sm:w-80 lg:w-[26rem]">
              <div className="absolute inset-0 rounded-full bg-[#4caf6d]/10 blur-3xl" />
              <Image
                src="/logo-gordao.jpg"
                alt="Gordão HeadShop"
                fill
                sizes="(min-width: 1024px) 26rem, 20rem"
                className="relative object-contain drop-shadow-[0_0_40px_rgba(76,175,109,0.25)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Direto da loja (destaques com foto) ---------------- */}
      <section className="border-b border-[#e3e6de] bg-[#f5f4ef] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl text-[#1f2b23] sm:text-2xl">Direto da loja</h2>
          <p className="mt-1 text-sm text-[#5f7767]">Peças reais, tiradas aqui na Gordão.</p>

          <div className="mt-5 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {FEATURED_PRODUCTS.map((featured) => {
              const product = PRODUCTS.find((p) => p.id === featured.id);
              if (!product) return null;
              const outOfStock = product.stock === 0;
              return (
                <div
                  key={product.id}
                  className="relative w-[75%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#e3e6de] bg-white sm:w-[45%] lg:w-[31%]"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={featured.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 75vw"
                      className="object-cover"
                    />
                    {product.badge && (
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          outOfStock
                            ? "bg-[#0a0d0a]/80 text-[#e08585]"
                            : "bg-[#0a0d0a]/80 text-[#4caf6d]"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm leading-snug text-[#1f2b23]">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-base text-[#1f2b23]">
                        {formatBRL(product.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        disabled={outOfStock}
                        className="flex items-center gap-1.5 rounded-full border border-[#c3cec0] px-3.5 py-1.5 text-xs font-medium text-[#1f2b23] transition hover:border-[#4caf6d] hover:text-[#4caf6d] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#c3cec0] disabled:hover:text-[#1f2b23]"
                      >
                        <IconPlus className="h-3 w-3" />
                        {outOfStock ? "Esgotado" : "Adicionar"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Vitrine de produtos ---------------- */}
      {/* scroll-mt: compensa a altura do Header sticky, senão ele cobre o
          topo da seção ao rolar pra cá automaticamente (handleCategoryChange). */}
      <section id="produtos" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-[#1f2b23] sm:text-3xl">
              {activeCategory === "todos"
                ? "Catálogo"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </h2>
            <p className="mt-1 text-sm text-[#5f7767]">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "itens"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#e3e6de] bg-white px-6 py-14 text-center text-[#5f7767]">
            Nada encontrado com esses filtros. Tenta buscar outro termo.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
            ))}
          </div>
        )}
      </section>

      {/* ---------------- Slogan ---------------- */}
      <section className="border-y border-[#e3e6de] bg-[#f5f4ef]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <IconLeaf className="mx-auto mb-6 h-8 w-8 text-[#4caf6d]" />
          <p className="font-display text-2xl leading-snug text-[#1f2b23] sm:text-3xl">
            {SLOGAN_LINE_1}
            <br />
            {SLOGAN_LINE_2}
          </p>
          <p className="mt-4 text-base text-[#5f7767]">{SLOGAN_LINE_3}</p>
        </div>
      </section>

      <Footer />

      {/* ---------------- Botão flutuante WhatsApp ---------------- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#4caf6d] text-[#0a0d0a] shadow-lg shadow-black/40 transition hover:scale-105 active:scale-95"
      >
        <IconWhatsApp className="h-7 w-7" />
      </a>

      {/* ---------------- Carrinho (drawer) ---------------- */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        onGoToFullCheckout={goToFullCheckout}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                      */
/* ------------------------------------------------------------------ */

/**
 * ProductCard — card de produto do catálogo.
 * ------------------------------------------------------------------
 * Tem DUAS estruturas de layout dentro do mesmo componente, alternadas
 * por classes responsivas do Tailwind (`md:` = telas >= 768px):
 *
 *   - Bloco "mobile" (`flex md:hidden`): visível só abaixo de 768px.
 *     Layout em linha (Flexbox) — coluna de texto à esquerda (tag,
 *     nome, descrição, preço e botão) e a foto do produto numa coluna
 *     fixa à direita, conforme o mockup pedido.
 *   - Bloco "desktop" (`hidden md:flex`): visível a partir de 768px —
 *     é EXATAMENTE o layout original (foto em cima, texto embaixo),
 *     sem nenhuma alteração.
 *
 * Como as classes `md:` do Tailwind compilam pra `@media (min-width: 768px)`
 * de verdade, isso tem o mesmo efeito de escrever a media query na mão —
 * só que reaproveitando o mesmo sistema de classes do resto do projeto,
 * em vez de um arquivo CSS à parte.
 *
 * A foto aparece sempre, esteja o produto esgotado ou não — só o botão
 * "Adicionar" fica desabilitado quando `stock === 0`.
 */
function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const soldOut = product.stock === 0;

  const image = product.imageUrl ? (
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 38vw"
      className="object-contain p-2"
    />
  ) : (
    <div className="flex h-full items-center justify-center">
      <IconLeaf className="h-10 w-10 text-[#2c4a37]" />
    </div>
  );

  const addButton = (
    <button
      type="button"
      onClick={onAdd}
      disabled={soldOut}
      className="flex items-center gap-1.5 rounded-full border border-[#c3cec0] px-4 py-2 text-sm font-medium text-[#1f2b23] transition group-hover:border-[#4caf6d] group-hover:text-[#4caf6d] disabled:cursor-not-allowed disabled:opacity-40 disabled:group-hover:border-[#c3cec0] disabled:group-hover:text-[#1f2b23]"
    >
      <IconPlus className="h-3.5 w-3.5" />
      {soldOut ? "Esgotado" : "Adicionar"}
    </button>
  );

  return (
    <div className="group rounded-2xl border border-[#e3e6de] bg-white p-5 transition hover:border-[#c3cec0]">
      {/* ---- Layout mobile (< 768px): texto à esquerda, foto à direita ---- */}
      <div className="flex gap-3 md:hidden">
        <div className="flex min-w-0 flex-1 flex-col text-right">
          {product.badge && (
            <span className="mb-1 inline-block self-end shrink-0 rounded-full bg-[#4caf6d]/10 px-2.5 py-1 text-[11px] font-medium text-[#4caf6d]">
              {product.badge}
            </span>
          )}
          <h3 className="font-display text-base leading-snug text-[#1f2b23]">{product.name}</h3>
          {product.description && (
            <p className="mt-1 line-clamp-3 text-left text-sm text-[#5f7767]">{product.description}</p>
          )}
          <div className="mt-auto flex flex-col items-end gap-2 pt-3">
            <span className="font-display text-lg text-[#1f2b23]">{formatBRL(product.price)}</span>
            {addButton}
          </div>
        </div>
        <div className="relative w-[38%] shrink-0 overflow-hidden rounded-xl bg-[#f5f4ef]">{image}</div>
      </div>

      {/* ---- Layout desktop (>= 768px): igual ao original, intacto ---- */}
      <div className="hidden md:flex md:h-full md:flex-col md:justify-between">
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#f5f4ef]">{image}</div>

          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="font-display text-base leading-snug text-[#1f2b23]">{product.name}</h3>
            {product.badge && (
              <span className="shrink-0 rounded-full bg-[#4caf6d]/10 px-2.5 py-1 text-[11px] font-medium text-[#4caf6d]">
                {product.badge}
              </span>
            )}
          </div>
          {product.description && <p className="text-sm text-[#5f7767]">{product.description}</p>}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-display text-lg text-[#1f2b23]">{formatBRL(product.price)}</span>
          {addButton}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  cart,
  total,
  onChangeQty,
  onRemove,
  onGoToFullCheckout,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onGoToFullCheckout: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#e3e6de] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e3e6de] px-5 py-4">
          <h2 className="font-display text-lg text-[#1f2b23]">Seu carrinho</h2>
          <button
        type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#8ea395] transition hover:bg-[#e3e6de] hover:text-[#1f2b23]"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <p className="mt-10 text-center text-sm text-[#5f7767]">
              Seu carrinho está vazio. Adicione produtos no catálogo.
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id} className="flex gap-3 border-b border-[#e3e6de] pb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1f2b23]">{item.product.name}</p>
                    <p className="mt-0.5 text-xs text-[#5f7767]">
                      {formatBRL(item.product.price)} / un.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
        type="button"
                        onClick={() => onChangeQty(item.product.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c3cec0] text-[#1f2b23] transition hover:border-[#4caf6d]"
                      >
                        <IconMinus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm text-[#1f2b23]">{item.qty}</span>
                      <button
        type="button"
                        onClick={() => onChangeQty(item.product.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c3cec0] text-[#1f2b23] transition hover:border-[#4caf6d]"
                      >
                        <IconPlus className="h-3 w-3" />
                      </button>
                      <button
        type="button"
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-xs text-[#5f7767] underline decoration-[#c3cec0] underline-offset-2 transition hover:text-[#e08585]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-[#1f2b23]">
                    {formatBRL(item.product.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 border-t border-[#e3e6de] px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5f7767]">Total</span>
              <span className="font-display text-xl text-[#1f2b23]">{formatBRL(total)}</span>
            </div>

            {/* Checkout completo pelo Mercado Pago: coleta nome, CPF,
                endereço e processa o pagamento (Pix ou cartão) — ver
                app/checkout/page.tsx e app/api/checkout/route.ts. */}
            <button
              type="button"
              onClick={onGoToFullCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4caf6d] py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] active:scale-[0.98]"
            >
              Finalizar compra (Pix ou Cartão)
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

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
