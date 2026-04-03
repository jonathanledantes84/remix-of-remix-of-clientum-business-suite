import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Ingresá un email válido y contraseña de al menos 4 caracteres.");
    }
  };

  const inputClass = "h-11 w-full rounded-xl surface-highest px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-250 border-0";

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden gradient-hero lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <Link to="/" className="mb-8 inline-block">
            <img src="/logo.png" alt="Clientum" className="h-10 brightness-0 invert" />
          </Link>
          <h2 className="font-display text-3xl font-bold tracking-display text-foreground">
            Tu plataforma de gestión empresarial
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            CRM, ERP, BI y automatización en una sola plataforma diseñada para PyMEs argentinas.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Panel de control unificado",
              "Reportes en tiempo real",
              "Automatización inteligente",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center surface-low px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link to="/">
              <img src="/logo.png" alt="Clientum" className="mx-auto h-8" />
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-hero">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-display text-foreground">Bienvenido</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ingresá a tu panel de gestión</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="tu@empresa.com.ar"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" size="lg">
              Ingresar
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-2 rounded-xl surface-high px-4 py-3">
            <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Demo: usá cualquier email y contraseña (4+ caracteres)
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link to="/contacto" className="font-medium text-primary hover:underline">
              Solicitá una demo
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
