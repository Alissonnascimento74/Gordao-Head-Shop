export type ProductCategory = "tabaco" | "sedas" | "acessorios";

export type AdminProduct = {
  id: string;
  name: string;
  imageUrl: string;
  category: ProductCategory;
  price: number;
  stock: number;
  soldOut: boolean;
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
