"use client";

/**
 * ProductsClient — tela de Produtos do Admin.
 * ------------------------------------------------------------------
 * "Client" porque precisa de estado (useState) pra estoque, disponibilidade,
 * edições e filtro de categoria mudarem na tela sem precisar recarregar a
 * página. A categoria de cada produto não vem mais salva no objeto — ela é
 * calculada na hora, lendo o nome do produto com `parseProductCategory`
 * (utils/categoryParser.ts). É a mesma função usada na Vitrine
 * (app/vitrine/page.tsx), então um produto sempre cai na mesma categoria
 * nas duas telas.
 *
 * `initialProducts` vem do catálogo real (482 produtos, ver
 * lib/admin/mock-data.ts) — editar aqui só muda o estado desta página
 * (não grava no arquivo real nem na loja, ainda não existe backend).
 * EXCEÇÃO: "Valor de entrada" (CostPriceCell, mais abaixo) persiste de
 * verdade no Redis via POST /api/admin/product-costs.
 */

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Leaf, Minus, Pencil, Plus, PlusCircle, Search } from "lucide-react";
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

/**
 * Célula editável do "Valor de entrada" — salva no Redis (via
 * onSave, que chama POST /api/admin/product-costs) assim que o campo
 * perde foco, sem precisar de um botão "salvar" separado. Mostra um
 * feedback rápido de "Salvo" ou "Erro ao salvar", parecido com o botão
 * "Copiado!" da tela de Pedidos.
 */
function CostPriceCell({
  productId,
  price,
  costPrice,
  onSave,
}: {
  productId: string;
  price: number;
  costPrice?: number;
  onSave: (productId: string, costPrice: number) => Promise<void>;
}) {
  const [value, setValue] = useState(costPrice !== undefined ? String(costPrice) : "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleBlur() {
    const parsed = Number(value);
    if (value.trim() === "" || !Number.isFinite(parsed) || parsed < 0) {
      setStatus("idle");
      return;
    }
    setStatus("saving");
    try {
      await onSave(productId, parsed);
      setStatus("saved");
      setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 2000);
    } catch {
      setStatus("error");
    }
  }

  const margin = costPrice !== undefined ? price - costPrice : null;

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          R$
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          placeholder="0,00"
          className="w-24 rounded-md border border-slate-200 py-1 pl-7 pr-2 text-xs outline-none focus:border-brand-green"
        />
      </div>
      {status === "saving" && <p className="mt-0.5 text-[11px] text-slate-400">Salvando...</p>}
      {status === "saved" && <p className="mt-0.5 text-[11px] text-emerald-600">Salvo</p>}
      {status === "error" && <p className="mt-0.5 text-[11px] text-red-600">Erro ao salvar</p>}
      {status === "idle" && margin !== null && (
        <p className={`mt-0.5 text-[11px] ${margin >= 0 ? "text-slate-400" : "text-red-500"}`}>
          Margem: {formatCurrency(margin)}
        </p>
      )}
    </div>
  );
}

export default function ProductsClient({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  // Produto sendo editado no momento (null = modal está no modo "adicionar").
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(TODOS);
  const [search, setSearch] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);

  // Ao trocar de categoria, rola pro topo da tabela — assim quem já tinha
  // descido a lista não fica olhando pro meio de resultados diferentes.
  function handleCategoryChange(category: CategoryFilter) {
    setActiveCategory(category);
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

  function openAddModal() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function openEditModal(product: AdminProduct) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  /**
   * Salva o produto do formulário — serve tanto pra "Adicionar" quanto pra
   * "Editar": se já existe um produto com esse id na lista, substitui
   * (edição); senão, adiciona no topo (produto novo). O próprio
   * ProductFormModal decide se reaproveita o id (editando) ou gera um novo.
   */
  function handleSaveProduct(product: AdminProduct) {
    setProducts((prev) => {
      const alreadyExists = prev.some((p) => p.id === product.id);
      if (alreadyExists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [product, ...prev];
    });
  }

  /**
   * Salva o valor de entrada de um produto — chamada pelo CostPriceCell
   * ao perder o foco. Grava no Redis (persiste de verdade) e só depois
   * atualiza o estado local, pra a "Margem" mostrada na tela refletir o
   * que realmente foi salvo.
   */
  async function handleSaveCostPrice(productId: string, costPrice: number) {
    const response = await fetch("/api/admin/product-costs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, costPrice }),
    });
    if (!response.ok) throw new Error("Falha ao salvar o valor de entrada.");
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, costPrice } : p)));
  }

  // Recalcula as abas disponíveis (e a lista filtrada) só quando `products`,
  // `activeCategory` ou `search` mudam — evita refazer esse trabalho em
  // toda renderização.
  const categoryTabs = useMemo(() => {
    const available = getAvailableCategories(products.map((p) => p.name));
    return [{ id: TODOS, label: "Todos" }, ...available];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === TODOS || parseProductCategory(product.name) === activeCategory;
      const matchesSearch =
        !query || product.name.toLowerCase().includes(query) || product.id.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">
            Catálogo, estoque e disponibilidade — {products.length} produtos no total.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-darker hover:bg-brand-greenLight"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar novo produto
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs categories={categoryTabs} active={activeCategory} onChange={handleCategoryChange} />
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produto ou #id..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </div>

      <div ref={tableRef} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm scroll-mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="px-5 py-3 font-medium">Produto</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium">Preço</th>
                <th className="px-5 py-3 font-medium">Valor de entrada</th>
                <th className="px-5 py-3 font-medium">Estoque</th>
                <th className="px-5 py-3 font-medium">Disponibilidade</th>
                <th className="px-5 py-3 font-medium">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleProducts.map((product) => (
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
                      <div>
                        <p className="font-medium text-slate-700">{product.name}</p>
                        <p className="text-xs text-slate-400">#{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{getCategoryLabel(parseProductCategory(product.name))}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-3">
                    <CostPriceCell
                      productId={product.id}
                      price={product.price}
                      costPrice={product.costPrice}
                      onSave={handleSaveCostPrice}
                    />
                  </td>
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
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand-green hover:text-brand-forest"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">
                    {search.trim() ? "Nenhum produto encontrado pra essa busca." : "Nenhum produto nessa categoria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        open={modalOpen}
        editingProduct={editingProduct}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
