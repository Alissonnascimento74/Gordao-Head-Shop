/**
 * POST /api/orders/[id]/ship — marca um pedido como despachado.
 * ------------------------------------------------------------------
 * Chamada pelo botão "Marcar como despachado" (ShipOrderModal.tsx via
 * components/admin/orders/OrdersClient.tsx). Antes desta rota existir,
 * esse clique só mudava o estado local da aba do navegador — o próximo
 * polling de GET /api/orders (a cada 15s) sobrescrevia de volta, porque
 * nada tinha sido salvo de verdade no orders-store. Agora persiste no
 * mesmo Redis que o checkout e o webhook usam.
 *
 * Protegida pelo mesmo cookie de sessão das outras rotas de pedidos —
 * ver app/api/orders/route.ts.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { updateOrderStatus } from "@/lib/server/orders-store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const trackingCode = typeof body?.trackingCode === "string" ? body.trackingCode.trim() : "";

  if (!trackingCode) {
    return NextResponse.json({ error: "Código de rastreio é obrigatório." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, "despachado", { trackingCode });
  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
