/**
 * Cálculo de frete — MOCK, mas com a estrutura pronta pra virar real.
 * ------------------------------------------------------------------
 * `calculateShippingOptions(cep)` é a ÚNICA fonte de verdade do preço do
 * frete: tanto a rota de cotação (app/api/shipping/route.ts, o que o
 * cliente vê enquanto digita o CEP) quanto a rota de checkout
 * (app/api/checkout/route.ts, na hora de fechar o pedido) chamam essa
 * MESMA função. Isso importa por segurança — do mesmo jeito que o preço
 * dos produtos é sempre recalculado a partir do catálogo (nunca confiado
 * do navegador), o preço do frete escolhido também é recalculado aqui no
 * servidor antes de cobrar, em vez de confiar num número que o cliente
 * mandou de volta.
 *
 * Três etapas, cada uma comentada com o que trocar por uma integração
 * real:
 *   1) Geocoding do CEP de destino (CEP -> latitude/longitude)
 *   2) Distância entre a loja e o destino (fórmula de Haversine)
 *   3) Cotação de cada transportadora a partir dessa distância
 *
 * ⚠️ Decisão do dono do negócio: o 99 Entrega NÃO vai ganhar integração
 * de API — a operação é manual (o motoboy é chamado pelo app comum do
 * 99, depois de ver o pedido no Admin). Por isso o preço dele é um valor
 * FIXO combinado (`LOCAL_EXPRESS_FLAT_PRICE`, ver mais abaixo), não uma
 * cotação por distância como PAC/Sedex.
 */

import type { ShippingOption, ShippingQuoteResult } from "./types";

/**
 * Endereço da loja — usado como ORIGEM de todo cálculo de frete.
 * Rua Joaquim Felício, 118, Alvorada, Guarulhos/SP, CEP 07242-310.
 *
 * `lat`/`lng` são aproximados (o bairro Alvorada, em Guarulhos) — pra um
 * endereço real de verdade, geocodifique esse endereço uma vez (Google
 * Maps, ou o painel do próprio serviço de entrega) e cole o resultado
 * aqui; não precisa geocodificar a ORIGEM a cada pedido, ela nunca muda.
 */
const STORE_ORIGIN = {
  cep: "07242310",
  street: "Rua Joaquim Felício",
  number: "118",
  neighborhood: "Alvorada",
  city: "Guarulhos",
  state: "SP",
  lat: -23.4552,
  lng: -46.4694,
};

/**
 * Raio (em km) a partir da loja em que o 99 Entrega (motoboy) ainda faz
 * sentido — mock. Acima disso, mesmo estando na mesma região
 * metropolitana, a entrega expressa não é oferecida (fora do alcance
 * prático de um motoboy).
 */
const EXPRESS_MAX_DISTANCE_KM = 30;

/* ------------------------------------------------------------------ */
/* 1) Geocoding — CEP de destino -> latitude/longitude                 */
/* ------------------------------------------------------------------ */

type GeocodedAddress = {
  cep: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
};

/**
 * MOCK do geocoding. Em duas etapas, do jeito que uma integração real
 * também seria feita:
 *
 *   a) Resolve o CEP pra um endereço/cidade — isso é REAL, usa a mesma
 *      API pública ViaCEP já usada no autofill do checkout
 *      (components/checkout/CheckoutForm.tsx). ViaCEP não devolve
 *      latitude/longitude, só endereço.
 *
 *   b) Converte esse endereço em coordenadas — isso é MOCKADO aqui.
 *      Numa integração de verdade, essa etapa seria uma chamada à API de
 *      Geocoding do Google Maps:
 *
 *        const query = `${data.logradouro}, ${data.localidade} - ${data.uf}, Brasil`;
 *        const res = await fetch(
 *          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
 *        );
 *        const geo = await res.json();
 *        const { lat, lng } = geo.results[0].geometry.location;
 *
 *      Sem uma chave de API configurada, simulamos isso derivando um
 *      ponto plausível perto do centro de São Paulo a partir dos dígitos
 *      do próprio CEP — determinístico (o mesmo CEP sempre cai no mesmo
 *      lugar), só pra fins de demonstração. NÃO é uma coordenada real.
 */
async function geocodeCep(cep: string): Promise<GeocodedAddress | null> {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;

  // (a) ViaCEP — real, valida que o CEP existe e devolve cidade/estado.
  let city = "";
  let state = "";
  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    city = data.localidade;
    state = data.uf;
  } catch {
    return null;
  }

  // (b) MOCK do geocoding de verdade (ver comentário acima) — desloca a
  // partir do centro aproximado de São Paulo usando os dígitos do CEP,
  // só pra gerar coordenadas plausíveis e estáveis pro mock de distância.
  const seed = Number(digits.slice(0, 5));
  const latOffset = ((seed % 200) - 100) / 1000; // até ~11km pra cada lado
  const lngOffset = ((Math.floor(seed / 200) % 200) - 100) / 1000;
  const SAO_PAULO_CENTER = { lat: -23.5505, lng: -46.6333 };

  return {
    cep: digits,
    city,
    state,
    lat: SAO_PAULO_CENTER.lat + latOffset,
    lng: SAO_PAULO_CENTER.lng + lngOffset,
  };
}

