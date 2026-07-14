"use client";

// =============================================================================
// AUTENTICAÇÃO SIMULADA (fake JWT + localStorage)
// Em produção, substitua por NextAuth, Clerk ou outro provedor real.
// A estrutura do "token" abaixo imita um JWT (header.payload.signature)
// apenas para fins didáticos — NÃO é criptograficamente seguro.
// =============================================================================

import { Sessao } from "./types";
import { fakeHash, getClinicaPorEmail } from "./db";

const SESSION_KEY = "metodofluxo_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 horas

// Credenciais do painel administrativo interno (equipe Método Fluxo).
// Em produção isso viria de um banco protegido, nunca do código-fonte.
export const ADMIN_CREDENTIALS = {
  email: "admin@metodofluxo.com.br",
  senha: "admin123",
  nome: "Administrador Método Fluxo",
};

function base64urlEncode(obj: unknown) {
  if (typeof window === "undefined") return "";
  return window.btoa(JSON.stringify(obj));
}
function base64urlDecode<T>(str: string): T | null {
  try {
    return JSON.parse(window.atob(str)) as T;
  } catch {
    return null;
  }
}

function criarToken(payload: Sessao): string {
  const header = base64urlEncode({ alg: "fake-HS256", typ: "JWT" });
  const body = base64urlEncode(payload);
  const signature = fakeHash(header + body + "metodofluxo_secret");
  return `${header}.${body}.${signature}`;
}

function lerToken(token: string): Sessao | null {
  const partes = token.split(".");
  if (partes.length !== 3) return null;
  const [header, body, signature] = partes;
  const esperado = fakeHash(header + body + "metodofluxo_secret");
  if (esperado !== signature) return null;
  return base64urlDecode<Sessao>(body);
}

export function loginClinica(email: string, senha: string): { ok: boolean; erro?: string } {
  const clinica = getClinicaPorEmail(email);
  if (!clinica) return { ok: false, erro: "E-mail não encontrado." };
  if (clinica.senhaHash !== fakeHash(senha)) return { ok: false, erro: "Senha incorreta." };

  const sessao: Sessao = {
    tipo: "clinica",
    id: clinica.id,
    nome: clinica.responsavel,
    email: clinica.email,
    exp: Date.now() + SESSION_DURATION_MS,
  };
  window.localStorage.setItem(SESSION_KEY, criarToken(sessao));
  return { ok: true };
}

export function loginAdmin(email: string, senha: string): { ok: boolean; erro?: string } {
  if (email !== ADMIN_CREDENTIALS.email || senha !== ADMIN_CREDENTIALS.senha) {
    return { ok: false, erro: "Credenciais administrativas inválidas." };
  }
  const sessao: Sessao = {
    tipo: "admin",
    id: "admin",
    nome: ADMIN_CREDENTIALS.nome,
    email: ADMIN_CREDENTIALS.email,
    exp: Date.now() + SESSION_DURATION_MS,
  };
  window.localStorage.setItem(SESSION_KEY, criarToken(sessao));
  return { ok: true };
}

export function getSessao(): Sessao | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(SESSION_KEY);
  if (!token) return null;
  const sessao = lerToken(token);
  if (!sessao) return null;
  if (sessao.exp < Date.now()) {
    logout();
    return null;
  }
  return sessao;
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
