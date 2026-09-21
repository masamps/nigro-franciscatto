import emailjs from "@emailjs/browser";

/**
 * Envio do contato por e-mail.
 *
 * Estes três valores são identificadores públicos do EmailJS — vão no
 * JavaScript do site e não dão acesso à conta. O destinatário de verdade é
 * configurado no template, dentro do painel do EmailJS.
 */
const SERVICE_ID = "service_diah3ju";
const TEMPLATE_ID = "template_4j2shs3";
const PUBLIC_KEY = "iMV2JXWr-RovUUEPD";

export interface ContatoParaEmail {
  nome: string;
  email: string;
  telefone?: string | null;
  assunto?: string | null;
  mensagem?: string | null;
}

export const enviarEmailDeContato = (contato: ContatoParaEmail) =>
  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      title: contato.assunto ?? "",
      from_name: contato.nome,
      reply_to: contato.email,
      phone: contato.telefone ?? "",
      message: contato.mensagem ?? "",
    },
    PUBLIC_KEY
  );
