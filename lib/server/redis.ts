/**
 * Cliente Redis compartilhado (Upstash) — usado tanto pelo rate limit do
 * login (lib/rate-limit.ts, roda no Middleware/Edge Runtime) quanto pelo
 * orders-store (lib/server/orders-store.ts, roda nas rotas de API/Node).
 * ------------------------------------------------------------------
 * Importa de "@upstash/redis/cloudflare", não do pacote raiz — a build
 * padrão do @upstash/redis usa APIs do Node.js (process.version) que não
 * existem no Edge Runtime. A variante "cloudflare" é feita pra ambientes
 * Web-standard (fetch) sem Node.js por trás, e funciona igual nos dois
 * lugares — por isso um cliente só serve os dois casos de uso.
 *
 * As variáveis abaixo (UPSTASH_REDIS_KV_REST_API_URL/TOKEN) vêm da
 * integração "Upstash for Redis" conectada via Vercel → Storage
 * (criada em 21/09/2026 — ver Gordao-HeadShop-Projeto.md no Obsidian).
 * Sem elas (ex.: `npm run dev` local sem copiar as credenciais), `redis`
 * fica `null` e cada consumidor decide seu próprio fallback:
 *   - rate-limit.ts: pula a checagem (fail-open)
 *   - orders-store.ts: usa um array em memória (mock, como antes)
 *
 * ⚠️ `cache: "no-store"` é OBRIGATÓRIO aqui — o Upstash SDK faz suas
 * chamadas com `fetch()` por baixo dos panos, e o Next.js intercepta
 * TODO `fetch()` feito durante a renderização (mesmo de bibliotecas de
 * terceiros) pro seu Data Cache. Descoberto testando o PDV (módulo de
 * vendas físicas, 22/09/2026): sem essa opção, HGET/HGETALL do estoque
 * (lib/server/stock-store.ts) voltavam com o valor de uma chamada
 * anterior em cache — uma venda decrementava o estoque de verdade no
 * Redis, mas a tela de Produtos continuava mostrando o número antigo.
 * Sem `cache: "no-store"`, isso afetaria (silenciosamente) toda leitura
 * feita através deste cliente, não só o estoque.
 */
import { Redis } from "@upstash/redis/cloudflare";

const url = process.env.UPSTASH_REDIS_KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

export const redis = url && token ? new Redis({ url, token, cache: "no-store" }) : null;
