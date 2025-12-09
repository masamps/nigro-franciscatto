import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export type Article = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  featured: boolean;
  content: string;
  pdf_url?: string | null;
};

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleAdded: (newArticle: Article) => void;
  children?: React.ReactNode;
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({
  isOpen,
  onClose,
  onArticleAdded,
}) => {
  const [step, setStep] = useState<"login" | "form">("login");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    read_time: "",
    featured: false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleArticleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("username", loginData.username)
      .limit(1);

    setLoading(false);

    if (error || !data || data.length === 0) {
      setError("Usuário não encontrado");
      return;
    }

    const user = data[0];
    const { data: validUser, error: authError } = await supabase.rpc(
      "verifica_senha",
      {
        p_username: loginData.username,
        p_senha: loginData.password,
      }
    );

    if (authError || !validUser) {
      setError("Usuário ou senha inválidos");
      return;
    }

    setStep("form");
  };

  const handleAddArticle = async () => {
  const { title, content, excerpt, category, read_time, featured } = articleData;

  if (!title || !content || !excerpt || !category || !read_time) {
    setError("Preencha todos os campos obrigatórios");
    return;
  }

  setLoading(true);
  setError("");

  let pdfUrl: string | null = null;

  // 🔹 Upload do PDF (se existir)
  if (pdfFile) {
    const fileName = `${Date.now()}_${pdfFile.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("article") // <- bucket correto
      .upload(`files/${fileName}`, pdfFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Erro upload:", uploadError);
      setLoading(false);
      setError("Erro ao enviar PDF");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("article")
      .getPublicUrl(`files/${fileName}`);

    pdfUrl = publicUrlData?.publicUrl || null;
  }

  // 🔹 Inserir artigo no banco
  const { error } = await supabase.from("articles").insert([
    {
      title,
      content,
      excerpt,
      author: "Dra. Roberta Nigro", // fixo
      date: new Date().toISOString(),
      category,
      read_time,
      featured,
      pdf_url: pdfUrl,
    },
  ]);

  setLoading(false);

  if (error) {
    console.error("Erro insert:", error);
    setError("Erro ao adicionar artigo");
    return;
  }

  const newArticle: Article = {
    title,
    content,
    excerpt,
    author: "Dra. Roberta Nigro",
    date: new Date().toLocaleDateString("pt-BR"),
    category,
    read_time,
    featured,
    pdf_url: pdfUrl,
  };

  onArticleAdded(newArticle);

  // Resetar campos
  setArticleData({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    read_time: "",
    featured: false,
  });

  setPdfFile(null);
  setStep("login");
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        {step === "login" && (
          <>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Input
              name="username"
              placeholder="Usuário"
              value={loginData.username}
              onChange={handleLoginChange}
              className="mb-2"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              value={loginData.password}
              onChange={handleLoginChange}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={onClose} variant="secondary">
                Cancelar
              </Button>
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <h2 className="text-xl font-bold mb-4">Novo Artigo</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <Input
              name="title"
              placeholder="Título"
              value={articleData.title}
              onChange={handleArticleChange}
              className="mb-2"
            />
            <Textarea
              name="content"
              placeholder="Conteúdo"
              value={articleData.content}
              onChange={handleArticleChange}
              className="mb-2"
            />
            <Textarea
              name="excerpt"
              placeholder="Resumo"
              value={articleData.excerpt}
              onChange={handleArticleChange}
              className="mb-2"
            />
            <Input
              name="category"
              placeholder="Categoria"
              value={articleData.category}
              onChange={handleArticleChange}
              className="mb-2"
            />
            <Input
              name="read_time"
              placeholder="Tempo de leitura (ex: 5 min)"
              value={articleData.read_time}
              onChange={handleArticleChange}
              className="mb-2"
            />

            {/* 🔹 Input de PDF */}
           <div className="mb-4">
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setPdfFile(file);
                }}
              />

              <Button
                type="button"
                variant="secondary"
                className="w-full cursor-pointer"
                onClick={() => {
                  const input = document.getElementById("pdf-upload") as HTMLInputElement;
                  input?.click(); // 👈 FORÇA A ABERTURA DO SELECTOR
                }}
              >
                {pdfFile ? `PDF selecionado: ${pdfFile.name}` : "Selecionar PDF"}
              </Button>
            </div>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="featured"
                checked={articleData.featured}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    featured: e.target.checked,
                  })
                }
              />
              <span>Destaque</span>
            </label>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setStep("login")} variant="secondary">
                Voltar
              </Button>
              <Button onClick={handleAddArticle} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddArticleModal;
