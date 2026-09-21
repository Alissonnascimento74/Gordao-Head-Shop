/**
 * Tipos do cálculo de frete — compartilhados entre a rota de cotação
 * (app/api/shipping/route.ts), o componente de UI
 * (components/checkout/ShippingCalculator.tsx) e a revalidação no
 * servidor durante o checkout (app/api/checkout/route.ts).
 */

/** Uma opção de frete cotada (PAC, Sedex ou 99 Entrega). */
export type ShippingOption = {
  /** Id estável — é isso que o front manda de volta no checkout pra dizer qual foi escolhida. */
  id: string;
  carrier: "Correios" | "99 Entrega";
  /** Nome mostrado pro cliente, ex.: "PAC", "Sedex", "99 Entrega — Motoboy". */
  label: string;
  price: number;
  /** Texto livre de prazo, ex.: "5 a 8 dias úteis" ou "Hoje, em até 2h". */
  estimatedDelivery: string;
  /** true = frete expresso local (99 Entrega) — usado pra destacar o badge no front. */
  isExpress: boolean;
};

export type ShippingQuoteRequest = {
  cep: string;
};

export type ShippingQuoteResult = {
  options: ShippingOption[];
  /** Preenchido só quando o CEP não pôde ser resolvido — options fica vazio nesse caso. */
  error?: string;
};
