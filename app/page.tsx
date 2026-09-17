"use client";

/**
 * Gordão HeadShop — Landing Page / Vitrine
 * ------------------------------------------------------------------
 * Como usar:
 * 1) Salve este arquivo como app/page.tsx no seu projeto Next.js (App Router).
 * 2) Coloque a logo enviada em /public/logo-gordao.jpg (mesmo nome usado abaixo).
 * 3) O link do WhatsApp já está configurado (WHATSAPP_LINK). Troque se precisar.
 * 4) Ajuste PRODUCTS com o catálogo real (nome, preço, categoria, imagem).
 *
 * Sem dependências externas além de Next/React/Tailwind (já usados no seu projeto).
 * Ícones feitos em SVG inline — não depende de lucide-react nem de libs de terceiros.
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PRODUCTS, type CategoryId, type Product } from "./products";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const WHATSAPP_LINK = "https://wa.me/message/IR2OGKAK2H6ED1"; // Link oficial do WhatsApp Business do Gordão HeadShop

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "tabaco", label: "Tabaco" },
  { id: "sedas", label: "Sedas e Piteiras" },
  { id: "acessorios", label: "Acessórios" },
];

const SLOGAN_LINE_1 = "E se você não gosta,";
const SLOGAN_LINE_2 = "conhece alguém que gosta.";
const SLOGAN_LINE_3 = "Tudo pra sua sessão ficar o mais leve possível.";

/* ------------------------------------------------------------------ */
/* Ícones (SVG inline)                                                 */
/* ------------------------------------------------------------------ */

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.4a2 2 0 002-1.7L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="21" r="1.4" />
      <circle cx="18" cy="21" r="1.4" />
    </svg>
  );
}

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

type DeliveryType = "retirada" | "entrega";

type PaymentMethod = "pix" | "cartao";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "Cartão de Crédito",
};

