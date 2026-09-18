"use client";

/**
 * /vitrine — página principal de produtos vista pelo cliente final.
 * ------------------------------------------------------------------
 * Reaproveita EXATAMENTE a mesma inteligência de categorização do Admin
 * (utils/categoryParser.ts) e o mesmo componente de abas (CategoryTabs).
 * É uma página client ("use client") porque precisa reagir ao clique nas
 * abas e no botão de carrinho na hora, sem recarregar a página.
 *
 * Nota: esta é uma vitrine de demonstração do sistema de categorias, com
 * produtos mockados (lib/storefront/mock-data.ts) — não é a landing page
 * de produção (app/page.tsx), que já tem seu próprio catálogo real e
 * fluxo de carrinho via WhatsApp.
 */

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/storefront/ProductGrid";
import { MOCK_STOREFRONT_PRODUCTS, type StorefrontProduct } from "@/lib/storefront/mock-data";
import { getAvailableCategories, parseProductCategory, type CategoryId } from "@/utils/categoryParser";

// "todos" é um valor especial só desta tela (não é uma categoria real do
// parser) que significa "mostrar produtos de qualquer categoria".
const TODOS = "todos" as const;
type CategoryFilter = CategoryId | typeof TODOS;

export default function VitrinePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(TODOS);
  const [cartCount, setCartCount] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Ao trocar de categoria, rola pro topo do grid — assim quem já tinha
  // descido a lista não fica olhando pro meio de resultados diferentes.
  function handleCategoryChange(category: CategoryFilter) {
    setActiveCategory(category);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Só recalcula a lista de abas quando o catálogo muda (nunca muda aqui,
  // já que é mockado, mas é o padrão certo pra quando vier de uma API).
  const categoryTabs = useMemo(() => {
    const available = getAvailableCategories(MOCK_STOREFRONT_PRODUCTS.map((p) => p.name));
    return [{ id: TODOS, label: "Todos" }, ...available];
  }, []);

  // Filtragem instantânea: sempre que `activeCategory` muda, o React
  // recalcula essa lista e o grid abaixo re-renderiza com os produtos
  // certos — não tem requisição de rede nem delay, é tudo local.
  const visibleProducts = useMemo(() => {
    if (activeCategory === TODOS) return MOCK_STOREFRONT_PRODUCTS;
    return MOCK_STOREFRONT_PRODUCTS.filter((product) => parseProductCategory(product.name) === activeCategory);
  }, [activeCategory]);

  function handleAddToCart(product: StorefrontProduct) {
    setCartCount((prev) => prev + 1);
    // Aqui é só um contador visual de exemplo — a lógica de carrinho de
    // verdade (com itens, quantidades e checkout) já existe na landing
    // page principal (app/page.tsx) e pode ser reaproveitada depois.
    void product;
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image src="/logo-gordao.jpg" alt="Gordão HeadShop" fill className="object-cover" />
            </div>
            <span className="font-semibold text-brand-forest">Gordão HeadShop</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-brand-forest px-4 py-2 text-sm font-medium text-brand-cream">
            <ShoppingCart className="h-4 w-4" />
            {cartCount} {cartCount === 1 ? "item" : "itens"}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Nossos produtos</h1>
          <p className="text-sm text-slate-500">Filtre por categoria pra achar mais rápido.</p>
        </div>

        <CategoryTabs categories={categoryTabs} active={activeCategory} onChange={handleCategoryChange} />

        <div ref={gridRef} className="scroll-mt-20">
          <ProductGrid products={visibleProducts} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </main>
  );
}
