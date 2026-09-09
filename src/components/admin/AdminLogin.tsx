import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { supabase } from "@/lib/supabaseClient";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    setEnviando(false);

    if (error) {
      // Mensagem única para e-mail e senha: dizer qual dos dois está errado
      // ajudaria quem estivesse tentando descobrir os e-mails válidos.
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card border rounded-lg shadow-elegant p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Painel do escritório
          </h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">
            Nigro Franciscatto
          </p>
        </div>

        <form onSubmit={entrar} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-sm font-semibold text-foreground">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          {erro && (
            <p className="text-sm text-destructive font-medium" role="alert">
              {erro}
            </p>
          )}

          <Button type="submit" className="w-full mt-2" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
