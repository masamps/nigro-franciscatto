import { FaWhatsapp } from "react-icons/fa";
import { linkDoWhatsApp } from "@/lib/whatsapp";

/**
 * Botão flutuante de WhatsApp, no canto inferior direito.
 *
 * Ocupa o lugar onde ficava o botão "+" de publicar artigo, que aparecia
 * para qualquer visitante e foi movido para o painel.
 */
const WhatsAppButton = () => (
  <a
    href={linkDoWhatsApp()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Conversar com o escritório pelo WhatsApp"
    className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] transition-all duration-300 hover:-translate-y-0.5 p-4 md:pr-5"
  >
    <FaWhatsapp className="w-7 h-7 flex-none" aria-hidden="true" />
    <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem]">
      Fale conosco
    </span>
  </a>
);

export default WhatsAppButton;
