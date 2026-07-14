"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { criarClinica, getClinicaPorEmail, seedDatabase } from "@/lib/db";
import { loginClinica } from "@/lib/auth";
import { planos } from "@/lib/content";
import { PlanoId } from "@/lib/types";

type FormState = {
  nomeClinica: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  responsavel: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  planoAtual: PlanoId | "";
};

const estadoInicial: FormState = {
  nomeClinica: "",
  cnpj: "",
  endereco: "",
  telefone: "",
  responsavel: "",
  email: "",
  senha: "",
  confirmarSenha: "",
  planoAtual: "",
};

function validarCNPJFormato(cnpj: string) {
  // Validação simples de formato (não verifica dígitos verificadores reais)
  const limpo = cnpj.replace(/\D/g, "");
  return limpo.length === 14;
}

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(estadoInicial);
  const [erros, setErros] = useState<Partial<Record<keyof FormState, string>>>({});
  const [erroGeral, setErroGeral] = useState("");

  useEffect(() => {
    seedDatabase();
  }, []);

  function update<K extends keyof FormState>(campo: K, valor: FormState[K]) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function validar(): boolean {
    const novosErros: Partial<Record<keyof FormState, string>> = {};
    if (form.nomeClinica.trim().length < 2) novosErros.nomeClinica = "Informe o nome da clínica.";
    if (!validarCNPJFormato(form.cnpj)) novosErros.cnpj = "CNPJ inválido (14 dígitos).";
    if (form.endereco.trim().length < 5) novosErros.endereco = "Informe o endereço completo.";
    if (form.telefone.trim().length < 8) novosErros.telefone = "Informe um telefone válido.";
    if (form.responsavel.trim().length < 2) novosErros.responsavel = "Informe o responsável.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) novosErros.email = "E-mail inválido.";
    if (form.senha.length < 6) novosErros.senha = "A senha deve ter ao menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErroGeral("");
    if (!validar()) return;

    if (getClinicaPorEmail(form.email)) {
      setErroGeral("Já existe uma clínica cadastrada com esse e-mail.");
      return;
    }

    criarClinica({
      nomeClinica: form.nomeClinica,
      cnpj: form.cnpj,
      endereco: form.endereco,
      telefone: form.telefone,
      responsavel: form.responsavel,
      email: form.email,
      senha: form.senha,
      planoAtual: form.planoAtual || null,
    });

    loginClinica(form.email, form.senha);
    router.push("/painel");
  }

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="card">
          <h1 className="font-display text-2xl font-bold text-brand-gray-900">Cadastre sua clínica</h1>
          <p className="mt-1 text-sm text-brand-gray-600">
            Leva menos de 2 minutos. Depois disso você já pode agendar seu primeiro serviço.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Nome da clínica *</label>
                <input className="input-field" value={form.nomeClinica} onChange={(e) => update("nomeClinica", e.target.value)} placeholder="Clínica Sorriso Feliz" />
                {erros.nomeClinica && <p className="mt-1 text-xs text-red-600">{erros.nomeClinica}</p>}
              </div>
              <div>
                <label className="label-field">CNPJ *</label>
                <input className="input-field" value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} placeholder="00.000.000/0000-00" />
                {erros.cnpj && <p className="mt-1 text-xs text-red-600">{erros.cnpj}</p>}
              </div>
            </div>

            <div>
              <label className="label-field">Endereço completo *</label>
              <input className="input-field" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Rua, número, bairro, cidade - UF" />
              {erros.endereco && <p className="mt-1 text-xs text-red-600">{erros.endereco}</p>}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Responsável *</label>
                <input className="input-field" value={form.responsavel} onChange={(e) => update("responsavel", e.target.value)} placeholder="Nome do responsável" />
                {erros.responsavel && <p className="mt-1 text-xs text-red-600">{erros.responsavel}</p>}
              </div>
              <div>
                <label className="label-field">Telefone *</label>
                <input className="input-field" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(00) 00000-0000" />
                {erros.telefone && <p className="mt-1 text-xs text-red-600">{erros.telefone}</p>}
              </div>
            </div>

            <div>
              <label className="label-field">E-mail *</label>
              <input type="email" className="input-field" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="voce@clinica.com" />
              {erros.email && <p className="mt-1 text-xs text-red-600">{erros.email}</p>}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Senha *</label>
                <input type="password" className="input-field" value={form.senha} onChange={(e) => update("senha", e.target.value)} placeholder="Mínimo 6 caracteres" />
                {erros.senha && <p className="mt-1 text-xs text-red-600">{erros.senha}</p>}
              </div>
              <div>
                <label className="label-field">Confirmar senha *</label>
                <input type="password" className="input-field" value={form.confirmarSenha} onChange={(e) => update("confirmarSenha", e.target.value)} placeholder="Repita a senha" />
                {erros.confirmarSenha && <p className="mt-1 text-xs text-red-600">{erros.confirmarSenha}</p>}
              </div>
            </div>

            <div>
              <label className="label-field">Plano de interesse (opcional)</label>
              <select className="input-field" value={form.planoAtual} onChange={(e) => update("planoAtual", e.target.value as PlanoId | "")}>
                <option value="">Selecionar depois</option>
                {planos.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome} — {p.tagline}</option>
                ))}
              </select>
            </div>

            {erroGeral && <p className="text-sm font-medium text-red-600">{erroGeral}</p>}

            <button type="submit" className="btn-primary w-full">Criar minha conta</button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-gray-600">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-brand-darkBlue hover:underline">Fazer login</Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
