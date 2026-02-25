import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestimonialAdded: () => void;
}

const ratingLabels: Record<number, string> = {
  1: "Ruim",
  2: "Regular",
  3: "Bom",
  4: "Muito bom",
  5: "Excelente!",
};

const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({
  isOpen,
  onClose,
  onTestimonialAdded,
}) => {
  const [formData, setFormData] = useState({ name: "", rating: 0, comment: "" });
  const [hovered, setHovered] = useState(0);
  const [animatingStar, setAnimatingStar] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleStarClick = (star: number) => {
    setFormData((prev) => ({ ...prev, rating: star }));
    setAnimatingStar(star);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Por favor, informe o seu nome.");
      return;
    }
    if (formData.rating === 0) {
      setError("Por favor, selecione uma avaliação.");
      return;
    }
    if (!formData.comment.trim()) {
      setError("Por favor, escreva seu depoimento.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: supabaseError } = await supabase.from("depoimentos").insert([
      {
        name: formData.name.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (supabaseError) {
      console.error("Erro ao salvar depoimento:", supabaseError.message);
      setError("Erro ao salvar depoimento. Tente novamente.");
      return;
    }

    toast({
      title: "Depoimento enviado com sucesso!",
      description: "Obrigado por compartilhar sua experiência.",
    });

    setFormData({ name: "", rating: 0, comment: "" });
    setAnimatingStar(null);
    onTestimonialAdded();
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: "", rating: 0, comment: "" });
    setError("");
    setAnimatingStar(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">
          Deixar Depoimento
        </h2>
        <p className="font-sans text-sm text-muted-foreground mb-6">
          Compartilhe sua experiência com nosso escritório.
        </p>

        {error && (
          <p className="text-destructive text-sm mb-4 bg-destructive/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Nome Completo *
            </label>
            <Input
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Avaliação *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hovered || formData.rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-150 ${
                        animatingStar === star ? "animate-star-pop" : ""
                      } ${
                        isActive
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-none text-muted-foreground/30 hover:text-yellow-300 hover:fill-yellow-100"
                      }`}
                      onAnimationEnd={() => setAnimatingStar(null)}
                    />
                  </button>
                );
              })}
            </div>
            {formData.rating > 0 && (
              <p className="font-sans text-xs text-muted-foreground mt-1">
                {ratingLabels[formData.rating]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Depoimento *
            </label>
            <Textarea
              placeholder="Compartilhe sua experiência com o escritório..."
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleClose} variant="secondary" disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar Depoimento"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonialModal;
