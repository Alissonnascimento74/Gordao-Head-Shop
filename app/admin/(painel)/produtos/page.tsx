import type { Metadata } from "next";
import ProductsClient from "@/components/admin/products/ProductsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Produtos — Painel Gordão HeadShop",
};

export default function ProdutosPage() {
  return <ProductsClient initialProducts={MOCK_PRODUCTS} />;
}
