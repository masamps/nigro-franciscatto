import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import PageTracker from "./components/PageTracker";
import WhatsAppButton from "./components/WhatsAppButton";
import AlertaGolpe from "./components/AlertaGolpe";

// A home vem no pacote principal (é por onde a maioria chega). As outras
// páginas, e principalmente o painel, só são baixadas quando abertas.
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

/** Ocupa a área da página enquanto o código dela chega, sem pular o rodapé para cima. */
const CarregandoPagina = () => <div className="min-h-screen" aria-busy="true" />;

/**
 * O painel tem cabeçalho próprio e não deve exibir o menu nem o rodapé do
 * site público — nem registrar visitas, que são métrica de visitante.
 */
const Site = () => {
  const location = useLocation();
  const noPainel = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!noPainel && <PageTracker />}
      {!noPainel && <Header />}

      <Suspense fallback={<CarregandoPagina />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/areas-atuacao" element={<Services />} />
          <Route path="/artigos" element={<Blog />} />
          <Route path="/artigos/:slug" element={<ArticlePage />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/depoimentos" element={<Testimonials />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!noPainel && <Footer />}
      {!noPainel && <WhatsAppButton />}
      {!noPainel && <AlertaGolpe />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <Site />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