const PIX_KEY = "SUA_CHAVE_PIX_AQUI"; // TODO: troque pela chave Pix real (CPF/CNPJ, e-mail, telefone ou chave aleatória)

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatCEP(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export default function GordaoHeadShopPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "todos">("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("retirada");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [cep, setCep] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [pixNotice, setPixNotice] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "todos" || p.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

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

  function buildWhatsAppMessage() {
    const lines: string[] = [];
    lines.push("🛒 *Novo Pedido — Gordão HeadShop*");
    lines.push("");
    cart.forEach((item) => {
      lines.push(
        `• ${item.qty}x ${item.product.name} — ${formatBRL(item.product.price * item.qty)}`
      );
    });
    lines.push("");
    lines.push(`*Total: ${formatBRL(cartTotal)}*`);
    lines.push("");
    lines.push(`Nome: ${customerName || "-"}`);
    lines.push(`Recebimento: ${deliveryType === "entrega" ? "Entrega" : "Retirada no local"}`);
    if (deliveryType === "entrega") {
      lines.push(`Endereço: ${street || "-"}, nº ${number || "-"}`);
      lines.push(`CEP: ${cep || "-"}`);
    }
    lines.push(`Pagamento: ${PAYMENT_LABELS[paymentMethod]}`);
    if (paymentMethod === "pix") {
      lines.push("");
      lines.push("Comprovante do Pix: vou enviar aqui em seguida.");
    }
    return lines.join("\n");
  }

  function isFormValid() {
    if (!customerName.trim()) return false;
    if (deliveryType === "entrega" && (!street.trim() || !number.trim() || !cep.trim())) {
      return false;
    }
    return true;
  }

  function sendToWhatsApp() {
    if (cart.length === 0 || !isFormValid()) return;
    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`${WHATSAPP_LINK}?text=${text}`, "_blank");
  }

  async function copyPixKeyAndSend() {
    if (cart.length === 0 || !isFormValid()) return;
    try {
      await navigator.clipboard.writeText(PIX_KEY);
    } catch {
      // clipboard indisponível (ex: contexto não seguro) — segue o fluxo mesmo assim
    }
    sendToWhatsApp();
    setCartOpen(false);
    setPixNotice(true);
    window.setTimeout(() => setPixNotice(false), 6000);
  }

  return (
    <div className="min-h-screen bg-[#0a0d0a] text-[#f3efe3] antialiased selection:bg-[#4caf6d] selection:text-[#0a0d0a]">
      <GlobalStyles />

      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#1f2b23] bg-[#0a0d0a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#topo" className="flex shrink-0 items-center gap-3">
            <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#2c4a37]">
              <Image
                src="/logo-gordao.jpg"
                alt="Gordão HeadShop"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden font-display text-lg tracking-wide text-[#f3efe3] sm:block">
              GORDÃO <span className="text-[#4caf6d]">HEADSHOP</span>
            </span>
          </a>

          <div className="relative ml-2 hidden flex-1 sm:block">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f8a78]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar tabaco, sedas, piteiras…"
              className="w-full rounded-full border border-[#1f2b23] bg-[#10150f] py-2.5 pl-10 pr-4 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none transition focus:border-[#4caf6d]"
            />
          </div>

          <div className="flex flex-1 items-center gap-2 sm:hidden">
            <div className="relative w-full">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f8a78]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar…"
                className="w-full rounded-full border border-[#1f2b23] bg-[#10150f] py-2 pl-9 pr-3 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
              />
            </div>
          </div>

          <button
        type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrinho"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1f2b23] bg-[#10150f] text-[#f3efe3] transition hover:border-[#4caf6d] hover:text-[#4caf6d]"
          >
            <IconCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4caf6d] px-1 text-[11px] font-semibold text-[#0a0d0a]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* ---------------- Menu de categorias ---------------- */}
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          <CategoryPill
            label="Tudo"
            active={activeCategory === "todos"}
            onClick={() => setActiveCategory("todos")}
          />
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.id}
              label={c.label}
              active={activeCategory === c.id}
              onClick={() => setActiveCategory(c.id)}
            />
          ))}
        </nav>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="topo" className="relative overflow-hidden border-b border-[#1f2b23]">
        <SmokeBackground />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div
            className={`transition-all duration-700 ease-out ${
              heroIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-4 text-sm tracking-wide text-[#7fae8f]">
              Estabelecido em 2024 · Tabacaria &amp; headshop
            </p>
            <h1 className="font-display text-4xl leading-[1.05] text-[#f3efe3] sm:text-5xl lg:text-6xl">
              Tudo que sua sessão
              <br />
              <span className="bg-gradient-to-r from-[#8fbf6f] via-[#4caf6d] to-[#1f6f4a] bg-clip-text text-transparent">
                precisa pra ficar leve
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base text-[#b7c8bb] sm:text-lg">
              Tabaco selecionado, sedas que queimam direito e os acessórios que
              fazem diferença. Curadoria de quem entende do assunto desde 2024.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#produtos"
                className="rounded-full bg-[#4caf6d] px-7 py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] active:scale-[0.98]"
              >
                Ver ofertas
              </a>
              <a
                href="#produtos"
                className="text-sm font-medium text-[#b7c8bb] underline decoration-[#2c4a37] underline-offset-4 transition hover:text-[#4caf6d]"
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

      {/* ---------------- Vitrine de produtos ---------------- */}
      <section id="produtos" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-[#f3efe3] sm:text-3xl">
              {activeCategory === "todos"
                ? "Catálogo"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </h2>
            <p className="mt-1 text-sm text-[#7c9c88]">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "itens"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#1f2b23] bg-[#10150f] px-6 py-14 text-center text-[#7c9c88]">
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
      <section className="border-y border-[#1f2b23] bg-[#0d120e]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <IconLeaf className="mx-auto mb-6 h-8 w-8 text-[#4caf6d]" />
          <p className="font-display text-2xl leading-snug text-[#f3efe3] sm:text-3xl">
            {SLOGAN_LINE_1}
            <br />
            {SLOGAN_LINE_2}
          </p>
          <p className="mt-4 text-base text-[#7c9c88]">{SLOGAN_LINE_3}</p>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#1f2b23] pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-[#2c4a37]">
              <Image src="/logo-gordao.jpg" alt="Gordão HeadShop" fill className="object-cover" />
            </span>
            <div>
              <span className="block font-display text-sm tracking-wide text-[#7c9c88]">
                GORDÃO HEADSHOP © {new Date().getFullYear()}
              </span>
              <span className="block text-xs text-[#5f7767]">
                Rua Joaquim Felício, 153 — Parque Alvorada
              </span>
            </div>
          </div>
          <p className="text-xs text-[#4f6558]">
            Venda proibida para menores de 18 anos. Produtos de uso adulto.
          </p>
        </div>
      </footer>

      {/* ---------------- Botão flutuante WhatsApp ---------------- */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#4caf6d] text-[#0a0d0a] shadow-lg shadow-black/40 transition hover:scale-105 active:scale-95"
      >
        <IconWhatsApp className="h-7 w-7" />
      </a>

      {/* ---------------- Aviso pós-Pix ---------------- */}
      {pixNotice && (
        <div className="fixed bottom-24 right-5 z-40 max-w-xs rounded-2xl border border-[#4caf6d]/40 bg-[#10150f] p-4 text-sm text-[#f3efe3] shadow-lg shadow-black/40">
          <p className="font-medium text-[#4caf6d]">Chave Pix copiada!</p>
          <p className="mt-1 text-[#b7c8bb]">
            Agora é só colar no seu banco e enviar o comprovante aqui pelo WhatsApp pra
            confirmarmos seu pedido.
          </p>
        </div>
      )}

      {/* ---------------- Carrinho (drawer) ---------------- */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        customerName={customerName}
        setCustomerName={setCustomerName}
        deliveryType={deliveryType}
        setDeliveryType={setDeliveryType}
        street={street}
        setStreet={setStreet}
        number={number}
        setNumber={setNumber}
        cep={cep}
        setCep={setCep}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        canSend={isFormValid() && cart.length > 0}
        onSend={sendToWhatsApp}
        onCopyPix={copyPixKeyAndSend}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                      */
/* ------------------------------------------------------------------ */

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#1f2b23] bg-[#10150f] p-5 transition hover:border-[#2c4a37]">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-base leading-snug text-[#f3efe3]">{product.name}</h3>
          {product.badge && (
            <span className="shrink-0 rounded-full bg-[#4caf6d]/10 px-2.5 py-1 text-[11px] font-medium text-[#4caf6d]">
              {product.badge}
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-sm text-[#8ea395]">{product.description}</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-display text-lg text-[#f3efe3]">{formatBRL(product.price)}</span>
        <button
          type="button"
          onClick={onAdd}
          disabled={product.stock === 0}
          className="flex items-center gap-1.5 rounded-full border border-[#2c4a37] px-4 py-2 text-sm font-medium text-[#f3efe3] transition group-hover:border-[#4caf6d] group-hover:text-[#4caf6d] disabled:cursor-not-allowed disabled:opacity-40 disabled:group-hover:border-[#2c4a37] disabled:group-hover:text-[#f3efe3]"
        >
          <IconPlus className="h-3.5 w-3.5" />
          {product.stock === 0 ? "Esgotado" : "Adicionar"}
        </button>
      </div>
    </div>
  );
}

function SmokeBackground() {
  // Uma única camada de "fumaça" animada, discreta, atrás do hero.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-0 h-[140%] w-1/2 smoke-drift rounded-full bg-[#1f6f4a]/20 blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-[120%] w-1/2 smoke-drift-slow rounded-full bg-[#123524]/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent,#0a0d0a_75%)]" />
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
  customerName,
  setCustomerName,
  deliveryType,
  setDeliveryType,
  street,
  setStreet,
  number,
  setNumber,
  cep,
  setCep,
  paymentMethod,
  setPaymentMethod,
  canSend,
  onSend,
  onCopyPix,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  customerName: string;
  setCustomerName: (v: string) => void;
  deliveryType: DeliveryType;
  setDeliveryType: (v: DeliveryType) => void;
  street: string;
  setStreet: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
  cep: string;
  setCep: (v: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
  canSend: boolean;
  onSend: () => void;
  onCopyPix: () => void;
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
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#1f2b23] bg-[#0d120e] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#1f2b23] px-5 py-4">
          <h2 className="font-display text-lg text-[#f3efe3]">Seu carrinho</h2>
          <button
        type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#8ea395] transition hover:bg-[#1f2b23] hover:text-[#f3efe3]"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <p className="mt-10 text-center text-sm text-[#7c9c88]">
              Seu carrinho está vazio. Adicione produtos no catálogo.
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id} className="flex gap-3 border-b border-[#1f2b23] pb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#f3efe3]">{item.product.name}</p>
                    <p className="mt-0.5 text-xs text-[#7c9c88]">
                      {formatBRL(item.product.price)} / un.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
        type="button"
                        onClick={() => onChangeQty(item.product.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2c4a37] text-[#f3efe3] transition hover:border-[#4caf6d]"
                      >
                        <IconMinus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm text-[#f3efe3]">{item.qty}</span>
                      <button
        type="button"
                        onClick={() => onChangeQty(item.product.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2c4a37] text-[#f3efe3] transition hover:border-[#4caf6d]"
                      >
                        <IconPlus className="h-3 w-3" />
                      </button>
                      <button
        type="button"
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-xs text-[#7c9c88] underline decoration-[#2c4a37] underline-offset-2 transition hover:text-[#e08585]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-[#f3efe3]">
                    {formatBRL(item.product.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 border-t border-[#1f2b23] px-5 py-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8ea395]">Nome</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-[#1f2b23] bg-[#10150f] px-3 py-2 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8ea395]">
                Como quer receber?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("retirada")}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    deliveryType === "retirada"
                      ? "border-[#4caf6d] bg-[#4caf6d]/10 text-[#4caf6d]"
                      : "border-[#1f2b23] text-[#8ea395] hover:border-[#2c4a37]"
                  }`}
                >
                  Retirada no local
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("entrega")}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    deliveryType === "entrega"
                      ? "border-[#4caf6d] bg-[#4caf6d]/10 text-[#4caf6d]"
                      : "border-[#1f2b23] text-[#8ea395] hover:border-[#2c4a37]"
                  }`}
                >
                  Entrega
                </button>
              </div>
            </div>

            {deliveryType === "entrega" && (
              <div className="space-y-2 rounded-lg border border-[#1f2b23] bg-[#10150f] p-3">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Endereço (rua, bairro)"
                  className="w-full rounded-lg border border-[#1f2b23] bg-[#0a0d0a] px-3 py-2 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Número"
                    className="w-full rounded-lg border border-[#1f2b23] bg-[#0a0d0a] px-3 py-2 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cep}
                    onChange={(e) => setCep(formatCEP(e.target.value))}
                    placeholder="CEP"
                    maxLength={9}
                    className="w-full rounded-lg border border-[#1f2b23] bg-[#0a0d0a] px-3 py-2 text-sm text-[#f3efe3] placeholder:text-[#5f7767] outline-none focus:border-[#4caf6d]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8ea395]">
                Forma de pagamento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                      paymentMethod === method
                        ? "border-[#4caf6d] bg-[#4caf6d]/10 text-[#4caf6d]"
                        : "border-[#1f2b23] text-[#8ea395] hover:border-[#2c4a37]"
                    }`}
                  >
                    {PAYMENT_LABELS[method]}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "pix" && (
              <div className="rounded-lg border border-[#1f2b23] bg-[#10150f] p-3">
                <p className="text-xs font-medium text-[#8ea395]">Chave Pix</p>
                <p className="mt-1 break-all font-display text-sm text-[#f3efe3]">{PIX_KEY}</p>
                <p className="mt-2 text-xs text-[#7c9c88]">
                  Ao copiar, seu pedido é enviado pro WhatsApp automaticamente — é só mandar o
                  comprovante lá pra confirmarmos.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-sm">
              <span className="text-[#8ea395]">Total</span>
              <span className="font-display text-xl text-[#f3efe3]">{formatBRL(total)}</span>
            </div>

            {paymentMethod === "pix" ? (
              <button
                type="button"
                onClick={onCopyPix}
                disabled={!canSend}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4caf6d] py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#4caf6d]"
              >
                Copiar chave Pix e enviar pedido
              </button>
            ) : (
              <button
                type="button"
                onClick={onSend}
                disabled={!canSend}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4caf6d] py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#4caf6d]"
              >
                <IconWhatsApp className="h-5 w-5" />
                Finalizar pedido no WhatsApp
              </button>
            )}
            {!canSend && (
              <p className="text-center text-xs text-[#7c9c88]">
                Preencha seu nome{deliveryType === "entrega" ? " e o endereço completo" : ""} pra continuar.
              </p>
            )}
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
      }

      @keyframes smokeDriftA {
        0% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(4%, -3%) scale(1.05);
        }
        100% {
          transform: translate(0, 0) scale(1);
        }
      }
      @keyframes smokeDriftB {
        0% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(-5%, 4%) scale(1.08);
        }
        100% {
          transform: translate(0, 0) scale(1);
        }
      }
      .smoke-drift {
        animation: smokeDriftA 14s ease-in-out infinite;
      }
      .smoke-drift-slow {
        animation: smokeDriftB 20s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .smoke-drift,
        .smoke-drift-slow {
          animation: none;
        }
      }
    `}</style>
  );
}
