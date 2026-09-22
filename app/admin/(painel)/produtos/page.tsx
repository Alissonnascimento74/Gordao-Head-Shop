// MOCK_PRODUCTS deriva do catálogo real (app/products.ts), mas editar
// nome/preço/foto/disponibilidade aqui só muda o estado em memória do
// navegador (ProductsClient) — não grava em lugar nenhum. Recarregar a
// página volta pro catálogo original. Precisa de um banco de dados de
// verdade por trás pra persistir esses campos de vez.
//
// DUAS exceções que já persistem de verdade (Redis): "valor de entrada"
// (lib/server/product-costs.ts) e "estoque" (lib/server/stock-store.ts,
// o mesmo estoque que o PDV e o checkout online usam — ver seção 26 do
// Obsidian / commit do módulo PDV).
import type { Metadata } from "next";
import ProductsClient from "@/components/admin/products/ProductsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";
import { getProductCosts } from "@/lib/server/product-costs";
import { getStockMap } from "@/lib/server/stock-store";

export const metadata: Metadata = {
  title: "Produtos — Painel Gordão HeadShop",
};

// Igual a app/admin/(painel)/pedidos/page.tsx — sem isso, o Next tentaria
// pré-renderizar essa página como estática e os custos/estoque ficariam
// "congelados" no que existia no momento do build.
export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  const [costs, stockMap] = await Promise.all([getProductCosts(), getStockMap()]);
  const products = MOCK_PRODUCTS.map((product) => {
    const stock = stockMap[product.id] ?? product.stock;
    return {
      ...product,
      costPrice: costs[product.id],
      stock,
      soldOut: stock <= 0,
    };
  });

  return <ProductsClient initialProducts={products} />;
}
