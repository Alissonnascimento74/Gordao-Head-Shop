/**
 * Porteiro do Painel Admin — roda ANTES de qualquer página /admin/* carregar,
 * e também na frente da rota de login (rate limit, ver abaixo).
 * ------------------------------------------------------------------
 * Só confere se o cookie de sessão (gh_admin_session) EXISTE — não valida
 * assinatura nem expiração, porque a autenticação toda é mockada de
 * propósito (ver o aviso completo em lib/admin/auth-config.ts). Isso só é
 * seguro porque o cookie é httpOnly (JS do navegador não lê nem forja) e
 * só a rota de login (app/api/admin/login/route.ts) tem permissão de
 * criar esse cookie.
 *
 * /admin/login precisa ficar de fora da checagem de sessão — senão
 * ninguém conseguiria nem VER a tela de login pra entrar.
 *
 * ⚠️ Isso NÃO protege as outras rotas de API (app/api/*) — o matcher
 * abaixo só cobre páginas /admin/* e a rota de login. Rotas de API que
 * expõem dado sensível (ex.: /api/orders) precisam conferir o cookie por
 * conta própria, dentro da própria rota.
 */

import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { loginRateLimit } from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit no login — no máximo 5 tentativas por IP a cada 1 minuto
  // (ver lib/rate-limit.ts pro porquê de "falhar aberto" sem Redis
  // configurado). Só se aplica ao POST de verdade (o preflight/OPTIONS,
  // se existir, não deve contar como tentativa).
  if (pathname === "/api/admin/login" && request.method === "POST") {
    if (loginRateLimit) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      try {
        const { success, limit, remaining, reset } = await loginRateLimit.limit(ip);
        if (!success) {
          return NextResponse.json(
            { error: "Muitas tentativas de login. Aguarde um minuto e tente de novo." },
            {
              status: 429,
              headers: {
                "X-RateLimit-Limit": String(limit),
                "X-RateLimit-Remaining": String(remaining),
                "X-RateLimit-Reset": String(reset),
              },
            }
          );
        }
      } catch (error) {
        // Redis fora do ar/mal configurado: loga e deixa passar (falha
        // aberto) — ver justificativa completa em lib/rate-limit.ts.
        console.error("Rate limit do login falhou, deixando passar:", error);
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/login"],
};
