import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { ArrowRight, Shield, Users, Scale, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import officeMeeting from "@/assets/office-meeting.jpg";

const Home = () => {
  const highlights = [
    {
      icon: Shield,
      title: "Especialização em Seguros",
      description: "Mais de 15 anos de experiência exclusiva em direito securitário"
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Cada cliente recebe atenção dedicada e soluções sob medida"
    },
    {
      icon: Scale,
      title: "Ética e Transparência",
      description: "Compromisso com os mais altos padrões éticos da advocacia"
    },
    {
      icon: TrendingUp,
      title: "Resultados Comprovados",
      description: "Histórico de sucesso em casos complexos de direito securitário"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nigro Franciscatto</title>
        <meta name="description" content="Escritório de advocacia especializado em seguros com mais de 15 anos de experiência. Consultoria jurídica, análise de apólices e defesa de direitos." />
        <meta name="keywords" content="advocacia, seguros, direito securitário, consultoria jurídica, análise apólice, São Paulo" />
      </Helmet>

      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackground})` }}
          >
            <div className="absolute inset-0 bg-hero-gradient opacity-90"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Nigro Franciscatto
              </h1>
            </div>
            
            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed">
              Sociedade Individual de Advocacia
            </p>
            
            <p className="font-sans text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Especialistas em direito securitário com mais de 25 anos de experiência. 
              Oferecemos consultoria jurídica de alta qualidade para proteger seus interesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="border border-input  hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/contato">
                  Entre em Contato
                </Link>
              </Button>
              <Button variant="secondary" className="text-white border-grey hover:bg-white hover:text-black" asChild>
                <Link to="/sobre">
                  Conheça Nosso Escritório
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Por Que Escolher Nosso Escritório?
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Combinamos experiência, especialização e compromisso para oferecer 
                as melhores soluções jurídicas em direito securitário.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="text-center group hover:shadow-elegant p-6 rounded-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <highlight.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {highlight.title}
                  </h3>
                  <p className="font-sans text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick About Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Experiência e Confiança em Direito Securitário
                </h2>
                <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                  Fundado em 1998, nosso escritório se especializou exclusivamente em direito 
                  securitário, desenvolvendo expertise profunda em todas as nuances desta área 
                  complexa do direito.
                </p>
                <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
                  Defendemos os direitos de segurados, assessoramos seguradoras e oferecemos 
                  consultoria preventiva para evitar litígios desnecessários.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" asChild>
                    <Link to="/sobre">
                      Saiba Mais Sobre Nós
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/areas-atuacao">
                      Ver Áreas de Atuação
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={officeMeeting} 
                  alt="Escritório de advocacia especializado em seguros"
                  className="rounded-lg shadow-elegant w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Precisa de Assessoria Jurídica em Seguros?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Entre em contato conosco e agende uma consulta. Estamos prontos para 
              defender seus direitos e oferecer as melhores soluções jurídicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/contato">
                  Agendar Consulta
                </Link>
              </Button>
              <Button className="border border-input  hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/equipe">
                  Conhecer Nossa Equipe
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;