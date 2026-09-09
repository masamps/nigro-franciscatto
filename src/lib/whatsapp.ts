/**
 * Contato de WhatsApp do escritório.
 *
 * O número precisa do código do país (55) — sem ele o WhatsApp pode não
 * reconhecer o destinatário ou interpretar como número de outro país.
 * (15) 98815-1900 → 55 15 98815-1900
 */
export const WHATSAPP_NUMERO = "5515988151900";

export const MENSAGEM_PADRAO =
  "Olá! Vim pelo site e gostaria de falar com o escritório.";

export const linkDoWhatsApp = (mensagem: string = MENSAGEM_PADRAO) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

export const abrirWhatsApp = (mensagem?: string) => {
  window.open(linkDoWhatsApp(mensagem), "_blank", "noopener,noreferrer");
};
