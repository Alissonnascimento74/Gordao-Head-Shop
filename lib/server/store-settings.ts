import { redis } from "@/lib/server/redis";

const KEY = "gh:store-settings";
export type StoreSettings = { storeName: string; whatsappNumber: string };
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "Gordão HeadShop",
  whatsappNumber: "5511997306428",
};

export class StoreSettingsUnavailableError extends Error {}

export async function getStoreSettings(): Promise<StoreSettings> {
  if (!redis) return DEFAULT_STORE_SETTINGS;
  const saved = await redis.hgetall<Partial<StoreSettings>>(KEY);
  return { ...DEFAULT_STORE_SETTINGS, ...(saved ?? {}) };
}

export async function saveStoreSettings(settings: StoreSettings): Promise<void> {
  if (!redis) throw new StoreSettingsUnavailableError("Redis indisponível. As configurações não foram salvas.");
  await redis.hset(KEY, settings);
}
