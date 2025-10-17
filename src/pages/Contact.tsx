import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { supabase } from "@/lib/supabaseClient";


const Contact = () => {
  const { toast } = useToast();
  
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    lgpd: false,
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeForm, setResumeForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    lgpd: false,
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_diah3ju",
        "template_4j2shs3",
        {
          title: contactForm.subject,
          from_name: contactForm.name,
          reply_to: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
        },
        "iMV2JXWr-RovUUEPD"
      );

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      setContactForm({ name: "", email: "", phone: "", subject: "", message: "", lgpd: false });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setContactForm({
        ...contactForm,
        [target.name]: target.checked,
      });
    } else {
      setContactForm({
        ...contactForm,
        [target.name]: target.value,
      });
    }
  };

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

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) return;

    if (!resumeForm.lgpd) {
      toast({
        title: "Consentimento LGPD necessário",
        description: "Você precisa aceitar a Política de Privacidade antes de enviar seu currículo.",
        variant: "destructive",
      });
      return;
    }

    try {
    const filePath = `${Date.now()}-${uploadedFile.name}`;
    const { data: fileData, error: uploadError } = await supabase.storage
      .from("curriculos-public")
      .upload(filePath, uploadedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("curriculos-public")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from("curriculos").insert([
      {
        name: resumeForm.name,
        email: resumeForm.email,
        phone: resumeForm.phone,
        position: resumeForm.position,
        file_url: fileUrl,
      },
    ]);

    if (insertError) throw insertError;

    toast({
      title: "Currículo enviado com sucesso!",
      description: "Seu currículo foi armazenado em nosso banco de talentos.",
    });

    setUploadedFile(null);
    setResumeForm({ name: "", email: "", phone: "", position: "", lgpd: false });
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao enviar currículo",
      description: "Tente novamente mais tarde.",
      variant: "destructive",
    });
  }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setResumeForm({
        ...resumeForm,
        [e.target.name]: e.target.checked,
      });
    } else {
      setResumeForm({
        ...resumeForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contato | Advocacia em Seguros - Fale Conosco</title>
        <meta name="description" content="Entre em contato com nosso escritório de advocacia em seguros. Endereço, telefone, e-mail e formulário de contato. Estamos prontos para ajudar você." />
        <meta name="keywords" content="contato advocacia seguros, endereço escritório, telefone advogado, consultoria jurídica" />
        <link rel="canonical" href="https://advocaciaseguros.com.br/contato" />
      </Helmet>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Entre em Contato
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Estamos prontos para ajudá-lo com suas questões jurídicas em direito securitário. 
              Entre em contato conosco e agende uma consulta personalizada com nossa equipe especializada.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                  Informações de Contato
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua Carlos Roberto de Melo, 475 - Sala 301 - Metropolitan Office Tower, 
                        Parque Gabriel, Hortolândia - SP<br />
                        CEP: 13186-604
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Telefones</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+551134567890" className="hover:text-primary transition-colors">
                          (15) 98815-1900
                        </a><br />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">E-mails</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:robertanigro@nigrofranciscatto.com.br" className="hover:text-primary transition-colors">
                          robertanigro@nigrofranciscatto.com.br
                        </a><br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h<br />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="w-full flex justify-center items-center bg-gray-50 p-6 rounded-xl shadow-elegant">
                  <iframe
                    className="rounded-lg shadow-lg w-full h-[200px] max-w-6xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.0140050956857!2d-47.211891023730615!3d-22.875941036771277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b93cd2a6933f%3A0x4f170e2462b44684!2sMetropolitan%20Office%20Tower!5e0!3m2!1spt-BR!2sbr!4v1760658304258!5m2!1spt-BR!2sbr"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-lg shadow-sm border">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Envie sua Mensagem
                </h2>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        required
                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background"
                      >
                        <option value="">Selecione o assunto</option>
                        <option value="consultoria">Consultoria Jurídica</option>
                        <option value="analise-apolice">Análise de Apólice</option>
                        <option value="litigio">Litígio/Processo</option>
                        <option value="recurso">Recurso Administrativo</option>
                        <option value="compliance">Compliance Securitário</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="contact-lgpd"
                        name="lgpd"
                        checked={contactForm.lgpd}
                        onChange={handleContactChange}
                        className="mt-1 w-4 h-4 border border-input rounded"
                        required
                      />
                      <label htmlFor="contact-lgpd" className="text-sm text-muted-foreground">
                        Li e concordo com a{" "}
                        <a
                          href="/nigro-franciscatto/privacidade"
                          target="_blank"
                          className="text-primary underline hover:text-primary/80"
                        >
                          Política de Privacidade
                        </a>{" "}
                        e autorizo o uso dos meus dados conforme a LGPD.
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-vertical"
                      placeholder="Descreva detalhadamente sua questão jurídica, incluindo informações relevantes sobre o caso..."
                    />
                  </div>
                  
                  <Button type="submit" variant="contact" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="curriculos" className="py-section bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Banco de Currículos
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Interessado em fazer parte da nossa equipe? Envie seu currículo e 
                participe dos nossos processos seletivos. Estamos sempre em busca 
                de talentos excepcionais em direito securitário.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm border p-8">
              <form onSubmit={handleResumeSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="resume-name" className="block text-sm font-semibold text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="resume-name"
                      name="name"
                      value={resumeForm.name}
                      onChange={handleResumeChange}
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="resume-email" className="block text-sm font-semibold text-foreground mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="resume-email"
                      name="email"
                      value={resumeForm.email}
                      onChange={handleResumeChange}
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="resume-phone" className="block text-sm font-semibold text-foreground mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="resume-phone"
                      name="phone"
                      value={resumeForm.phone}
                      onChange={handleResumeChange}
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-foreground mb-2">
                      Área de Interesse
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={resumeForm.position}
                      onChange={handleResumeChange}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background"
                    >
                      <option value="">Selecione uma área</option>
                      <option value="advogado-junior">Advogado Júnior</option>
                      <option value="advogado-pleno">Advogado Pleno</option>
                      <option value="advogado-senior">Advogado Sênior</option>
                      <option value="estagiario">Estagiário</option>
                      <option value="paralegal">Paralegal</option>
                      <option value="administrativo">Área Administrativa</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="resume-lgpd"
                    name="lgpd"
                    checked={resumeForm.lgpd}
                    onChange={handleResumeChange}
                    className="mt-1 w-4 h-4 border border-input rounded"
                    required
                  />
                  <label htmlFor="resume-lgpd" className="text-sm text-muted-foreground">
                    Li e concordo com a{" "}
                    <a
                      href="/nigro-franciscatto/privacidade"
                      target="_blank"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Política de Privacidade
                    </a>{" "}
                    e autorizo o uso dos meus dados conforme a LGPD.
                  </label>
                </div>

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
                  disabled={!uploadedFile || !resumeForm.name || !resumeForm.email || !resumeForm.phone}
                >
                  Enviar Currículo
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;