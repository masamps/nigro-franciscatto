import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { registrarVisita } from "@/lib/analytics";

/** Registra a visita a cada troca de rota do site público. */
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    registrarVisita(location.pathname);
  }, [location.pathname]);

  return null;
};

export default PageTracker;
