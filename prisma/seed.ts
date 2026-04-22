import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { TipoTransacao, TipoConta } from "./generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

import bcrypt from "bcryptjs"

async function main() {
  console.log("🌱 Iniciando seed...");

  const senhaHash = await bcrypt.hash("123456", 10)

  // Usuário principal
  const usuario = await prisma.usuario.upsert({
    where: { email: "rafael@financeapp.com" },
    update: {},
    create: {
      nome: "Rafael David",
      email: "rafael@financeapp.com",
      senha: senhaHash,
    },
  });

  // Categorias
  const categorias = await Promise.all([
    prisma.categoria.upsert({ where: { nome: "Salário" },        update: {}, create: { nome: "Salário",        cor: "#22c55e", icone: "briefcase" } }),
    prisma.categoria.upsert({ where: { nome: "Freelance" },      update: {}, create: { nome: "Freelance",      cor: "#84cc16", icone: "laptop" } }),
    prisma.categoria.upsert({ where: { nome: "Investimentos" },  update: {}, create: { nome: "Investimentos",  cor: "#eab308", icone: "trending-up" } }),
    prisma.categoria.upsert({ where: { nome: "Aluguel" },        update: {}, create: { nome: "Aluguel",        cor: "#8b5cf6", icone: "home" } }),
    prisma.categoria.upsert({ where: { nome: "Alimentação" },    update: {}, create: { nome: "Alimentação",    cor: "#f97316", icone: "utensils" } }),
    prisma.categoria.upsert({ where: { nome: "Transporte" },     update: {}, create: { nome: "Transporte",     cor: "#3b82f6", icone: "car" } }),
    prisma.categoria.upsert({ where: { nome: "Saúde" },          update: {}, create: { nome: "Saúde",          cor: "#14b8a6", icone: "heart-pulse" } }),
    prisma.categoria.upsert({ where: { nome: "Educação" },       update: {}, create: { nome: "Educação",       cor: "#6366f1", icone: "book-open" } }),
    prisma.categoria.upsert({ where: { nome: "Lazer" },          update: {}, create: { nome: "Lazer",          cor: "#ec4899", icone: "gamepad-2" } }),
    prisma.categoria.upsert({ where: { nome: "Assinaturas" },    update: {}, create: { nome: "Assinaturas",    cor: "#64748b", icone: "repeat" } }),
  ]);

  const [salario, freelance, investimentos, aluguel, alimentacao, transporte, saude, educacao, lazer, assinaturas] = categorias;

  // Contas
  const contaCorrente = await prisma.conta.upsert({
    where: { id: "conta-corrente-001" },
    update: {},
    create: {
      id: "conta-corrente-001",
      nome: "Conta Corrente Nubank",
      tipo: TipoConta.CORRENTE,
      saldo: 4850.75,
      usuarioId: usuario.id,
    },
  });

  const poupanca = await prisma.conta.upsert({
    where: { id: "conta-poupanca-001" },
    update: {},
    create: {
      id: "conta-poupanca-001",
      nome: "Poupança Caixa",
      tipo: TipoConta.POUPANCA,
      saldo: 18200.00,
      usuarioId: usuario.id,
    },
  });

  const investimento = await prisma.conta.upsert({
    where: { id: "conta-investimento-001" },
    update: {},
    create: {
      id: "conta-investimento-001",
      nome: "Carteira XP Investimentos",
      tipo: TipoConta.INVESTIMENTO,
      saldo: 32500.00,
      usuarioId: usuario.id,
    },
  });

  // Transações — últimos 3 meses
  const transacoes = [
    // ── Abril 2026 ──────────────────────────────────────────
    { titulo: "Salário Abril",           valor: 7200.00, tipo: TipoTransacao.RECEITA, data: new Date("2026-04-05"), categoriaId: salario.id,       contaId: contaCorrente.id },
    { titulo: "Projeto Freelance — App", valor: 2400.00, tipo: TipoTransacao.RECEITA, data: new Date("2026-04-11"), categoriaId: freelance.id,     contaId: contaCorrente.id },
    { titulo: "Rendimento CDB",          valor:  310.50, tipo: TipoTransacao.RECEITA, data: new Date("2026-04-15"), categoriaId: investimentos.id, contaId: investimento.id  },
    { titulo: "Aluguel Apartamento",     valor: 1950.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-01"), categoriaId: aluguel.id,       contaId: contaCorrente.id },
    { titulo: "Supermercado Extra",      valor:  530.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-07"), categoriaId: alimentacao.id,   contaId: contaCorrente.id },
    { titulo: "iFood",                   valor:  187.50, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-13"), categoriaId: alimentacao.id,   contaId: contaCorrente.id },
    { titulo: "Uber",                    valor:   92.40, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-09"), categoriaId: transporte.id,    contaId: contaCorrente.id },
    { titulo: "Plano de Saúde Unimed",   valor:  420.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-03"), categoriaId: saude.id,         contaId: contaCorrente.id },
    { titulo: "Curso Udemy",             valor:   89.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-10"), categoriaId: educacao.id,      contaId: contaCorrente.id },
    { titulo: "Netflix",                 valor:   55.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-05"), categoriaId: assinaturas.id,   contaId: contaCorrente.id },
    { titulo: "Spotify",                 valor:   21.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-05"), categoriaId: assinaturas.id,   contaId: contaCorrente.id },
    { titulo: "Cinema com a família",    valor:  120.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-04-19"), categoriaId: lazer.id,         contaId: contaCorrente.id },

    // ── Março 2026 ──────────────────────────────────────────
    { titulo: "Salário Março",           valor: 7200.00, tipo: TipoTransacao.RECEITA, data: new Date("2026-03-05"), categoriaId: salario.id,       contaId: contaCorrente.id },
    { titulo: "Projeto Freelance — Site",valor: 1800.00, tipo: TipoTransacao.RECEITA, data: new Date("2026-03-18"), categoriaId: freelance.id,     contaId: contaCorrente.id },
    { titulo: "Rendimento Tesouro",      valor:  245.80, tipo: TipoTransacao.RECEITA, data: new Date("2026-03-20"), categoriaId: investimentos.id, contaId: investimento.id  },
    { titulo: "Aluguel Apartamento",     valor: 1950.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-01"), categoriaId: aluguel.id,       contaId: contaCorrente.id },
    { titulo: "Supermercado Pão de Açúcar", valor: 612.30, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-08"), categoriaId: alimentacao.id, contaId: contaCorrente.id },
    { titulo: "Combustível",             valor:  230.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-14"), categoriaId: transporte.id,    contaId: contaCorrente.id },
    { titulo: "Consulta Médica",         valor:  350.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-22"), categoriaId: saude.id,         contaId: contaCorrente.id },
    { titulo: "Livros técnicos",         valor:  210.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-17"), categoriaId: educacao.id,      contaId: contaCorrente.id },
    { titulo: "Show Roberto Carlos",     valor:  280.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-25"), categoriaId: lazer.id,         contaId: contaCorrente.id },
    { titulo: "Netflix",                 valor:   55.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-03-05"), categoriaId: assinaturas.id,   contaId: contaCorrente.id },

    // ── Fevereiro 2026 ──────────────────────────────────────
    { titulo: "Salário Fevereiro",       valor: 7200.00, tipo: TipoTransacao.RECEITA, data: new Date("2026-02-05"), categoriaId: salario.id,       contaId: contaCorrente.id },
    { titulo: "Rendimento CDB",          valor:  198.40, tipo: TipoTransacao.RECEITA, data: new Date("2026-02-15"), categoriaId: investimentos.id, contaId: investimento.id  },
    { titulo: "Aluguel Apartamento",     valor: 1950.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-01"), categoriaId: aluguel.id,       contaId: contaCorrente.id },
    { titulo: "Supermercado",            valor:  480.60, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-09"), categoriaId: alimentacao.id,   contaId: contaCorrente.id },
    { titulo: "IPVA",                    valor:  890.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-10"), categoriaId: transporte.id,    contaId: contaCorrente.id },
    { titulo: "Farmácia",                valor:  143.70, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-20"), categoriaId: saude.id,         contaId: contaCorrente.id },
    { titulo: "Curso de Inglês",         valor:  390.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-03"), categoriaId: educacao.id,      contaId: contaCorrente.id },
    { titulo: "Viagem Carnaval",         valor:  850.00, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-28"), categoriaId: lazer.id,         contaId: contaCorrente.id },
    { titulo: "Netflix",                 valor:   55.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-05"), categoriaId: assinaturas.id,   contaId: contaCorrente.id },
    { titulo: "Spotify",                 valor:   21.90, tipo: TipoTransacao.DESPESA, data: new Date("2026-02-05"), categoriaId: assinaturas.id,   contaId: contaCorrente.id },
  ];

  for (const t of transacoes) {
    await prisma.transacao.create({
      data: { ...t, usuarioId: usuario.id },
    });
  }

  console.log(`✅ Seed concluída! ${transacoes.length} transações criadas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });