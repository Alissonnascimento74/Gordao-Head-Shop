"use client";

/**
 * CheckoutForm — formulário de checkout completo + resumo do pedido.
 * ------------------------------------------------------------------
 * Layout em 2 colunas (formulário à esquerda, resumo à direita),
 * empilha em 1 coluna no celular. Ao enviar:
 *
 *   1) Confere os campos obrigatórios e o CPF (utils/validators.ts).
 *   2) Chama POST /api/checkout com os itens do carrinho + dados do
 *      cliente — essa rota recalcula os preços no servidor, grava o
 *      pedido e cria a Preference no Mercado Pago.
 *   3) Redireciona o navegador pro `init_point` devolvido — o cliente
 *      cai na página de pagamento hospedada pelo Mercado Pago (Pix,
 *      cartão etc., a pessoa escolhe lá).
 *
 * CEP: ao sair do campo (ou ao completar 8 dígitos), busca o endereço
 * na ViaCEP (API pública, sem chave) e preenche rua/bairro/cidade/estado
 * sozinho — a pessoa só confirma e completa o número.
 */

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Loader2, MapPin, Package } from "lucide-react";
import { formatCEP, formatCPF, formatPhone, isValidCPF } from "@/utils/validators";
import type { ShippingAddress } from "@/lib/admin/types";
import { PICKUP_OPTION, STORE_PICKUP_ADDRESS, type ShippingOption } from "@/lib/shipping/types";
import ShippingCalculator from "./ShippingCalculator";

export type CheckoutCartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CheckoutForm({ items }: { items: CheckoutCartItem[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<ShippingAddress>({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (shipping?.price ?? 0);
  const isPickup = shipping?.id === PICKUP_OPTION.id;

  async function handleCepBlur() {
    const digits = address.cep.replace(/\D/g, "");
    if (digits.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddress((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      // Busca de CEP é só uma conveniência — se falhar, a pessoa
      // preenche o endereço na mão mesmo, sem travar o checkout.
    } finally {
      setCepLoading(false);
    }
  }

  function updateAddress<K extends keyof ShippingAddress>(field: K, value: ShippingAddress[K]) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!isValidCPF(cpf)) {
      setError("CPF inválido. Confira os números digitados.");
      return;
    }
    if (!shipping) {
      setError("Selecione uma opção de frete.");
      return;
    }
    if (!isPickup && (!address.cep || !address.street || !address.number || !address.city || !address.state)) {
      setError("Preencha o endereço de entrega completo.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
          customer: { name, email, cpf, phone },
          // Retirar na loja não precisa de endereço nenhum — o servidor
          // (app/api/checkout/route.ts) reconhece PICKUP_OPTION.id e não
          // exige/usa esse campo nesse caso.
          shippingAddress: isPickup ? undefined : address,
          shippingOptionId: shipping.id,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.init_point) {
        throw new Error(data.error || "Não foi possível iniciar o pagamento.");
      }

      window.location.href = data.init_point;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o pagamento.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      {/* ---------------- Formulário ---------------- */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#e3e6de] bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-[#1f2b23]">Dados pessoais</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Nome completo</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">CPF</label>
              <input
                required
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                inputMode="numeric"
                maxLength={14}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Telefone</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                inputMode="numeric"
                maxLength={15}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="(11) 98765-4321"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">E-mail</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="voce@email.com"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3e6de] bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-[#1f2b23]">
            <MapPin className="h-4 w-4 text-[#4caf6d]" />
            Endereço de entrega
          </h2>
          {isPickup && (
            <p className="-mt-3 mb-4 text-sm text-[#5f7767]">
              Não precisa preencher — você escolheu retirar na loja (ver opção "Frete" abaixo).
            </p>
          )}
          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isPickup ? "opacity-50" : ""}`}>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">CEP</label>
              <div className="relative">
                <input
                  required={!isPickup}
                  value={address.cep}
                  onChange={(e) => updateAddress("cep", formatCEP(e.target.value))}
                  onBlur={handleCepBlur}
                  inputMode="numeric"
                  maxLength={9}
                  className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                  placeholder="00000-000"
                />
                {cepLoading && (
                  <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#5f7767]" />
                )}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Número</label>
              <input
                required={!isPickup}
                value={address.number}
                onChange={(e) => updateAddress("number", e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="123"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Rua</label>
              <input
                required={!isPickup}
                value={address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
                placeholder="Preenchido automático pelo CEP"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Bairro</label>
              <input
                required={!isPickup}
                value={address.neighborhood}
                onChange={(e) => updateAddress("neighborhood", e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Cidade</label>
              <input
                required={!isPickup}
                value={address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1f2b23]">Estado</label>
              <select
                required={!isPickup}
                value={address.state}
                onChange={(e) => updateAddress("state", e.target.value)}
                className="w-full rounded-lg border border-[#e3e6de] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#4caf6d]"
              >
                <option value="" disabled>
                  UF
                </option>
                {BRAZIL_STATES.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3e6de] bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-[#1f2b23]">
            <Package className="h-4 w-4 text-[#4caf6d]" />
            Frete
          </h2>
          <ShippingCalculator cep={address.cep} selected={shipping} onSelect={setShipping} />
        </div>
      </div>

      {/* ---------------- Resumo do pedido ---------------- */}
      <div className="lg:sticky lg:top-6">
        <div className="rounded-2xl border border-[#e3e6de] bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-[#1f2b23]">Resumo do pedido</h2>

          <ul className="space-y-3 border-b border-[#e3e6de] pb-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f4ef]">
                  {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#1f2b23]">{item.name}</p>
                  <p className="text-xs text-[#5f7767]">Qtd. {item.quantity}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-[#1f2b23]">
                  {formatBRL(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 py-4 text-sm">
            <div className="flex justify-between text-[#5f7767]">
              <span>Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#5f7767]">
              <span>Frete{shipping ? ` (${shipping.label})` : ""}</span>
              <span>
                {shipping ? (shipping.price === 0 ? "Grátis" : formatBRL(shipping.price)) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between border-t border-[#e3e6de] pt-4">
            <span className="text-sm text-[#5f7767]">Total</span>
            <span className="font-display text-2xl text-[#1f2b23]">{formatBRL(total)}</span>
          </div>

          {error && <p className="mt-4 text-sm text-[#e08585]">{error}</p>}

          <button
            type="submit"
            disabled={submitting || items.length === 0 || !shipping}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#4caf6d] py-3.5 text-sm font-semibold text-[#0a0d0a] transition hover:bg-[#5fc47f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Preparando pagamento..." : "Ir para Pagamento"}
          </button>
          <p className="mt-3 text-center text-xs text-[#5f7767]">
            Você escolhe Pix ou cartão na próxima tela, no ambiente seguro do Mercado Pago.
          </p>
        </div>
      </div>
    </form>
  );
}
