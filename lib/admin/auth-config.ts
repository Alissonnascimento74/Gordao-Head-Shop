/**
 * Autenticação do painel admin — MOCK
 * ------------------------------------------------------------------
 * Isso aqui é só pra você conseguir testar o painel. Não é autenticação de
 * verdade (não tem hash de senha, não tem usuários no banco, o "token" de
 * sessão é um valor fixo). Quando for integrar a autenticação definitiva:
 *
 *   1) Troque a função `validateCredentials` por uma consulta real
 *      (banco de dados, NextAuth, Clerk, etc.).
 *   2) Troque o valor de `MOCK_SESSION_TOKEN` por um token real (JWT
 *      assinado, id de sessão, etc.) gerado em app/api/admin/login/route.ts.
 *   3) O middleware.ts na raiz do projeto e o resto do painel não
 *      precisam mudar — eles só checam se o cookie de sessão existe.
 *
 * Credenciais padrão (podem ser sobrescritas via .env.local, sem precisar
 * mexer em código):
 *   ADMIN_USERNAME=...
 *   ADMIN_PASSWORD=...
 */

export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "Gordãoheadshop",
  password: process.env.ADMIN_PASSWORD || "gordaoheadshop",
};

export const ADMIN_SESSION_COOKIE = "gh_admin_session";
export const MOCK_SESSION_TOKEN = "mock-session-authenticated";

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}
