# Gordão HeadShop

Landing page / vitrine em Next.js + Tailwind CSS para o Gordão HeadShop.

## Estrutura

- `app/page.tsx` — componente único da landing page (header, categorias, hero, vitrine de produtos, carrinho).
- `public/logo-gordao.jpg` — logotipo usado no header, hero e rodapé.


## Funcionalidade do carrinho

O carrinho monta uma mensagem formatada com os itens, quantidades, total, nome do cliente,
forma de recebimento (retirada ou entrega — com endereço/CEP/número quando aplicável) e forma
de pagamento, e abre direto no WhatsApp (`wa.me`) pronta para envio.
