import type { Metadata } from "next";
import "./globals.css";

// SITE_URL também é usado pelo checkout (app/api/checkout/route.ts) — se
// mudar aqui, mude lá também. Sem isso definido, o Google não consegue
// montar URLs absolutas corretas pro preview de compartilhamento (Open
// Graph) nem pro sitemap (ver app/sitemap.ts).
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://gordao-head-shop.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Sem `template`: toda página do site (Admin incluso) já escreve o
  // próprio título por extenso (ex.: "Pedidos — Painel Gordão HeadShop"),
  // então um template tipo "%s | Gordão HeadShop" só duplicaria o nome da
  // loja no final de cada aba. `default` cobre só a home, que não define
  // título próprio.
  title: "Gordão HeadShop — Tabacaria e Headshop",
  description:
    "Tabaco, sedas e piteiras, e acessórios. Tudo pra sua sessão ficar o mais leve possível.",
  keywords: [
    "headshop",
    "tabacaria",
    "sedas",
    "piteiras",
    "dichavador",
    "bong",
    "acessórios para tabaco",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Gordão HeadShop",
    title: "Gordão HeadShop — Tabacaria e Headshop",
    description:
      "Tabaco, sedas e piteiras, e acessórios. Tudo pra sua sessão ficar o mais leve possível.",
    images: ["/logo-gordao.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
