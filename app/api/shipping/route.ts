/**
 * POST /api/shipping — cotação de frete pro CEP de destino.
 * ------------------------------------------------------------------
 * Chamada pelo componente components/checkout/ShippingCalculator.tsx
 * assim que o cliente termina de digitar o CEP no checkout. Toda a
 * lógica de verdade (geocoding, distância, preço de cada transportadora)
 * mora em lib/shipping/calculate.ts — essa rota só valida a entrada e
 * repassa. A MESMA função é chamada de novo, no servidor, dentro de
 * app/api/checkout/route.ts na hora de fechar o pedido — pra nunca
 * confiar no preço de frete que o navegador mandar de volta.
 */

import { NextResponse } from "next/server";
import { calculateShippingOptions } from "@/lib/shipping/calculate";

export async function POST(request: Request) {
  let body: { cep?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const digits = (body.cep || "").replace(/\D/g, "");
  if (digits.length !== 8) {
    return NextResponse.json({ error: "CEP inválido." }, { status: 400 });
  }

  const result = await calculateShippingOptions(digits);
  if (result.error) {
    return NextResponse.json(result, { status: 404 });
  }
  return NextResponse.json(result);
}
