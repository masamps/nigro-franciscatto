import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/custom-button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Nossos Colaboradores", href: "/equipe" },
    { name: "Áreas de Atuação", href: "/areas-atuacao" },
    { name: "Artigos e Novidades", href: "/artigos" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-elegant transition-all duration-300">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">
                Advocacia & Seguros
              </h1>
              <p className="text-xs text-muted-foreground font-sans">
                Ética e Excelência Jurídica
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-sans font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Button variant="default" asChild>
              <Link to="/contato">Consulta Jurídica</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-3 rounded-lg font-sans font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Button variant="default" className="w-full" asChild>
                  <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                    Consulta Jurídica
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;