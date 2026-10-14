import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, X } from "lucide-react";

/**
 * Aviso flutuante sobre um golpe em andamento usando o nome do escritório.
 * Aparece em todas as páginas do site público até a pessoa fechar.
 *
 * Para um alerta novo, troque ALERTA_ID, o texto e o artigo: quem fechou o
 * aviso anterior volta a ver. Para desligar, remova <AlertaGolpe /> do App.tsx.
 */
const ALERTA_ID = "golpe-2026-10";
const ARTIGO = "/artigos/50";
const CHAVE = `nf_alerta_fechado_${ALERTA_ID}`;

const jaFechado = () => {
  try {
    return localStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
};

const AlertaGolpe = () => {
  const location = useLocation();
  const [aberto, setAberto] = useState(() => !jaFechado());

  // Na própria página do alerta o aviso só atrapalharia a leitura.
  const naPaginaDoAlerta = /^\/artigos\/50(-|$)/.test(location.pathname);
  if (!aberto || naPaginaDoAlerta) return null;

  const fechar = () => {
    setAberto(false);
    try {
      localStorage.setItem(CHAVE, "1");
    } catch {
      // sem armazenamento: o aviso volta na próxima visita, o que é aceitável
    }
  };

  return (
    <div
      role="region"
      aria-label="Alerta de golpe"
      className="fixed bottom-6 left-4 right-24 sm:right-auto sm:left-6 sm:max-w-sm z-40 bg-card border border-l-4 border-l-primary rounded-lg shadow-elegant p-3 pr-9 sm:p-4 sm:pr-10"
    >
      <button
        onClick={fechar}
        aria-label="Fechar alerta"
        className="absolute top-2 right-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex-none rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <b className="font-sans text-sm text-foreground">Alerta de golpe</b>
          <p className="font-sans text-sm text-muted-foreground leading-snug">
            O número <strong className="text-foreground whitespace-nowrap">(19) 99930-3969</strong> não é
            do escritório.<span className="hidden sm:inline"> Desconfie de mensagens em nosso nome.</span>
          </p>
          <Link to={ARTIGO} className="font-sans text-sm font-semibold text-primary hover:underline mt-0.5">
            <span className="sm:hidden">Saiba mais →</span>
            <span className="hidden sm:inline">Saiba como se proteger →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlertaGolpe;
