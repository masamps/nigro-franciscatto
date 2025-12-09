// src/components/ArticleDetailsModal.tsx
import { X } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import React from "react";

export type Article = {
  id?: number;
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  category?: string;
  read_time?: string;
  featured?: boolean;
  content?: string | null;
  pdf_url?: string | null;
};

interface ArticleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticleDetailsModal: React.FC<ArticleDetailsModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-3xl w-full overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-serif font-bold">{article.title}</h2>
          <button onClick={onClose} aria-label="Fechar">
            <X className="w-6 h-6 text-muted-foreground hover:text-primary transition" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          {article.excerpt && <p className="text-muted-foreground italic">{article.excerpt}</p>}

          <div className="text-sm text-muted-foreground flex flex-col gap-1">
            <span><strong>Autor:</strong> {article.author ?? "—"}</span>
            <span><strong>Categoria:</strong> {article.category ?? "—"}</span>
            <span><strong>Data:</strong> {article.date ?? "—"}</span>
            <span><strong>Tempo de leitura:</strong> {article.read_time ?? "—"}</span>
          </div>

          {/* Conteúdo completo (se houver) */}
          {article.content ? (
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              {/* se seu conteúdo for HTML use dangerouslySetInnerHTML,
                  se for texto simples exiba como paragraph */}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          ) : null}

          {/* PDF (se existir) */}
          {article.pdf_url ? (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Arquivo PDF</h3>

              <div className="w-full h-[500px] border rounded-lg overflow-hidden">
                <iframe
                  src={article.pdf_url}
                  className="w-full h-full"
                  title={`${article.title} - PDF`}
                />
              </div>

              <Button
                className="mt-4 w-full"
                onClick={() => window.open(article.pdf_url as string, "_blank")}
              >
                Abrir PDF em nova aba
              </Button>
            </div>
          ) : null}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsModal;
