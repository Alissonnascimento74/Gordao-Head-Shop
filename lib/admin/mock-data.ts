/**
 * Dados mockados do painel admin. Quando plugar a API/banco de dados real,
 * troque os pontos onde esses arrays são importados (dashboard, produtos e
 * pedidos) por chamadas fetch/Server Actions — os tipos em ./types já
 * descrevem o formato esperado.
 */

import type { AdminProduct, Order } from "./types";

export const MOCK_PRODUCTS: AdminProduct[] = [
  {
    id: "000103",
    name: "Alça puff",
    imageUrl: "/products/vault77-bag.jpg",
    price: 50.0,
    stock: 3,
    soldOut: false,
  },
  {
    id: "000246-1",
    name: "Haste de limpeza",
    imageUrl: "/products/vault77-bag.jpg",
    price: 5.0,
    stock: 37,
    soldOut: false,
  },
  {
    id: "000298-1",
    name: "Bag Vault pequena",
    imageUrl: "/products/vault77-bag.jpg",
    price: 110.0,
    stock: 2,
    soldOut: false,
    featured: true,
    promoLabel: "Últimas unidades",
  },
  {
    id: "000046-1",
    name: "Bandeja Narcos",
    imageUrl: "/products/bandeja-narcos.jpg",
    price: 65.0,
    stock: 0,
    soldOut: true,
  },
  {
    id: "000075",
    name: "Case Rick and Morty",
    imageUrl: "/products/rick-and-morty-tray.jpg",
    price: 80.0,
    stock: 5,
    soldOut: false,
    featured: true,
    promoLabel: "Mais vendido",
  },
  {
    id: "000512",
    name: "Seda King Size Extra",
    imageUrl: "/products/vault77-bag.jpg",
    price: 12.0,
    stock: 48,
    soldOut: false,
  },
  {
    id: "000601",
    name: "Piteira de vidro",
    imageUrl: "/products/vault77-bag.jpg",
    price: 18.0,
    stock: 4,
    soldOut: false,
  },
  {
    id: "000730",
    name: "Tabaco premiado 50g",
    imageUrl: "/products/bandeja-narcos.jpg",
    price: 32.0,
    stock: 1,
    soldOut: false,
    featured: true,
    promoLabel: "10% OFF",
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "PED-1042",
    customerName: "Rafael Souza",
    customerPhone: "5511988887777",
    items: [
      { productName: "Bag Vault pequena", quantity: 1, unitPrice: 110.0 },
      { productName: "Seda King Size Extra", quantity: 2, unitPrice: 12.0 },
    ],
    total: 134.0,
    status: "aguardando_pagamento",
    createdAt: "2026-09-17T14:32:00-03:00",
  },
  {
    id: "PED-1041",
    customerName: "Camila Andrade",
    customerPhone: "5511977776666",
    items: [{ productName: "Case Rick and Morty", quantity: 1, unitPrice: 80.0 }],
    total: 80.0,
    status: "pago",
    createdAt: "2026-09-17T11:05:00-03:00",
  },
  {
    id: "PED-1040",
    customerName: "Bruno Lima",
    customerPhone: "5511966665555",
    items: [
      { productName: "Tabaco premiado 50g", quantity: 1, unitPrice: 32.0 },
      { productName: "Piteira de vidro", quantity: 1, unitPrice: 18.0 },
    ],
    total: 50.0,
    status: "separando",
    createdAt: "2026-09-16T19:47:00-03:00",
  },
  {
    id: "PED-1039",
    customerName: "Larissa Mendes",
    customerPhone: "5511955554444",
    items: [{ productName: "Alça puff", quantity: 1, unitPrice: 50.0 }],
    total: 50.0,
    status: "despachado",
    createdAt: "2026-09-15T09:12:00-03:00",
    trackingCode: "BR123456789BR",
  },
  {
    id: "PED-1038",
    customerName: "Diego Ferreira",
    customerPhone: "5511944443333",
    items: [{ productName: "Haste de limpeza", quantity: 3, unitPrice: 5.0 }],
    total: 15.0,
    status: "pago",
    createdAt: "2026-09-15T08:03:00-03:00",
  },
  {
    id: "PED-1037",
    customerName: "Juliana Prado",
    customerPhone: "5511933332222",
    items: [{ productName: "Bandeja Narcos", quantity: 1, unitPrice: 65.0 }],
    total: 65.0,
    status: "despachado",
    createdAt: "2026-09-14T17:20:00-03:00",
    trackingCode: "BR987654321BR",
  },
];
