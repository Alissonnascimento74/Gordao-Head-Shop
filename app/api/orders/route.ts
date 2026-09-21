/**
 * GET /api/orders — lista os pedidos pro painel Admin.
 * ------------------------------------------------------------------
 * A tela de Pedidos (components/admin/orders/OrdersClient.tsx) chama
 * essa rota de tempos em tempos (polling) depois do primeiro
 * carregamento, pra "descobrir" pedidos que o webhook do Mercado Pago
 * atualizou nesse meio tempo — é essa combinação (webhook grava no
 * orders-store + esta rota lê do mesmo orders-store) que faz uma venda
 * nova aparecer no painel sem precisar mexer em nada manualmente.
 *
 * Protegida pelo mesmo cookie de sessão do painel: `middleware.ts` já
 * bloqueia as TELAS de `/admin/*`, mas rotas de API ficam fora do
 * alcance dele — como esta rota devolve dados de clientes (nome,
 * telefone, endereço...), ela confere o cookie por conta própria.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { listOrders } from "@/lib/server/orders-store";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  return NextResponse.json({ orders: await listOrders() });
}
