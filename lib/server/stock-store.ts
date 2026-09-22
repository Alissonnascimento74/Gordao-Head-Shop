/**
 * stock-store.ts — estoque real, compartilhado entre PDV, checkout online
 * e a tela de Produtos do Admin.
 * ------------------------------------------------------------------
 * Antes deste arquivo existir, "estoque" era só um número mockado —
 * cada tela (Produtos, checkout) tinha sua própria cópia, e nenhuma
 * baixa acontecia de verdade nunca (nem uma venda online decrementava
 * nada). Isso quebrava exatamente o que o lojista pediu no PDV: "unificar
 * o controle de estoque" só funciona se existir UM número real, no mesmo
 * lugar, que todo mundo lê e escreve.
 *
 * Guardado como um hash Redis (gh:product-stock), productId -> quantidade
 * (mesmo padrão de lib/server/product-costs.ts), semeado uma única vez a
 * partir do estoque inicial de app/products.ts. `adjustStock` usa HINCRBY
 * — um incremento/decremento ATÔMICO direto no Redis, então duas vendas
 * simultâneas (ex.: um PDV e uma venda online ao mesmo tempo) não perdem
 * uma baixa por causa de race condition na leitura+escrita.
 *
 * ⚠️ Quem decrementa e quando:
 *   - PDV (app/api/admin/pos/route.ts): decrementa na hora — venda física
 *     é dinheiro na mão, não tem "pagamento pendente".
 *   - Checkout online (app/api/checkout/route.ts): só CONFERE o estoque
 *     aqui (não decrementa) — decrementar já no checkout "travaria"
 *     estoque de carrinhos abandonados que nunca terminam de pagar.
 *   - Webhook do Mercado Pago (app/api/webhooks/mercadopago/route.ts):
 *     decrementa só quando o pagamento é confirmado de verdade (status
 *     vira "pago" pela primeira vez) — é o momento certo de considerar a
 *     venda "de verdade" pra fins de estoque.
 *
 * ⚠️ Limitação conhecida: a Vitrine/loja (app/page.tsx) ainda mostra
 * "Esgotado" a partir do número ESTÁTICO de app/products.ts, não deste
 * Redis — ela é um Client Component que importa o catálogo direto no
 * bundle, não busca dado dinâmico. Ou seja: uma venda no PDV baixa o
 * estoque real (e o checkout online já bloqueia a compra se realmente
 * não tiver mais), mas o card do produto na loja pode continuar
 * mostrando "Adicionar" por um tempo até alguém atualizar a página com
 * uma nova build. Corrigido no checkout (o que importa pra não vender
 * o que não existe); deixar a Vitrine 100% ao vivo é um passo futuro
 * maior (buscar estoque no client em vez de importar estático).
 */
import { redis } from "@/lib/server/redis";
import { PRODUCTS } from "@/app/products";

const STOCK_KEY = "gh:product-stock";
const SEEDED_KEY = "gh:stock:seeded";

// Fallback só usado quando o Redis não está configurado (dev local sem
// as credenciais copiadas) — mesmo padrão do orders-store.ts.
const memoryStock: Record<string, number> = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product.stock ?? 0])
);

let seedPromise: Promise<void> | null = null;
function seedIfNeeded(): Promise<void> {
  if (!redis) return Promise.resolve();
  if (!seedPromise) {
    seedPromise = (async () => {
      const acquired = await redis!.set(SEEDED_KEY, "1", { nx: true });
      if (!acquired) return; // outra requisição já semeou (ou está semeando)
      const seed: Record<string, number> = {};
      for (const product of PRODUCTS) seed[product.id] = product.stock ?? 0;
      await redis!.hset(STOCK_KEY, seed);
    })();
  }
  return seedPromise;
}

export async function getStockMap(): Promise<Record<string, number>> {
  if (redis) {
    await seedIfNeeded();
    // HGETALL devolve os valores como string (ver o mesmo aviso em
    // product-costs.ts) — normaliza pra number antes de devolver.
    const data = await redis.hgetall<Record<string, string | number>>(STOCK_KEY);
    if (!data) return {};
    return Object.fromEntries(Object.entries(data).map(([id, value]) => [id, Number(value)]));
  }
  return { ...memoryStock };
}

export async function getStock(productId: string): Promise<number> {
  if (redis) {
    await seedIfNeeded();
    const value = await redis.hget<string | number>(STOCK_KEY, productId);
    return value === null || value === undefined ? 0 : Number(value);
  }
  return memoryStock[productId] ?? 0;
}

/** Incrementa (delta positivo) ou decrementa (delta negativo) o estoque
 *  de um produto, atomicamente. Devolve o novo valor. */
export async function adjustStock(productId: string, delta: number): Promise<number> {
  if (redis) {
    await seedIfNeeded();
    return await redis.hincrby(STOCK_KEY, productId, delta);
  }
  const next = (memoryStock[productId] ?? 0) + delta;
  memoryStock[productId] = next;
  return next;
}
