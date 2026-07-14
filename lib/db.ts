"use client";

// =============================================================================
// "BANCO DE DADOS" SIMULADO — localStorage
// Em produção, substitua estas funções por chamadas a uma API real
// (Supabase, PostgreSQL, etc). A interface (nomes de função e retornos)
// foi pensada para facilitar essa troca no futuro.
// =============================================================================

import { Agendamento, Clinica } from "./types";

const KEYS = {
  clinicas: "metodofluxo_clinicas",
  agendamentos: "metodofluxo_agendamentos",
  seeded: "metodofluxo_seeded_v1",
};

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// Hash simples apenas para fins de demonstração (NÃO usar em produção real).
export function fakeHash(senha: string): string {
  let hash = 0;
  for (let i = 0; i < senha.length; i++) {
    hash = (hash << 5) - hash + senha.charCodeAt(i);
    hash |= 0;
  }
  return `h${Math.abs(hash)}`;
}

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// -----------------------------------------------------------------------------
// SEED — dados iniciais de demonstração
// -----------------------------------------------------------------------------
export function seedDatabase() {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(KEYS.seeded)) return;

  const clinicaDemo: Clinica = {
    id: uid("clinica"),
    nomeClinica: "Clínica Sorriso Perfeito",
    cnpj: "12.345.678/0001-90",
    endereco: "Av. Sete de Setembro, 4000 — Curitiba, PR",
    telefone: "(41) 99999-1234",
    responsavel: "Dra. Marina Souza",
    email: "clinica@demo.com",
    senhaHash: fakeHash("demo123"),
    servicoAtual: "implantacao",
    criadoEm: new Date().toISOString(),
  };

  const agendamentosDemo: Agendamento[] = [
    {
      id: uid("agend"),
      clinicaId: clinicaDemo.id,
      servico: "mentoria",
      data: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
      horario: "08:00",
      frequencia: "mensal",
      status: "confirmado",
      observacoes: "Portaria libera acesso a partir das 7h30.",
      criadoEm: new Date().toISOString(),
    },
    {
      id: uid("agend"),
      clinicaId: clinicaDemo.id,
      servico: "implantacao",
      data: new Date(Date.now() - 20 * 86400000).toISOString().slice(0, 10),
      horario: "08:00",
      frequencia: "unica",
      status: "concluido",
      criadoEm: new Date().toISOString(),
    },
  ];

  writeLS(KEYS.clinicas, [clinicaDemo]);
  writeLS(KEYS.agendamentos, agendamentosDemo);
  window.localStorage.setItem(KEYS.seeded, "true");
}

// -----------------------------------------------------------------------------
// CLÍNICAS
// -----------------------------------------------------------------------------
export function getClinicas(): Clinica[] {
  return readLS<Clinica[]>(KEYS.clinicas, []);
}

export function getClinicaPorEmail(email: string): Clinica | undefined {
  return getClinicas().find((c) => c.email.toLowerCase() === email.toLowerCase());
}

export function getClinicaPorId(id: string): Clinica | undefined {
  return getClinicas().find((c) => c.id === id);
}

export function criarClinica(dados: Omit<Clinica, "id" | "criadoEm" | "senhaHash"> & { senha: string }): Clinica {
  const clinicas = getClinicas();
  const nova: Clinica = {
    id: uid("clinica"),
    nomeClinica: dados.nomeClinica,
    cnpj: dados.cnpj,
    endereco: dados.endereco,
    telefone: dados.telefone,
    responsavel: dados.responsavel,
    email: dados.email,
    senhaHash: fakeHash(dados.senha),
    servicoAtual: dados.servicoAtual ?? null,
    criadoEm: new Date().toISOString(),
  };
  writeLS(KEYS.clinicas, [...clinicas, nova]);
  return nova;
}

export function atualizarClinica(id: string, dados: Partial<Clinica>) {
  const clinicas = getClinicas().map((c) => (c.id === id ? { ...c, ...dados } : c));
  writeLS(KEYS.clinicas, clinicas);
}

export function excluirClinica(id: string) {
  writeLS(KEYS.clinicas, getClinicas().filter((c) => c.id !== id));
}

// -----------------------------------------------------------------------------
// AGENDAMENTOS
// -----------------------------------------------------------------------------
export function getAgendamentos(): Agendamento[] {
  return readLS<Agendamento[]>(KEYS.agendamentos, []);
}

export function getAgendamentosPorClinica(clinicaId: string): Agendamento[] {
  return getAgendamentos()
    .filter((a) => a.clinicaId === clinicaId)
    .sort((a, b) => (a.data > b.data ? -1 : 1));
}

export function criarAgendamento(dados: Omit<Agendamento, "id" | "criadoEm" | "status">): Agendamento {
  const agendamentos = getAgendamentos();
  const novo: Agendamento = {
    ...dados,
    id: uid("agend"),
    status: "pendente",
    criadoEm: new Date().toISOString(),
  };
  writeLS(KEYS.agendamentos, [...agendamentos, novo]);

  // Atualiza o serviço atual da clínica ao agendar
  atualizarClinica(dados.clinicaId, { servicoAtual: dados.servico });

  return novo;
}

export function atualizarAgendamento(id: string, dados: Partial<Agendamento>) {
  const agendamentos = getAgendamentos().map((a) => (a.id === id ? { ...a, ...dados } : a));
  writeLS(KEYS.agendamentos, agendamentos);
}

export function excluirAgendamento(id: string) {
  writeLS(KEYS.agendamentos, getAgendamentos().filter((a) => a.id !== id));
}

// -----------------------------------------------------------------------------
// PREÇOS DOS SERVIÇOS (overrides editáveis pelo painel admin)
// Os textos/serviços "base" ficam em lib/content.ts. Aqui guardamos apenas
// ajustes de preço feitos pelo admin em tempo de execução (demonstração).
// Para editar permanentemente nome, descrição e benefícios, edite lib/content.ts.
// -----------------------------------------------------------------------------
const PRECOS_KEY = "metodofluxo_precos_override";

export interface FaixaPreco {
  min: number;
  max: number;
}

export function getPrecosOverride(): Record<string, FaixaPreco> {
  return readLS<Record<string, FaixaPreco>>(PRECOS_KEY, {});
}

export function salvarPrecoServico(servicoId: string, faixa: FaixaPreco) {
  const atual = getPrecosOverride();
  writeLS(PRECOS_KEY, { ...atual, [servicoId]: faixa });
}
