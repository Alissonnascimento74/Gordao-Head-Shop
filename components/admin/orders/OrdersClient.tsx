"use client";

/**
 * OrdersClient — tela "Pedidos" do Admin.
 * ------------------------------------------------------------------
 * De onde vêm os pedidos: `initialOrders` chega pronto do Server
 * Component (app/admin/(painel)/pedidos/page.tsx), que lê
 * `listOrders()` direto de lib/server/orders-store.ts — sem passar por
 * API nenhuma nesse primeiro carregamento.
 *
 * Depois de montada, a tela também busca `GET /api/orders` a cada 15s
 * (e no botão "Atualizar"). É esse polling que faz um pedido pago pelo
 * Mercado Pago "aparecer sozinho" aqui: o webhook
 * (app/api/webhooks/mercadopago/route.ts) grava o pagamento aprovado no
 * MESMO orders-store, e o próximo polling desta tela já traz o pedido
 * atualizado. Não é "tempo real" de verdade (isso pediria WebSocket ou
 * Server-Sent Events) — é um intervalo curto, suficiente pra um painel
 * de admin.
 */

import { Fragment, useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy, Printer, RefreshCw, Truck } from "lucide-react";
import type { Order, OrderStatus, ShippingAddress } from "@/lib/admin/types";
import StatusBadge from "@/components/admin/StatusBadge";
import ShipOrderModal from "./ShipOrderModal";
import ShippingLabel from "./ShippingLabel";

const FILTERS: { value: OrderStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "aguardando_pagamento", label: "Aguardando pagamento" },
  { value: "pago", label: "Pago" },
  { value: "cancelado", label: "Cancelado" },
  { value: "separando", label: "Separando" },
  { value: "despachado", label: "Despachado" },
];

// Filtro por CANAL — independente do filtro por status acima. Existe
// pra separar vendas do PDV das vendas online (pedido explícito do
// lojista: "não misturar com os pedidos online").
const SOURCE_FILTERS: { value: "todos" | "online" | "fisico"; label: string }[] = [
  { value: "todos", label: "Todos os canais" },
  { value: "online", label: "Só online" },
  { value: "fisico", label: "Só balcão (PDV)" },
];

const POLL_INTERVAL_MS = 15_000;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

const PHYSICAL_PAYMENT_LABELS: Record<string, string> = {
  dinheiro: "Dinheiro",
  pix: "Pix",
  cartao_credito: "Cartão de Crédito (Maquininha)",
  cartao_debito: "Cartão de Débito",
};

function formatCPF(cpf: string) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/** Endereço inteiro numa linha só — o que o botão "Copiar Endereço" cola
 *  no clipboard, pronto pra colar direto no app do 99 ou no WhatsApp do motoboy. */
function formatAddressLine(address: ShippingAddress) {
  return `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}, CEP ${address.cep}`;
}

/**
 * CopyAddressButton — botão "Copiar Endereço" com feedback de "Copiado!".
 * ------------------------------------------------------------------
 * Componente próprio (em vez de um estado só no OrdersClient) porque cada
 * PEDIDO precisa do seu próprio timer de "Copiado!" — com um estado
 * compartilhado, copiar o endereço de um pedido acenderia o feedback em
 * todos os botões da tela ao mesmo tempo.
 */
