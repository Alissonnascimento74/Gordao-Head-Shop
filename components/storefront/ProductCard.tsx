"use client";

/**
 * ProductCard — card de um produto na Vitrine (imagem, nome, categoria
 * detectada, preço e botão "Adicionar ao Carrinho").
 * ------------------------------------------------------------------
 * Componente "burro" de propósito: não sabe nada sobre carrinho de
 * verdade, só avisa o pai (`onAddToCart`) quando o botão é clicado. Quem
 * decide o que fazer com isso é a página (app/vitrine/page.tsx).
 */

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { StorefrontProduct } from "@/lib/storefront/mock-data";
import { getCategoryLabel, parseProductCategory } from "@/utils/categoryParser";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type ProductCardProps = {
  product: StorefrontProduct;
  onAddToCart: (product: StorefrontProduct) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const categoryLabel = getCategoryLabel(parseProductCategory(product.name));

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square bg-slate-100">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-600 backdrop-blur">
          {categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-slate-800">{product.name}</h3>
        <p className="mt-auto text-lg font-semibold text-brand-forest">{formatCurrency(product.price)}</p>

        <button
          onClick={() => onAddToCart(product)}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-3 py-2 text-sm font-semibold text-brand-darker transition hover:bg-brand-greenLight"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
