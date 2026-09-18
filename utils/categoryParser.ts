/**
 * categoryParser.ts — Inteligência de categorização de produtos
 * ------------------------------------------------------------------
 * Arquivo ISOLADO de propósito: tanto o Painel Admin (components/admin/*)
 * quanto a Vitrine pública (app/vitrine) importam as funções daqui. Assim,
 * a lógica de "qual categoria esse produto pertence?" existe em um único
 * lugar — se você adicionar uma palavra-chave nova, ela passa a valer nos
 * dois lados automaticamente.
 *
 * Como funciona, resumidamente:
 * 1) Cada categoria tem uma lista de "palavras-chave" (ex.: a categoria
 *    Tabacos tem a palavra "tabaco").
 * 2) A função `parseProductCategory` recebe o NOME do produto (ex.: "Tabaco
 *    Marajó"), normaliza o texto (deixa minúsculo e remove acentos) e
 *    verifica, na ordem da lista CATEGORY_RULES, qual é a primeira
 *    categoria cuja palavra-chave aparece dentro do nome.
 * 3) A ordem da lista importa: categorias mais específicas (ex.: "Cases")
 *    vêm antes de categorias mais genéricas (ex.: "Alças"), porque um
 *    produto como "Case low dog com alça" precisa cair em Cases, não em
 *    Alças, mesmo contendo a palavra "alça" no nome.
 * 4) Se nenhuma palavra-chave bater, o produto cai na categoria de
 *    fallback "Diversos" — assim nenhum produto fica sem categoria.
 *
 * As categorias abaixo foram construídas lendo os ~480 nomes reais do
 * catálogo em app/products.ts, além das 6 categorias pedidas
 * originalmente (Tabacos, Sedas, Piteiras, Alças, Anel de Silicone, Bags).
 */

// Cada categoria tem um id técnico (usado no código) e um label (mostrado
// na tela). Adicionar uma categoria nova = adicionar uma linha aqui.
export type CategoryId =
  | "cases"
  | "bongs"
  | "cuias"
  | "dichavadores"
  | "bandejas"
  | "cinzeiros"
  | "tabacos"
  | "sedas"
  | "piteiras"
  | "bags"
  | "isqueiros-macaricos"
  | "aneis-silicone"
  | "alcas"
  | "acessorios"
  | "alimentos"
  | "diversos";

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  cases: "Cases",
  bongs: "Bongs",
  cuias: "Cuias",
  dichavadores: "Dichavadores",
  bandejas: "Bandejas",
  cinzeiros: "Cinzeiros",
  tabacos: "Tabacos",
  sedas: "Sedas",
  piteiras: "Piteiras",
  bags: "Bags",
  "isqueiros-macaricos": "Isqueiros e Maçaricos",
  "aneis-silicone": "Anel de Silicone",
  alcas: "Alças",
  acessorios: "Acessórios",
  alimentos: "Alimentos",
  diversos: "Diversos",
};

// Categoria usada como fallback quando nenhuma palavra-chave bate com o
// nome do produto. Fica sempre por último na lista de regras.
const FALLBACK_CATEGORY: CategoryId = "diversos";

/**
 * Lista de regras, na ORDEM em que devem ser testadas.
 * Cada regra diz: "se o nome contiver uma destas palavras, é desta categoria".
 * A ordem vai de mais específico pra mais genérico — ver o comentário no
 * topo do arquivo (item 3) pra entender por quê isso é importante.
 */
const CATEGORY_RULES: { id: CategoryId; keywords: string[] }[] = [
  { id: "cases", keywords: ["case"] },
  { id: "bongs", keywords: ["bong"] },
  { id: "cuias", keywords: ["cuia"] },
  { id: "dichavadores", keywords: ["dichavador"] },
  { id: "bandejas", keywords: ["bandeja"] },
  { id: "cinzeiros", keywords: ["cinzeiro"] },
  { id: "tabacos", keywords: ["tabaco"] },
  // "papel dover" é papel de enrolar → mesma família das sedas.
  { id: "sedas", keywords: ["seda", "papel dover", "papel"] },
  { id: "piteiras", keywords: ["piteira"] },
  { id: "bags", keywords: ["bag"] },
  // "clipper" cobre tanto "Isqueiro clipper" quanto "Clipper smoking".
  { id: "isqueiros-macaricos", keywords: ["isqueiro", "macarico", "clipper", "gas butano", "fluido"] },
  { id: "aneis-silicone", keywords: ["anel de silicone", "anel"] },
  { id: "alcas", keywords: ["alca"] },
  // Acessórios menores que não têm categoria própria (mas ainda são
  // reconhecíveis pelo nome).
  {
    id: "acessorios",
    keywords: ["slick", "tubeck", "tesoura", "pote", "filtro", "cabo", "chaveiro", "espatula", "garrafinha", "balanca"],
  },
  // Comidas/bebidas vendidas na loja (polpas de fruta, suco, açúcar etc.).
  { id: "alimentos", keywords: ["polpa", "suco", "sucreme", "acucar"] },
];

/**
 * Remove acentos e deixa o texto em minúsculo, pra "Piteira" e "PITEIRA" e
 * "café" e "cafe" serem tratados da mesma forma na hora de comparar.
 */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Função principal: recebe o nome de um produto e devolve o id da
 * categoria detectada. Usada tanto no Admin quanto na Vitrine — é o
 * coração da "inteligência de separação de produtos" pedida.
 *
 * Exemplo: parseProductCategory("Tabaco Marajó") → "tabacos"
 * Exemplo: parseProductCategory("Case low dog com alça") → "cases"
 */
export function parseProductCategory(productName: string): CategoryId {
  const normalized = normalize(productName);

  for (const rule of CATEGORY_RULES) {
    const matched = rule.keywords.some((keyword) => normalized.includes(keyword));
    if (matched) return rule.id;
  }

  return FALLBACK_CATEGORY;
}

/** Devolve o texto (label) que deve aparecer na tela para uma categoria. */
export function getCategoryLabel(id: CategoryId): string {
  return CATEGORY_LABELS[id] ?? CATEGORY_LABELS[FALLBACK_CATEGORY];
}

/**
 * Lista de TODAS as categorias existentes, como { id, label } — útil pra
 * popular um <select>, por exemplo. A ordem segue CATEGORY_RULES, com
 * "Diversos" sempre por último.
 */
export const ALL_CATEGORIES: { id: CategoryId; label: string }[] = [
  ...CATEGORY_RULES.map((rule) => ({ id: rule.id, label: CATEGORY_LABELS[rule.id] })),
  { id: FALLBACK_CATEGORY, label: CATEGORY_LABELS[FALLBACK_CATEGORY] },
];

/**
 * Dado uma lista de nomes de produtos (o catálogo que está sendo exibido
 * no momento), devolve só as categorias que realmente aparecem nesse
 * catálogo — assim a barra de filtros (CategoryTabs) não mostra abas
 * vazias tipo "Bongs" numa tela que não tem nenhum bong.
 */
export function getAvailableCategories(productNames: string[]): { id: CategoryId; label: string }[] {
  const idsPresentes = new Set(productNames.map((name) => parseProductCategory(name)));
  return ALL_CATEGORIES.filter((category) => idsPresentes.has(category.id));
}
