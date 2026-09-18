"use client";

/**
 * PromotionsClient — tela "Promoções e Destaque" do Admin.
 * ------------------------------------------------------------------
 * Controla quais produtos aparecem na seção de destaque no TOPO da tela
 * inicial da loja (a vitrine com fotos grandes, hoje fixa no código como
 * `FEATURED_PRODUCTS` em app/page.tsx) e permite colocar um selo de
 * promoção (ex.: "10% OFF") em qualquer produto.
 *
 * Como está tudo mockado (sem backend ainda), essa tela guarda seu
 * próprio estado, separado do estado da tela de Produtos — os dois
 * partem da mesma lista inicial (MOCK_PRODUCTS), mas cada tela tem sua
 * cópia em memória. Quando plugar uma API/banco de dados real, as duas
 * telas passam a ler e escrever no mesmo lugar, e essa separação some
 * sozinha.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { Leaf, Sparkles, Star, X } from "lucide-react";
import type { AdminProduct } from "@/lib/admin/types";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PromotionsClient({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);

  // Lista só dos produtos marcados como destaque — é exatamente o que
  // vai aparecer na seção de fotos grandes da tela inicial da loja.
  const featuredProducts = useMemo(() => products.filter((product) => product.featured), [products]);

  /** Liga/desliga o destaque de um produto (aparecer ou não no topo da home). */
  function toggleFeatured(id: string) {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, featured: !product.featured } : product))
    );
  }

  /**
   * Define o texto do selo de promoção de um produto (ex.: "15% OFF").
   * Uma string vazia é tratada como "sem promoção" (remove o selo).
   */
  function setPromoLabel(id: string, label: string) {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, promoLabel: label || undefined } : product))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Promoções e destaque</h1>
        <p className="text-sm text-slate-500">
          Escolha quais produtos aparecem em destaque na tela inicial da loja e adicione selos de promoção.
        </p>
      </div>

      {/* Pré-visualização: simula a seção de destaque do topo da home. */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Sparkles className="h-4 w-4 text-brand-green" />
          Pré-visualização — destaque da tela inicial
        </h2>

        {featuredProducts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">
            Nenhum produto em destaque. Marque um produto abaixo com a estrela para ele aparecer aqui.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-xl border border-slate-200">
                <div className="relative flex aspect-square items-center justify-center bg-slate-100">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  ) : (
                    <Leaf className="h-8 w-8 text-slate-300" />
                  )}
                  {product.promoLabel && (
                    <span className="absolute left-2 top-2 rounded-full bg-brand-green px-2 py-0.5 text-[11px] font-semibold text-brand-darker">
                      {product.promoLabel}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-slate-700">{product.name}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lista completa de produtos com os controles de destaque e promoção. */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="px-5 py-3 font-medium">Produto</th>
                <th className="px-5 py-3 font-medium">Preço</th>
                <th className="px-5 py-3 font-medium">Destaque na home</th>
                <th className="px-5 py-3 font-medium">Selo de promoção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        ) : (
                          <Leaf className="h-4 w-4 text-slate-300" />
                        )}
                      </div>
                      <p className="font-medium text-slate-700">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        product.featured
                          ? "bg-brand-green text-brand-darker"
                          : "border border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <Star className="h-3.5 w-3.5" fill={product.featured ? "currentColor" : "none"} />
                      {product.featured ? "Em destaque" : "Destacar"}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        value={product.promoLabel ?? ""}
                        onChange={(e) => setPromoLabel(product.id, e.target.value)}
                        placeholder="Ex.: 10% OFF"
                        className="w-36 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs outline-none focus:border-brand-green"
                      />
                      {product.promoLabel && (
                        <button
                          onClick={() => setPromoLabel(product.id, "")}
                          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          aria-label="Remover selo de promoção"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
