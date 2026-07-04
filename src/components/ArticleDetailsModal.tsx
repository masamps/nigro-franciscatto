// src/components/ArticleDetailsModal.tsx
import { X, User, Calendar } from "lucide-react";
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

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const ArticleDetailsModal: React.FC<ArticleDetailsModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center gap-4 p-4 md:p-5 border-b shrink-0">
          <h2 className="text-lg md:text-2xl font-serif font-bold leading-snug">{article.title}</h2>
          <button onClick={onClose} aria-label="Fechar" className="shrink-0">
            <X className="w-6 h-6 text-muted-foreground hover:text-primary transition" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 md:p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pb-4 border-b">
            {article.category && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
            )}
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
            )}
            {article.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
            )}
          </div>

          {article.excerpt && <p className="text-muted-foreground italic">{article.excerpt}</p>}

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

              <div className="w-full h-[300px] md:h-[500px] border rounded-lg overflow-hidden">
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
        <div className="p-4 border-t flex justify-end shrink-0">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsModal;
