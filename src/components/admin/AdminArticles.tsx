import { useEffect, useState } from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { supabase } from "@/lib/supabaseClient";

interface Artigo {
  id: number;
  title: string;
  category: string;
  date: string;
  featured: boolean;
}

const formatarData = (iso?: string) => {
  if (!iso) return "—";
  const [ano, mes, dia] = iso.split("T")[0].split("-");
  return `${dia}/${mes}/${ano}`;
};

interface Props {
  onNovoArtigo: () => void;
}

const AdminArticles = ({ onNovoArtigo }: Props) => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const buscar = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, category, date, featured")
      .order("date", { ascending: false });

    if (error) setErro(error.message);
    else {
      setArtigos((data ?? []) as Artigo[]);
      setErro("");
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscar();
  }, []);

  const alternarDestaque = async (id: number, atual: boolean) => {
    const anterior = artigos;
    setArtigos((lista) => lista.map((a) => (a.id === id ? { ...a, featured: !atual } : a)));

    const { error } = await supabase.from("articles").update({ featured: !atual }).eq("id", id);
    if (error) {
      setArtigos(anterior);
      setErro("Não foi possível alterar o destaque.");
    }
  };

  const emDestaque = artigos.filter((a) => a.featured).length;

  if (carregando) {
    return <p className="text-muted-foreground">Carregando artigos...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {erro && (
        <p className="text-sm text-destructive font-medium" role="alert">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-5 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Total publicado</span>
          <span className="font-serif text-3xl font-bold text-primary">{artigos.length}</span>
        </div>
        <div className="bg-card border rounded-lg p-5 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Em destaque</span>
          <span className="font-serif text-3xl font-bold text-primary">{emDestaque}</span>
        </div>
        <div className="bg-card border rounded-lg p-5 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Na vitrine</span>
          <span className="font-serif text-3xl font-bold text-primary">
            {Math.min(emDestaque, 3)}
          </span>
          <span className="text-xs text-muted-foreground">os 3 destaques mais recentes</span>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-lg font-bold text-foreground">Artigos</h2>
          <Button onClick={onNovoArtigo}>
            <Plus className="w-4 h-4 mr-2" />
            Novo artigo
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                  Título
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                  Categoria
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                  Data
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                  Destaque
                </th>
              </tr>
            </thead>
            <tbody>
              {artigos.map((a) => (
                <tr key={a.id} className="border-b last:border-0 align-top">
                  <td className="px-6 py-4 font-semibold text-foreground max-w-lg">{a.title}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{a.category}</td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap tabular-nums">
                    {formatarData(a.date)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alternarDestaque(a.id, a.featured)}
                      aria-pressed={a.featured}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                        a.featured
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <Star className={`w-3 h-3 ${a.featured ? "fill-current" : ""}`} />
                      {a.featured ? "Em destaque" : "Sem destaque"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminArticles;
