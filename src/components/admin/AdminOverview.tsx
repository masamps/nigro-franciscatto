import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Pagina {
  path: string;
  total: number;
}

interface ArtigoLido {
  id: number;
  title: string;
  total: number;
}

interface Resumo {
  visitas: number;
  contatos: number;
  emAberto: number;
  artigos: number;
  paginas: Pagina[];
  maisLidos: ArtigoLido[];
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

/** Barra proporcional usada nas duas listas. */
const Barra = ({ rotulo, total, maior }: { rotulo: string; total: number; maior: number }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="font-semibold text-foreground">{rotulo}</span>
      <span className="text-muted-foreground tabular-nums flex-none">{total}</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: `${(total / maior) * 100}%` }} />
    </div>
  </div>
);

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

      const todos = ((caminhos.data ?? []) as { path: string }[]).map((c) => c.path);

      // "/artigos/12" é a abertura de um artigo; "/artigos" é a listagem.
      const ehArtigo = (p: string) => /^\/artigos\/\d+$/.test(p);

      const contarPor = (lista: string[]) => {
        const mapa = new Map<string, number>();
        lista.forEach((p) => mapa.set(p, (mapa.get(p) ?? 0) + 1));
        return mapa;
      };

      const paginas = Array.from(contarPor(todos.filter((p) => !ehArtigo(p))).entries())
        .map(([path, total]) => ({ path, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);

      const porArtigo = contarPor(todos.filter(ehArtigo));
      const ids = Array.from(porArtigo.keys()).map((p) => Number(p.split("/")[2]));

      let maisLidos: ArtigoLido[] = [];
      if (ids.length > 0) {
        const { data: titulos } = await supabase.from("articles").select("id, title").in("id", ids);
        maisLidos = ((titulos ?? []) as { id: number; title: string }[])
          .map((a) => ({ ...a, total: porArtigo.get(`/artigos/${a.id}`) ?? 0 }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);
      }

      setResumo({
        visitas: visitas.count ?? 0,
        contatos: contatos.count ?? 0,
        emAberto: emAberto.count ?? 0,
        artigos: artigos.count ?? 0,
        paginas,
        maisLidos,
      });
      setCarregando(false);
    };

    buscar();
  }, []);

  if (carregando || !resumo) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const maiorPagina = Math.max(1, ...resumo.paginas.map((p) => p.total));
  const maiorArtigo = Math.max(1, ...resumo.maisLidos.map((a) => a.total));

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

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-lg font-bold text-foreground">Páginas mais visitadas</h2>
            <span className="text-sm text-muted-foreground capitalize">{mes}</span>
          </div>

          {resumo.paginas.length === 0 ? (
            <div className="py-14 text-center flex flex-col gap-1 px-6">
              <b className="text-foreground">Sem visitas neste mês</b>
              <span className="text-sm text-muted-foreground">
                A contagem começa assim que as pessoas acessam o site.
              </span>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-4">
              {resumo.paginas.map((p) => (
                <Barra
                  key={p.path}
                  rotulo={NOMES_DE_PAGINA[p.path] ?? p.path}
                  total={p.total}
                  maior={maiorPagina}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-serif text-lg font-bold text-foreground">Artigos mais lidos</h2>
          </div>

          {resumo.maisLidos.length === 0 ? (
            <div className="py-14 text-center flex flex-col gap-1 px-6">
              <b className="text-foreground">Nenhum artigo aberto ainda</b>
              <span className="text-sm text-muted-foreground">
                Conta quando alguém abre um artigo pela página de Artigos.
              </span>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-4">
              {resumo.maisLidos.map((a) => (
                <Barra key={a.id} rotulo={a.title} total={a.total} maior={maiorArtigo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
