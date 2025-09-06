import { Shield, FileText, Scale, Users, Briefcase, TrendingUp } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Direito Securitário",
      description: "Consultoria especializada em contratos de seguros, análise de coberturas e defesa de direitos dos segurados."
    },
    {
      icon: FileText,
      title: "Análise de Apólices",
      description: "Revisão técnica de apólices de seguros, identificação de cláusulas abusivas e orientação sobre coberturas."
    },
    {
      icon: Scale,
      title: "Litígios e Recursos",
      description: "Representação em ações judiciais, recursos administrativos e negociações extrajudiciais."
    },
    {
      icon: Users,
      title: "Consultoria Empresarial",
      description: "Assessoria jurídica para seguradoras, corretoras e empresas do setor securitário."
    },
    {
      icon: Briefcase,
      title: "Compliance Securitário",
      description: "Implementação de políticas de conformidade e adequação às normas da SUSEP."
    },
    {
      icon: TrendingUp,
      title: "Recuperação de Valores",
      description: "Ações de cobrança e recuperação de valores em sinistros e indenizações."
    }
  ];

  return (
    <section id="areas-atuacao" className="py-section bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Áreas de Atuação
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções jurídicas especializadas em direito securitário, 
            com foco na proteção dos direitos e interesses de nossos clientes.
          </p>
        </div>
        
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
              
              <p className="font-sans text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-sans text-lg text-muted-foreground mb-6">
            Precisa de assessoria jurídica especializada em seguros?
          </p>
          <button 
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Solicite uma Consulta
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;