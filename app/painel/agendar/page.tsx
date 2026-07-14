"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessao } from "@/lib/auth";
import { criarAgendamento } from "@/lib/db";
import { planos } from "@/lib/content";
import { Frequencia, PlanoId } from "@/lib/types";
import SimpleCalendar from "@/components/SimpleCalendar";

const frequencias: { id: Frequencia; label: string; descricao: string }[] = [
  { id: "unica", label: "Única", descricao: "Um único atendimento" },
  { id: "semanal", label: "Semanal", descricao: "Repete toda semana" },
  { id: "quinzenal", label: "Quinzenal", descricao: "A cada 15 dias" },
  { id: "mensal", label: "Mensal", descricao: "Uma vez por mês" },
];

const horariosDisponiveis = ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"];

export default function AgendarPage() {
  const router = useRouter();
  const [plano, setPlano] = useState<PlanoId>("bronze");
  const [data, setData] = useState<string | null>(null);
  const [horario, setHorario] = useState<string>("");
  const [frequencia, setFrequencia] = useState<Frequencia>("unica");
  const [observacoes, setObservacoes] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!getSessao()) router.replace("/login");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    const sessao = getSessao();
    if (!sessao) return;
    if (!data || !horario) {
      setErro("Selecione uma data e um horário para continuar.");
      return;
    }

    criarAgendamento({
      clinicaId: sessao.id,
      plano,
      data,
      horario,
      frequencia,
      observacoes,
    });
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-lg card text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint/15 text-2xl text-brand-mintDark">
          ✓
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-brand-gray-900">Agendamento realizado!</h2>
        <p className="mt-2 text-brand-gray-600">
          Seu serviço foi agendado com sucesso. Você pode acompanhar o status no histórico.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => router.push("/painel/historico")} className="btn-primary">Ver histórico</button>
          <button
            onClick={() => {
              setEnviado(false);
              setData(null);
              setHorario("");
              setObservacoes("");
            }}
            className="btn-secondary"
          >
            Novo agendamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Agendar serviço</h1>
      <p className="mt-1 text-brand-gray-600">Escolha o plano, a data, o horário e a frequência desejada.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card">
            <label className="label-field">1. Escolha o plano</label>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {planos.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPlano(p.id)}
                  className={`rounded-xl border-2 p-3 text-left transition ${
                    plano === p.id
                      ? "border-brand-darkBlue bg-brand-lightBlue/50"
                      : "border-brand-gray-200 hover:border-brand-darkBlue/40"
                  }`}
                >
                  <p className="font-display text-sm font-bold text-brand-gray-900">{p.nome}</p>
                  <p className="mt-1 text-xs text-brand-gray-600">R$ {p.preco.toLocaleString("pt-BR")}{p.precoLabel}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <label className="label-field">2. Frequência</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {frequencias.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => setFrequencia(f.id)}
                  className={`rounded-xl border-2 p-3 text-left transition ${
                    frequencia === f.id
                      ? "border-brand-mint bg-brand-mint/10"
                      : "border-brand-gray-200 hover:border-brand-mint/40"
                  }`}
                >
                  <p className="text-sm font-semibold text-brand-gray-900">{f.label}</p>
                  <p className="text-xs text-brand-gray-600">{f.descricao}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <label className="label-field">3. Horário</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {horariosDisponiveis.map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setHorario(h)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
                    horario === h
                      ? "border-brand-darkBlue bg-brand-darkBlue text-white"
                      : "border-brand-gray-200 text-brand-gray-700 hover:border-brand-darkBlue/40"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <label className="label-field">Observações (opcional)</label>
            <textarea
              className="input-field"
              rows={3}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: portaria, ponto de referência, instruções de acesso..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="label-field mb-2">4. Escolha a data</label>
            <SimpleCalendar value={data} onChange={setData} />
          </div>

          {erro && <p className="text-sm font-medium text-red-600">{erro}</p>}

          <button type="submit" className="btn-primary w-full">Confirmar agendamento</button>
        </div>
      </form>
    </div>
  );
}
