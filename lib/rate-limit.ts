/**
 * Rate limit do login do Admin — protege contra força bruta de senha.
 * ------------------------------------------------------------------
 * Usa @upstash/ratelimit + @upstash/redis (API REST, funciona dentro do
 * Middleware do Next.js, que roda em Edge Runtime — um cliente Redis
 * "normal", baseado em TCP, não funcionaria aqui).
 *
 * Regra: no máximo 5 tentativas de login por IP a cada 1 minuto (janela
 * deslizante — "sliding window": não é só resetar a cada minuto cheio,
 * é sempre "nos últimos 60 segundos").
 *
 * ⚠️ Precisa de um banco Redis do Upstash (grátis pro nível de uso de uma
 * loja pequena): criar em https://console.upstash.com/redis, copiar a
 * "REST URL" e o "REST TOKEN" e configurar como variáveis de ambiente:
 *   UPSTASH_REDIS_REST_URL=...
 *   UPSTASH_REDIS_REST_TOKEN=...
 *
 * SEM essas variáveis configuradas, `loginRateLimit` fica `null` e o
 * middleware.ts pula a checagem (loga um aviso, mas deixa o login
 * continuar) — decisão deliberada: um e-commerce pequeno com um único
 * admin não pode ficar com o painel inteiro bloqueado só porque uma
 * variável de ambiente não foi configurada. O rate limit aqui é uma
 * camada EXTRA de proteção, não a principal (a senha em si é a
 * principal) — por isso "falha aberto" (deixa passar) em vez de "falha
 * fechado" (bloqueia tudo) quando o Redis não está disponível.
 */

import { Ratelimit } from "@upstash/ratelimit";
// Importa de "@upstash/redis/cloudflare", não do pacote raiz — a build
// padrão do @upstash/redis usa APIs do Node.js (process.version) que não
// existem no Edge Runtime, onde o middleware.ts roda. A variante
// "cloudflare" é feita pra ambientes Web-standard sem Node.js por trás
// (Cloudflare Workers e Vercel Edge Runtime têm as mesmas restrições) —
// é a própria Upstash que recomenda essa variante pra Edge Middleware.
import { Redis } from "@upstash/redis/cloudflare";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "gh_admin_login",
    })
  : null;
