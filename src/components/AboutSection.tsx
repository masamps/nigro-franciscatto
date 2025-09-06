import officeMeeting from "@/assets/office-meeting.jpg";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-section bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Sobre o Escritório
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg">
              <p className="font-sans leading-relaxed">
                Fundado em 2008, nosso escritório especializa-se em direito securitário, 
                oferecendo assessoria jurídica completa para seguradoras, corretoras e segurados. 
                Nossa experiência abrange desde consultorias preventivas até litígios complexos.
              </p>
              
              <p className="font-sans leading-relaxed">
                <strong className="text-foreground">Nossa missão</strong> é proteger os direitos 
                de nossos clientes com excelência técnica, ética profissional e atendimento 
                personalizado, garantindo soluções jurídicas eficazes e inovadoras.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    Nossos Valores
                  </h3>
                  <ul className="space-y-2 font-sans">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Ética e transparência
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Excelência técnica
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Atendimento personalizado
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    Diferenciais
                  </h3>
                  <ul className="space-y-2 font-sans">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      +30 anos de experiência
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      Especialização em seguros
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      Atuação nacional
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={officeMeeting} 
              alt="Reunião no escritório de advocacia"
              className="rounded-lg shadow-elegant w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;