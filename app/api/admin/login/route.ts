/**
 * POST /api/admin/login — confere usuário/senha e abre a sessão do Admin.
 * ------------------------------------------------------------------
 * Login MOCK (ver lib/admin/auth-config.ts pro aviso completo e pra saber
 * o que trocar quando integrar autenticação de verdade). Duas limitações
 * a ter em mente até lá:
 *   - O rate limit (5 tentativas/minuto por IP) fica em middleware.ts +
 *     lib/rate-limit.ts, ANTES desta rota rodar — precisa de um Redis do
 *     Upstash configurado pra valer (ver lib/rate-limit.ts).
 *   - O cookie de sessão dura 8h (`maxAge`) e é sempre o MESMO valor fixo
 *     (`MOCK_SESSION_TOKEN`) pra qualquer login bem-sucedido — não é um
 *     token único por sessão, é só um "crachá" genérico.
 *
 * Validação com Zod: valida FORMATO (string, tamanho razoável) antes de
 * gastar tempo comparando com a senha real — rejeita lixo (número, null,
 * string gigante) cedo, com o mesmo tipo de erro genérico da senha errada
 * (nunca revela QUAL validação falhou, pra não dar pista a quem estiver
 * tentando adivinhar).
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, MOCK_SESSION_TOKEN, validateCredentials } from "@/lib/admin/auth-config";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Usuário ou senha inválidos." }, { status: 401 });
  }

  const { username, password } = parsed.data;
  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: "Usuário ou senha inválidos." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, MOCK_SESSION_TOKEN, {
    httpOnly: true, // JS do navegador não lê nem forja — só o servidor mexe nesse cookie
    secure: process.env.NODE_ENV === "production", // exige HTTPS; desligado só em dev (localhost é HTTP)
    sameSite: "strict", // navegador nunca manda esse cookie em requisição vinda de outro site
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
