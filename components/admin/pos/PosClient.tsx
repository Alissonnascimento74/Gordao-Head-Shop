"use client";

/**
 * PosClient — tela do PDV (Ponto de Venda), venda de balcão.
 * ------------------------------------------------------------------
 * Layout em 2 colunas: busca de produto à esquerda, carrinho +
 * fechamento à direita (empilha em 1 coluna no celular/tablet).
 *
 * Leitor de código de barras USB: a maioria funciona "digitando" o
 * código rapidamente e mandando um Enter no final — como se fosse um
 * teclado. Por isso o campo de busca fica sempre em foco (autoFocus +
 * reforça o foco depois de cada ação) e o Enter, quando o texto bate
 * EXATO com o id de algum produto, adiciona ele ao carrinho na hora,
 * sem precisar clicar em nada — é o mesmo fluxo de digitar e teclar
 * Enter à mão, só que automático.
 *
 * Preço final: assim como o checkout online, o preço de cada item é o
 * que veio do servidor (`products`, carregado em app/admin/(painel)/pdv/
 * page.tsx a partir do catálogo real) — o carrinho só soma o que já
 * está aqui, e o POST final (`/api/admin/pos`) recalcula tudo nas costas
 * do navegador de novo antes de gravar.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  Leaf,
  Loader2,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import type { PhysicalPaymentMethod } from "@/lib/admin/types";

export type PosProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
};

type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  /** Estoque disponível no momento em que foi adicionado — limita o "+". */
  stock: number;
};

const PAYMENT_METHODS: { value: PhysicalPaymentMethod; label: string }[] = [
  { value: "dinheiro", label: "Dinheiro" },
  { value: "pix", label: "Pix" },
  { value: "cartao_credito", label: "Cartão de Crédito" },
  { value: "cartao_debito", label: "Cartão de Débito" },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PosClient({ products: initialProducts }: { products: PosProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PhysicalPaymentMethod | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sempre volta o foco pro campo de busca depois de qualquer ação —
  // é o que faz o leitor de código de barras funcionar sem precisar
  // clicar em nada entre uma leitura e outra.
  function refocusSearch() {
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((product) => product.name.toLowerCase().includes(q) || product.id.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, products]);

  function addToCart(product: PosProduct) {
    if (product.stock <= 0) {
      setFeedback({ type: "error", message: `"${product.name}" está sem estoque.` });
      return;
    }
    setCart((prev) => {
      const existing = prev.find((line) => line.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          setFeedback({ type: "error", message: `Só tem ${product.stock} unidade(s) de "${product.name}" em estoque.` });
          return prev;
        }
        return prev.map((line) => (line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, stock: product.stock }];
    });
    setFeedback(null);
    setQuery("");
    refocusSearch();
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Leitor de código de barras: o texto digitado bate EXATO com o id
    // de um produto — adiciona direto, sem precisar de clique nenhum.
    const exactMatch = products.find((product) => product.id.toLowerCase() === q);
    if (exactMatch) {
      addToCart(exactMatch);
      return;
    }
    // Busca manual: só um resultado na lista filtrada — Enter já adiciona.
    if (matches.length === 1) {
      addToCart(matches[0]);
    }
  }

  function updateQuantity(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((line) => {
          if (line.id !== id) return line;
          const quantity = Math.min(line.stock, Math.max(0, line.quantity + delta));
          return { ...line, quantity };
        })
        .filter((line) => line.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((line) => line.id !== id));
  }

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  async function handleFinalize() {
    if (cart.length === 0 || !paymentMethod) return;
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/admin/pos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((line) => ({ id: line.id, quantity: line.quantity })),
          paymentMethod,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Não foi possível registrar a venda.");
      }

      // Reflete a baixa de estoque na lista local, sem precisar recarregar
      // a página — quem for buscar o mesmo produto de novo já vê o número certo.
      const soldQuantities = new Map(cart.map((line) => [line.id, line.quantity]));
      setProducts((prev) =>
        prev.map((product) =>
          soldQuantities.has(product.id)
            ? { ...product, stock: Math.max(0, product.stock - soldQuantities.get(product.id)!) }
            : product
        )
      );

      setFeedback({ type: "success", message: `Venda ${data.order.id} registrada — ${formatCurrency(total)}.` });
      setCart([]);
      setPaymentMethod(null);
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Não foi possível registrar a venda." });
    } finally {
      setSubmitting(false);
      refocusSearch();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">PDV — Venda no balcão</h1>
        <p className="text-sm text-slate-500">
          Busque o produto (ou leia o código de barras) e registre a venda física direto no estoque.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        {/* ---------------- Busca de produtos ---------------- */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              ref={searchInputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar produto por nome ou #id — ou ler o código de barras"
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-brand-green"
            />
          </div>

          {query.trim() && (
            <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-100">
              {matches.length === 0 && (
                <p className="px-3 py-4 text-center text-sm text-slate-400">Nenhum produto encontrado.</p>
              )}
              {matches.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    ) : (
                      <Leaf className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">{product.name}</p>
                    <p className="text-xs text-slate-400">#{product.id}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-medium text-slate-700">{formatCurrency(product.price)}</p>
                    <p className={`text-xs ${product.stock <= 0 ? "text-red-500" : "text-slate-400"}`}>
                      {product.stock <= 0 ? "Esgotado" : `${product.stock} em estoque`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <div
              className={`mt-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                feedback.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        {/* ---------------- Carrinho do PDV ---------------- */}
        <div className="lg:sticky lg:top-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShoppingCart className="h-4 w-4 text-brand-forest" />
              Carrinho do PDV
            </h2>

            {cart.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">Busque um produto pra começar a venda.</p>
            ) : (
              <ul className="space-y-3 border-b border-slate-100 pb-4">
                {cart.map((line) => (
                  <li key={line.id} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-slate-700">{line.name}</p>
                      <p className="text-xs text-slate-400">{formatCurrency(line.price)} / un.</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(line.id, -1)}
                        className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-slate-700">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.id, 1)}
                        disabled={line.quantity >= line.stock}
                        className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="w-20 shrink-0 text-right text-sm font-medium text-slate-700">
                      {formatCurrency(line.price * line.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(line.id)}
                      className="shrink-0 text-slate-300 hover:text-red-500"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-baseline justify-between py-4">
              <span className="text-sm text-slate-500">Total</span>
              <span className="text-2xl font-semibold text-slate-900">{formatCurrency(total)}</span>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Forma de pagamento</p>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      paymentMethod === method.value
                        ? "border-brand-green bg-brand-green/10 text-brand-forest"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinalize}
              disabled={submitting || cart.length === 0 || !paymentMethod}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-green py-3 text-sm font-semibold text-brand-darker transition hover:bg-brand-greenLight disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Registrando venda..." : "Finalizar Venda Física"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
