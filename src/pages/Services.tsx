import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { 
  Scale,
  ArrowRight,
  CheckCircle,
  Phone,
  Gavel,
  Handshake
} from "lucide-react";

const Services = () => {
  const services = [
  {
    icon: Handshake,
    title: "Ressarcimento de Sinistros Extrajudicial",
    description: "Atuação preventiva e estratégica para solucionar conflitos de seguros sem necessidade de processo judicial, reduzindo custos e tempo para segurados e seguradoras.",
    features: [
      "Negociação direta com seguradoras",
      "Defesa contra negativas indevidas de cobertura",
      "Acordos extrajudiciais rápidos e eficazes",
      "Revisão e adequação de apólices"
    ]
  },
  {
    icon: Gavel,
    title: "Ressarcimento de Sinistros Judicial",
    description: "Representação judicial em ações de ressarcimento contra seguradoras, com foco em garantir os direitos dos clientes e recuperar valores devidos.",
    features: [
      "Ações judiciais para cobrança de indenizações",
      "Impugnação de cláusulas abusivas em apólices",
      "Recursos estratégicos para maximizar resultados",
      "Atuação em todas as instâncias do Judiciário"
    ]
  },
  {
    icon: Scale,
    title: "Ressarcimento de Sinistros Contencioso",
    description: "Defesa especializada em litígios complexos de seguros, incluindo disputas administrativas e arbitrais, buscando soluções justas e eficazes.",
    features: [
      "Ações contenciosas de alta complexidade",
      "Atuação em arbitragens e mediações",
      "Recursos administrativos perante a SUSEP",
      "Estratégias jurídicas personalizadas para cada caso"
    ]
  }
];

  const sectors = [
    "Seguro de Vida",
    "Seguro de Automóveis",
    "Seguro Residencial",
    "Seguro Empresarial",
    "Seguro de Viagem",
    "Previdência Privada",
    "Seguro Saúde",
    "Seguro Rural",
    "Seguro de Responsabilidade Civil",
    "Seguro de Crédito"
  ];

  return (
    <>
      <Helmet>
        <title>Áreas de Atuação | Advocacia em Seguros - Serviços Especializados</title>
        <meta name="description" content="Conheça nossas áreas de atuação em direito securitário: análise de apólices, litígios, compliance, consultoria empresarial e mais. Expertise comprovada." />
        <meta name="keywords" content="áreas atuação advocacia seguros, direito securitário, análise apólices, litígios seguros, compliance securitário" />
        <link rel="canonical" href="https://advocaciaseguros.com.br/areas-atuacao" />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Áreas de Atuação
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Oferecemos soluções jurídicas especializadas em direito securitário, 
              com foco na proteção dos direitos e interesses de nossos clientes. 
              Nossa expertise abrange todas as modalidades de seguros e questões 
              relacionadas ao mercado securitário.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-card p-8 rounded-lg shadow-sm border hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-sans font-semibold text-foreground text-sm mb-3">
                      Principais Serviços:
                    </h4>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-sans text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Modalidades de Seguros
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Atuamos em todas as principais modalidades do mercado securitário, 
                oferecendo expertise especializada para cada tipo de seguro.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sectors.map((sector, index) => (
                <div 
                  key={index}
                  className="bg-card p-4 rounded-lg border text-center hover:shadow-sm transition-all duration-300 hover:bg-primary/5"
                >
                  <span className="font-sans text-sm text-foreground font-medium">
                    {sector}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Como Trabalhamos
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Nosso processo é estruturado para garantir o melhor resultado 
                em cada caso, combinando expertise técnica com atendimento humanizado.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Análise Inicial
                </h3>
                <p className="font-sans text-muted-foreground">
                  Avaliação detalhada do seu caso e identificação das melhores estratégias jurídicas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Planejamento
                </h3>
                <p className="font-sans text-muted-foreground">
                  Desenvolvimento de estratégia personalizada com definição de prazos e expectativas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Execução
                </h3>
                <p className="font-sans text-muted-foreground">
                  Implementação das ações necessárias com acompanhamento constante do progresso.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Resultado
                </h3>
                <p className="font-sans text-muted-foreground">
                  Conquista dos objetivos estabelecidos com total transparência sobre os resultados.
                </p>
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
              Entre em contato conosco e solicite uma consulta. Nossa equipe está 
              pronta para analisar seu caso e oferecer as melhores soluções jurídicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/contato">
                  <Phone className="w-4 h-4 mr-2" />
                  Solicitar Consulta
                </Link>
              </Button>
              <Button className="border border-input  hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/equipe">
                  Conhecer Nossa Equipe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;