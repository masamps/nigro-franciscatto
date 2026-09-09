import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Resumo {
  visitas: number;
  contatos: number;
  emAberto: number;
  artigos: number;
  paginas: { path: string; total: number }[];
}

const NOMES_DE_PAGINA: Record<string, string> = {
  "/": "Início",
  "/sobre": "Sobre",
  "/equipe": "Equipe",
  "/areas-atuacao": "Áreas de Atuação",
  "/artigos": "Artigos",
  "/depoimentos": "Depoimentos",
  "/contato": "Contato",
  "/privacidade": "Privacidade",
};

const AdminOverview = () => {
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      const agora = new Date();
      const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString();

      const [visitas, contatos, emAberto, artigos, caminhos] = await Promise.all([
        supabase.from("pageviews").select("id", { count: "exact", head: true }).gte("created_at", inicioDoMes),
        supabase.from("contatos").select("id", { count: "exact", head: true }).gte("created_at", inicioDoMes),
        supabase.from("contatos").select("id", { count: "exact", head: true }).neq("status", "respondido"),
        supabase.from("articles").select("id", { count: "exact", head: true }).gte("date", inicioDoMes),
        supabase.from("pageviews").select("path").gte("created_at", inicioDoMes),
      ]);

      const contagem = new Map<string, number>();
      ((caminhos.data ?? []) as { path: string }[]).forEach(({ path }) => {
        contagem.set(path, (contagem.get(path) ?? 0) + 1);
      });

      setResumo({
        visitas: visitas.count ?? 0,
        contatos: contatos.count ?? 0,
        emAberto: emAberto.count ?? 0,
        artigos: artigos.count ?? 0,
        paginas: Array.from(contagem.entries())
          .map(([path, total]) => ({ path, total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 8),
      });
      setCarregando(false);
    };

    buscar();
  }, []);

  if (carregando || !resumo) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const maior = Math.max(1, ...resumo.paginas.map((p) => p.total));

  const indicadores = [
    { rotulo: "Visitas no mês", valor: resumo.visitas },
    { rotulo: "Contatos no mês", valor: resumo.contatos },
    { rotulo: "Aguardando resposta", valor: resumo.emAberto },
    { rotulo: "Artigos publicados", valor: resumo.artigos },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {indicadores.map((i) => (
          <div key={i.rotulo} className="bg-card border rounded-lg p-5 flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{i.rotulo}</span>
            <span className="font-serif text-3xl font-bold text-primary tabular-nums">{i.valor}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-lg font-bold text-foreground">Páginas mais visitadas</h2>
          <span className="text-sm text-muted-foreground capitalize">{mes}</span>
        </div>

        {resumo.paginas.length === 0 ? (
          <div className="py-16 text-center flex flex-col gap-1">
            <b className="text-foreground">Ainda sem visitas registradas neste mês</b>
            <span className="text-sm text-muted-foreground">
              A medição começa a contar assim que as pessoas acessam o site.
            </span>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-4">
            {resumo.paginas.map((p) => (
              <div key={p.path} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-foreground">
                    {NOMES_DE_PAGINA[p.path] ?? p.path}
                  </span>
                  <span className="text-muted-foreground tabular-nums">{p.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(p.total / maior) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
