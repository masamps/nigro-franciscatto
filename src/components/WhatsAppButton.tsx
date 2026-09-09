import { FaWhatsapp } from "react-icons/fa";
import { linkDoWhatsApp } from "@/lib/whatsapp";

/**
 * Botão flutuante de WhatsApp, no canto inferior direito.
 *
 * Ocupa o lugar onde ficava o botão "+" de publicar artigo, que aparecia
 * para qualquer visitante e foi movido para o painel — por isso mantém o
 * mesmo tamanho (14) daquele botão.
 */
const WhatsAppButton = () => (
  <a
    href={linkDoWhatsApp()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Conversar com o escritório pelo WhatsApp"
    title="Fale conosco pelo WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] transition-all duration-300"
  >
    <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
  </a>
);

export default WhatsAppButton;
