import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PageTracker from "./components/PageTracker";
import Privacy from "./pages/Privacy";
import Testimonials from "./pages/Testimonials";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/areas-atuacao" element={<Services />} />
        <Route path="/artigos" element={<Blog />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/depoimentos" element={<Testimonials />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!noPainel && <Footer />}
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
