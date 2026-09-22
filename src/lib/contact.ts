/**
 * Dados oficiais de contato do menuAR.
 *
 * PENDENTE: nenhum canal oficial foi fornecido ainda. Enquanto os valores
 * forem `null`, a interface NÃO deve renderizar botões que aparentem
 * funcionar — ela mostra um aviso de canal em configuração.
 *
 * Para ativar, basta preencher os campos abaixo.
 */
export interface ContactConfig {
  /** Somente dígitos, com DDI. Ex.: "5511999999999". */
  whatsapp: string | null;
  /** E-mail comercial oficial. */
  email: string | null;
  /** Usuário do Instagram, sem "@". */
  instagram: string | null;
}

export const CONTACT: ContactConfig = {
  whatsapp: null,
  email: null,
  instagram: null,
};

/** Mensagem pré-preenchida usada no link do WhatsApp, quando configurado. */
const WHATSAPP_MESSAGE =
  "Olá! Vi o site do menuAR e quero conhecer a experiência 3D e de realidade aumentada para o meu restaurante.";

/**
 * Retorna o melhor link de contato disponível ou `null` quando ainda não há
 * nenhum canal oficial configurado.
 */
export function getContactHref(): string | null {
  if (CONTACT.whatsapp) {
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  }
  if (CONTACT.email) {
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent("menuAR — quero no meu restaurante")}`;
  }
  return null;
}

export const hasContact = (): boolean => getContactHref() !== null;
