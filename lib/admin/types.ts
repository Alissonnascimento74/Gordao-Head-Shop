// A categoria de um produto não é mais um campo fixo aqui — ela é
// calculada a partir do nome usando utils/categoryParser.ts (a mesma
// lógica usada na Vitrine). Ver components/admin/products/ProductsClient.tsx.
export type AdminProduct = {
  id: string;
  name: string;
  /** Ausente = produto sem foto cadastrada (cai num ícone de placeholder). */
  imageUrl?: string;
  price: number;
  stock: number;
  soldOut: boolean;
  /** true = aparece na seção de destaque da tela inicial (ver /admin/promocoes). */
  featured?: boolean;
  /** Selo de promoção mostrado sobre o produto, ex.: "10% OFF". Ausente = sem promoção. */
  promoLabel?: string;
};

// "cancelado" cobre pagamento recusado/cancelado no Mercado Pago — sem
// esse status, um pagamento que falha não teria pra onde ir.
export type OrderStatus = "aguardando_pagamento" | "pago" | "cancelado" | "separando" | "despachado";

export type OrderItem = {
  productName: string;
  quantity: number;
  unitPrice: number;
};

/** Endereço de entrega completo, coletado no checkout (ver components/checkout/CheckoutForm.tsx). */
export type ShippingAddress = {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
};

/** Frete escolhido no checkout — resumo do que app/api/checkout/route.ts
 *  recalculou e validou (ver lib/shipping/calculate.ts). Guardado no
 *  pedido pra quem for despachar saber se é Correios ou motoboy. */
export type OrderShippingMethod = {
  carrier: string;
  label: string;
  price: number;
  isExpress: boolean;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  /** Opcionais porque os pedidos de exemplo (lib/admin/mock-data.ts) não têm esses dados —
   *  só os pedidos criados pelo checkout novo (app/api/checkout/route.ts) preenchem tudo. */
  customerEmail?: string;
  customerCPF?: string;
  shippingAddress?: ShippingAddress;
  shippingMethod?: OrderShippingMethod;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  trackingCode?: string;
  /** Id da Preference criada no Mercado Pago — usado pra conferir/depurar no painel deles. */
  mpPreferenceId?: string;
  /** Id do pagamento aprovado, preenchido pelo webhook quando o MP confirma. */
  mpPaymentId?: string;
};
