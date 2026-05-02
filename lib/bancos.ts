export type Banco = {
    id: string;
    nome: string;
    cor: string;
    logo: string; // emoji ou inicial
  };
  
  export const BANCOS_BR: Banco[] = [
    { id: "nubank",        nome: "Nubank",         cor: "#820AD1", logo: "💜" },
    { id: "itau",          nome: "Itaú",            cor: "#EC7000", logo: "🟠" },
    { id: "bradesco",      nome: "Bradesco",        cor: "#CC092F", logo: "🔴" },
    { id: "bb",            nome: "Banco do Brasil", cor: "#FFCC00", logo: "🟡" },
    { id: "caixa",         nome: "Caixa",           cor: "#005B9A", logo: "🔵" },
    { id: "inter",         nome: "Inter",           cor: "#FF6B00", logo: "🟠" },
    { id: "c6",            nome: "C6 Bank",         cor: "#242424", logo: "⚫" },
    { id: "picpay",        nome: "PicPay",          cor: "#21C25E", logo: "💚" },
    { id: "santander",     nome: "Santander",       cor: "#CC0000", logo: "🔴" },
    { id: "neon",          nome: "Neon",            cor: "#00E5C3", logo: "🩵" },
    { id: "sicoob",        nome: "Sicoob",          cor: "#006B3F", logo: "🟢" },
    { id: "xp",            nome: "XP",              cor: "#000000", logo: "⚫" },
    { id: "mercadopago",   nome: "Mercado Pago",    cor: "#009EE3", logo: "🔵" },
    { id: "personalizado", nome: "Outro",           cor: "#64748b", logo: "🏦" },
  ];