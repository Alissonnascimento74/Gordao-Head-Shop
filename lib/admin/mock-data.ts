/**
 * Dados mockados do painel admin. Quando plugar a API/banco de dados real,
 * troque os pontos onde esses arrays são importados (dashboard, produtos e
 * pedidos) por chamadas fetch/Server Actions — os tipos em ./types já
 * descrevem o formato esperado.
 */

import { PRODUCTS as REAL_PRODUCTS } from "@/app/products";
import type { AdminProduct, Order } from "./types";

// Produtos em destaque/promoção de exemplo (ver /admin/promocoes) — só pra
// não abrir a tela vazia na primeira vez. Qualquer produto pode ser
// marcado/desmarcado depois, direto na tela.
const SEED_FEATURED: Record<string, string> = {
  "000298-1": "Últimas unidades", // Bag Vault pequena
  "000075": "Mais vendido", // Case Rick and Morty
  "000730": "10% OFF", // Tabaco premiado 50g
};

// O Admin gerencia o MESMO catálogo de 482 produtos da loja de verdade
// (app/products.ts, já com as fotos reais importadas do Nex) — antes disso
// existia uma lista separada com só 8 itens de exemplo, por isso nem todo
// produto aparecia aqui. Continua tudo em memória (useState nas telas),
// então editar aqui não muda o arquivo real nem a loja — é só pra você
// visualizar/testar o painel com o catálogo completo.
export const MOCK_PRODUCTS: AdminProduct[] = REAL_PRODUCTS.map((product) => {
  const stock = product.stock ?? 0;
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    stock,
    soldOut: stock <= 0,
    featured: product.id in SEED_FEATURED,
    promoLabel: SEED_FEATURED[product.id],
  };
});

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
