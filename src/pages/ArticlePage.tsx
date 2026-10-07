import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, FileText, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { caminhoDoArtigo, idDoEndereco } from "@/lib/artigos";
import { linkDoWhatsApp } from "@/lib/whatsapp";
import { registrarEvento } from "@/lib/analytics";

interface Artigo {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  content: string | null;
  pdf_url: string | null;
}

const SITE = "https://nigrofranciscatto.com.br";

const formatarData = (iso: string) => {
  const [ano, mes, dia] = iso.split("T")[0].split("-");
  return `${dia}/${mes}/${ano}`;
};

const ehHtml = (texto: string) => /<[a-z][\s\S]*>/i.test(texto);

/**
 * O Tailwind zera o estilo de títulos, parágrafos e links. As publicações
 * diárias chegam em HTML (p, h3, strong, a), então o estilo volta aqui,
 * restrito ao corpo do artigo.
 */
const ESTILO_DO_CONTEUDO = [
  "font-sans text-foreground leading-relaxed text-[1.05rem]",
  "[&_p]:mb-5",
  "[&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-10 [&_h3]:mb-3",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:no-underline",
].join(" ");

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [situacao, setSituacao] = useState<"carregando" | "ok" | "nao-encontrado">("carregando");

  const id = idDoEndereco(slug);

  useEffect(() => {
    if (!id) {
      setSituacao("nao-encontrado");
      return;
    }

    setSituacao("carregando");
    supabase
      .from("articles")
      .select("id, title, excerpt, author, date, category, read_time, content, pdf_url")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setSituacao("nao-encontrado");
          return;
        }
        setArtigo(data as Artigo);
        setSituacao("ok");
      });
  }, [id]);

  // Se o título mudou ou o link veio incompleto, corrige o endereço para o
  // atual — assim o Google não indexa a mesma página em dois endereços.
  useEffect(() => {
    if (!artigo) return;
    const correto = caminhoDoArtigo(artigo);
    if (window.location.pathname !== correto) navigate(correto, { replace: true });
  }, [artigo, navigate]);

  if (situacao === "carregando") {
    return (
      <main className="min-h-screen pt-20">
        <p className="text-center py-24 text-muted-foreground">Carregando artigo...</p>
      </main>
    );
  }

  if (situacao === "nao-encontrado" || !artigo) {
    return (
      <main className="min-h-screen pt-20">
        <Helmet>
          <title>Artigo não encontrado | Nigro Franciscatto</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Artigo não encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            Ele pode ter sido removido ou o endereço está incompleto.
          </p>
          <Link to="/artigos" className="text-primary font-semibold hover:underline">
            Ver todos os artigos
          </Link>
        </div>
      </main>
    );
  }

  const endereco = `${SITE}${caminhoDoArtigo(artigo)}`;
  const mensagemWhatsApp = `Olá! Li o artigo "${artigo.title}" no site e gostaria de conversar sobre uma situação parecida.`;

  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.title,
    description: artigo.excerpt,
    datePublished: artigo.date,
    author: { "@type": "Person", name: artigo.author },
    publisher: {
      "@type": "LegalService",
      name: "Nigro Franciscatto Sociedade Individual de Advocacia",
      url: SITE,
    },
    mainEntityOfPage: endereco,
  };

  return (
    <>
      <Helmet>
        <title>{`${artigo.title} | Nigro Franciscatto`}</title>
        <meta name="description" content={artigo.excerpt} />
        <link rel="canonical" href={endereco} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={artigo.title} />
        <meta property="og:description" content={artigo.excerpt} />
        <meta property="og:url" content={endereco} />
        <script type="application/ld+json">{JSON.stringify(dadosEstruturados)}</script>
      </Helmet>

      <main className="min-h-screen pt-20">
        <article className="py-section bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/artigos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Todos os artigos
            </Link>

            <header className="mb-10 pb-8 border-b">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-5">
                {artigo.category}
              </span>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 [text-wrap:balance]">
                {artigo.title}
              </h1>

              {artigo.excerpt && (
                <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                  {artigo.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {artigo.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={artigo.date}>{formatarData(artigo.date)}</time>
                </span>
                {artigo.read_time && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {artigo.read_time}
                  </span>
                )}
              </div>
            </header>

            {artigo.content &&
              (ehHtml(artigo.content) ? (
                <div
                  className={ESTILO_DO_CONTEUDO}
                  dangerouslySetInnerHTML={{ __html: artigo.content }}
                />
              ) : (
                <div className={`${ESTILO_DO_CONTEUDO} whitespace-pre-line`}>{artigo.content}</div>
              ))}

            {artigo.pdf_url && (
              <div className="mt-10">
                <div className="w-full h-[300px] md:h-[560px] border rounded-lg overflow-hidden">
                  <iframe src={artigo.pdf_url} className="w-full h-full" title={`${artigo.title} - PDF`} />
                </div>
                <a
                  href={artigo.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  Abrir o PDF em nova aba
                </a>
              </div>
            )}

            <aside className="mt-14 bg-muted/40 border rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">
                  Passou por uma situação parecida?
                </h2>
                <p className="font-sans text-muted-foreground">
                  Converse com a Dra. Roberta Nigro sobre o seu caso.
                </p>
              </div>
              <a
                href={linkDoWhatsApp(mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => registrarEvento("whatsapp-artigo")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-semibold px-6 py-3 hover:shadow-elegant hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
};

export default ArticlePage;
