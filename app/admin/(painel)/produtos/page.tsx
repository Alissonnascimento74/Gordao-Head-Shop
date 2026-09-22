// MOCK_PRODUCTS deriva do catálogo real (app/products.ts), mas editar ou
// adicionar produto aqui só muda o estado em memória do navegador
// (ProductsClient) — não grava em lugar nenhum. Recarregar a página volta
// pro catálogo original. Precisa de um banco de dados de verdade por trás
// pra persistir. A ÚNICA exceção é o "valor de entrada" (custo) — esse
// campo vem do Redis (lib/server/product-costs.ts), então sobrevive a
// recarregamento/deploy mesmo com o resto do produto ainda mockado.
import type { Metadata } from "next";
import ProductsClient from "@/components/admin/products/ProductsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";
import { getProductCosts } from "@/lib/server/product-costs";

export const metadata: Metadata = {
  title: "Produtos — Painel Gordão HeadShop",
};

// Igual a app/admin/(painel)/pedidos/page.tsx — sem isso, o Next tentaria
// pré-renderizar essa página como estática e os custos ficariam
// "congelados" no que existia no momento do build.
export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  const costs = await getProductCosts();
  const products = MOCK_PRODUCTS.map((product) => ({
    ...product,
    costPrice: costs[product.id],
  }));

  return <ProductsClient initialProducts={products} />;
}
