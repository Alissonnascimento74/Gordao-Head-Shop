"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Não foi possível entrar.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Falha de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-brand-forest bg-brand-dark p-8 shadow-xl">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-brand-green">
          <Image src="/logo-gordao.jpg" alt="Gordão HeadShop" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-brand-cream">Painel Admin</h1>
          <p className="text-sm text-brand-sage">Gordão HeadShop</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm text-brand-sage">
            Usuário
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-brand-forestLight bg-brand-darker px-3 py-2 focus-within:border-brand-green">
            <User className="h-4 w-4 text-brand-sage" />
            <input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-sm text-brand-cream outline-none placeholder:text-brand-sageDark"
              placeholder="Gordãoheadshop"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-brand-sage">
            Senha
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-brand-forestLight bg-brand-darker px-3 py-2 focus-within:border-brand-green">
            <Lock className="h-4 w-4 text-brand-sage" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-brand-cream outline-none placeholder:text-brand-sageDark"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-darker transition hover:bg-brand-greenLight disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Entrar
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-brand-sageDark">
        Acesso restrito à administração da loja.
      </p>
    </div>
  );
}
