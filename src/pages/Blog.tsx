import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { Calendar, User, ArrowRight, Clock, Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AddArticleModal from "@/components/AddArticleModal.tsx";
import { supabase } from "@/lib/supabaseClient"; // <-- importante: ajustar o caminho conforme seu projeto

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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Todos", "Legislação", "Direitos", "Contratos", "Jurisprudência", "Dicas"];

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

  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Artigos & Novidades
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Mantenha-se atualizado com as últimas novidades do direito securitário, 
                análises jurídicas especializadas e insights de nossos especialistas. 
                Conhecimento que protege seus direitos.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Pesquisar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Carregando artigos...</div>
        ) : (
          <>
            {/* Featured Articles */}
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

                  <div className="grid lg:grid-cols-3 gap-8">
                    {featuredArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300 group"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
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

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{article.date}</span>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Regular Articles */}
            {regularArticles.length > 0 && (
              <section className="py-section bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                      Todos os Artigos
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {regularArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300 group"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
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

                          <p className="font-sans text-muted-foreground mb-6 line-clamp-2">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{article.date}</span>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                            Ler mais
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}
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
      </main>
    </>
  );
};

export default Blog;
