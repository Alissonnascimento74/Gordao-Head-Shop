// Carrega do Redis os dados editáveis e combina com o catálogo base e o
// estoque transacional compartilhado com checkout e PDV.
import type { Metadata } from "next";
import ProductsClient from "@/components/admin/products/ProductsClient";
import { getProducts } from "@/lib/server/products-store";
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
  const [catalog, costs, stockMap] = await Promise.all([getProducts(), getProductCosts(), getStockMap()]);
  const products = catalog.map((product) => {
    const stock = stockMap[product.id] ?? product.stock;
    return {
      ...product,
      costPrice: costs[product.id],
      stock,
      soldOut: product.active === false || stock <= 0,
    };
  });

  return <ProductsClient initialProducts={products} />;
}
