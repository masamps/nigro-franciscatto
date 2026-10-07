import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Item {
  rotulo: string;
  total: number;
}

interface ArtigoLido {
  id: number;
  title: string;
  total: number;
}

interface Resumo {
  pessoas: number;
  paginasVistas: number;
  cliquesWhatsApp: number;
  contatos: number;
  emAberto: number;
  artigos: number;
  canais: Item[];
  paginas: Item[];
  maisLidos: ArtigoLido[];
  medindoCliques: boolean;
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

const CANAIS: { tipo: string; rotulo: string }[] = [
  { tipo: "whatsapp-flutuante", rotulo: "WhatsApp — botão do site" },
  { tipo: "whatsapp-artigo", rotulo: "WhatsApp — fim dos artigos" },
  { tipo: "whatsapp-equipe", rotulo: "WhatsApp — página Equipe" },
  { tipo: "telefone-contato", rotulo: "Telefone — página Contato" },
  { tipo: "telefone-rodape", rotulo: "Telefone — rodapé" },
];

// "/artigos/32-clausula-..." (atual) e "/artigos/32" (antigo) são aberturas
// de artigo; "/artigos" sozinho é a listagem.
const ID_DE_ARTIGO = /^\/artigos\/(\d+)(?:-|$)/;

/** Barra proporcional usada nas listas. */
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

const Cartao = ({ titulo, dica, children }: { titulo: string; dica?: string; children: React.ReactNode }) => (
  <div className="bg-card border rounded-lg overflow-hidden">
    <div className="px-6 py-4 border-b flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-serif text-lg font-bold text-foreground">{titulo}</h2>
      {dica && <span className="text-sm text-muted-foreground">{dica}</span>}
    </div>
    {children}
  </div>
);

const Vazio = ({ titulo, texto }: { titulo: string; texto: string }) => (
  <div className="py-14 text-center flex flex-col gap-1 px-6">
    <b className="text-foreground">{titulo}</b>
    <span className="text-sm text-muted-foreground">{texto}</span>
  </div>
);

const contarPor = (lista: string[]) => {
  const mapa = new Map<string, number>();
  lista.forEach((p) => mapa.set(p, (mapa.get(p) ?? 0) + 1));
  return mapa;
};

const AdminOverview = () => {
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      const agora = new Date();
      const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString();

      const [contatos, emAberto, artigos, visitas, eventosDoMes, algumEvento] = await Promise.all([
        supabase.from("contatos").select("id", { count: "exact", head: true }).gte("created_at", inicioDoMes),
        supabase.from("contatos").select("id", { count: "exact", head: true }).neq("status", "respondido"),
        supabase.from("articles").select("id", { count: "exact", head: true }).gte("date", inicioDoMes),
        supabase.from("pageviews").select("path, session_id").gte("created_at", inicioDoMes),
        supabase.from("eventos").select("tipo").gte("created_at", inicioDoMes),
        supabase.from("eventos").select("id", { count: "exact", head: true }),
      ]);

      const linhas = (visitas.data ?? []) as { path: string; session_id: string | null }[];
      const caminhos = linhas.map((l) => l.path);
      const sessoes = new Set(linhas.map((l) => l.session_id).filter(Boolean));

      const paginas = Array.from(contarPor(caminhos.filter((p) => !ID_DE_ARTIGO.test(p))).entries())
        .map(([path, total]) => ({ rotulo: NOMES_DE_PAGINA[path] ?? path, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);

      const porArtigo = new Map<number, number>();
      caminhos.forEach((p) => {
        const achado = p.match(ID_DE_ARTIGO);
        if (achado) {
          const id = Number(achado[1]);
          porArtigo.set(id, (porArtigo.get(id) ?? 0) + 1);
        }
      });

      let maisLidos: ArtigoLido[] = [];
      if (porArtigo.size > 0) {
        const { data: titulos } = await supabase
          .from("articles")
          .select("id, title")
          .in("id", Array.from(porArtigo.keys()));
        maisLidos = ((titulos ?? []) as { id: number; title: string }[])
          .map((a) => ({ ...a, total: porArtigo.get(a.id) ?? 0 }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);
      }

      const porTipo = contarPor(((eventosDoMes.data ?? []) as { tipo: string }[]).map((e) => e.tipo));
      const cliquesWhatsApp = CANAIS.filter((c) => c.tipo.startsWith("whatsapp")).reduce(
        (soma, c) => soma + (porTipo.get(c.tipo) ?? 0),
        0
      );

      const canais: Item[] = [
        { rotulo: "Formulário de contato", total: contatos.count ?? 0 },
        ...CANAIS.map((c) => ({ rotulo: c.rotulo, total: porTipo.get(c.tipo) ?? 0 })),
      ];

      setResumo({
        pessoas: sessoes.size,
        paginasVistas: linhas.length,
        cliquesWhatsApp,
        contatos: contatos.count ?? 0,
        emAberto: emAberto.count ?? 0,
        artigos: artigos.count ?? 0,
        canais,
        paginas,
        maisLidos,
        medindoCliques: (algumEvento.count ?? 0) > 0,
      });
      setCarregando(false);
    };

    buscar();
  }, []);

  if (carregando || !resumo) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const maior = (itens: { total: number }[]) => Math.max(1, ...itens.map((i) => i.total));

  const indicadores = [
    { rotulo: "Pessoas no mês", valor: resumo.pessoas, dica: `${resumo.paginasVistas} páginas vistas` },
    { rotulo: "Cliques no WhatsApp", valor: resumo.cliquesWhatsApp, dica: "no mês" },
    { rotulo: "Contatos pelo formulário", valor: resumo.contatos, dica: "no mês" },
    { rotulo: "Aguardando resposta", valor: resumo.emAberto, dica: "contatos em aberto" },
    { rotulo: "Artigos publicados", valor: resumo.artigos, dica: "no mês" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {indicadores.map((i) => (
          <div key={i.rotulo} className="bg-card border rounded-lg p-5 flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{i.rotulo}</span>
            <span className="font-serif text-3xl font-bold text-primary tabular-nums">{i.valor}</span>
            <span className="text-xs text-muted-foreground">{i.dica}</span>
          </div>
        ))}
      </div>

      <Cartao titulo="Como as pessoas procuram o escritório" dica={mes}>
        {resumo.medindoCliques ? (
          <div className="p-6 flex flex-col gap-4">
            {resumo.canais.map((c) => (
              <Barra key={c.rotulo} rotulo={c.rotulo} total={c.total} maior={maior(resumo.canais)} />
            ))}
          </div>
        ) : (
          <Vazio
            titulo="A medição de cliques acabou de começar"
            texto="Cada clique no WhatsApp ou no telefone do site passa a aparecer aqui."
          />
        )}
      </Cartao>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Cartao titulo="Páginas mais visitadas" dica={mes}>
          {resumo.paginas.length === 0 ? (
            <Vazio titulo="Sem visitas neste mês" texto="A contagem começa assim que as pessoas acessam o site." />
          ) : (
            <div className="p-6 flex flex-col gap-4">
              {resumo.paginas.map((p) => (
                <Barra key={p.rotulo} rotulo={p.rotulo} total={p.total} maior={maior(resumo.paginas)} />
              ))}
            </div>
          )}
        </Cartao>

        <Cartao titulo="Artigos mais lidos" dica={mes}>
          {resumo.maisLidos.length === 0 ? (
            <Vazio titulo="Nenhum artigo aberto neste mês" texto="Conta quando alguém abre a página de um artigo." />
          ) : (
            <div className="p-6 flex flex-col gap-4">
              {resumo.maisLidos.map((a) => (
                <Barra key={a.id} rotulo={a.title} total={a.total} maior={maior(resumo.maisLidos)} />
              ))}
            </div>
          )}
        </Cartao>
      </div>
    </div>
  );
};

export default AdminOverview;
