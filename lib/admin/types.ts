// A categoria de um produto não é mais um campo fixo aqui — ela é
// calculada a partir do nome usando utils/categoryParser.ts (a mesma
// lógica usada na Vitrine). Ver components/admin/products/ProductsClient.tsx.
export type AdminProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  soldOut: boolean;
  /** true = aparece na seção de destaque da tela inicial (ver /admin/promocoes). */
  featured?: boolean;
  /** Selo de promoção mostrado sobre o produto, ex.: "10% OFF". Ausente = sem promoção. */
  promoLabel?: string;
};

export type OrderStatus = "aguardando_pagamento" | "pago" | "separando" | "despachado";

export type OrderItem = {
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  trackingCode?: string;
};
