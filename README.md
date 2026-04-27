<div align="center">

# 💰 Finance Dashboard

**Aplicação fullstack de gestão financeira pessoal com autenticação, controle de contas e visualização de dados.**

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://finance-dashboard-three-weld-69.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)

[🔗 Demo ao vivo](https://finance-dashboard-three-weld-69.vercel.app) · [🐛 Reportar bug](https://github.com/landim9/finance-dashboard/issues) · [💡 Solicitar feature](https://github.com/landim9/finance-dashboard/issues)

</div>

---

## 📋 Sobre o Projeto

O Finance Dashboard é uma aplicação web fullstack que permite ao usuário gerenciar suas finanças pessoais de forma centralizada. O sistema oferece cadastro e autenticação de usuários, criação de contas (corrente, poupança, investimento, crédito), lançamento de transações com categorias e visualização dos dados em gráficos interativos.

### ✨ Funcionalidades

- 🔐 **Autenticação** — Cadastro e login com sessão protegida via NextAuth + JWT
- 🏦 **Contas** — Criação de contas por tipo (corrente, poupança, investimento, crédito) com saldo atualizado
- 💸 **Transações** — Registro de receitas e despesas com categoria, data e descrição
- 📊 **Dashboard** — Gráficos de evolução financeira por período com Recharts
- 🏷️ **Categorias** — Categorização personalizada com cor e ícone

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| ORM | Prisma |
| Banco de dados | PostgreSQL |
| Autenticação | NextAuth.js + bcryptjs |
| UI | Shadcn/UI + Radix UI |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Containerização | Docker |
| Deploy | Vercel |

---

## 🗄️ Modelo de Dados

```
Usuario
  ├── Conta (corrente | poupança | investimento | crédito)
  └── Transacao
        ├── tipo: RECEITA | DESPESA
        ├── Conta
        └── Categoria
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL ou Docker

### 1. Clone o repositório

```bash
git clone https://github.com/landim9/finance-dashboard.git
cd finance-dashboard
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_db"
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Suba o banco com Docker (opcional)

```bash
docker-compose up -d
```

### 5. Execute as migrations e seed

```bash
npx prisma migrate dev
npx prisma db seed
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Pastas

```
finance-dashboard/
├── app/
│   ├── dashboard/       # Página principal com gráficos
│   ├── login/           # Autenticação
│   ├── registro/        # Cadastro de usuário
│   ├── home/            # Landing page
│   └── api/             # Rotas de API (Next.js API Routes)
├── components/          # Componentes reutilizáveis
├── lib/                 # Utilitários e configurações
├── prisma/
│   ├── schema.prisma    # Modelo de dados
│   └── seed.ts          # Dados de demonstração
└── middleware.ts        # Proteção de rotas autenticadas
```

---

## 🌐 Deploy

A aplicação está disponível em produção via Vercel:

**[https://finance-dashboard-three-weld-69.vercel.app](https://finance-dashboard-three-weld-69.vercel.app)**

---

## 👨‍💻 Autor

**Rafael David**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-rafaeldaviddev-blue?logo=linkedin)](https://www.linkedin.com/in/rafaeldaviddev)
[![Portfolio](https://img.shields.io/badge/Portfolio-landim.vercel.app-black)](https://landim.vercel.app)
