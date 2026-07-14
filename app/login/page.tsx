"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loginClinica } from "@/lib/auth";
import { seedDatabase } from "@/lib/db";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    seedDatabase();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const resultado = loginClinica(email, senha);
    setCarregando(false);
    if (!resultado.ok) {
      setErro(resultado.erro ?? "Não foi possível entrar.");
      return;
    }
    router.push("/painel");
  }

  return (
    <>
      <Navbar />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
        <div className="card">
          <h1 className="font-display text-2xl font-bold text-brand-gray-900">Login da clínica</h1>
          <p className="mt-1 text-sm text-brand-gray-600">Acesse o painel para gerenciar seus agendamentos.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label-field">E-mail</label>
              <input
                required
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clinica@demo.com"
              />
            </div>
            <div>
              <label className="label-field">Senha</label>
              <input
                required
                type="password"
                className="input-field"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {erro && <p className="text-sm font-medium text-red-600">{erro}</p>}
            <button type="submit" disabled={carregando} className="btn-primary w-full">
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-5 rounded-xl bg-brand-lightBlue/50 p-3 text-xs text-brand-gray-700">
            <p className="font-semibold">Conta de demonstração:</p>
            <p>E-mail: clinica@demo.com</p>
            <p>Senha: demo123</p>
          </div>

          <p className="mt-6 text-center text-sm text-brand-gray-600">
            Ainda não tem cadastro?{" "}
            <Link href="/cadastro" className="font-semibold text-brand-darkBlue hover:underline">
              Cadastre sua clínica
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-brand-gray-500">
            É da equipe Método Fluxo?{" "}
            <Link href="/admin/login" className="font-semibold text-brand-darkBlue hover:underline">
              Acesse o painel interno
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
