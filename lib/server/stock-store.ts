/**
 * stock-store.ts — estoque real, compartilhado entre PDV, checkout online
 * e a tela de Produtos do Admin.
 * ------------------------------------------------------------------
 * Antes deste arquivo existir, "estoque" era só um número mockado —
 * cada tela (Produtos, checkout) tinha sua própria cópia, e nenhuma
 * baixa acontecia de verdade nunca (nem uma venda online decrementava
 * nada). Isso quebrava exatamente o que o lojista pediu no PDV: "unificar
 * o controle de estoque" só funciona se existir UM número real, no mesmo
 * lugar, que todo mundo lê e escreve.
 *
 * O hash gh:product-stock guarda unidades disponíveis. Reservas de checkout
 * e PDV são registradas por pedido e alteradas em scripts Lua atômicos,
 * evitando vender as mesmas unidades em requisições simultâneas. Reservas
 * online expiram junto com a validade de pagamento do Mercado Pago.
 *
 * Pedidos online reservam no checkout; pagamento aprovado confirma a reserva
 * sem nova baixa. Pedido cancelado ou preferência expirada libera as unidades.
 * O PDV reserva e confirma na mesma requisição.
 */
import { redis } from "@/lib/server/redis";
import { PRODUCTS } from "@/app/products";

const STOCK_KEY = "gh:product-stock";
const SEEDED_KEY = "gh:stock:seeded";
const RESERVATIONS_KEY = "gh:stock:reservations";
const RESERVATION_EXPIRY_KEY = "gh:stock:reservation-expiry";
const RESERVATION_TTL_MS = 3 * 24 * 60 * 60 * 1000;
type ReservationItem = { productId: string; quantity: number };
type Reservation = { status: "reserved" | "committed" | "released" | "expired"; items: ReservationItem[] };
const memoryReservations = new Map<string, { reservation: Reservation; expiresAt: number }>();

