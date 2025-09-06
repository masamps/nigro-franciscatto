import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-6">
              Advocacia & Seguros
            </h3>
            <p className="font-sans text-primary-foreground/80 mb-6 max-w-md">
              Especialistas em direito securitário com mais de 15 anos de experiência. 
              Defendemos seus direitos com ética e excelência.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">
                  Av. Paulista, 1000 - Conjunto 1201, Bela Vista, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm">(11) 3456-7890 | (11) 98765-4321</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm">contato@advocaciaseguros.com.br</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Links Rápidos</h4>
            <nav className="space-y-3">
              <a 
                href="#sobre" 
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Sobre o Escritório
              </a>
              <a 
                href="#areas-atuacao" 
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Áreas de Atuação
              </a>
              <a 
                href="#equipe" 
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Nossa Equipe
              </a>
              <a 
                href="#artigos" 
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Artigos & Novidades
              </a>
              <a 
                href="#contato" 
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Contato
              </a>
            </nav>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Serviços</h4>
            <nav className="space-y-3">
              <span className="block text-sm text-primary-foreground/80">
                Direito Securitário
              </span>
              <span className="block text-sm text-primary-foreground/80">
                Análise de Apólices
              </span>
              <span className="block text-sm text-primary-foreground/80">
                Litígios e Recursos
              </span>
              <span className="block text-sm text-primary-foreground/80">
                Consultoria Empresarial
              </span>
              <span className="block text-sm text-primary-foreground/80">
                Compliance Securitário
              </span>
            </nav>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a 
              href="#" 
              className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Advocacia & Seguros. Todos os direitos reservados.
            </p>
            <p className="text-xs text-primary-foreground/40 mt-1">
              OAB/SP 123.456 | CNPJ: 12.345.678/0001-90
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;