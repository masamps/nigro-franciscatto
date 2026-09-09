import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminContacts from "@/components/admin/AdminContacts";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminNewArticle from "@/components/admin/AdminNewArticle";

type Aba = "visao" | "contatos" | "artigos" | "novo";

const ABAS: { id: Aba; nome: string }[] = [
  { id: "visao", nome: "Visão geral" },
  { id: "contatos", nome: "Contatos" },
  { id: "artigos", nome: "Artigos" },
];

const Admin = () => {
  const { session, loading } = useAuth();
  const [aba, setAba] = useState<Aba>("visao");
  // Muda a chave para forçar a remontagem da lista depois de publicar,
  // assim o artigo novo aparece sem precisar recarregar a página.
  const [versaoDaLista, setVersaoDaLista] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  const titulo = aba === "novo" ? "Novo artigo" : ABAS.find((a) => a.id === aba)?.nome ?? "";

  return (
    <>
      <Helmet>
        <title>Painel | Nigro Franciscatto</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-card border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 h-16">
              <div className="flex flex-col">
                <span className="font-serif font-bold text-foreground leading-tight">
                  Nigro Franciscatto
                </span>
                <span className="text-xs text-muted-foreground">Painel do escritório</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-muted-foreground">
                  {session.user.email}
                </span>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="flex items-center gap-1.5 text-sm font-semibold border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </div>

            <nav className="flex gap-1 -mb-px overflow-x-auto">
              {ABAS.map((a) => {
                const ativa = aba === a.id || (a.id === "artigos" && aba === "novo");
                return (
                  <button
                    key={a.id}
                    onClick={() => setAba(a.id)}
                    aria-current={ativa ? "page" : undefined}
                    className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                      ativa
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {a.nome}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-6">{titulo}</h1>

          {aba === "visao" && <AdminOverview />}
          {aba === "contatos" && <AdminContacts />}
          {aba === "artigos" && (
            <AdminArticles key={versaoDaLista} onNovoArtigo={() => setAba("novo")} />
          )}
          {aba === "novo" && (
            <AdminNewArticle
              onPublicado={() => {
                setVersaoDaLista((v) => v + 1);
                setAba("artigos");
              }}
              onCancelar={() => setAba("artigos")}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
