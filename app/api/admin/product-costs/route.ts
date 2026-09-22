/**
 * GET/POST /api/admin/product-costs — "valor de entrada" por produto.
 * ------------------------------------------------------------------
 * GET devolve o mapa completo { [productId]: costPrice }, usado pra
 * carregar a tela de Produtos já com os custos salvos. POST grava/
 * atualiza o custo de UM produto (chamado a cada edição na tabela —
 * ver components/admin/products/ProductsClient.tsx).
 *
 * Protegida pelo mesmo cookie de sessão das outras rotas de admin — ver
 * app/api/orders/route.ts.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { getProductCosts, setProductCost } from "@/lib/server/product-costs";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const costs = await getProductCosts();
  return NextResponse.json({ costs });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const productId = typeof body?.productId === "string" ? body.productId.trim() : "";
  const costPrice = Number(body?.costPrice);

  if (!productId) {
    return NextResponse.json({ error: "productId é obrigatório." }, { status: 400 });
  }
  if (!Number.isFinite(costPrice) || costPrice < 0) {
    return NextResponse.json({ error: "Valor de entrada inválido." }, { status: 400 });
  }

  await setProductCost(productId, costPrice);
  return NextResponse.json({ ok: true });
}
