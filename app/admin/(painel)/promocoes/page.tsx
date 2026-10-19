import type { Metadata } from "next";
import PromotionsClient from "@/components/admin/promotions/PromotionsClient";
import { getProducts } from "@/lib/server/products-store";

export const metadata: Metadata = {
  title: "Promoções — Painel Gordão HeadShop",
};

export const dynamic = "force-dynamic";

export default async function PromocoesPage() {
  const products = await getProducts();
  return <PromotionsClient initialProducts={products} />;
}
