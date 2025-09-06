import { Calendar, User, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const articles = [
    {
      title: "Mudanças na Lei de Seguros: O que Você Precisa Saber",
      excerpt: "Análise das principais alterações na legislação securitária e seus impactos para segurados e seguradoras.",
      author: "Dra. Marina Silva Santos",
      date: "15 de Janeiro, 2024",
      category: "Legislação"
    },
    {
      title: "Direitos do Segurado em Casos de Sinistro",
      excerpt: "Guia completo sobre os direitos dos segurados durante o processo de regulação de sinistros.",
      author: "Dr. Carlos Eduardo Oliveira",
      date: "08 de Janeiro, 2024",
      category: "Direitos"
    },
    {
      title: "Cláusulas Abusivas em Contratos de Seguro",
      excerpt: "Como identificar e questionar cláusulas abusivas em apólices de seguro para proteger seus direitos.",
      author: "Dra. Marina Silva Santos",
      date: "28 de Dezembro, 2023",
      category: "Contratos"
    }
  ];

  return (
    <section id="artigos" className="py-section bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Artigos & Novidades
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
            Mantenha-se atualizado com as últimas novidades do direito securitário 
            e insights de nossos especialistas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article 
              key={index}
              className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
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
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-all">
            Ver Todos os Artigos
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;