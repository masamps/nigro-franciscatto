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
  readTime: string;
  featured: boolean;
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
  const [articleData, setArticleData] = useState({ title: "", content: "" });
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
      .eq("senha", loginData.password) // ⚠️ ideal: senha encriptada
      .single();

    setLoading(false);

    if (error || !data) {
      setError("Usuário ou senha inválidos");
      return;
    }

    setStep("form");
  };

  const handleAddArticle = async () => {
    if (!articleData.title || !articleData.content) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.from("articles").insert([
      {
        title: articleData.title,
        content: articleData.content,
      },
    ]);

    setLoading(false);

    if (error) {
      setError("Erro ao adicionar artigo");
      return;
    }

    // 🔹 Monta um objeto Article para enviar de volta ao Blog
    const newArticle: Article = {
      title: articleData.title,
      excerpt: articleData.content.substring(0, 120) + "...", // usa parte do conteúdo como resumo
      author: loginData.username || "Autor Desconhecido",
      date: new Date().toLocaleDateString("pt-BR"),
      category: "Outros",
      readTime: "5 min",
      featured: false,
    };

    // chama callback do pai
    onArticleAdded(newArticle);

    // reseta o estado
    setArticleData({ title: "", content: "" });
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
              className="mb-4"
            />
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
