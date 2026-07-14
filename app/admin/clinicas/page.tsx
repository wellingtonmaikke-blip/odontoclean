"use client";

import { useEffect, useState } from "react";
import { excluirClinica, getClinicas } from "@/lib/db";
import { Clinica } from "@/lib/types";
import { planos } from "@/lib/content";

export default function AdminClinicasPage() {
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [busca, setBusca] = useState("");

  function carregar() {
    setClinicas(getClinicas());
  }

  useEffect(() => {
    carregar();
  }, []);

  function remover(id: string, nome: string) {
    if (confirm(`Remover a clínica "${nome}"? Esta ação não pode ser desfeita.`)) {
      excluirClinica(id);
      carregar();
    }
  }

  const filtradas = clinicas.filter(
    (c) =>
      c.nomeClinica.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-gray-900">Clínicas cadastradas</h1>
          <p className="mt-1 text-brand-gray-600">Gerencie todas as clínicas atendidas pela OdontoClean.</p>
        </div>
        <input
          className="input-field max-w-xs"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl2 bg-white shadow-card ring-1 ring-black/5">
        <table className="min-w-full divide-y divide-brand-gray-100 text-sm">
          <thead className="bg-brand-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Clínica</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Responsável</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Contato</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Plano</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-100">
            {filtradas.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-gray-900">{c.nomeClinica}</p>
                  <p className="text-xs text-brand-gray-500">{c.cnpj}</p>
                </td>
                <td className="px-4 py-3 text-brand-gray-700">{c.responsavel}</td>
                <td className="px-4 py-3">
                  <p className="text-brand-gray-700">{c.email}</p>
                  <p className="text-xs text-brand-gray-500">{c.telefone}</p>
                </td>
                <td className="px-4 py-3">
                  {c.planoAtual ? (
                    <span className="rounded-full bg-brand-lightBlue px-3 py-1 text-xs font-semibold text-brand-darkBlue">
                      {planos.find((p) => p.id === c.planoAtual)?.nome}
                    </span>
                  ) : (
                    <span className="text-xs text-brand-gray-400">Sem plano</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => remover(c.id, c.nomeClinica)} className="text-xs font-semibold text-red-600 hover:underline">
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-brand-gray-500">
                  Nenhuma clínica encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
