// POST /api/admin/logout — apaga o cookie de sessão do Admin.
// `maxAge: 0` é o jeito padrão de instruir o navegador a descartar o
// cookie imediatamente (equivale a "já expirou"); o valor virando string
// vazia é só cosmético, quem realmente desloga é o maxAge.
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
