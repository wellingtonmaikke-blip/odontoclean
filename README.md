# 🦷 Método Fluxo — Sistema Web Completo

Sistema institucional + painel de clínicas + painel administrativo interno para uma
consultoria de **eficiência operacional para clínicas odontológicas** (organização,
implantação de protocolos, treinamento de equipes e mentoria mensal).

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

---

## 2. Contas de demonstração

### Login de clínica (`/login`)
- **E-mail:** clinica@demo.com
- **Senha:** demo123

### Login do painel interno (`/admin/login`)
- **E-mail:** admin@metodofluxo.com.br
- **Senha:** admin123

Você também pode criar novas clínicas pela página `/cadastro`.

> Os dados ficam salvos no `localStorage` do navegador. Para "resetar" o banco de
> demonstração, limpe o localStorage do site (DevTools → Application → Local
> Storage → apagar tudo) ou abra em uma aba anônima.

---

## 3. Os 5 serviços (conforme o plano de negócio)

Todos definidos em `lib/content.ts`, no array `servicos`:

1. **Diagnóstico Operacional** (R$ 300–700) — porta de entrada. Visita de 1 hora,
   avaliação da clínica e relatório com pontuação de 0 a 100.
2. **Implantação Completa** (R$ 2.500–6.000) — serviço principal. Organização de
   instrumentais, bandejas, estoque, esterilização, checklists, manual da clínica
   e treinamento da equipe. Inclui o selo **Clínica Organizada®**.
3. **Treinamento de ASBs** (R$ 1.500–4.000) — 9 módulos práticos, com certificado.
4. **Manual e Documentação de Protocolos** (R$ 1.500–3.000) — POPs, manuais e
   checklists diário/semanal/mensal.
5. **Mentoria Mensal** (R$ 700–2.000/mês) — serviço recorrente: auditoria,
   reciclagem, treinamento e acompanhamento mensal.

---

## 4. Estrutura de pastas

```
odontoclean/
├── app/
│   ├── page.tsx                 → Home
│   ├── servicos/page.tsx        → Os 5 serviços do Método Fluxo
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
│   │   └── servicos/page.tsx    → Meus serviços / contratar outro serviço
│   └── admin/                   → Painel INTERNO do Método Fluxo
│       ├── login/page.tsx
│       ├── layout.tsx
│       ├── page.tsx             → Dashboard geral
│       ├── clinicas/page.tsx    → Gerenciar todas as clínicas
│       ├── agendamentos/page.tsx→ Gerenciar todos os agendamentos
│       └── servicos/page.tsx    → Editar faixas de preço dos serviços
├── components/                  → Navbar, Footer, ServicoCard, Calendário, etc.
├── lib/
│   ├── content.ts                ⭐ TODOS OS TEXTOS DO SITE (edite aqui)
│   ├── types.ts                  → Tipos TypeScript compartilhados
│   ├── db.ts                     → "Banco de dados" simulado (localStorage)
│   └── auth.ts                   → Login/logout/sessão (JWT simulado)
└── tailwind.config.ts             ⭐ CORES E FONTES (edite aqui)
```

---

## 5. Como editar facilmente

### ✏️ Textos do site (home, serviços, missão, sobre, contato...)
Tudo está centralizado em **`lib/content.ts`**. Edite os objetos exportados,
por exemplo:

```ts
export const hero = {
  titulo: "Nós organizamos a operação da sua clínica...",
  subtitulo: "...",
  ...
};
```

### 💰 Serviços e preços
Também em `lib/content.ts`, no array `servicos`. Cada serviço tem `nome`, `tagline`,
`tipo` (`avulso` ou `recorrente`), `precoMin`, `precoMax`, `precoLabel`, `descricao`,
`inclui` (lista), `entrega` e `diferenciais` (lista). Basta editar o array — as
páginas Home, Serviços, Agendar e Meus Serviços usam essa mesma fonte.

Faixas de preço também podem ser ajustadas **em tempo real, sem mexer no código**,
pelo painel interno em `/admin/servicos` (login administrativo necessário).

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

### 🗓️ Horários de agendamento
Em `app/painel/agendar/page.tsx`, o array `horariosDisponiveis` controla as
opções exibidas no formulário. A frequência (única ou mensal) é definida
automaticamente conforme o `tipo` do serviço escolhido.

---

## 6. Funcionalidades incluídas

- ✅ Site institucional completo (Home, Serviços, Diferenciais, Missão e
  Visão, Sobre, Contato)
- ✅ Cadastro de clínicas com validação de formulário (CNPJ, e-mail, senha etc.)
- ✅ Login/logout simulado com "JWT" (assinatura + expiração em 8h)
- ✅ Painel da clínica: dashboard, agendamento com calendário, histórico com
  filtro por status, edição de perfil, contratação de serviços
- ✅ Painel interno (admin): dashboard geral, gestão de clínicas, gestão de
  agendamentos (mudar status), edição de faixas de preço dos serviços
- ✅ Design responsivo, com paleta branco / azul-claro / azul-escuro / verde-menta
- ✅ Todos os textos comerciais em português, centralizados e editáveis,
  fiéis ao plano de negócio do Método Fluxo

---

## 7. Evoluindo para um backend real

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

## 8. Deploy na Vercel

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o
   repositório.
3. A Vercel detecta automaticamente que é um projeto Next.js — não é necessário
   configurar nada manualmente (build command `next build`, output `.next`).
4. Clique em **Deploy**. Em poucos minutos você terá uma URL pública.
5. Se/quando migrar para Supabase, adicione as variáveis de ambiente
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) em
   **Project Settings → Environment Variables** antes do deploy.

---

## 9. Próximos passos sugeridos

- Trocar o banco simulado por Supabase/PostgreSQL para persistência real
  entre dispositivos.
- Adicionar envio de e-mail/WhatsApp automático ao confirmar agendamentos.
- Gerar o relatório do Diagnóstico Operacional (pontuação 0–100) como PDF.
- Emitir o certificado/selo Clínica Organizada® automaticamente após a
  Implantação Completa.
- Adicionar upload de logotipo/fotos por clínica.
