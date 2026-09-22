/**
 * /admin/pdv — Ponto de Venda (vendas de balcão).
 * ------------------------------------------------------------------
 * Server Component: carrega o catálogo (app/products.ts) já com o
 * estoque REAL (lib/server/stock-store.ts, o mesmo Redis que o checkout
 * online e a tela de Produtos usam) e entrega pronto pro PosClient —
 * sem isso, o lojista veria estoque desatualizado ao abrir o PDV.
 */
import type { Metadata } from "next";
import { PRODUCTS } from "@/app/products";
import { getStockMap } from "@/lib/server/stock-store";
import PosClient from "@/components/admin/pos/PosClient";

export const metadata: Metadata = {
  title: "PDV — Painel Gordão HeadShop",
};

// Igual às outras páginas que leem do Redis (Pedidos, Produtos,
// Dashboard) — sem isso o Next tentaria pré-renderizar como estática e o
// estoque ficaria congelado no que existia no momento do build.
export const dynamic = "force-dynamic";

export default async function PdvPage() {
  const stockMap = await getStockMap();
  const products = PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    stock: stockMap[product.id] ?? product.stock ?? 0,
  }));

  return <PosClient products={products} />;
}
