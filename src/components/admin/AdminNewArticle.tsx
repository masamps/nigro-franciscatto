import { useEffect, useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  onPublicado: () => void;
  onCancelar: () => void;
}

const AUTOR = "Dra. Roberta Nigro";

const AdminNewArticle = ({ onPublicado, onCancelar }: Props) => {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "5 min",
    // Começa desmarcado de propósito: as publicações diárias vinham todas
    // como destaque, o que esvaziava o sentido da vitrine.
    featured: false,
  });

  const [pdf, setPdf] = useState<File | null>(null);

  useEffect(() => {
    supabase
      .from("articles")
      .select("category")
      .then(({ data }) => {
        const lista = Array.from(
          new Set((data ?? []).map((a: { category: string }) => a.category).filter(Boolean))
        ).sort();
        setCategorias(lista);
        setForm((f) => ({ ...f, category: lista[0] ?? "" }));
      });
  }, []);

  const publicar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!form.title || !form.excerpt || !form.content || !form.category) {
      setErro("Preencha título, resumo, conteúdo e categoria.");
      return;
    }

    setEnviando(true);
    let pdfUrl: string | null = null;

    if (pdf) {
      const nomeArquivo = `${Date.now()}_${pdf.name}`;
      const { error: erroUpload } = await supabase.storage
        .from("article")
        .upload(`files/${nomeArquivo}`, pdf, { cacheControl: "3600", upsert: false });

      if (erroUpload) {
        setEnviando(false);
        setErro("Não foi possível enviar o PDF.");
        return;
      }

      const { data } = supabase.storage.from("article").getPublicUrl(`files/${nomeArquivo}`);
      pdfUrl = data?.publicUrl ?? null;
    }

    const { error } = await supabase.from("articles").insert([
      {
        ...form,
        author: AUTOR,
        date: new Date().toISOString(),
        pdf_url: pdfUrl,
      },
    ]);

    setEnviando(false);

    if (error) {
      setErro("Não foi possível publicar o artigo.");
      return;
    }

    onPublicado();
  };

  const campo = "w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background";
  const rotulo = "text-sm font-semibold text-foreground";

  return (
    <div className="bg-card border rounded-lg overflow-hidden max-w-3xl">
      <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-serif text-lg font-bold text-foreground">Publicar novo artigo</h2>
        <span className="text-sm text-muted-foreground">Por {AUTOR}</span>
      </div>

      <form onSubmit={publicar} className="p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className={rotulo}>Título</label>
          <input
            id="title"
            className={campo}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="excerpt" className={rotulo}>Resumo</label>
          <input
            id="excerpt"
            className={campo}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <span className="text-xs text-muted-foreground">
            É o texto que aparece no card, antes de a pessoa abrir o artigo.
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="content" className={rotulo}>Conteúdo</label>
          <textarea
            id="content"
            rows={8}
            className={`${campo} resize-y font-sans`}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className={rotulo}>Categoria</label>
            {novaCategoria ? (
              <input
                id="category"
                className={campo}
                placeholder="Nome da nova categoria"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            ) : (
              <select
                id="category"
                className={campo}
                value={form.category}
                onChange={(e) => {
                  if (e.target.value === "__nova__") {
                    setNovaCategoria(true);
                    setForm({ ...form, category: "" });
                  } else {
                    setForm({ ...form, category: e.target.value });
                  }
                }}
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="__nova__">+ Nova categoria...</option>
              </select>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="read_time" className={rotulo}>Tempo de leitura</label>
            <input
              id="read_time"
              className={campo}
              value={form.read_time}
              onChange={(e) => setForm({ ...form, read_time: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pdf" className={rotulo}>
            Arquivo PDF <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <input
            id="pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-input file:text-sm file:font-semibold file:bg-background file:text-foreground hover:file:bg-accent file:cursor-pointer"
          />
        </div>

        <label className="flex items-start gap-3 p-4 bg-muted/50 border rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="mt-1 w-4 h-4 accent-primary flex-none"
          />
          <span className="flex flex-col gap-0.5">
            <b className="text-sm font-semibold text-foreground">Exibir na vitrine de destaques</b>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Deixe desmarcado nas publicações diárias. A vitrine mostra os 3 destaques
              mais recentes — marcar todos faz o selo perder o sentido.
            </span>
          </span>
        </label>

        {erro && (
          <p className="text-sm text-destructive font-medium" role="alert">{erro}</p>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="submit" disabled={enviando}>
            {enviando ? "Publicando..." : "Publicar artigo"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancelar}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewArticle;
