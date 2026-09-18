"use client";

/**
 * useSecretAdminAccess — easter egg de acesso ao Admin.
 * ------------------------------------------------------------------
 * Regra: 5 cliques no mesmo elemento (o logo, por exemplo), todos dentro
 * de uma janela de menos de 2 segundos, revelam o link "Painel Admin".
 *
 * Por que uma janela "deslizante" (rolling window) em vez de só contar
 * cliques e resetar com um timer? Porque assim a regra fica exatamente
 * "os últimos 5 cliques aconteceram em menos de 2 segundos", não "clique
 * 5 vezes antes que um cronômetro acabe" — o que é mais tolerante a
 * pausas pequenas entre cliques, mas ainda exige que sejam rápidos.
 *
 * Isolado num hook porque a mesma lógica é usada em dois lugares (o logo
 * do Header e o logo do Footer) — sem duplicar código, e se a regra
 * mudar um dia (ex.: 3 cliques em vez de 5), muda só aqui.
 */

import { useCallback, useRef, useState } from "react";

// Quantos cliques são necessários pra revelar o botão.
const REQUIRED_CLICKS = 5;
// Janela de tempo (em milissegundos) dentro da qual esses cliques precisam acontecer.
const WINDOW_MS = 2000;

export function useSecretAdminAccess() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Guarda o horário (timestamp) de cada clique recente. Usa useRef (não
  // useState) porque essa lista muda a cada clique mas não precisa
  // provocar uma nova renderização da tela sozinha — só o `showAdmin`
  // precisa disso.
  const clickTimestampsRef = useRef<number[]>([]);

  const handleSecretClick = useCallback(() => {
    // Já revelado — não tem mais nada pra contar.
    if (showAdmin) return;

    const now = Date.now();

    // Descarta cliques antigos (fora da janela de 2s) e registra este novo.
    const recentClicks = clickTimestampsRef.current.filter((timestamp) => now - timestamp < WINDOW_MS);
    recentClicks.push(now);
    clickTimestampsRef.current = recentClicks;

    if (recentClicks.length >= REQUIRED_CLICKS) {
      setShowAdmin(true);
      clickTimestampsRef.current = []; // limpa, não precisa mais contar
    }
  }, [showAdmin]);

  return { showAdmin, handleSecretClick };
}
