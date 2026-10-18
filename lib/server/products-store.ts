import { PRODUCTS as SEED_PRODUCTS, type Product } from "@/app/products";
import type { AdminProduct } from "@/lib/admin/types";
import { redis } from "@/lib/server/redis";

const KEY = "gh:products";
type StoredProduct = AdminProduct & { deleted?: boolean };
const memoryProducts = new Map<string, StoredProduct>();

function seedProducts(): AdminProduct[] {
  return SEED_PRODUCTS.map((product) => ({
    id: product.id, name: product.name, imageUrl: product.imageUrl,
    price: product.price, stock: product.stock ?? 0, soldOut: (product.stock ?? 0) <= 0,
  }));
}

export async function getProducts(): Promise<AdminProduct[]> {
  if (!redis) {
    const byId = new Map<string, StoredProduct>(seedProducts().map((product) => [product.id, product]));
    for (const product of memoryProducts.values()) byId.set(product.id, product);
    return [...byId.values()].filter((product) => !product.deleted);
  }
  const saved = await redis.hgetall<Record<string, AdminProduct | string>>(KEY);
  const additions = Object.values(saved ?? {}).map((value) => typeof value === "string" ? JSON.parse(value) as StoredProduct : value as StoredProduct);
  const byId = new Map<string, StoredProduct>(seedProducts().map((product) => [product.id, product]));
  for (const product of additions) byId.set(product.id, product);
  return [...byId.values()].filter((product) => !product.deleted);
}

export async function saveProduct(product: AdminProduct): Promise<void> {
  if (redis) await redis.hset(KEY, { [product.id]: JSON.stringify(product) });
  else memoryProducts.set(product.id, product);
}

/** Soft delete: hides the item from store/stock lists but keeps pending order
 * reservations and historical order lines intact. The tombstone also masks
 * products that are part of the source catalog. */
export async function deleteProduct(productId: string): Promise<boolean> {
  const product = (await getProducts()).find((entry) => entry.id === productId);
  if (!product) return false;
  const tombstone: StoredProduct = { ...product, deleted: true };
  if (redis) await redis.hset(KEY, { [productId]: JSON.stringify(tombstone) });
  else memoryProducts.set(productId, tombstone);
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
      badge: product.stock <= 0 ? "Esgotado" : original?.badge,
    };
  });
}
