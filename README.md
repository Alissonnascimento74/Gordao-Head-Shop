# Gordão HeadShop

Landing page / vitrine em Next.js + Tailwind CSS para o Gordão HeadShop.

## Estrutura

- `app/page.tsx` — componente único da landing page (header, categorias, hero, vitrine de produtos, carrinho).
- `public/logo-gordao.jpg` — logotipo usado no header, hero e rodapé.

## Antes de rodar

1. Instale as dependências do seu projeto Next.js normalmente (`next`, `react`, `react-dom`, `tailwindcss`).
2. Abra `app/page.tsx` e troque a constante `WHATSAPP_NUMBER` pelo número real (só dígitos, com DDI 55).
3. Ajuste o array `PRODUCTS` com o catálogo real (nome, preço, categoria, descrição).

## Funcionalidade do carrinho

O carrinho monta uma mensagem formatada com os itens, quantidades, total, nome do cliente,
forma de recebimento (retirada ou entrega — com endereço/CEP/número quando aplicável) e forma
de pagamento, e abre direto no WhatsApp (`wa.me`) pronta para envio.

## Painel admin (`/admin`)

Painel de controle com dados mockados, pra visualizar o layout antes de plugar API/banco reais.

- **Login:** `/admin/login`, usuário e senha padrão em `lib/admin/auth-config.ts` (`Gordãoheadshop` /
  `gordaoheadshop`), sobrescrevíveis via `ADMIN_USERNAME` / `ADMIN_PASSWORD` no `.env.local`.
  Sessão via cookie httpOnly (`middleware.ts` protege as rotas `/admin/*`) — **é mock**: sem hash de
  senha, sem usuários no banco. Antes de ir pra produção, troque `validateCredentials` por uma
  autenticação real e o token fixo da sessão por um JWT assinado (comentários no próprio arquivo
  explicam o que trocar).
- **Dashboard, Produtos e Pedidos:** dados de exemplo em `lib/admin/mock-data.ts`. Troque os pontos
  onde esses arrays são importados por chamadas à sua API quando integrar de verdade.
- **Estrutura:** `app/admin/` (rotas), `components/admin/` (Sidebar, Header, tabelas, modais),
  `lib/admin/` (tipos, dados mockados, configuração de auth).