// Cada operação confere e altera estoque/reserva dentro de um único script
// Redis, impedindo que checkout, PDV e webhooks disputem as mesmas unidades.
const STOCK_RESERVATION_SCRIPT = `
local stockKey, reservationsKey, expiryKey = KEYS[1], KEYS[2], KEYS[3]
local action, now, id, ttl, payload = ARGV[1], tonumber(ARGV[2]), ARGV[3], tonumber(ARGV[4]), ARGV[5]
local expired = redis.call('ZRANGEBYSCORE', expiryKey, '-inf', now)
for _, expiredId in ipairs(expired) do
  local raw = redis.call('HGET', reservationsKey, expiredId)
  if raw then
    local reservation = cjson.decode(raw)
    if reservation.status == 'reserved' then
      for _, item in ipairs(reservation.items) do redis.call('HINCRBY', stockKey, item.productId, item.quantity) end
      reservation.status = 'expired'
      redis.call('HSET', reservationsKey, expiredId, cjson.encode(reservation))
    end
  end
  redis.call('ZREM', expiryKey, expiredId)
end
if action == 'cleanup' then return 1 end
local raw = redis.call('HGET', reservationsKey, id)
local reservation = raw and cjson.decode(raw) or nil
if action == 'reserve' then
  if reservation and reservation.status == 'reserved' then return 1 end
  if reservation and reservation.status == 'committed' then return 1 end
  if reservation then return 0 end
  local items = cjson.decode(payload)
  for _, item in ipairs(items) do
    if tonumber(redis.call('HGET', stockKey, item.productId) or '0') < item.quantity then return 0 end
  end
  for _, item in ipairs(items) do redis.call('HINCRBY', stockKey, item.productId, -item.quantity) end
  local saved = { status = 'reserved', items = items }
  redis.call('HSET', reservationsKey, id, cjson.encode(saved))
  redis.call('ZADD', expiryKey, now + ttl, id)
  return 1
end
if not reservation then return 0 end
if action == 'release' then
  if reservation.status == 'reserved' then
    for _, item in ipairs(reservation.items) do redis.call('HINCRBY', stockKey, item.productId, item.quantity) end
    reservation.status = 'released'
    redis.call('HSET', reservationsKey, id, cjson.encode(reservation))
    redis.call('ZREM', expiryKey, id)
  end
  return 1
end
if action == 'commit' then
  if reservation.status == 'committed' then return 1 end
  if reservation.status == 'reserved' then
    reservation.status = 'committed'
    redis.call('HSET', reservationsKey, id, cjson.encode(reservation))
    redis.call('ZREM', expiryKey, id)
    return 1
  end
  if reservation.status == 'expired' then
    for _, item in ipairs(reservation.items) do
      if tonumber(redis.call('HGET', stockKey, item.productId) or '0') < item.quantity then return -1 end
    end
    for _, item in ipairs(reservation.items) do redis.call('HINCRBY', stockKey, item.productId, -item.quantity) end
    reservation.status = 'committed'
    redis.call('HSET', reservationsKey, id, cjson.encode(reservation))
    return 1
  end
  return 0
end
return 0
`;
const STOCK_DELTA_SCRIPT = `
local current = tonumber(redis.call('HGET', KEYS[1], ARGV[1]) or '0')
local delta = tonumber(ARGV[2])
if current + delta < 0 then return -1 end
return redis.call('HINCRBY', KEYS[1], ARGV[1], delta)
`;
const STOCK_SET_SCRIPT = `
local stockKey, reservationsKey, expiryKey = KEYS[1], KEYS[2], KEYS[3]
local productId, desired, now = ARGV[1], tonumber(ARGV[2]), tonumber(ARGV[3])
local expired = redis.call('ZRANGEBYSCORE', expiryKey, '-inf', now)
for _, expiredId in ipairs(expired) do
  local raw = redis.call('HGET', reservationsKey, expiredId)
  if raw then
    local reservation = cjson.decode(raw)
    if reservation.status == 'reserved' then
      for _, item in ipairs(reservation.items) do redis.call('HINCRBY', stockKey, item.productId, item.quantity) end
      reservation.status = 'expired'
      redis.call('HSET', reservationsKey, expiredId, cjson.encode(reservation))
    end
  end
  redis.call('ZREM', expiryKey, expiredId)
end
local held = 0
for _, activeId in ipairs(redis.call('ZRANGE', expiryKey, 0, -1)) do
  local raw = redis.call('HGET', reservationsKey, activeId)
  if raw then
    local reservation = cjson.decode(raw)
    if reservation.status == 'reserved' then
      for _, item in ipairs(reservation.items) do if item.productId == productId then held = held + item.quantity end end
    end
  end
end
if desired < held then return -1 end
return redis.call('HSET', stockKey, productId, desired - held)
`;

async function runReservationScript(action: string, id = "", items: ReservationItem[] = []): Promise<number> {
  if (!redis) return 0;
  return Number(await redis.eval(STOCK_RESERVATION_SCRIPT,
    [STOCK_KEY, RESERVATIONS_KEY, RESERVATION_EXPIRY_KEY],
    [action, String(Date.now()), id, String(RESERVATION_TTL_MS), JSON.stringify(items)]));
}

function cleanupMemoryReservations() {
  const now = Date.now();
  for (const [id, entry] of memoryReservations) {
    if (entry.reservation.status === "reserved" && entry.expiresAt <= now) {
      for (const item of entry.reservation.items) memoryStock[item.productId] = (memoryStock[item.productId] ?? 0) + item.quantity;
      entry.reservation.status = "expired";
      memoryReservations.set(id, entry);
    }
  }
}

export async function reserveStock(reservationId: string, items: ReservationItem[]): Promise<boolean> {
  await seedIfNeeded();
  if (redis) return (await runReservationScript("reserve", reservationId, items)) === 1;
  cleanupMemoryReservations();
  if (memoryReservations.has(reservationId) || items.some((item) => (memoryStock[item.productId] ?? 0) < item.quantity)) return false;
  for (const item of items) memoryStock[item.productId] -= item.quantity;
  memoryReservations.set(reservationId, {
    reservation: { status: "reserved", items }, expiresAt: Date.now() + RESERVATION_TTL_MS,
  });
  return true;
}

