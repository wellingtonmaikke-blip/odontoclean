"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSessao } from "@/lib/auth";
import { getAgendamentosPorClinica, getClinicaPorId } from "@/lib/db";
import { Agendamento, Clinica } from "@/lib/types";
import { servicos } from "@/lib/content";

const statusEstilo: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  confirmado: "bg-brand-lightBlue text-brand-darkBlue",
  concluido: "bg-brand-mint/15 text-brand-mintDark",
  cancelado: "bg-red-100 text-red-700",
};

export default function PainelDashboard() {
  const [clinica, setClinica] = useState<Clinica | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const sessao = getSessao();
    if (!sessao) return;
    const c = getClinicaPorId(sessao.id);
    setClinica(c ?? null);
    if (c) setAgendamentos(getAgendamentosPorClinica(c.id));
  }, []);

  const proximos = agendamentos
    .filter((a) => a.status !== "cancelado" && a.data >= new Date().toISOString().slice(0, 10))
    .slice(0, 3);

  const servicoAtual = servicos.find((s) => s.id === clinica?.servicoAtual);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">
        Olá, {clinica?.responsavel?.split(" ")[0] ?? "bem-vindo"} 👋
      </h1>
      <p className="mt-1 text-brand-gray-600">
        Aqui está um resumo dos próximos serviços de {clinica?.nomeClinica ?? "sua clínica"}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-brand-gray-600">Serviço atual</p>
          <p className="mt-1 font-display text-xl font-bold text-brand-darkBlue">
            {servicoAtual ? servicoAtual.nome : "Nenhum serviço contratado"}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-gray-600">Agendamentos futuros</p>
          <p className="mt-1 font-display text-xl font-bold text-brand-gray-900">{proximos.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-gray-600">Total de serviços realizados</p>
          <p className="mt-1 font-display text-xl font-bold text-brand-gray-900">
            {agendamentos.filter((a) => a.status === "concluido").length}
          </p>
        </div>
      </div>

      <div className="mt-8 card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-brand-gray-900">Próximos agendamentos</h2>
          <Link href="/painel/agendar" className="text-sm font-semibold text-brand-darkBlue hover:underline">
            + Novo agendamento
          </Link>
        </div>

        {proximos.length === 0 ? (
          <div className="mt-6 rounded-xl bg-brand-gray-50 p-6 text-center text-sm text-brand-gray-600">
            Você ainda não tem agendamentos futuros.{" "}
            <Link href="/painel/agendar" className="font-semibold text-brand-darkBlue hover:underline">
              Agendar agora
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {proximos.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-gray-100 p-4">
                <div>
                  <p className="font-semibold text-brand-gray-900">
                    {servicos.find((s) => s.id === a.servico)?.nome}
                  </p>
                  <p className="text-sm text-brand-gray-600">
                    {new Date(a.data + "T00:00:00").toLocaleDateString("pt-BR")} às {a.horario}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusEstilo[a.status]}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
