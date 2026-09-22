/**
 * POST /api/admin/products/[id]/stock — ajusta o estoque de um produto.
 * ------------------------------------------------------------------
 * Chamada pelos botões "+"/"-" da tela de Produtos (ProductsClient.tsx)
 * — cada clique manda { delta: 1 } ou { delta: -1 }. Usa o mesmo
 * lib/server/stock-store.ts do PDV e do checkout online: é o MESMO
 * número que aparece nos três lugares, ajustar aqui reflete em todos.
 *
 * Protegida pelo mesmo cookie de sessão das outras rotas de admin.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { adjustStock } from "@/lib/server/stock-store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const delta = Number(body?.delta);

  if (!Number.isFinite(delta) || delta === 0) {
    return NextResponse.json({ error: "delta é obrigatório e não pode ser zero." }, { status: 400 });
  }

  const stock = await adjustStock(id, delta);
  return NextResponse.json({ stock });
}
