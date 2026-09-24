/** Dados oficiais de contato do menuAR. */
export const WHATSAPP_NUMBER = "5532998514440";
export const WHATSAPP_DISPLAY = "(32) 99851-4440";

/** Mensagens prontas por contexto de cada botão. */
export const WHATSAPP_MESSAGES = {
  hero: "Olá! Conheci o menuAR pelo site e gostaria de saber como implementar a experiência 3D no cardápio do meu restaurante.",
  header:
    "Olá! Estou entrando em contato pelo site do menuAR e gostaria de receber mais informações sobre a plataforma.",
  footer: "Olá! Visitei o site do menuAR e gostaria de conversar sobre o serviço.",
  start:
    "Olá! Tenho interesse no plano Start do menuAR, com mensalidade de R$ 1.199,00 e contrato de 3 meses. Gostaria de saber como contratar.",
  plus: "Olá! Tenho interesse no plano Plus do menuAR, com mensalidade de R$ 897,00 e contrato de 6 meses. Gostaria de saber como contratar.",
  pro: "Olá! Tenho interesse no plano Pro do menuAR, com mensalidade de R$ 699,00 e contrato de 12 meses. Gostaria de saber como contratar.",
  demo: "Olá! Experimentei os pratos em 3D no site do menuAR e gostaria de ter essa experiência no cardápio do meu restaurante.",
  final:
    "Olá! Quero que o cardápio do meu restaurante surpreenda antes do primeiro pedido. Podemos conversar sobre o menuAR?",
} as const;

export type WhatsappContext = keyof typeof WHATSAPP_MESSAGES;

/** Link do WhatsApp com a mensagem do contexto corretamente codificada. */
export function whatsappHref(context: WhatsappContext): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[context])}`;
}

/** Compatibilidade com usos antigos: contato geral. */
export function getContactHref(): string {
  return whatsappHref("header");
}
