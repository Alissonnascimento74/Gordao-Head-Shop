"use client";

/**
 * ShippingCalculator — cotação de frete em tempo real dentro do checkout.
 * ------------------------------------------------------------------
 * Recebe o CEP de destino (vem do formulário de endereço, em
 * CheckoutForm.tsx) e, assim que ele tiver 8 dígitos, busca
 * POST /api/shipping e mostra as opções como radio buttons — igual ao
 * padrão do resto do checkout (uma opção selecionada por vez).
 *
 * Quando a cotação inclui o 99 Entrega (só acontece pra CEPs da região
 * metropolitana da loja, dentro do raio de alcance — ver
 * lib/shipping/calculate.ts), essa opção ganha um badge verde "Chega
 * Hoje!" pra chamar atenção — é a opção mais rápida, mesmo custando mais
 * que PAC/Sedex.
 */

import { useEffect, useRef, useState } from "react";
import { Loader2, Truck, Zap } from "lucide-react";
import type { ShippingOption } from "@/lib/shipping/types";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ShippingCalculator({
  cep,
  selected,
  onSelect,
}: {
  cep: string;
  selected: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
}) {
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetchedCep = useRef<string | null>(null);

  useEffect(() => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) {
      // CEP incompleto (ex.: a pessoa apagou pra corrigir) — limpa a
      // cotação anterior em vez de deixar uma opção "presa" na tela.
      setOptions([]);
      lastFetchedCep.current = null;
      return;
    }
    if (digits === lastFetchedCep.current) return; // já cotado pra esse CEP

    let cancelled = false;
    lastFetchedCep.current = digits;
    setLoading(true);
    setError(null);

    fetch("/api/shipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cep: digits }),
    })
      .then((res) => res.json())
      .then((data: { options?: ShippingOption[]; error?: string }) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          setOptions([]);
          return;
        }
        const fetchedOptions = data.options || [];
        setOptions(fetchedOptions);
        // Pré-seleciona a mais barata — o cliente ainda pode trocar pra
        // uma mais rápida (99 Entrega) se ela aparecer na lista.
        const cheapest = fetchedOptions.reduce<ShippingOption | null>(
          (min, opt) => (!min || opt.price < min.price ? opt : min),
          null
        );
        if (cheapest) onSelect(cheapest);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível calcular o frete agora.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onSelect é estável o bastante aqui; incluir causaria loop
  }, [cep]);

  if (cep.replace(/\D/g, "").length !== 8) {
    return <p className="text-sm text-[#5f7767]">Informe o CEP acima pra ver as opções de frete.</p>;
  }

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-[#5f7767]">
        <Loader2 className="h-4 w-4 animate-spin" />
        Calculando frete...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-[#e08585]">{error}</p>;
  }

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = selected?.id === option.id;
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
              isSelected ? "border-[#4caf6d] bg-[#4caf6d]/5" : "border-[#e3e6de] hover:border-[#c3cec0]"
            }`}
          >
            <input
              type="radio"
              name="shipping-option"
              checked={isSelected}
              onChange={() => onSelect(option)}
              className="h-4 w-4 accent-[#4caf6d]"
            />
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[#1f2b23]">{option.label}</span>
                  {option.isExpress && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#4caf6d] px-2 py-0.5 text-[11px] font-semibold text-[#0a0d0a]">
                      <Zap className="h-3 w-3" />
                      Chega Hoje!
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[#5f7767]">{option.estimatedDelivery}</p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-medium text-[#1f2b23]">
              {option.price === 0 ? "Grátis" : formatBRL(option.price)}
            </span>
          </label>
        );
      })}
      {options.some((o) => o.isExpress) && (
        <p className="flex items-center gap-1.5 pt-1 text-xs text-[#5f7767]">
          <Truck className="h-3.5 w-3.5" />
          Entrega expressa disponível — sua região é atendida pelo 99 Entrega.
        </p>
      )}
    </div>
  );
}
