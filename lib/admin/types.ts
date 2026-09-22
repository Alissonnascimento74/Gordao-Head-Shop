import type { CategoryId } from "@/utils/categoryParser";

// A categoria de um produto normalmente é CALCULADA a partir do nome
// usando utils/categoryParser.ts (a mesma lógica usada na Vitrine) — não
// existe um campo fixo pra maioria do catálogo. `categoryOverride` é a
// exceção: quando o lojista cadastra um produto novo (ou edita um
// existente) e escolhe a seção manualmente em vez de aceitar a detectada
// automaticamente, essa escolha fica guardada aqui e passa a valer no
// lugar da detecção por nome. Ver components/admin/products/ProductsClient.tsx.
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
  /** Valor de entrada (custo pago pela loja) — ausente = ainda não cadastrado.
   *  Diferente do resto deste tipo, é o único campo que persiste de verdade
   *  (Redis, ver lib/server/product-costs.ts) — os outros ainda são mock. */
  costPrice?: number;
  /** Seção escolhida manualmente no formulário — ausente = usa a categoria
   *  detectada automaticamente pelo nome (parseProductCategory). */
  categoryOverride?: CategoryId;
};

// "cancelado" cobre pagamento recusado/cancelado no Mercado Pago — sem
// esse status, um pagamento que falha não teria pra onde ir.
export type OrderStatus = "aguardando_pagamento" | "pago" | "cancelado" | "separando" | "despachado";

export type OrderItem = {
  /** Id do produto no catálogo (app/products.ts) — usado pra baixar
   *  estoque (lib/server/stock-store.ts) quando o pedido é confirmado. */
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

/** Forma de pagamento de uma venda física (PDV) — nada a ver com o
 *  Mercado Pago, que só existe pro checkout online. */
export type PhysicalPaymentMethod = "dinheiro" | "pix" | "cartao_credito" | "cartao_debito";

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
  /** "fisico" = venda de balcão lançada no PDV (ver /admin/pdv). Ausente/"online" =
   *  veio do checkout do site — é a distinção que a Dashboard usa pra separar
   *  "Vendas Online" de "Vendas Balcão" e fechar o caixa. */
  source?: "online" | "fisico";
  /** Só preenchido em vendas físicas (source: "fisico") — como o cliente pagou no balcão. */
  paymentMethodPhysical?: PhysicalPaymentMethod;
};
