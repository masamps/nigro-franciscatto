import { useEffect, useState } from "react";
import { Download, Mail, Phone, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Curriculo {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string | null;
  file_url: string | null;
  created_at: string;
}

const formatarData = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

/**
 * Onde o arquivo está guardado. Os novos gravam "curriculos/<arquivo>"; os
 * antigos gravavam o link público do bucket "curriculos-public", que deixou de
 * ser público — por isso o download sempre passa por um link temporário.
 */
const localDoArquivo = (fileUrl: string | null) => {
  if (!fileUrl) return null;
  if (fileUrl.startsWith("http")) {
    const achado = fileUrl.match(/\/object\/(?:public|sign|authenticated)\/([^/]+)\/([^?]+)/);
    return achado ? { bucket: achado[1], caminho: decodeURIComponent(achado[2]) } : null;
  }
  const barra = fileUrl.indexOf("/");
  return barra > 0 ? { bucket: fileUrl.slice(0, barra), caminho: fileUrl.slice(barra + 1) } : null;
};

const AdminResumes = () => {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [ocupado, setOcupado] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("curriculos")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErro(error.message);
        else setCurriculos((data ?? []) as Curriculo[]);
        setCarregando(false);
      });
  }, []);

  const baixar = async (c: Curriculo) => {
    const local = localDoArquivo(c.file_url);
    if (!local) {
      setErro("Este currículo não tem arquivo anexado.");
      return;
    }
    setOcupado(c.id);
    // Link válido por 60 segundos: o arquivo nunca fica com endereço público.
    const { data, error } = await supabase.storage.from(local.bucket).createSignedUrl(local.caminho, 60);
    setOcupado(null);
    if (error || !data) {
      setErro("Não foi possível abrir o arquivo.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const excluir = async (c: Curriculo) => {
    const confirmado = window.confirm(
      `Excluir o currículo de ${c.name}? O arquivo e os dados serão apagados definitivamente.`
    );
    if (!confirmado) return;

    setOcupado(c.id);
    const local = localDoArquivo(c.file_url);
    if (local) {
      const { error } = await supabase.storage.from(local.bucket).remove([local.caminho]);
      if (error) {
        setOcupado(null);
        setErro("Não foi possível apagar o arquivo. Nada foi excluído.");
        return;
      }
    }
    const { error } = await supabase.from("curriculos").delete().eq("id", c.id);
    setOcupado(null);
    if (error) {
      setErro("O arquivo foi apagado, mas não foi possível remover o registro.");
      return;
    }
    setCurriculos((lista) => lista.filter((x) => x.id !== c.id));
  };

  if (carregando) return <p className="text-muted-foreground">Carregando currículos...</p>;

  return (
    <div className="flex flex-col gap-6">
      {erro && (
        <p className="text-sm text-destructive font-medium" role="alert">
          {erro}
        </p>
      )}

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-lg font-bold text-foreground">Currículos recebidos</h2>
          <span className="text-sm text-muted-foreground">
            Dados pessoais: exclua quando não forem mais necessários
          </span>
        </div>

        {curriculos.length === 0 ? (
          <div className="py-16 text-center flex flex-col gap-1 px-6">
            <b className="text-foreground">Nenhum currículo recebido ainda</b>
            <span className="text-sm text-muted-foreground">
              Os currículos enviados pela página de Contato aparecerão aqui.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Candidato", "Vaga de interesse", "Recebido", ""].map((t) => (
                    <th
                      key={t}
                      className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground px-6 py-3"
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {curriculos.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 align-top">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{c.name}</div>
                      <div className="text-xs text-muted-foreground flex flex-col gap-0.5 mt-1">
                        <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-primary">
                          <Mail className="w-3 h-3 flex-none" />
                          {c.email}
                        </a>
                        {c.phone && (
                          <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 hover:text-primary">
                            <Phone className="w-3 h-3 flex-none" />
                            {c.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{c.position || "—"}</td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap tabular-nums">
                      {formatarData(c.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <button
                          onClick={() => baixar(c)}
                          disabled={ocupado === c.id || !c.file_url}
                          className="flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors whitespace-nowrap disabled:opacity-50"
                        >
                          <Download className="w-3 h-3" />
                          Baixar currículo
                        </button>
                        <button
                          onClick={() => excluir(c)}
                          disabled={ocupado === c.id}
                          className="flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 text-destructive hover:bg-destructive/10 transition-colors whitespace-nowrap disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          Excluir
                        </button>
                      </div>
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

export default AdminResumes;
