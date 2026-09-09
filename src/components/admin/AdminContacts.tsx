import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  assunto: string | null;
  mensagem: string | null;
  status: string;
  created_at: string;
}

const formatarData = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
};

const Pill = ({ status }: { status: string }) => {
  const estilos: Record<string, string> = {
    novo: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    pendente: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    respondido: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  };
  const rotulos: Record<string, string> = {
    novo: "Novo",
    pendente: "Pendente",
    respondido: "Respondido",
  };

  return (
    <span
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
        estilos[status] ?? estilos.novo
      }`}
    >
      {rotulos[status] ?? status}
    </span>
  );
};

const AdminContacts = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const buscar = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("contatos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErro(error.message);
    } else {
      setContatos((data ?? []) as Contato[]);
      setErro("");
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscar();
  }, []);

  const alterarStatus = async (id: number, status: string) => {
    // Atualiza a tela antes da resposta do servidor e desfaz se algo falhar.
    const anterior = contatos;
    setContatos((atual) => atual.map((c) => (c.id === id ? { ...c, status } : c)));

    const { error } = await supabase.from("contatos").update({ status }).eq("id", id);
    if (error) {
      setContatos(anterior);
      setErro("Não foi possível atualizar o contato.");
    }
  };

  const emAberto = contatos.filter((c) => c.status !== "respondido").length;

  if (carregando) {
    return <p className="text-muted-foreground">Carregando contatos...</p>;
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
          <span className="text-sm text-muted-foreground">Total recebido</span>
          <span className="font-serif text-3xl font-bold text-primary">{contatos.length}</span>
        </div>
        <div className="bg-card border rounded-lg p-5 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Aguardando resposta</span>
          <span className="font-serif text-3xl font-bold text-primary">{emAberto}</span>
        </div>
        <div className="bg-card border rounded-lg p-5 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Respondidos</span>
          <span className="font-serif text-3xl font-bold text-primary">
            {contatos.length - emAberto}
          </span>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-serif text-lg font-bold text-foreground">Contatos recebidos</h2>
        </div>

        {contatos.length === 0 ? (
          <div className="py-16 text-center flex flex-col gap-1">
            <b className="text-foreground">Nenhum contato ainda</b>
            <span className="text-sm text-muted-foreground">
              As mensagens enviadas pelo formulário do site aparecerão aqui.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                    Quem procurou
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                    Assunto
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                    Recebido
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3">
                    Situação
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {contatos.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 align-top">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{c.nome}</div>
                      <div className="text-xs text-muted-foreground flex flex-col gap-0.5 mt-1">
                        <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-primary">
                          <Mail className="w-3 h-3 flex-none" />
                          {c.email}
                        </a>
                        {c.telefone && (
                          <a href={`tel:${c.telefone}`} className="flex items-center gap-1.5 hover:text-primary">
                            <Phone className="w-3 h-3 flex-none" />
                            {c.telefone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="text-foreground">{c.assunto || "—"}</div>
                      {c.mensagem && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-3">{c.mensagem}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap tabular-nums">
                      {formatarData(c.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <Pill status={c.status} />
                    </td>
                    <td className="px-6 py-4">
                      {c.status !== "respondido" && (
                        <button
                          onClick={() => alterarStatus(c.id, "respondido")}
                          className="text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors whitespace-nowrap"
                        >
                          Marcar respondido
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
