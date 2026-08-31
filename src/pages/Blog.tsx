import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/custom-button";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  SearchX,
  Star,
  Tag,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AddArticleModal from "@/components/AddArticleModal.tsx";
import ArticleDetailsModal from "@/components/ArticleDetailsModal.tsx";
import { supabase } from "@/lib/supabaseClient";

interface Article {
  id?: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  featured: boolean;
  content?: string;
}

const ARTICLES_PER_PAGE = 6;
const FEATURED_LIMIT = 3;

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const formatDate = (dateString?: string) => {
  if (!dateString) return "—";
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

/** Chave "AAAA-MM" usada para agrupar os artigos por mês */
const getPeriodKey = (dateString?: string) =>
  dateString ? dateString.split("T")[0].slice(0, 7) : "";

const formatPeriod = (periodKey: string) => {
  const [year, month] = periodKey.split("-");
  return `${MONTH_NAMES[Number(month) - 1]} de ${year}`;
};

/** Régua de páginas, com reticências quando há muitas */
const getPageNumbers = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  onOpen: (article: Article) => void;
}

const ArticleCard = ({ article, featured = false, onOpen }: ArticleCardProps) => (
  <article className="relative flex flex-col bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
    {featured && (
      <>
        <div className="h-1.5 bg-hero-gradient" />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-md">
          <Star className="w-3 h-3 fill-current" />
          Destaque
        </div>
      </>
    )}

    <div className="p-6 flex flex-col flex-1">
      <div className={`flex flex-wrap items-center gap-2 mb-4 ${featured ? "pr-24" : ""}`}>
        <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {article.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {article.read_time}
        </span>
      </div>

      <h3 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>

      <p className="font-sans text-muted-foreground mb-6 line-clamp-3">
        {article.excerpt}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground mb-4 mt-auto">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{article.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(article.date)}</span>
        </div>
      </div>

      <button
        className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        onClick={() => onOpen(article)}
      >
        Ler artigo completo
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </article>
);

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPeriod, setSelectedPeriod] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const listRef = useRef<HTMLElement>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Erro ao buscar artigos:", error.message);
    } else {
      setArticles(data as Article[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleArticleAdded = () => {
    fetchArticles();
  };

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).sort(),
    [articles]
  );

  /** Meses que possuem artigos, do mais recente para o mais antigo */
  const periods = useMemo(() => {
    const counter = new Map<string, number>();
    articles.forEach((article) => {
      const key = getPeriodKey(article.date);
      if (key) counter.set(key, (counter.get(key) ?? 0) + 1);
    });
    return Array.from(counter.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [articles]);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !term ||
          article.title?.toLowerCase().includes(term) ||
          article.excerpt?.toLowerCase().includes(term);
        const matchesCategory =
          selectedCategory === "Todos" || article.category === selectedCategory;
        const matchesPeriod =
          selectedPeriod === "Todos" || getPeriodKey(article.date) === selectedPeriod;
        return matchesSearch && matchesCategory && matchesPeriod;
      }),
    [articles, searchTerm, selectedCategory, selectedPeriod]
  );

  const isFiltering =
    searchTerm.trim() !== "" || selectedCategory !== "Todos" || selectedPeriod !== "Todos";

  // Sem filtros, os mais recentes viram vitrine e o restante entra na lista paginada.
  // Com filtros ativos, mostramos apenas a lista de resultados.
  const featuredArticles = isFiltering
    ? []
    : filteredArticles.filter((article) => article.featured).slice(0, FEATURED_LIMIT);

  const listArticles = filteredArticles.filter(
    (article) => !featuredArticles.includes(article)
  );

  const totalPages = Math.max(1, Math.ceil(listArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedArticles = listArticles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE
  );

  // Qualquer mudança de filtro volta para a primeira página
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPeriod]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todos");
    setSelectedPeriod("Todos");
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Artigos e Novidades | Advocacia em Seguros - Blog Jurídico</title>
        <meta
          name="description"
          content="Acompanhe nossos artigos sobre direito securitário, análises jurídicas, mudanças na legislação e dicas para segurados. Conteúdo especializado em seguros."
        />
        <meta
          name="keywords"
          content="artigos direito seguros, blog advocacia securitária, novidades legislação seguros, análises jurídicas"
        />
        <link rel="canonical" href="https://advocaciaseguros.com.br/artigos" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
                <BookOpen className="w-4 h-4" />
                Conteúdo Jurídico Especializado
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Artigos & Novidades
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                Mantenha-se atualizado com as últimas novidades do direito securitário,
                análises jurídicas especializadas e insights de nossos especialistas.
                Conhecimento que protege seus direitos.
              </p>
            </div>

            {/* Busca e filtros */}
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-lg shadow-elegant focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filtro por mês */}
                <div className="relative flex-1">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    aria-label="Filtrar por mês"
                    className="w-full appearance-none pl-10 pr-9 py-3 bg-white rounded-lg shadow-elegant outline-none focus:ring-2 focus:ring-white cursor-pointer transition-all truncate"
                  >
                    <option value="Todos">Todos os meses</option>
                    {periods.map(([key, count]) => (
                      <option key={key} value={key}>
                        {formatPeriod(key)} ({count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Filtro por categoria */}
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filtrar por categoria"
                    className="w-full appearance-none pl-10 pr-9 py-3 bg-white rounded-lg shadow-elegant outline-none focus:ring-2 focus:ring-white cursor-pointer transition-all truncate"
                  >
                    <option value="Todos">Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {isFiltering && (
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <span className="font-sans text-sm text-white/80">
                    {filteredArticles.length}{" "}
                    {filteredArticles.length === 1
                      ? "artigo encontrado"
                      : "artigos encontrados"}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Carregando artigos...</div>
        ) : (
          <>
            {/* Artigos em destaque */}
            {featuredArticles.length > 0 && (
              <section className="py-section bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                      Artigos em Destaque
                    </h2>
                    <p className="font-sans text-muted-foreground">
                      Nossos conteúdos mais relevantes e atuais sobre direito securitário
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        featured
                        onOpen={openArticle}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Listagem paginada */}
            <section ref={listRef} className="py-section bg-background scroll-mt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {isFiltering ? "Resultados da busca" : "Todos os Artigos"}
                  </h2>
                  {listArticles.length > 0 && (
                    <p className="font-sans text-muted-foreground">
                      {listArticles.length}{" "}
                      {listArticles.length === 1 ? "artigo" : "artigos"}
                      {totalPages > 1 && ` — página ${safePage} de ${totalPages}`}
                    </p>
                  )}
                </div>

                {paginatedArticles.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {paginatedArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onOpen={openArticle}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <nav
                        className="flex flex-wrap items-center justify-center gap-2 mt-12"
                        aria-label="Paginação dos artigos"
                      >
                        <button
                          onClick={() => goToPage(safePage - 1)}
                          disabled={safePage === 1}
                          aria-label="Página anterior"
                          className="w-10 h-10 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-40 disabled:pointer-events-none"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {getPageNumbers(safePage, totalPages).map((page, index) =>
                          page === "..." ? (
                            <span
                              key={`gap-${index}`}
                              className="w-10 text-center text-muted-foreground"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              aria-current={page === safePage ? "page" : undefined}
                              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                                page === safePage
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}

                        <button
                          onClick={() => goToPage(safePage + 1)}
                          disabled={safePage === totalPages}
                          aria-label="Próxima página"
                          className="w-10 h-10 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-40 disabled:pointer-events-none"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </nav>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <SearchX className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      Nenhum artigo encontrado
                    </h3>
                    <p className="font-sans text-muted-foreground mb-6">
                      Tente ajustar a pesquisa ou selecionar outro mês.
                    </p>
                    <Button variant="default" onClick={clearFilters}>
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Modal */}
        <AddArticleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onArticleAdded={handleArticleAdded}
        />
        <ArticleDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          article={selectedArticle}
        />
      </main>
    </>
  );
};

export default Blog;
