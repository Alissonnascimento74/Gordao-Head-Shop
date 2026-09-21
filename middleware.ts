/**
 * Porteiro do Painel Admin — roda ANTES de qualquer página /admin/* carregar.
 * ------------------------------------------------------------------
 * Só confere se o cookie de sessão (gh_admin_session) EXISTE — não valida
 * assinatura nem expiração, porque a autenticação toda é mockada de
 * propósito (ver o aviso completo em lib/admin/auth-config.ts). Isso só é
 * seguro porque o cookie é httpOnly (JS do navegador não lê nem forja) e
 * só a rota de login (app/api/admin/login/route.ts) tem permissão de
 * criar esse cookie.
 *
 * /admin/login precisa ficar de fora da checagem — senão ninguém
 * conseguiria nem VER a tela de login pra entrar.
 *
 * ⚠️ Isso NÃO protege as rotas de API (app/api/*) — o matcher abaixo só
 * cobre páginas. Rotas de API que expõem dado sensível (ex.: /api/orders)
 * precisam conferir o cookie por conta própria, dentro da própria rota.
 */

import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  matcher: ["/admin/:path*"],
};
