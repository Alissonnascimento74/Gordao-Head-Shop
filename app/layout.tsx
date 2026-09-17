import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gordão HeadShop",
  description:
    "Tabaco, sedas e piteiras, e acessórios. Tudo pra sua sessão ficar o mais leve possível.",
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
