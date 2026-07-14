"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAgendamentos, getClinicas } from "@/lib/db";
import { Agendamento, Clinica } from "@/lib/types";
import { servicos } from "@/lib/content";

export default function AdminDashboard() {
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    setClinicas(getClinicas());
    setAgendamentos(getAgendamentos());
  }, []);

  const hoje = new Date().toISOString().slice(0, 10);
  const agendamentosHoje = agendamentos.filter((a) => a.data === hoje);
  const pendentes = agendamentos.filter((a) => a.status === "pendente");

  const contagemPorServico = servicos.map((s) => ({
    servico: s.nome,
    total: clinicas.filter((c) => c.servicoAtual === s.id).length,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Painel administrativo</h1>
      <p className="mt-1 text-brand-gray-600">Visão geral de todas as clínicas e agendamentos da Método Fluxo.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-sm text-brand-gray-600">Clínicas cadastradas</p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-gray-900">{clinicas.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-gray-600">Agendamentos hoje</p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-gray-900">{agendamentosHoje.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-gray-600">Pendentes de confirmação</p>
          <p className="mt-1 font-display text-2xl font-bold text-yellow-600">{pendentes.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-gray-600">Total de agendamentos</p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-gray-900">{agendamentos.length}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-display font-bold text-brand-gray-900">Clínicas por serviço contratado</h2>
          <div className="mt-4 space-y-3">
            {contagemPorServico.map((c) => (
              <div key={c.servico} className="flex items-center justify-between">
                <span className="text-sm text-brand-gray-700">{c.servico}</span>
                <span className="rounded-full bg-brand-lightBlue px-3 py-1 text-xs font-semibold text-brand-darkBlue">
                  {c.total} clínica(s)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-brand-gray-900">Últimas clínicas cadastradas</h2>
            <Link href="/admin/clinicas" className="text-sm font-semibold text-brand-darkBlue hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {clinicas.slice(-4).reverse().map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className="text-brand-gray-900">{c.nomeClinica}</span>
                <span className="text-brand-gray-500">{c.email}</span>
              </div>
            ))}
            {clinicas.length === 0 && <p className="text-sm text-brand-gray-500">Nenhuma clínica cadastrada ainda.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
