/**
 * Rate limit do login do Admin — protege contra força bruta de senha.
 * ------------------------------------------------------------------
 * Usa @upstash/ratelimit sobre o cliente Redis compartilhado
 * (lib/server/redis.ts — ver esse arquivo pra detalhes de runtime).
 *
 * Regra: no máximo 5 tentativas de login por IP a cada 1 minuto (janela
 * deslizante — "sliding window": não é só resetar a cada minuto cheio,
 * é sempre "nos últimos 60 segundos").
 *
 * SEM o Redis configurado, `loginRateLimit` fica `null` e o
 * middleware.ts pula a checagem (loga um aviso, mas deixa o login
 * continuar) — decisão deliberada: um e-commerce pequeno com um único
 * admin não pode ficar com o painel inteiro bloqueado só porque uma
 * variável de ambiente não foi configurada. O rate limit aqui é uma
 * camada EXTRA de proteção, não a principal (a senha em si é a
 * principal) — por isso "falha aberto" (deixa passar) em vez de "falha
 * fechado" (bloqueia tudo) quando o Redis não está disponível.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/server/redis";

export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "gh_admin_login",
    })
  : null;
