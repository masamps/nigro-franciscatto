import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

/**
 * Sessão do Supabase Auth, usada para proteger o painel.
 *
 * Substitui a conferência de login que era feita no navegador contra a tabela
 * `usuarios`: aquela apenas trocava o estado do React, então não impedia
 * ninguém de falar direto com a API.
 */
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ativo = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: inscricao } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSession(novaSessao);
    });

    return () => {
      ativo = false;
      inscricao.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};
