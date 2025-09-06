import lawyer1 from "@/assets/lawyer-1.jpg";
import lawyer2 from "@/assets/lawyer-2.jpg";

const TeamSection = () => {
  const team = [
    {
      name: "Dra. Marina Silva Santos",
      specialty: "Sócia-Fundadora | Direito Securitário",
      image: lawyer1,
      description: "Especialista em direito securitário com mais de 18 anos de experiência. Mestre em Direito Civil pela USP."
    },
    {
      name: "Dr. Carlos Eduardo Oliveira",
      specialty: "Sócio | Litígios e Recursos",
      image: lawyer2,
      description: "Advogado especializado em litígios securitários e recursos administrativos. Pós-graduado em Direito do Seguro."
    }
  ];

  return (
    <section id="equipe" className="py-section bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nossa Equipe
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
            Profissionais altamente qualificados e comprometidos com a excelência 
            no atendimento e na defesa dos direitos de nossos clientes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-elegant transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                
                <p className="font-sans text-primary font-semibold mb-4">
                  {member.specialty}
                </p>
                
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-muted/30 p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Faça Parte da Nossa Equipe
            </h3>
            <p className="font-sans text-muted-foreground mb-6">
              Estamos sempre em busca de talentos excepcionais para integrar nosso time. 
              Envie seu currículo e faça parte de uma equipe comprometida com a excelência.
            </p>
            <button 
              onClick={() => document.getElementById('curriculos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Enviar Currículo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;