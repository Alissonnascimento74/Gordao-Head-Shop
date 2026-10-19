import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { deleteProduct, getProducts, ProductStoreUnavailableError, saveProduct } from "@/lib/server/products-store";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE);
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null) as { featured?: unknown; promoLabel?: unknown; active?: unknown } | null;
  if (!body) return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });

  const hasFeatured = Object.prototype.hasOwnProperty.call(body, "featured");
  const hasPromoLabel = Object.prototype.hasOwnProperty.call(body, "promoLabel");
  const hasActive = Object.prototype.hasOwnProperty.call(body, "active");
  if ((!hasFeatured && !hasPromoLabel && !hasActive) || (hasFeatured && typeof body.featured !== "boolean") || (hasActive && typeof body.active !== "boolean")) {
    return NextResponse.json({ error: "Informe um destaque ou selo de promoção válido." }, { status: 400 });
  }
  if (hasPromoLabel && body.promoLabel !== null && (typeof body.promoLabel !== "string" || body.promoLabel.length > 40)) {
    return NextResponse.json({ error: "O selo deve ter até 40 caracteres." }, { status: 400 });
  }

  try {
    const current = (await getProducts()).find((product) => product.id === id);
    if (!current) return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });

    const updated = {
      ...current,
      ...(hasFeatured ? { featured: body.featured as boolean } : {}),
      ...(hasActive ? { active: body.active as boolean } : {}),
      ...(hasPromoLabel ? { promoLabel: typeof body.promoLabel === "string" && body.promoLabel.trim() ? body.promoLabel.trim() : undefined } : {}),
    };
    await saveProduct(updated);
    return NextResponse.json({ product: updated });
  } catch (error) {
    if (error instanceof ProductStoreUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Não foi possível salvar a alteração do produto." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE);
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  const { id } = await params;
  try {
    const deleted = await deleteProduct(id);
    if (!deleted) return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ProductStoreUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Não foi possível excluir o produto." }, { status: 500 });
  }
}
