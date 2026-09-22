/**
 * POST /api/orders/[id]/ship — marca um pedido como despachado (ou
 * retirado, se for "Retirar na loja").
 * ------------------------------------------------------------------
 * Chamada pelo botão "Marcar como despachado"/"Marcar como retirado"
 * (ShipOrderModal.tsx via components/admin/orders/OrdersClient.tsx).
 * Antes desta rota existir, esse clique só mudava o estado local da aba
 * do navegador — o próximo polling de GET /api/orders (a cada 15s)
 * sobrescrevia de volta, porque nada tinha sido salvo de verdade no
 * orders-store. Agora persiste no mesmo Redis que o checkout e o webhook
 * usam.
 *
 * Código de rastreio só é exigido pra pedidos com transportadora de
 * verdade (Correios/99 Entrega) — quem escolheu "Retirar na loja" não
 * tem rastreio nenhum pra informar (ver lib/shipping/types.ts).
 *
 * Protegida pelo mesmo cookie de sessão das outras rotas de pedidos —
 * ver app/api/orders/route.ts.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { getOrderByExternalReference, updateOrderStatus } from "@/lib/server/orders-store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;

  const existing = await getOrderByExternalReference(id);
  if (!existing) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const trackingCode = typeof body?.trackingCode === "string" ? body.trackingCode.trim() : "";
  const isPickup = existing.shippingMethod?.carrier === "Retirada";

  if (!isPickup && !trackingCode) {
    return NextResponse.json({ error: "Código de rastreio é obrigatório." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, "despachado", trackingCode ? { trackingCode } : undefined);
  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
