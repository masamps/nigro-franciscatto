import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { ArrowRight, Mail, Award, BookOpen } from "lucide-react";
import lawyer1 from "@/assets/roberta-nigro.png";
import lawyer2 from "@/assets/lawyer-2.jpg";
import noPic from "@/assets/noPicFem.jpg";
import { FaWhatsapp } from "react-icons/fa";

const Team = () => {
  const team = [
    {
      name: "Dra. Roberta Nigro Franciscatto",
      role: "Sócia-Fundadora",
      specialty: "Direito Securitário",
      image: lawyer1,
      description: "Especialista em direito securitário com mais de 18 anos de experiência. Mestre em Direito Civil pela USP e pós-graduada em Direito do Consumidor. Reconhecida pelo mercado por sua atuação em casos complexos de seguros de vida e previdência.",
      education: [
        "Graduação em Direito - Instituição Toledo de Ensino - Faculdade de Direito de Bauru"
      ],
      achievements: [
        "Certificação em Mediação pela CNJ",
        "Membro do Instituto Brasileiro de Direito do Seguro",
        "Autor de artigos em revistas especializadas"
      ],
      email: [
        "robertanigro@nigrofranciscatto.com.br"
      ],
      whatsapp: []
    },
    {
      name: "Dra. Nicole Nigro",
      role: "Sócia",
      specialty: "Litígios e Recursos",
      image: noPic,
      description: "Advogado especializado em litígios securitários e recursos administrativos com 15 anos de experiência. Pós-graduado em Direito do Seguro pela ENS e especialista em mediação e arbitragem. Reconhecido por sua expertise em casos de sinistros complexos.",
      education: [
        "Graduação em Direito 2022 - Faculdade de Direito de Sorocaba - FADI"
      ],
      achievements: [
        "OAB 521.116",
      ],
      email: [
        "nicolefranciscatto@nigrofranciscatto.com.br"
      ],
      whatsapp: []
    },
    {
      name: "Dra. Roberta Carvalho dos Anjos Zuca",
      role: "Advogada",
      specialty: "",
      image: noPic,
      description: "Advogado especializado em litígios securitários e recursos administrativos com 15 anos de experiência. Pós-graduado em Direito do Seguro pela ENS e especialista em mediação e arbitragem. Reconhecido por sua expertise em casos de sinistros complexos.",
      education: [
        "Graduação em Direito 2005 - Universidade Paulista Campus Campinas/SP"
      ],
      achievements: [
        "OAB 262.791",
      ],
      email: [
        "robertacarvalho@nigrofranciscatto.com.br"
      ],
      whatsapp: []
    }
  ];

  const trainee = [
    {
      name:"Andressa Camargo",
      role: "Estagiária",
      email: "analista01@nigrofranciscatto.com.br",
      image: noPic,
    },
    {
      name:"Fabiana Camargo",
      role: "Estagiária",
      email: "analista02@nigrofranciscatto.com.br",
      image: noPic,
    },
    {
      name:"Lorena Siqueira",
      role: "Estagiária",
      email: "analista03@nigrofranciscatto.com.br",
      image: noPic,
    },

  ];

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=15988151900`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Nossa Equipe | Advocacia em Seguros - Profissionais Especializados</title>
        <meta name="description" content="Conheça nossa equipe de advogados especialistas em direito securitário. Profissionais qualificados com vasta experiência em seguros e litígios." />
        <meta name="keywords" content="equipe advocacia seguros, advogados especialistas, direito securitário, Marina Silva Santos, Carlos Eduardo Oliveira" />
        <link rel="canonical" href="https://advocaciaseguros.com.br/equipe" />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Nossa Equipe
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Profissionais altamente qualificados e comprometidos com a excelência 
              no atendimento e na defesa dos direitos de nossos clientes. Cada membro 
              de nossa equipe traz experiência única em direito securitário.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="bg-card rounded-lg shadow-elegant border overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={`${member.name} - ${member.role}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                          {member.name}
                        </h2>
                        <p className="font-sans text-xl text-primary font-semibold mb-2">
                          {member.role}
                        </p>
                        <p className="font-sans text-lg text-muted-foreground">
                          {member.specialty}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-background p-6 rounded-lg border">
                          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Formação Acadêmica
                          </h3>
                          <ul className="space-y-2">
                            {member.education.map((edu, eduIndex) => (
                              <li key={eduIndex} className="font-sans text-sm text-muted-foreground">
                                • {edu}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-background p-6 rounded-lg border">
                          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Reconhecimentos
                          </h3>
                          <ul className="space-y-2">
                            {member?.achievements?.map((achievement, achIndex) => (
                              <li key={achIndex} className="font-sans text-sm text-muted-foreground">
                                • {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors" onClick={() => openWhatsApp()}>
                          <FaWhatsapp className="w-4 h-4" />
                          Whatsapp
                        </button>
                        <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
                          <Mail className="w-4 h-4" />
                          Enviar e-mail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trainee Section */}
        <section className="py-section bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {trainee.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-lg shadow-elegant border p-6 text-center"
                >
                  <div className="w-32 h-32 mx-auto rounded overflow-hidden mb-4 border">
                    <img
                      src={member.image} // 👉 depois substituímos por fotos reais
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <button
                    onClick={() => window.location.href = `mailto:${member.email}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors mx-auto"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar e-mail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Join Team Section */}
        <section className="py-section bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Faça Parte da Nossa Equipe
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Estamos sempre em busca de talentos excepcionais para integrar nosso time. 
                Se você é um profissional apaixonado por direito securitário e busca um 
                ambiente de trabalho estimulante e colaborativo, queremos conhecê-lo.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    O que Oferecemos
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Ambiente colaborativo e estimulante</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Oportunidades de crescimento profissional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Participação em casos desafiadores</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Investimento em capacitação contínua</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    Perfil que Buscamos
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Formação em Direito com excelência acadêmica</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Interesse em direito securitário</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Proatividade e pensamento analítico</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-sans text-muted-foreground">Compromisso com ética profissional</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8 pt-8 border-t border-border">
                <p className="font-sans text-muted-foreground mb-6">
                  Interessado em fazer parte da nossa equipe? Envie seu currículo e 
                  participe dos nossos processos seletivos.
                </p>
                <Button variant="default" asChild>
                  <Link to="/contato#curriculos">
                    Enviar Currículo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Conheça Nossa Atuação Profissional
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Descubra as áreas em que nossos especialistas podem ajudar você 
              com questões relacionadas ao direito securitário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/areas-atuacao">
                  Ver Áreas de Atuação
                </Link>
              </Button>
              <Button className="border border-input  hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/contato">
                  Solicitar Consulta
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Team;