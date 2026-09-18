"use client";

/**
 * ProductGrid — grid responsivo de ProductCard.
 * ------------------------------------------------------------------
 * Só organiza o layout (quantas colunas em cada tamanho de tela); quem
 * decide QUAIS produtos aparecem aqui é a página, filtrando a lista antes
 * de passar pra este componente via prop `products`.
 */

import type { StorefrontProduct } from "@/lib/storefront/mock-data";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: StorefrontProduct[];
  onAddToCart: (product: StorefrontProduct) => void;
};

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-400">
        Nenhum produto encontrado nessa categoria.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
