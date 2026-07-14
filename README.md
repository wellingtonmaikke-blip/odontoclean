# 🦷 OdontoClean — Sistema Web Completo

Sistema institucional + painel de clínicas + painel administrativo interno para uma
empresa de limpeza e higienização especializada em clínicas odontológicas.

**Stack:** Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS
**Persistência:** localStorage (banco simulado) — pronto para ser trocado por
Supabase/PostgreSQL no futuro (veja seção "Evoluindo para um backend real").

---

## 1. Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/) 18 ou superior instalado.

```bash
# 1. Entre na pasta do projeto
cd odontoclean

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

Para gerar a versão de produção:
```bash
npm run build
npm start
```

> ⚠️ Nota sobre ambiente: este projeto é **Next.js/React/TypeScript**, não Python.
> Se você pretende rodar dentro de um ambiente virtual Python (venv/pyenv), ele
> não é necessário aqui — basta ter o Node.js instalado e seguir os passos acima.
> Caso precise mesmo de uma versão em Python (ex: Flask/Django), me avise que
> posso adaptar a arquitetura.

---

## 2. Contas de demonstração

### Login de clínica (`/login`)
- **E-mail:** clinica@demo.com
- **Senha:** demo123

### Login do painel interno (`/admin/login`)
- **E-mail:** admin@odontoclean.com.br
- **Senha:** admin123

Você também pode criar novas clínicas pela página `/cadastro`.

> Os dados ficam salvos no `localStorage` do navegador. Para "resetar" o banco de
> demonstração, limpe o localStorage do site (DevTools → Application → Local
> Storage → apagar tudo) ou abra em uma aba anônima.

---

## 3. Estrutura de pastas

```
odontoclean/
├── app/
│   ├── page.tsx                 → Home
│   ├── servicos/page.tsx        → Planos (Bronze, Prata, Ouro)
│   ├── diferenciais/page.tsx
│   ├── missao-visao/page.tsx
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── login/page.tsx           → Login da clínica
│   ├── cadastro/page.tsx        → Cadastro de nova clínica
│   ├── painel/                  → Área logada da CLÍNICA
│   │   ├── layout.tsx           → Protege rotas + sidebar
│   │   ├── page.tsx             → Dashboard
│   │   ├── agendar/page.tsx     → Agendar serviço (calendário)
│   │   ├── historico/page.tsx   → Histórico de agendamentos
│   │   ├── perfil/page.tsx      → Dados da clínica
│   │   └── planos/page.tsx      → Meus planos / trocar de plano
│   └── admin/                   → Painel INTERNO da OdontoClean
│       ├── login/page.tsx
│       ├── layout.tsx
│       ├── page.tsx             → Dashboard geral
│       ├── clinicas/page.tsx    → Gerenciar todas as clínicas
│       ├── agendamentos/page.tsx→ Gerenciar todos os agendamentos
│       └── servicos/page.tsx    → Editar preços dos planos
├── components/                  → Navbar, Footer, PlanCard, Calendário, etc.
├── lib/
│   ├── content.ts                ⭐ TODOS OS TEXTOS DO SITE (edite aqui)
│   ├── types.ts                  → Tipos TypeScript compartilhados
│   ├── db.ts                     → "Banco de dados" simulado (localStorage)
│   └── auth.ts                   → Login/logout/sessão (JWT simulado)
└── tailwind.config.ts             ⭐ CORES E FONTES (edite aqui)
```

---

## 4. Como editar facilmente

### ✏️ Textos do site (home, planos, missão, sobre, contato...)
Tudo está centralizado em **`lib/content.ts`**. Edite os objetos exportados,
por exemplo:

```ts
export const hero = {
  titulo: "Sua clínica impecavelmente limpa. Seus pacientes, mais seguros.",
  subtitulo: "...",
  ...
};
```

### 💰 Planos e preços
Também em `lib/content.ts`, no array `planos`. Cada plano tem `nome`, `tagline`,
`preco`, `descricao`, `beneficios` (lista) e `diferenciais` (lista). Basta editar
o array — as páginas Home, Serviços, Agendar e Meus Planos usam essa mesma fonte.

Preços também podem ser ajustados **em tempo real, sem mexer no código**, pelo
painel interno em `/admin/servicos` (login administrativo necessário).

### 🎨 Cores e fontes
Em **`tailwind.config.ts`**, dentro de `theme.extend.colors.brand`:
```ts
brand: {
  lightBlue: "#E0F2FE",
  darkBlue: "#0F766E",
  mint: "#34D399",
  ...
}
```
Troque os valores hexadecimais para alterar a identidade visual em todo o
sistema. As fontes (Inter/Poppins) são carregadas em `app/layout.tsx` via
`next/font/google` — troque por outra fonte do Google Fonts se desejar.

### 🏥 Adicionar novas clínicas manualmente
Duas formas:
1. Pelo formulário público `/cadastro` (recomendado).
2. Programaticamente, chamando `criarClinica(...)` de `lib/db.ts` (útil para
   seeds/scripts).

### 🗓️ Horários e frequências de agendamento
Em `app/painel/agendar/page.tsx`, os arrays `horariosDisponiveis` e
`frequencias` controlam as opções exibidas no formulário.

---

## 5. Funcionalidades incluídas

- ✅ Site institucional completo (Home, Serviços/Planos, Diferenciais, Missão e
  Visão, Sobre, Contato)
- ✅ Cadastro de clínicas com validação de formulário (CNPJ, e-mail, senha etc.)
- ✅ Login/logout simulado com "JWT" (assinatura + expiração em 8h)
- ✅ Painel da clínica: dashboard, agendamento com calendário, histórico com
  filtro por status, edição de perfil, troca de plano
- ✅ Painel interno (admin): dashboard geral, gestão de clínicas, gestão de
  agendamentos (mudar status), edição de preços dos planos
- ✅ Design responsivo, com paleta branco / azul-claro / azul-escuro / verde-menta
- ✅ Todos os textos comerciais em português, centralizados e editáveis

---

## 6. Evoluindo para um backend real

Este projeto usa `localStorage` para fins de demonstração e prototipagem rápida.
Para produção, recomenda-se:

1. Criar um projeto no [Supabase](https://supabase.com) (Postgres + Auth prontos).
2. Substituir as funções de `lib/db.ts` (`getClinicas`, `criarClinica`,
   `criarAgendamento` etc.) por chamadas ao `supabase-js` — a **assinatura das
   funções já foi pensada para isso**, então as páginas não precisam mudar.
3. Substituir `lib/auth.ts` por Supabase Auth ou NextAuth.js.
4. Mover `ADMIN_CREDENTIALS` para variáveis de ambiente (`.env`) e nunca deixar
   senhas no código-fonte em produção.

---

## 7. Deploy na Vercel

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o
   repositório.
3. A Vercel detecta automaticamente que é um projeto Next.js — não é necessário
   configurar nada manualmente (build command `next build`, output `.next`).
4. Clique em **Deploy**. Em poucos minutos você terá uma URL pública (ex:
   `odontoclean.vercel.app`).
5. Se/quando migrar para Supabase, adicione as variáveis de ambiente
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) em
   **Project Settings → Environment Variables** antes do deploy.

---

## 8. Próximos passos sugeridos

- Trocar o banco simulado por Supabase/PostgreSQL para persistência real
  entre dispositivos.
- Adicionar envio de e-mail/WhatsApp automático ao confirmar agendamentos.
- Gerar o "laudo de higienização" (plano Ouro) como PDF automático.
- Adicionar upload de logotipo/fotos por clínica.
