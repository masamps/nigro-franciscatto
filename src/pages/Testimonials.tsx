import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/custom-button";
import { Plus, Star, User } from "lucide-react";
import AddTestimonialModal from "@/components/AddTestimonialModal";

interface Testimonial {
  id?: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const StarDisplay = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const starSize = size === "lg" ? "w-7 h-7" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("depoimentos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar depoimentos:", error.message);
    } else {
      setTestimonials(data as Testimonial[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Depoimentos | Advocacia Nigro Franciscatto</title>
        <meta
          name="description"
          content="Veja o que nossos clientes dizem sobre os serviços do escritório Nigro Franciscatto. Depoimentos reais de clientes satisfeitos."
        />
        <meta
          name="keywords"
          content="depoimentos clientes, avaliações advocacia, opinião clientes, escritório advocacia seguros"
        />
        <link rel="canonical" href="https://advocaciaseguros.com.br/depoimentos" />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Depoimentos
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A confiança dos nossos clientes é o nosso maior patrimônio.
                Veja o que eles dizem sobre nossa atuação e o atendimento prestado.
              </p>
            </div>

            {/* Average Rating Card */}
            {!loading && testimonials.length > 0 && (
              <div className="flex flex-col items-center justify-center bg-muted/30 rounded-2xl py-10 px-8 max-w-xs mx-auto mb-4 border">
                <p className="font-sans text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                  Avaliação Média
                </p>
                <p className="font-serif text-7xl font-bold text-foreground leading-none mb-4">
                  {averageRating.toFixed(1)}
                </p>
                <StarDisplay rating={Math.round(averageRating)} size="lg" />
                <p className="font-sans text-sm text-muted-foreground mt-3">
                  Baseado em{" "}
                  <span className="font-semibold text-foreground">{testimonials.length}</span>{" "}
                  {testimonials.length === 1 ? "depoimento" : "depoimentos"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20 text-muted-foreground font-sans">
                Carregando depoimentos...
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-20">
                <Star className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="font-serif text-xl text-foreground mb-2">
                  Nenhum depoimento ainda
                </p>
                <p className="font-sans text-muted-foreground">
                  Seja o primeiro a compartilhar sua experiência conosco.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-card rounded-lg shadow-sm border p-6 hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-sans font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {formatDate(testimonial.created_at)}
                        </p>
                      </div>
                    </div>

                    <StarDisplay rating={testimonial.rating} />

                    <p className="font-sans text-muted-foreground mt-4 leading-relaxed">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <AddTestimonialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTestimonialAdded={fetchTestimonials}
        />
      </main>
    </>
  );
};

export default Testimonials;
