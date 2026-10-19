import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/auth-config";
import { getStoreSettings, saveStoreSettings, StoreSettingsUnavailableError } from "@/lib/server/store-settings";

export async function GET() {
  try { return NextResponse.json(await getStoreSettings()); }
  catch { return NextResponse.json({ error: "Não foi possível carregar as configurações." }, { status: 503 }); }
}

export async function PUT(request: Request) {
  if (!(await cookies()).get(ADMIN_SESSION_COOKIE)) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const storeName = typeof body?.storeName === "string" ? body.storeName.trim() : "";
  const whatsappNumber = typeof body?.whatsappNumber === "string" ? body.whatsappNumber.replace(/\D/g, "") : "";
  if (!storeName || storeName.length > 80 || whatsappNumber.length < 10 || whatsappNumber.length > 15) {
    return NextResponse.json({ error: "Informe um nome válido e WhatsApp com DDI, DDD e número." }, { status: 400 });
  }
  try {
    await saveStoreSettings({ storeName, whatsappNumber });
    return NextResponse.json({ storeName, whatsappNumber });
  } catch (error) {
    if (error instanceof StoreSettingsUnavailableError) return NextResponse.json({ error: error.message }, { status: 503 });
    return NextResponse.json({ error: "Não foi possível salvar as configurações." }, { status: 500 });
  }
}
