/**
 * Cabeçalhos de segurança — aplicados em toda resposta do site.
 * ------------------------------------------------------------------
 * CSP (Content-Security-Policy) básico, ajustado pros recursos externos
 * que o site REALMENTE usa hoje — apertar demais sem checar isso quebra
 * a página sem aviso nenhum no console além de "Refused to load...":
 *   - Google Fonts (Anton/Inter): o CSS vem de fonts.googleapis.com
 *     (`style-src`) e as fontes de verdade de fonts.gstatic.com (`font-src`).
 *   - ViaCEP (autofill de endereço no checkout): fetch direto do navegador
 *     pra viacep.com.br (`connect-src`).
 *   - O SDK do Mercado Pago roda só no SERVIDOR (dentro das rotas de API)
 *     — não precisa aparecer aqui, porque CSP só controla o que o
 *     NAVEGADOR carrega, não chamadas servidor-a-servidor.
 *
 * `'unsafe-inline'` em `style-src` é necessário por causa do styled-jsx
 * (`<style jsx global>`, usado em app/page.tsx e app/checkout/page.tsx) —
 * ele injeta `<style>` sem nonce. Se um dia isso incomodar, dá pra trocar
 * esses blocos por CSS Modules e apertar o CSP.
 *
 * `frame-ancestors 'none'` faz o mesmo trabalho do `X-Frame-Options: DENY`
 * (impede o site de ser carregado dentro de um `<iframe>` de outro
 * domínio — a defesa contra Clickjacking) — os dois são mantidos juntos
 * porque nem todo navegador antigo entende `frame-ancestors`.
 *
 * `'unsafe-eval'` em `script-src` entra SÓ em desenvolvimento (`next dev`)
 * — o Hot Module Replacement do Next.js/webpack usa `eval()` pra aplicar
 * mudanças sem recarregar a página inteira, e sem essa permissão o CSP
 * bloqueia isso (testado: sem essa condição, o console mostra
 * "EvalError: ... violates ... script-src"). Em produção (`next build` +
 * `next start`, e é o que a Vercel roda) isso não é necessário — o build
 * final não usa `eval()` — por isso fica de fora, deixando o CSP mais
 * apertado exatamente onde importa (o site que o cliente final acessa).
 */
const IS_DEV = process.env.NODE_ENV !== "production";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${IS_DEV ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://viacep.com.br",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  // Clickjacking: impede o site de ser aberto dentro de um <iframe> em outro domínio.
  { key: "X-Frame-Options", value: "DENY" },
  // Impede o navegador de "adivinhar" o tipo de um arquivo diferente do
  // Content-Type declarado — evita truques tipo subir um .txt disfarçado de script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Força HTTPS por 2 anos (63072000s), inclusive em subdomínios — uma vez
  // que o navegador viu esse header, ele nem tenta HTTP de novo nesse domínio.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Bônus barato: não vaza a URL completa da sua loja quando alguém clica
  // num link que sai do site (só manda o domínio, não a página inteira).
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  // Só afeta `next dev` (não existe mais depois do build de produção). Por
  // padrão o Next.js "descarta" rotas de API que ficaram 60s sem uso e
  // recompila elas do zero na próxima chamada — o que reseta o array em
  // memória do orders-store.ts (ver seção 7 do Projeto no Obsidian). Como
  // testar o fluxo de pagamento de verdade no Mercado Pago (preencher
  // cartão, confirmar, etc.) sempre leva mais de 1 minuto, aumentamos essa
  // janela pra 30 minutos só em desenvolvimento, pra conseguir testar o
  // ciclo completo (checkout → pagamento → webhook) sem o array resetar no
  // meio do caminho.
  onDemandEntries: {
    maxInactiveAge: 30 * 60 * 1000,
  },
};

module.exports = nextConfig;
