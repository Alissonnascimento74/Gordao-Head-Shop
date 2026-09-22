/**
 * product-costs.ts — "valor de entrada" (custo de compra) por produto.
 * ------------------------------------------------------------------
 * Diferente do resto da tela de Produtos (nome/preço/estoque/foto, que
 * ainda é só mock em memória do navegador — ver ProductsClient.tsx e o
 * aviso no topo de app/admin/(painel)/produtos/page.tsx), o valor de
 * entrada usa o MESMO Redis do orders-store (lib/server/redis.ts) pra
 * persistir de verdade: é um dado de margem que o dono pediu pra "ter
 * controle" — não faria sentido sumir a cada recarregamento de página.
 *
 * Guardado como um hash Redis (gh:product-costs), productId -> custo em
 * reais. Bem mais simples e mais seguro que migrar o catálogo inteiro
 * (482 produtos, ainda mock) pro Redis — essa é uma pendência maior e
 * separada (ver Obsidian, seção 26).
 */
import { redis } from "@/lib/server/redis";

const COSTS_KEY = "gh:product-costs";

// Fallback só usado quando o Redis não está configurado (dev local sem
// as credenciais copiadas) — mesmo padrão do orders-store.ts.
const memoryCosts: Record<string, number> = {};

export async function getProductCosts(): Promise<Record<string, number>> {
  if (redis) {
    // HGETALL devolve os valores como string (campo de hash Redis, sem o
    // parse automático de JSON que GET/SET fazem pra uma chave inteira) —
    // sem esse Number(...), costPrice chegaria como "22.5" (string) pro
    // resto do app, que espera number (ex.: formatCurrency quebraria).
    const data = await redis.hgetall<Record<string, string | number>>(COSTS_KEY);
    if (!data) return {};
    return Object.fromEntries(Object.entries(data).map(([id, value]) => [id, Number(value)]));
  }
  return { ...memoryCosts };
}

export async function setProductCost(productId: string, costPrice: number): Promise<void> {
  if (redis) {
    await redis.hset(COSTS_KEY, { [productId]: costPrice });
    return;
  }
  memoryCosts[productId] = costPrice;
}
