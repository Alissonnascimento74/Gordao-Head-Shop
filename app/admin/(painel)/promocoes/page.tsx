import type { Metadata } from "next";
import PromotionsClient from "@/components/admin/promotions/PromotionsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Promoções — Painel Gordão HeadShop",
};

export default function PromocoesPage() {
  return <PromotionsClient initialProducts={MOCK_PRODUCTS} />;
}
