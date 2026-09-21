// MOCK_PRODUCTS deriva do catálogo real (app/products.ts), mas editar ou
// adicionar produto aqui só muda o estado em memória do navegador
// (ProductsClient) — não grava em lugar nenhum. Recarregar a página volta
// pro catálogo original. Precisa de um banco de dados de verdade por trás
// pra persistir.
import type { Metadata } from "next";
import ProductsClient from "@/components/admin/products/ProductsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Produtos — Painel Gordão HeadShop",
};

export default function ProdutosPage() {
  return <ProductsClient initialProducts={MOCK_PRODUCTS} />;
}
