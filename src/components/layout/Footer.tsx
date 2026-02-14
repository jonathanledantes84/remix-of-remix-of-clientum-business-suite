import { Link } from "react-router-dom";

const columns = [
  {
    title: "Soluciones",
    links: [
      { label: "CRM", to: "/soluciones" },
      { label: "ERP", to: "/soluciones" },
      { label: "Automatización", to: "/soluciones" },
      { label: "Analytics", to: "/soluciones" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nosotros", to: "/" },
      { label: "Blog", to: "/blog" },
      { label: "Testimonios", to: "/testimonios" },
      { label: "Planes", to: "/planes" },
      { label: "Contacto", to: "/contacto" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Centro de Ayuda", to: "/" },
      { label: "Documentación", to: "/" },
      { label: "API", to: "/" },
      { label: "Estado del Servicio", to: "/" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "info@clientum.com.ar", to: "mailto:info@clientum.com.ar" },
      { label: "+54 11 1234-5678", to: "tel:+541112345678" },
      { label: "Buenos Aires, Argentina", to: "/" },
      { label: "WhatsApp", to: "https://wa.me/5491112345678" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">C</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground">CLIENTUM</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Plataforma integral de gestión empresarial para PyMEs argentinas.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith("http") || link.to.startsWith("mailto") || link.to.startsWith("tel") ? (
                      <a href={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Clientum. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