function CopyAddressButton({ address }: { address: ShippingAddress }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formatAddressLine(address));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro, permissão
      // negada) — sem feedback de erro, só não acende o "Copiado!".
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`mt-2 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 text-slate-600 hover:bg-slate-100"
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copiado!" : "Copiar endereço"}
    </button>
  );
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");
  const [sourceFilter, setSourceFilter] = useState<"todos" | "online" | "fisico">("todos");
  const [orderToShip, setOrderToShip] = useState<Order | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  // Limpa a etiqueta assim que o diálogo de impressão fecha (imprimiu OU
  // cancelou) — sem isso, a última etiqueta impressa ficaria "presa" no
  // DOM (invisível na tela, mas pronta pra reaparecer se o admin apertar
  // Ctrl+P/Cmd+P sem querer imprimir nenhum pedido específico).
  useEffect(() => {
    function handleAfterPrint() {
      setPrintingOrder(null);
    }
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  function handlePrintLabel(order: Order) {
    setPrintingOrder(order);
    // Espera o React terminar de renderizar a etiqueta com os dados desse
    // pedido antes de abrir o diálogo de impressão — chamar window.print()
    // no mesmo tick arriscaria imprimir a etiqueta ainda com os dados
    // antigos (ou vazia).
    requestAnimationFrame(() => window.print());
  }

  async function fetchOrders() {
    setRefreshing(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setLastUpdated(new Date());
      }
    } catch {
      // Falha silenciosa — o próximo polling tenta de novo. Não vale a
      // pena incomodar o admin com um erro por causa de uma requisição
      // de atualização em segundo plano.
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    // Busca uma vez assim que a tela monta — sem isso, o admin ficava até
    // 15s olhando pra `initialOrders` (o snapshot do primeiro carregamento
    // no servidor) antes do primeiro polling rodar.
    fetchOrders();
    const interval = setInterval(fetchOrders, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const visibleOrders = orders.filter((order) => {
    const statusMatch = filter === "todos" || order.status === filter;
    const source = order.source ?? "online";
    const sourceMatch = sourceFilter === "todos" || source === sourceFilter;
    return statusMatch && sourceMatch;
  });

  async function handleConfirmShip(orderId: string, trackingCode: string) {
    // Atualização otimista: a tela muda na hora, sem esperar o servidor
    // responder. Se o POST abaixo falhar, o próximo polling (até 15s)
    // traz de volta o status real do orders-store — não precisa de
    // tratamento de erro mais elaborado que isso pra essa tela.
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "despachado", trackingCode } : order))
    );

    try {
      await fetch(`/api/orders/${orderId}/ship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode }),
      });
    } catch {
      // Falha de rede — deixa o próximo polling corrigir a tela.
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Pedidos</h1>
          <p className="text-sm text-slate-500">Acompanhe e despache os pedidos recebidos.</p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={refreshing}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {lastUpdated ? `Atualizado ${formatDate(lastUpdated.toISOString())}` : "Atualizar"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              filter === item.value
                ? "bg-brand-forest text-brand-cream"
                : "border border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        {SOURCE_FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setSourceFilter(item.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              sourceFilter === item.value
                ? "bg-brand-green text-brand-darker"
                : "border border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="px-5 py-3 font-medium">Pedido</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Ação</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleOrders.map((order) => {
                const canShip = order.status === "pago" || order.status === "separando";
                const isPickup = order.shippingMethod?.carrier === "Retirada";
                const isPhysical = order.source === "fisico";
                const expanded = expandedOrderId === order.id;
                const hasDetails = Boolean(
                  order.customerEmail ||
                    order.customerCPF ||
                    order.shippingAddress ||
                    order.shippingMethod ||
                    order.paymentMethodPhysical
                );
                return (
                  <Fragment key={order.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-700">{order.id}</td>
                      <td className="px-5 py-3">
                        <p className="text-slate-700">{order.customerName}</p>
                        <p className="text-xs text-slate-400">{order.customerPhone}</p>
                      </td>
                      <td className="px-5 py-3 text-slate-500">{formatDate(order.createdAt)}</td>
                      <td className="px-5 py-3 font-medium text-slate-700">{formatCurrency(order.total)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={order.status} isPickup={isPickup} isPhysical={isPhysical} />
                        {order.trackingCode && (
                          <p className="mt-1 text-xs text-slate-400">Rastreio: {order.trackingCode}</p>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {canShip ? (
                          <button
                            onClick={() => setOrderToShip(order)}
                            className="flex items-center gap-1.5 rounded-lg bg-brand-green px-3 py-1.5 text-xs font-semibold text-brand-darker hover:bg-brand-greenLight"
                          >
                            <Truck className="h-3.5 w-3.5" />
                            {isPickup ? "Marcar como retirado" : "Marcar como despachado"}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {hasDetails && (
                          <button
                            onClick={() => setExpandedOrderId(expanded ? null : order.id)}
                            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Ver detalhes do pedido"
                          >
                            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expanded && hasDetails && (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                            <div>
                              <p className="mb-1 font-semibold text-slate-500">Contato</p>
                              {order.customerEmail && <p className="text-slate-700">{order.customerEmail}</p>}
                              {order.customerCPF && <p className="text-slate-700">CPF: {formatCPF(order.customerCPF)}</p>}
                            </div>
                            {(order.shippingAddress || order.shippingMethod) && (
                              <div>
                                <p className="mb-1 font-semibold text-slate-500">Entrega</p>
                                {order.shippingMethod && (
                                  <p className="font-medium text-slate-700">
                                    {order.shippingMethod.carrier === "Retirada"
                                      ? "🏬 "
                                      : order.shippingMethod.isExpress
                                        ? "🏍️ "
                                        : "📦 "}
                                    {order.shippingMethod.label} —{" "}
                                    {formatCurrency(order.shippingMethod.price)}
                                  </p>
                                )}
                                {order.shippingMethod?.isExpress && (
                                  <span className="mt-1.5 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                                    ⚠️ Despacho Manual via App
                                  </span>
                                )}
                                {order.shippingAddress ? (
                                  <>
                                    <p className="mt-1 text-slate-700">
                                      {order.shippingAddress.street}, {order.shippingAddress.number}
                                    </p>
                                    <p className="text-slate-700">
                                      {order.shippingAddress.neighborhood} — {order.shippingAddress.city}/
                                      {order.shippingAddress.state}
                                    </p>
                                    <p className="text-slate-700">CEP: {order.shippingAddress.cep}</p>
                                    <div className="flex flex-wrap gap-2">
                                      <CopyAddressButton address={order.shippingAddress} />
                                      <button
                                        type="button"
                                        onClick={() => handlePrintLabel(order)}
                                        className="mt-2 flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                                      >
                                        <Printer className="h-3.5 w-3.5" />
                                        Imprimir etiqueta
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  // Retirada na loja — sem endereço porque não há envio: nada pra
                                  // copiar nem etiqueta pra imprimir, só separar e avisar o cliente.
                                  <p className="mt-1 text-slate-500">
                                    Cliente retira na loja — sem necessidade de envio.
                                  </p>
                                )}
                              </div>
                            )}
                            {order.paymentMethodPhysical && (
                              <div>
                                <p className="mb-1 font-semibold text-slate-500">Venda no balcão</p>
                                <p className="text-slate-700">
                                  💵 {PHYSICAL_PAYMENT_LABELS[order.paymentMethodPhysical] ?? order.paymentMethodPhysical}
                                </p>
                                <p className="mt-1 text-slate-500">Lançada direto pelo PDV — pago e entregue na hora.</p>
                              </div>
                            )}
                            <div>
                              <p className="mb-1 font-semibold text-slate-500">Itens</p>
                              {order.items.map((item, i) => (
                                <p key={i} className="text-slate-700">
                                  {item.quantity}x {item.productName} — {formatCurrency(item.unitPrice * item.quantity)}
                                </p>
                              ))}
                              {order.mpPaymentId && (
                                <p className="mt-1 text-slate-400">Pagamento MP: #{order.mpPaymentId}</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">
                    Nenhum pedido nesse status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ShipOrderModal order={orderToShip} onClose={() => setOrderToShip(null)} onConfirm={handleConfirmShip} />
      <ShippingLabel order={printingOrder} />
    </div>
  );
}
