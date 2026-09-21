// Só uma ferramenta de admin com dados mockados — mudar destaque/selo aqui
// não afeta FEATURED_PRODUCTS (app/page.tsx), que é quem decide de verdade
// o que aparece em destaque na loja. Precisa ligar essa tela a um banco de
// dados que a landing page leia pra virar realidade.
import type { Metadata } from "next";
import PromotionsClient from "@/components/admin/promotions/PromotionsClient";
import { MOCK_PRODUCTS } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Promoções — Painel Gordão HeadShop",
};

export default function PromocoesPage() {
  return <PromotionsClient initialProducts={MOCK_PRODUCTS} />;
}
