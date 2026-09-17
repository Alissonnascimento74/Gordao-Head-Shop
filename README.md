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