/* ------------------------------------------------------------------ */
/* 2) Distância — fórmula de Haversine (distância em linha reta entre    */
/*    dois pontos na superfície da Terra, dado lat/lng de cada um)      */
/* ------------------------------------------------------------------ */

function haversineDistanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371; // raio médio da Terra, em km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

/**
 * Região metropolitana de São Paulo, pra fins de regra de negócio ("CEP
 * de destino pertence à mesma região metropolitana do CEP de origem?").
 * Simplificação real e conhecida: no CEP brasileiro, o primeiro dígito
 * indica a macrorregião dos Correios, e a região "0" (01000-000 a
 * 09999-999) é especificamente "Grande São Paulo" — cobre a capital e
 * toda a região metropolitana (Guarulhos, Osasco, Santo André, etc.).
 * Não é uma checagem por município exato, é uma aproximação por região —
 * suficiente pra decidir "vale a pena tentar cotar o 99 Entrega aqui?".
 */
function isInSameMetroRegion(destinationCep: string): boolean {
  return destinationCep.replace(/\D/g, "").startsWith("0");
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/* ------------------------------------------------------------------ */
/* 3) Cotação de cada transportadora                                    */
/* ------------------------------------------------------------------ */

/**
 * Correios (PAC/Sedex) — sempre disponíveis, em qualquer CEP do Brasil.
 * MOCK: preço = taxa base + valor por km. Numa integração real, isso
 * viraria uma chamada à API dos Correios ou de um agregador tipo Melhor
 * Envio, passando CEP de origem/destino e o peso/dimensões do pacote.
 */
function quoteCorreios(distanceKm: number): ShippingOption[] {
  return [
    {
      id: "pac",
      carrier: "Correios",
      label: "PAC",
      price: round2(14.9 + distanceKm * 0.09),
      estimatedDelivery: "5 a 8 dias úteis",
      isExpress: false,
    },
    {
      id: "sedex",
      carrier: "Correios",
      label: "Sedex",
      price: round2(24.9 + distanceKm * 0.16),
      estimatedDelivery: "1 a 3 dias úteis",
      isExpress: false,
    },
  ];
}

/**
 * Preço fixo do 99 Entrega pra qualquer CEP da região metropolitana da
 * loja — decisão do dono do negócio: a operação é 100% MANUAL (o dono
 * mesmo chama o motoboy pelo app convencional do 99, depois de ver o
 * pedido no Admin — ver "Botão Copiar Endereço" na tela de Pedidos), sem
 * nenhuma integração com API da 99. Não existe cobrança variável por
 * distância porque não existe cotação automática nenhuma — é só uma
 * regra de preço combinada. Se um dia isso mudar, é só editar esse
 * número (ou trazer de volta um cálculo por distância).
 */
const LOCAL_EXPRESS_FLAT_PRICE = 15;

/**
 * 99 Entrega (motoboy) — só quando o destino está na mesma região
 * metropolitana da loja E dentro de um raio prático de motoboy.
 */
function quote99Entrega(distanceKm: number): ShippingOption | null {
  if (distanceKm > EXPRESS_MAX_DISTANCE_KM) return null;

  const estimatedDelivery = distanceKm <= 10 ? "Hoje, em até 2h" : "Hoje, em até 4h";

  return {
    id: "99-entrega",
    carrier: "99 Entrega",
    label: "99 Entrega — Motoboy",
    price: LOCAL_EXPRESS_FLAT_PRICE,
    estimatedDelivery,
    isExpress: true,
  };
}

/* ------------------------------------------------------------------ */
/* Orquestração                                                        */
/* ------------------------------------------------------------------ */

export async function calculateShippingOptions(destinationCep: string): Promise<ShippingQuoteResult> {
  const destination = await geocodeCep(destinationCep);
  if (!destination) {
    return { options: [], error: "CEP não encontrado. Confira os números digitados." };
  }

  const distanceKm = haversineDistanceKm(STORE_ORIGIN, destination);

  const options: ShippingOption[] = [...quoteCorreios(distanceKm)];

  if (isInSameMetroRegion(destination.cep)) {
    const express = quote99Entrega(distanceKm);
    if (express) options.push(express);
  }

  return { options };
}
