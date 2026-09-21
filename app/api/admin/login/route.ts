/**
 * POST /api/admin/login — confere usuário/senha e abre a sessão do Admin.
 * ------------------------------------------------------------------
 * Login MOCK (ver lib/admin/auth-config.ts pro aviso completo e pra saber
 * o que trocar quando integrar autenticação de verdade). Duas limitações
 * a ter em mente até lá:
 *   - Sem rate limit: nada aqui impede tentar a senha infinitas vezes
 *     seguidas. Baixo risco enquanto for só um mock de demonstração, mas
 *     vale endurecer (ex.: limitar tentativas por IP) antes de depender
 *     dessa senha pra proteger dado de cliente de verdade.
 *   - O cookie de sessão dura 8h (`maxAge`) e é sempre o MESMO valor fixo
 *     (`MOCK_SESSION_TOKEN`) pra qualquer login bem-sucedido — não é um
 *     token único por sessão, é só um "crachá" genérico.
 */

import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, MOCK_SESSION_TOKEN, validateCredentials } from "@/lib/admin/auth-config";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password || !validateCredentials(username, password)) {
    return NextResponse.json({ error: "Usuário ou senha inválidos." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, MOCK_SESSION_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
