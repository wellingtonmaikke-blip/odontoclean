"use client";

import { useEffect, useState } from "react";
import { getSessao } from "@/lib/auth";
import { atualizarClinica, getClinicaPorId } from "@/lib/db";
import { Clinica } from "@/lib/types";

export default function PerfilPage() {
  const [clinica, setClinica] = useState<Clinica | null>(null);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const sessao = getSessao();
    if (!sessao) return;
    setClinica(getClinicaPorId(sessao.id) ?? null);
  }, []);

  function update<K extends keyof Clinica>(campo: K, valor: Clinica[K]) {
    setClinica((c) => (c ? { ...c, [campo]: valor } : c));
    setSalvo(false);
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!clinica) return;
    atualizarClinica(clinica.id, clinica);
    setSalvo(true);
  }

  if (!clinica) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Perfil da clínica</h1>
      <p className="mt-1 text-brand-gray-600">Mantenha os dados da sua clínica sempre atualizados.</p>

      <form onSubmit={salvar} className="card mt-6 space-y-5">
        <div>
          <label className="label-field">Nome da clínica</label>
          <input className="input-field" value={clinica.nomeClinica} onChange={(e) => update("nomeClinica", e.target.value)} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">CNPJ</label>
            <input className="input-field" value={clinica.cnpj} onChange={(e) => update("cnpj", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Telefone</label>
            <input className="input-field" value={clinica.telefone} onChange={(e) => update("telefone", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label-field">Endereço</label>
          <input className="input-field" value={clinica.endereco} onChange={(e) => update("endereco", e.target.value)} />
        </div>
        <div>
          <label className="label-field">Responsável</label>
          <input className="input-field" value={clinica.responsavel} onChange={(e) => update("responsavel", e.target.value)} />
        </div>
        <div>
          <label className="label-field">E-mail</label>
          <input className="input-field bg-brand-gray-50" value={clinica.email} disabled />
          <p className="mt-1 text-xs text-brand-gray-500">O e-mail de login não pode ser alterado.</p>
        </div>

        {salvo && <p className="text-sm font-medium text-brand-mintDark">Alterações salvas com sucesso!</p>}
        <button type="submit" className="btn-primary w-full sm:w-auto">Salvar alterações</button>
      </form>
    </div>
  );
}
