import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom-button";
import { Shield, Lock, FileCheck, ArrowRight, Phone } from "lucide-react";

const Privacy = () => {
  const principles = [
    "Finalidade: seus dados são utilizados apenas para os propósitos informados.",
    "Adequação: tratamento compatível com as necessidades do serviço prestado.",
    "Necessidade: apenas dados estritamente necessários são coletados.",
    "Transparência: você tem direito a saber como seus dados são usados.",
    "Segurança: aplicamos medidas técnicas e administrativas para proteger seus dados.",
    "Prevenção: ações para evitar danos relacionados ao tratamento de dados.",
    "Não Discriminação: jamais utilizamos dados para fins discriminatórios.",
    "Responsabilização: assumimos o dever de proteger seus dados pessoais.",
  ];

  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Advocacia em Seguros</title>
        <meta
          name="description"
          content="Saiba como tratamos seus dados pessoais conforme a LGPD. Política de Privacidade da Advocacia em Seguros."
        />
        <meta
          name="keywords"
          content="LGPD advocacia, política de privacidade, proteção de dados, advocacia seguros"
        />
        <link
          rel="canonical"
          href="https://advocaciaseguros.com.br/privacidade"
        />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Política de Privacidade
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A proteção dos seus dados pessoais é prioridade. Esta política
              explica como coletamos, utilizamos e armazenamos suas informações,
              em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Princípios da LGPD
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                Seguimos rigorosamente os princípios da Lei Geral de Proteção de
                Dados para garantir a segurança e a transparência no tratamento
                das suas informações pessoais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principles.map((item, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-elegant transition-all duration-300 flex items-start gap-3"
                >
                  <FileCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-sans text-sm text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rights Section */}
        <section className="py-section bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Seus Direitos
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                De acordo com a LGPD, você possui diversos direitos em relação
                aos seus dados pessoais. Estamos comprometidos em respeitar e
                garantir esses direitos.
              </p>
            </div>

            <ul className="space-y-4 font-sans text-muted-foreground text-lg">
              <li>• Acessar os dados que temos sobre você.</li>
              <li>• Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>• Solicitar a exclusão de dados desnecessários.</li>
              <li>
                • Revogar o consentimento para uso dos seus dados a qualquer
                momento.
              </li>
              <li>• Solicitar portabilidade para outro fornecedor de serviços.</li>
            </ul>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-section bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Lock className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Segurança das Informações
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
              Utilizamos medidas técnicas e administrativas adequadas para
              proteger seus dados contra acessos não autorizados, perdas,
              alterações ou qualquer forma de tratamento inadequado ou ilícito.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Quer saber mais sobre nossa Política de Privacidade?
            </h2>
            <p className="font-sans text-lg mb-8 opacity-90">
              Entre em contato conosco para esclarecer qualquer dúvida sobre o
              tratamento de seus dados pessoais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/contato">
                  <Phone className="w-4 h-4 mr-2" />
                  Falar com nossa equipe
                </Link>
              </Button>
              <Button className="border border-input hover:bg-accent hover:text-accent-foreground" asChild>
                <Link to="/">
                  Voltar para a Home
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

export default Privacy;
