import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { Calendar, User, ArrowRight, Clock, Search, Plus } from "lucide-react";
import { useState } from "react";
import AddArticleModal from "@/components/AddArticleModal.tsx"; // importa o modal

interface Article {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([
    {
      title: "Mudanças na Lei de Seguros: O que Você Precisa Saber",
      excerpt: "Análise completa das principais alterações na legislação securitária e seus impactos práticos para segurados e seguradoras. Entenda como as novas regras afetam seus direitos.",
      author: "Dra. Marina Silva Santos",
      date: "15 de Janeiro, 2024",
      category: "Legislação",
      readTime: "8 min",
      featured: true
    },
    {
      title: "Direitos do Segurado em Casos de Sinistro",
      excerpt: "Guia completo sobre os direitos dos segurados durante o processo de regulação de sinistros, incluindo prazos, documentação necessária e como proceder em caso de negativa.",
      author: "Dr. Carlos Eduardo Oliveira",
      date: "08 de Janeiro, 2024",
      category: "Direitos",
      readTime: "12 min",
      featured: true
    },
    {
      title: "Cláusulas Abusivas em Contratos de Seguro",
      excerpt: "Como identificar e questionar cláusulas abusivas em apólices de seguro para proteger seus direitos. Casos práticos e precedentes jurisprudenciais importantes.",
      author: "Dra. Marina Silva Santos",
      date: "28 de Dezembro, 2023",
      category: "Contratos",
      readTime: "10 min",
      featured: true
    },
    {
      title: "Seguro de Vida: Cobertura para Doenças Preexistentes",
      excerpt: "Entenda as regras sobre cobertura de doenças preexistentes em seguros de vida e como proceder quando há divergências sobre a cobertura.",
      author: "Dr. Carlos Eduardo Oliveira",
      date: "20 de Dezembro, 2023",
      category: "Direitos",
      readTime: "6 min",
      featured: false
    },
    {
      title: "Recurso à SUSEP: Quando e Como Fazer",
      excerpt: "Guia prático sobre como e quando recorrer à SUSEP em casos de conflitos com seguradoras, incluindo documentação necessária e prazos.",
      author: "Dra. Marina Silva Santos",
      date: "12 de Dezembro, 2023",
      category: "Dicas",
      readTime: "9 min",
      featured: false
    },
    {
      title: "Jurisprudência Recente em Direito Securitário",
      excerpt: "Análise das principais decisões judiciais recentes em direito securitário e seus impactos na interpretação de contratos de seguro.",
      author: "Dr. Carlos Eduardo Oliveira",
      date: "05 de Dezembro, 2023",
      category: "Jurisprudência",
      readTime: "15 min",
      featured: false
    },
    {
      title: "Seguro Auto: Cobertura para Terceiros",
      excerpt: "Tudo o que você precisa saber sobre a cobertura para terceiros no seguro de automóveis, incluindo limites e exclusões.",
      author: "Dra. Marina Silva Santos",
      date: "28 de Novembro, 2023",
      category: "Dicas",
      readTime: "7 min",
      featured: false
    },
    {
      title: "Má-fé da Seguradora: Como Identificar e Agir",
      excerpt: "Sinais de má-fé por parte da seguradora e medidas legais disponíveis para proteger seus direitos como segurado.",
      author: "Dr. Carlos Eduardo Oliveira",  
      date: "22 de Novembro, 2023",
      category: "Direitos",
      readTime: "11 min",
      featured: false
    }
  ]);

  const categories = ["Todos", "Legislação", "Direitos", "Contratos", "Jurisprudência", "Dicas"];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  // função que será chamada quando um novo artigo for adicionado no modal
  const handleArticleAdded = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  return (
    <>
      <Helmet>
        <title>Artigos e Novidades | Advocacia em Seguros - Blog Jurídico</title>
        <meta name="description" content="Acompanhe nossos artigos sobre direito securitário, análises jurídicas, mudanças na legislação e dicas para segurados. Conteúdo especializado em seguros." />
        <meta name="keywords" content="artigos direito seguros, blog advocacia securitária, novidades legislação seguros, análises jurídicas" />
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
                {featuredArticles.map((article, index) => (
                  <article key={index} className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
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
                {regularArticles.map((article, index) => (
                  <article key={index} className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
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

        {/* Newsletter Section */}
        <section className="py-section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Receba Nossas Novidades
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Cadastre-se em nossa newsletter e seja o primeiro a receber nossos 
              artigos, análises e atualizações sobre direito securitário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:ring-2 focus:ring-primary-foreground focus:outline-none"
              />
              <Button variant="secondary">
                Inscrever-se
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Precisa de Assessoria Jurídica?
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8">
              Se você tem dúvidas sobre questões securitárias ou precisa de 
              representação legal, nossa equipe está pronta para ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" asChild>
                <Link to="/contato">
                  Agendar Consulta
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/equipe">
                  Conhecer Nossa Equipe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

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
    </>
  );
};

export default Blog;
