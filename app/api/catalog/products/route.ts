import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/server/products-store";
import { getStockMap } from "@/lib/server/stock-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const [products, stockMap] = await Promise.all([getCatalogProducts(), getStockMap()]);
  return NextResponse.json(
    { products: products.map((product) => ({ ...product, stock: stockMap[product.id] ?? product.stock ?? 0 })) },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
