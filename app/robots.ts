import type { MetadataRoute } from "next";

// Gera /robots.txt automaticamente (convenção de arquivo do Next.js App
// Router — não precisa de um public/robots.txt escrito à mão). Bloqueia o
// Painel Admin, o checkout e as rotas de API de aparecer no Google: são
// páginas transacionais/privadas, não conteúdo de loja que vale indexar.
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://gordao-head-shop.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/checkout", "/pedido-confirmado"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
