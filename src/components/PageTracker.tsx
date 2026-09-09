import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

/**
 * Registra as visitas das páginas na tabela `pageviews`.
 *
 * Não usa cookie nem guarda dado pessoal (sem IP, sem impressão digital do
 * navegador). O identificador de sessão vive apenas em sessionStorage e some
 * quando a aba é fechada — serve só para não contar a mesma visita várias
 * vezes. Por isso não exige aviso de cookies.
 *
 * Qualquer falha aqui é silenciosa: métrica nunca pode quebrar o site.
 */

const SESSION_KEY = "nf_session";

const getSessionId = () => {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Navegador com armazenamento bloqueado: segue sem id de sessão.
    return null;
  }
};

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Não registra acessos durante o desenvolvimento local.
    if (import.meta.env.DEV) return;

    const registrar = async () => {
      try {
        await supabase.from("pageviews").insert([
          {
            path: location.pathname,
            referrer: document.referrer || null,
            session_id: getSessionId(),
          },
        ]);
      } catch {
        // silencioso de propósito
      }
    };

    registrar();
  }, [location.pathname]);

  return null;
};

export default PageTracker;
