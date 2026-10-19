import { PRODUCTS as SEED_PRODUCTS, type Product } from "@/app/products";
import type { AdminProduct } from "@/lib/admin/types";
import { redis } from "@/lib/server/redis";

const KEY = "gh:products";
type StoredProduct = AdminProduct & { deleted?: boolean };
const DEFAULT_FEATURED_IDS = new Set(["000046-1", "000075", "000300-1"]);
const DEFAULT_FEATURED_IMAGES: Record<string, string> = {
  "000046-1": "/products/bandeja-narcos.jpg",
  "000075": "/products/rick-and-morty-tray.jpg",
  "000300-1": "/products/vault77-bag.jpg",
};

export class ProductStoreUnavailableError extends Error {
  constructor() {
    super("Redis indisponível. A alteração não foi salva; verifique a conexão do banco e tente novamente.");
    this.name = "ProductStoreUnavailableError";
  }
}

function seedProducts(): AdminProduct[] {
  return SEED_PRODUCTS.map((product) => ({
    id: product.id, name: product.name, imageUrl: DEFAULT_FEATURED_IMAGES[product.id] ?? product.imageUrl,
    price: product.price, stock: product.stock ?? 0, soldOut: (product.stock ?? 0) <= 0,
    featured: DEFAULT_FEATURED_IDS.has(product.id),
  }));
}

export async function getProducts(): Promise<AdminProduct[]> {
  if (!redis) return seedProducts();
  const saved = await redis.hgetall<Record<string, AdminProduct | string>>(KEY);
  const additions = Object.values(saved ?? {}).map((value) => typeof value === "string" ? JSON.parse(value) as StoredProduct : value as StoredProduct);
  const byId = new Map<string, StoredProduct>(seedProducts().map((product) => [product.id, product]));
  for (const product of additions) {
    byId.set(product.id, { ...byId.get(product.id), ...product });
  }
  return [...byId.values()].filter((product) => !product.deleted);
}

export async function saveProduct(product: AdminProduct): Promise<void> {
  // Produto cadastrado em memória parece salvo até a próxima invocação da
  // função serverless. Exige Redis para nunca confirmar um cadastro volátil.
  if (!redis) throw new ProductStoreUnavailableError();
  await redis.hset(KEY, { [product.id]: JSON.stringify(product) });
}

/** Soft delete: hides the item from store/stock lists but keeps pending order
 * reservations and historical order lines intact. The tombstone also masks
 * products that are part of the source catalog. */
export async function deleteProduct(productId: string): Promise<boolean> {
  // Não confirma exclusão usando o fallback em memória: esse estado some ao
  // reiniciar o servidor e faria o produto reaparecer sem avisar o admin.
  if (!redis) throw new ProductStoreUnavailableError();

  const product = (await getProducts()).find((entry) => entry.id === productId);
  if (!product) return false;
  const tombstone: StoredProduct = { ...product, deleted: true };
  await redis.hset(KEY, { [productId]: JSON.stringify(tombstone) });
  return true;
}

export async function getCatalogProducts(): Promise<Product[]> {
  const saved = await getProducts();
  const seedById = new Map(SEED_PRODUCTS.map((product) => [product.id, product]));
  return saved.map((product) => {
    const original = seedById.get(product.id);
    return {
      ...original,
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      category: original?.category ?? "acessorios",
      description: original?.description ?? "Produto disponível em nossa loja.",
      badge: product.stock <= 0 || product.soldOut ? "Esgotado" : original?.badge,
      soldOut: product.soldOut,
      featured: product.featured,
      promoLabel: product.promoLabel,
      active: product.active !== false,
    };
  });
}
