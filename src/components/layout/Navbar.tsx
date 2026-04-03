import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Soluciones", to: "/soluciones" },
  { label: "Servicios", to: "/servicios" },
  { label: "Planes", to: "/planes" },
  { label: "Blog", to: "/blog" },
  { label: "Testimonios", to: "/testimonios" },
  { label: "Academia", to: "/academia" },
  { label: "Contacto", to: "/contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Clientum" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">Clientum</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-250 hover:bg-surface-container-high ${
                pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className={isDashboard ? "text-primary" : ""}>
                  <LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-1.5 h-4 w-4" /> Salir
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="mr-1.5 h-4 w-4" /> Ingresar
              </Button>
            </Link>
          )}
          <Link to="/planes">
            <Button size="sm">Comenzar ahora</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass-light p-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-250 ${
                  pathname === l.to ? "bg-surface-container-high text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-surface-container" />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { logout(); setOpen(false); }}>
                  <LogOut className="mr-1.5 h-4 w-4" /> Salir
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <LogIn className="mr-1.5 h-4 w-4" /> Ingresar
                </Button>
              </Link>
            )}
            <Link to="/planes" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">Comenzar ahora</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
