import { supabase } from "@/lib/supabaseClient";

/**
 * Registro de visitas, sem cookie e sem dado pessoal.
 *
 * O identificador de sessão vive apenas em sessionStorage e some quando a aba
 * fecha — serve para não contar a mesma visita várias vezes. Por isso não
 * exige aviso de cookies.
 *
 * Falhas são silenciosas de propósito: métrica nunca pode quebrar o site.
 */

const CHAVE_SESSAO = "nf_session";

const obterIdDeSessao = () => {
  try {
    let id = sessionStorage.getItem(CHAVE_SESSAO);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(CHAVE_SESSAO, id);
    }
    return id;
  } catch {
    // Navegador com armazenamento bloqueado: segue sem id de sessão.
    return null;
  }
};

export const registrarVisita = async (path: string) => {
  if (import.meta.env.DEV) return;

  try {
    await supabase.from("pageviews").insert([
      {
        path,
        referrer: document.referrer || null,
        session_id: obterIdDeSessao(),
      },
    ]);
  } catch {
    // silencioso de propósito
  }
};

/** Caminho usado quando alguém abre um artigo: "/artigos/12" */
export const caminhoDoArtigo = (id?: number) => `/artigos/${id ?? "desconhecido"}`;
