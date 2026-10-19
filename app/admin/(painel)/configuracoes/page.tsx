import type { Metadata } from "next";
import { ADMIN_CREDENTIALS } from "@/lib/admin/auth-config";
import { DEFAULT_STORE_SETTINGS, getStoreSettings } from "@/lib/server/store-settings";
import ConfiguracoesClient from "./ConfiguracoesClient";

export const metadata: Metadata = { title: "Configurações — Painel Gordão HeadShop" };
export const dynamic = "force-dynamic";

export default async function ConfiguracoesPage() {
  const settings = await getStoreSettings().catch(() => DEFAULT_STORE_SETTINGS);
  return <ConfiguracoesClient initialSettings={settings} username={ADMIN_CREDENTIALS.username} />;
}
