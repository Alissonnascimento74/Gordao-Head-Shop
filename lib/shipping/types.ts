/**
 * Tipos do cálculo de frete — compartilhados entre a rota de cotação
 * (app/api/shipping/route.ts), o componente de UI
 * (components/checkout/ShippingCalculator.tsx) e a revalidação no
 * servidor durante o checkout (app/api/checkout/route.ts).
 */

/** Uma opção de frete cotada (PAC, Sedex, 99 Entrega ou Retirada na loja). */
export type ShippingOption = {
  /** Id estável — é isso que o front manda de volta no checkout pra dizer qual foi escolhida. */
  id: string;
  carrier: "Correios" | "99 Entrega" | "Retirada";
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

/**
 * Endereço mostrado pro cliente quando ele escolhe retirar na loja —
 * mesmo endereço físico usado como origem do cálculo de frete
 * (lib/shipping/calculate.ts), só que como texto pronto pra exibir.
 */
export const STORE_PICKUP_ADDRESS = "Rua Joaquim Felício, 118, Alvorada, Guarulhos/SP, CEP 07242-310";

/**
 * "Retirar na loja" — a única opção de frete que NÃO depende do CEP do
 * cliente (não precisa de endereço nenhum: quem escolhe isso vai buscar
 * pessoalmente). Por isso não faz parte de `calculateShippingOptions`
 * (que só existe pra cotar transportadoras a partir de uma distância) —
 * é uma constante fixa, usada tanto no componente de checkout
 * (sempre disponível, mesmo sem CEP) quanto na validação do servidor
 * (app/api/checkout/route.ts reconhece esse id e pula a exigência de
 * endereço).
 */
export const PICKUP_OPTION: ShippingOption = {
  id: "retirar",
  carrier: "Retirada",
  label: "Retirar na loja",
  price: 0,
  estimatedDelivery: "Combine o horário pelo WhatsApp antes de ir buscar",
  isExpress: false,
};
