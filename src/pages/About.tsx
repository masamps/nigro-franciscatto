import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { ArrowRight, Award, Users, Target, Globe } from "lucide-react";
import mesaNigro from "@/assets/mesaNigro.png";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excelência Técnica",
      description: "Conhecimento profundo e atualizado em direito securitário"
    },
    {
      icon: Users,
      title: "Atendimento Humanizado",
      description: "Cada cliente é único e merece atenção personalizada"
    },
    {
      icon: Target,
      title: "Resultados Eficazes",
      description: "Foco em soluções práticas e resultados concretos"
    },
    {
      icon: Globe,
      title: "Atuação Nacional",
      description: "Presença em todo território nacional quando necessário"
    }
  ];

  const timeline = [
    {
      year: "1998",
      title: "Fundação do Escritório",
      description: "Início das atividades com foco exclusivo em direito securitário"
    },
    {
      year: "2012",
      title: "Expansão da Equipe",
      description: "Contratação de novos advogados especializados"
    },
    {
      year: "2016",
      title: "Reconhecimento Nacional",
      description: "Participação em casos de grande repercussão no mercado securitário"
    },
    {
      year: "2020",
      title: "Transformação Digital",
      description: "Implementação de tecnologias para melhor atendimento aos clientes"
    },
    {
      year: "2024",
      title: "Presente",
      description: "Consolidação como referência em direito securitário no Brasil"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Advocacia em Seguros - História e Valores</title>
        <meta name="description" content="Conheça a história do nosso escritório de advocacia especializado em seguros. Fundado em 1998, somos referência em direito securitário com ética e excelência." />
        <meta name="keywords" content="sobre advocacia seguros, história escritório, valores advocacia, ética profissional" />
        <link rel="canonical" href="https://advocaciaseguros.com.br/sobre" />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Sobre o Nosso Escritório
                </h1>

                <div className="space-y-6 text-lg">
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Fundada em <strong className="text-foreground">1998</strong>, a{" "}
                    <strong className="text-foreground">Nigro Franciscatto Advocacia</strong>{" "}
                    nasceu com o propósito de oferecer{" "}
                    <strong>assessoria jurídica especializada em direito securitário</strong>,
                    aliando técnica, experiência e comprometimento.
                  </p>

                  <p className="font-sans text-muted-foreground leading-relaxed">
                    A trajetória de sua fundadora começou ainda em{" "}
                    <strong className="text-foreground">1994</strong>, quando iniciou sua carreira
                    na área de sinistros em uma seguradora. Essa vivência prática, somada à formação
                    em Direito e ao curso de corretora de seguros, trouxe uma visão completa do
                    mercado e fortaleceu sua atuação tanto no{" "}
                    <strong>ressarcimento de sinistros</strong> quanto na{" "}
                    <strong>defesa de seguradoras em ações judiciais</strong>.
                  </p>

                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Com mais de duas décadas de experiência, o escritório se consolidou como
                    referência em <strong>advocacia voltada ao setor de seguros</strong>, prezando
                    sempre pela ética, eficiência e confiança em cada caso.
                  </p>

                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Hoje, a Nigro Franciscatto segue comprometida em oferecer{" "}
                    <strong>soluções jurídicas inteligentes e personalizadas</strong>, ajudando{" "}
                    <strong>seguradoras, corretoras e segurados</strong> a atuarem com segurança e
                    tranquilidade em um mercado cada vez mais dinâmico.
                  </p>

                  <p className="font-sans text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Nossa missão</strong> é proteger os direitos
                    de nossos clientes com excelência técnica, ética profissional e atendimento
                    personalizado, garantindo soluções jurídicas eficazes e inovadoras.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button variant="default" asChild>
                    <Link to="/equipe">
                      Conheça Nossa Equipe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/areas-atuacao">Áreas de Atuação</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={mesaNigro}
                  alt="Reunião no escritório Nigro Franciscatto Advocacia"
                  className="rounded-lg shadow-elegant w-full max-h-[600px] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nossos Valores e Diferenciais
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Os princípios que norteiam nossa atuação e nos destacam no mercado jurídico securitário.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card p-8 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="font-sans text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* Clients Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Principais Clientes
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Orgulhamo-nos de atender empresas e instituições que confiam em nosso 
                trabalho e compartilham de nossos valores de ética, comprometimento e excelência.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Card Cliente */}
              <div className="bg-card p-8 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <img
                    src="src/assets/LogoAllianz.png"
                    alt="ALLIANZ SEGUROS SA"
                    className="h-16 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-primary mb-2">Allianz Seguros S.A.</div>
                <p className="font-sans text-muted-foreground text-sm">
                  Uma das maiores seguradoras do mundo, reconhecida pela solidez e inovação em soluções de seguros.
                </p>
              </div>

              <div className="bg-card p-2 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <img
                    src="src/assets/itau.png"
                    alt="Itaú Seguros Auto e Residência S.A."
                    className="h-20 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-primary mb-2">Itaú Seguros Auto e Residência S.A.</div>
                <p className="font-sans text-muted-foreground text-sm">
                  Referência no setor, alia a confiança do Itaú a produtos completos em seguros de automóveis e residências.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <img
                    src="src/assets/yelum.png"
                    alt="Yelum Seguros S.A."
                    className="h-16 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-primary mb-2">Yelum Seguros S.A.</div>
                <p className="font-sans text-muted-foreground text-sm">
                  Entre os maiores grupos seguradores do país, com foco em atendimento excepcional e soluções personalizadas em seguros.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <img
                    src="src/assets/indiana.png"
                    alt="Indiana Seguros S.A."
                    className="h-16 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-primary mb-2">Indiana Seguros S.A.</div>
                <p className="font-sans text-muted-foreground text-sm">
                  Empresa com tradição no mercado securitário, destacando-se pela flexibilidade e agilidade nos serviços.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm border text-center hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <img
                    src="src/assets/hdi.png"
                    alt="HDI Seguros S.A."
                    className="h-16 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-primary mb-2">HDI Seguros S.A.</div>
                <p className="font-sans text-muted-foreground text-sm">
                  Seguradora de destaque nacional, reconhecida pela qualidade no atendimento e diversidade de produtos.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Numbers Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Números que Comprovam Nossa Experiência
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-card p-8 rounded-lg shadow-sm border">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="font-sans text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm border">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="font-sans text-muted-foreground">Casos Resolvidos</div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm border">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="font-sans text-muted-foreground">Taxa de Sucesso</div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm border">
                <div className="text-4xl font-bold text-primary mb-2">24h</div>
                <div className="font-sans text-muted-foreground">Tempo de Resposta</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nossa Trajetória
              </h2>
              <p className="font-sans text-lg text-muted-foreground">
                Uma história de crescimento, evolução e compromisso com a excelência jurídica.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-primary/20"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} ml-12 md:ml-0`}>
                      <div className="bg-card p-6 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                          {item.title}
                        </h3>
                        <p className="font-sans text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Pronto para Conhecer Nossa Equipe?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Conheça os profissionais que fazem a diferença em cada caso e descobra 
              como podemos ajudar com suas questões jurídicas em seguros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/equipe">
                  Conhecer Equipe
                </Link>
              </Button>
              <Button className="border border-input  hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/contato">
                  Entrar em Contato
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;