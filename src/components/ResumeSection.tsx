import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";

const ResumeSection = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (allowedTypes.includes(file.type)) {
      setUploadedFile(file);
      toast({
        title: "Arquivo carregado com sucesso!",
        description: `${file.name} foi adicionado.`,
      });
    } else {
      toast({
        title: "Formato não suportado",
        description: "Por favor, envie apenas arquivos PDF ou DOC/DOCX.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      toast({
        title: "Currículo enviado com sucesso!",
        description: "Analisaremos seu perfil e entraremos em contato.",
      });
      setUploadedFile(null);
    }
  };

  return (
    <section id="curriculos" className="py-section bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Banco de Currículos
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Interessado em fazer parte da nossa equipe? Envie seu currículo e 
            participe dos nossos processos seletivos.
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Envio de Currículo
            </h3>
            <p className="font-sans text-muted-foreground mb-6">
              Aceitamos currículos nos formatos PDF, DOC ou DOCX. Certifique-se de que 
              seu arquivo esteja atualizado e contenha suas informações de contato.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Arquivo do Currículo *
              </label>
              
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-semibold mb-2">
                      Clique para selecionar ou arraste seu arquivo aqui
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações Importantes
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Mantenha seu currículo atualizado com experiências recentes</li>
                <li>• Inclua informações de contato completas (telefone e e-mail)</li>
                <li>• Destaque experiências em direito securitário (se houver)</li>
                <li>• Currículos ficam em nosso banco por 12 meses</li>
                <li>• Entraremos em contato apenas se houver oportunidades compatíveis</li>
              </ul>
            </div>
            
            <Button 
              type="submit" 
              variant="contact" 
              className="w-full"
              disabled={!uploadedFile}
            >
              Enviar Currículo
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;