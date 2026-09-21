import type { MetadataRoute } from "next";

// Gera /sitemap.xml automaticamente. Só a home entra — é onde fica todo o
// catálogo (filtrado por categoria do lado do cliente, sem URLs próprias
// por produto ainda). Páginas do Admin, checkout e a Vitrine de
// demonstração ficam de fora de propósito (ver app/robots.ts).
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://gordao-head-shop.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
