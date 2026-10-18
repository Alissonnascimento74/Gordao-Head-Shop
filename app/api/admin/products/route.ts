import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { saveProduct } from "@/lib/server/products-store";
import { setStock } from "@/lib/server/stock-store";
import type { AdminProduct } from "@/lib/admin/types";

export async function POST(request: Request) {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE);
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  const body = await request.json().catch(() => null) as AdminProduct | null;
  if (!body || typeof body.name !== "string" || !body.name.trim() || !Number.isFinite(body.price) || body.price < 0 || !Number.isInteger(body.stock) || body.stock < 0) {
    return NextResponse.json({ error: "Informe nome, preço e estoque válidos." }, { status: 400 });
  }
  const product = { ...body, id: typeof body.id === "string" && body.id ? body.id : `NOVO-${Date.now()}` };
  try {
    await saveProduct(product);
    const stockUpdated = await setStock(product.id, product.stock);
    if (!stockUpdated) return NextResponse.json({ error: "O estoque informado é menor que as unidades já reservadas em pedidos pendentes." }, { status: 409 });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar o produto. Verifique a conexão com o banco." }, { status: 500 });
  }
}