export async function releaseStockReservation(reservationId: string): Promise<void> {
  await seedIfNeeded();
  if (redis) { await runReservationScript("release", reservationId); return; }
  cleanupMemoryReservations();
  const entry = memoryReservations.get(reservationId);
  if (!entry || entry.reservation.status !== "reserved") return;
  for (const item of entry.reservation.items) memoryStock[item.productId] = (memoryStock[item.productId] ?? 0) + item.quantity;
  entry.reservation.status = "released";
}

export async function commitStockReservation(reservationId: string): Promise<boolean> {
  await seedIfNeeded();
  if (redis) return (await runReservationScript("commit", reservationId)) === 1;
  cleanupMemoryReservations();
  const entry = memoryReservations.get(reservationId);
  if (!entry) return false;
  if (entry.reservation.status === "committed") return true;
  if (entry.reservation.status === "reserved") { entry.reservation.status = "committed"; return true; }
  if (entry.reservation.status !== "expired" || entry.reservation.items.some((item) => (memoryStock[item.productId] ?? 0) < item.quantity)) return false;
  for (const item of entry.reservation.items) memoryStock[item.productId] -= item.quantity;
  entry.reservation.status = "committed";
  return true;
}

// Fallback só usado quando o Redis não está configurado (dev local sem
// as credenciais copiadas) — mesmo padrão do orders-store.ts.
const memoryStock: Record<string, number> = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product.stock ?? 0])
);

let seedPromise: Promise<void> | null = null;
function seedIfNeeded(): Promise<void> {
  if (!redis) return Promise.resolve();
  if (!seedPromise) {
    seedPromise = (async () => {
      const acquired = await redis!.set(SEEDED_KEY, "1", { nx: true });
      if (!acquired) return; // outra requisição já semeou (ou está semeando)
      const seed: Record<string, number> = {};
      for (const product of PRODUCTS) seed[product.id] = product.stock ?? 0;
      await redis!.hset(STOCK_KEY, seed);
    })();
  }
  return seedPromise;
}

export async function getStockMap(): Promise<Record<string, number>> {
  if (redis) {
    await seedIfNeeded();
    await runReservationScript("cleanup");
    // HGETALL devolve os valores como string (ver o mesmo aviso em
    // product-costs.ts) — normaliza pra number antes de devolver.
    const data = await redis.hgetall<Record<string, string | number>>(STOCK_KEY);
    if (!data) return {};
    return Object.fromEntries(Object.entries(data).map(([id, value]) => [id, Number(value)]));
  }
  cleanupMemoryReservations();
  return { ...memoryStock };
}

export async function getStock(productId: string): Promise<number> {
  if (redis) {
    await seedIfNeeded();
    await runReservationScript("cleanup");
    const value = await redis.hget<string | number>(STOCK_KEY, productId);
    return value === null || value === undefined ? 0 : Number(value);
  }
  cleanupMemoryReservations();
  return memoryStock[productId] ?? 0;
}

/** Incrementa (delta positivo) ou decrementa (delta negativo) o estoque
 *  de um produto, atomicamente. Devolve o novo valor. */
export async function adjustStock(productId: string, delta: number): Promise<number> {
  if (redis) {
    await seedIfNeeded();
    return Number(await redis.eval(STOCK_DELTA_SCRIPT, [STOCK_KEY], [productId, String(delta)]));
  }
  const next = (memoryStock[productId] ?? 0) + delta;
  if (next < 0) return -1;
  memoryStock[productId] = next;
  return next;
}

export async function setStock(productId: string, stock: number): Promise<boolean> {
  if (redis) {
    await seedIfNeeded();
    const result = Number(await redis.eval(STOCK_SET_SCRIPT,
      [STOCK_KEY, RESERVATIONS_KEY, RESERVATION_EXPIRY_KEY], [productId, String(stock), String(Date.now())]));
    return result >= 0;
  } else {
    cleanupMemoryReservations();
    const held = [...memoryReservations.values()]
      .filter((entry) => entry.reservation.status === "reserved")
      .flatMap((entry) => entry.reservation.items)
      .filter((item) => item.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
    if (stock < held) return false;
    memoryStock[productId] = stock - held;
    return true;
  }
}
