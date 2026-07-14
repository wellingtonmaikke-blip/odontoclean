"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin, ADMIN_CREDENTIALS } from "@/lib/auth";
import { seedDatabase } from "@/lib/db";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    seedDatabase();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resultado = loginAdmin(email, senha);
    if (!resultado.ok) {
      setErro(resultado.erro ?? "Não foi possível entrar.");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl2 bg-white p-8 shadow-premium">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-darkBlue font-display text-lg font-bold text-white">M</span>
          <span className="font-display text-xl font-bold text-brand-gray-900">Método Fluxo · Interno</span>
        </div>
        <p className="mt-2 text-sm text-brand-gray-600">Acesso restrito à equipe Método Fluxo.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">E-mail administrativo</label>
            <input className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ADMIN_CREDENTIALS.email} />
          </div>
          <div>
            <label className="label-field">Senha</label>
            <input type="password" className="input-field" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
          </div>
          {erro && <p className="text-sm font-medium text-red-600">{erro}</p>}
          <button type="submit" className="btn-primary w-full">Entrar no painel interno</button>
        </form>

        <div className="mt-5 rounded-xl bg-brand-gray-50 p-3 text-xs text-brand-gray-600">
          <p className="font-semibold">Credenciais de demonstração:</p>
          <p>E-mail: {ADMIN_CREDENTIALS.email}</p>
          <p>Senha: {ADMIN_CREDENTIALS.senha}</p>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-brand-gray-500 hover:underline">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  );
}
