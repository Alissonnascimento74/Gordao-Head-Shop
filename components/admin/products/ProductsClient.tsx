"use client";

/**
 * ProductsClient — tela de Produtos do Admin.
 * ------------------------------------------------------------------
 * "Client" porque precisa de estado (useState) pra estoque, disponibilidade
 * e filtro de categoria mudarem na tela sem precisar recarregar a página.
 * A categoria de cada produto não vem mais salva no objeto — ela é
 * calculada na hora, lendo o nome do produto com `parseProductCategory`
 * (utils/categoryParser.ts). É a mesma função usada na Vitrine
 * (app/vitrine/page.tsx), então um produto sempre cai na mesma categoria
 * nas duas telas.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, PlusCircle } from "lucide-react";
import type { AdminProduct } from "@/lib/admin/types";
import { getAvailableCategories, getCategoryLabel, parseProductCategory, type CategoryId } from "@/utils/categoryParser";
import CategoryTabs from "@/components/CategoryTabs";
import ProductFormModal from "./ProductFormModal";

// "todos" não é uma categoria de verdade — é um valor especial só desta
// tela, que significa "não filtrar por categoria nenhuma".
const TODOS = "todos" as const;
type CategoryFilter = CategoryId | typeof TODOS;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductsClient({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(TODOS);

  /**
   * Aumenta ou diminui o estoque de um produto em `delta` unidades
   * (delta = -1 no botão "-", +1 no botão "+"). Nunca deixa o estoque
   * ficar negativo, e marca como esgotado automaticamente ao chegar a 0.
   */
  function adjustStock(id: string, delta: number) {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;
        const stock = Math.max(0, product.stock + delta);
        return { ...product, stock, soldOut: stock === 0 ? true : product.soldOut };
      })
    );
  }

  /** Alterna manualmente entre "Disponível" e "Esgotado" pra um produto. */
  function toggleSoldOut(id: string) {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, soldOut: !product.soldOut } : product))
    );
  }

  /** Adiciona um produto novo no topo da lista (vindo do modal de cadastro). */
  function handleAddProduct(product: AdminProduct) {
    setProducts((prev) => [product, ...prev]);
  }

  // Recalcula as abas disponíveis (e a lista filtrada) só quando `products`
  // ou `activeCategory` mudam — evita refazer esse trabalho em toda
  // renderização.
  const categoryTabs = useMemo(() => {
    const available = getAvailableCategories(products.map((p) => p.name));
    return [{ id: TODOS, label: "Todos" }, ...available];
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === TODOS) return products;
    return products.filter((product) => parseProductCategory(product.name) === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">Catálogo, estoque e disponibilidade.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar novo produto
        </button>
      </div>

      <CategoryTabs categories={categoryTabs} active={activeCategory} onChange={setActiveCategory} />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="px-5 py-3 font-medium">Produto</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium">Preço</th>
                <th className="px-5 py-3 font-medium">Estoque</th>
                <th className="px-5 py-3 font-medium">Disponibilidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{product.name}</p>
                        <p className="text-xs text-slate-400">#{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{getCategoryLabel(parseProductCategory(product.name))}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustStock(product.id, -1)}
                        className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                        disabled={product.stock === 0}
                        aria-label="Reduzir estoque"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center font-medium text-slate-700">{product.stock}</span>
                      <button
                        onClick={() => adjustStock(product.id, 1)}
                        className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100"
                        aria-label="Adicionar estoque"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleSoldOut(product.id)}
                      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition ${
                        product.soldOut ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${product.soldOut ? "bg-red-500" : "bg-emerald-500"}`} />
                      {product.soldOut ? "Esgotado" : "Disponível"}
                    </button>
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-400">
                    Nenhum produto nessa categoria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddProduct} />
    </div>
  );
}
