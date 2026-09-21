/**
 * validators.ts — validação e formatação de CPF/telefone/CEP.
 * ------------------------------------------------------------------
 * Compartilhado entre o formulário de checkout (validação instantânea
 * enquanto a pessoa digita) e a API de checkout (validação de verdade,
 * já que nunca dá pra confiar só no que rodou no navegador).
 */

/** Confere os dígitos verificadores do CPF (algoritmo oficial da Receita). */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  // Rejeita tamanho errado e sequências repetidas (111.111.111-11 etc.,
  // que passam na conta dos dígitos verificadores mas não são CPFs reais).
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0;
    for (const digit of base) total += Number(digit) * factor--;
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calcCheckDigit(digits.slice(0, 9), 10);
  const digit2 = calcCheckDigit(digits.slice(0, 10), 11);
  return digit1 === Number(digits[9]) && digit2 === Number(digits[10]);
}

/** Formata enquanto digita: "12345678901" -> "123.456.789-01". */
export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/** Formata enquanto digita: "11987654321" -> "(11) 98765-4321". */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
}

/** Formata enquanto digita: "12345678" -> "12345-678". */
export function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
