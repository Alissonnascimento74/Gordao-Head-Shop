/**
 * checkoutCart.ts — ponte entre o carrinho da landing page e a página /checkout.
 * ------------------------------------------------------------------
 * O carrinho "de verdade" vive como estado React dentro de app/page.tsx.
 * Ele não sobrevive a uma navegação de página inteira (`router.push`),
 * então, antes de mandar o cliente pra `/checkout`, salvamos uma cópia
 * simples dos itens aqui — `sessionStorage` é por aba, some ao fechar,
 * e não precisa de nenhuma lib de estado global só pra isso.
 */

import type { CheckoutCartItem } from "@/components/checkout/CheckoutForm";

export const CHECKOUT_CART_STORAGE_KEY = "gordao-checkout-cart";

export function saveCheckoutCart(items: CheckoutCartItem[]) {
  try {
    sessionStorage.setItem(CHECKOUT_CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // sessionStorage indisponível (ex: modo privado muito restritivo) —
    // sem problema, a página de checkout só vai mostrar carrinho vazio.
  }
}

export function readCheckoutCart(): CheckoutCartItem[] {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
