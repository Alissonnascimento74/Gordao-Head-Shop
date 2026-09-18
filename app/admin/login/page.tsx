import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login — Painel Gordão HeadShop",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-darker px-4">
      <LoginForm />
    </main>
  );
}
