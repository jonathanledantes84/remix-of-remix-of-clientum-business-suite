import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Database, ShoppingCart, Cog, Megaphone, Globe, Palette,
  ArrowRight, CheckCircle2, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  {
    icon: Database,
    title: "ERP / CRM",
    desc: "Implementación y personalización de sistemas de gestión integral adaptados a tu empresa.",
    bullets: ["Migración de datos sin pérdidas", "Configuración personalizada", "Capacitación del equipo"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Tiendas online integradas con tu sistema de gestión y sincronización en tiempo real.",
    bullets: ["Catálogo sincronizado", "Pasarelas de pago", "Logística integrada"],
  },
  {
    icon: Cog,
    title: "Automatización Comercial",
    desc: "Workflows inteligentes que eliminan tareas repetitivas y aceleran el ciclo de ventas.",
    bullets: ["Seguimiento automático de leads", "Alertas y notificaciones", "Triggers configurables"],
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    desc: "Estrategias de adquisición y retención con medición de resultados en tiempo real.",
    bullets: ["Email marketing", "SEO / SEM", "Análisis de campañas"],
  },
  {
    icon: Globe,
    title: "Desarrollo Web",
    desc: "Sitios web corporativos, landing pages y aplicaciones web a medida con las últimas tecnologías.",
    bullets: ["Diseño responsive", "Performance optimizado", "SEO técnico"],
  },
  {
    icon: Palette,
    title: "Diseño & Comunicación",
    desc: "Identidad visual, diseño UI/UX, material gráfico y estrategia de marca.",
    bullets: ["Branding integral", "Diseño UI/UX", "Material corporativo"],
  },
];

const process = [
  { step: "01", title: "Diagnóstico", desc: "Analizamos tu operación actual e identificamos oportunidades de mejora." },
  { step: "02", title: "Diseño", desc: "Proponemos la arquitectura ideal con un plan de implementación claro." },
  { step: "03", title: "Implementación", desc: "Configuramos, migramos datos y capacitamos a tu equipo." },
  { step: "04", title: "Acompañamiento", desc: "Soporte continuo, optimización y evolución de la plataforma." },
];

export default function Servicios() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-badge" style={{ background: 'hsl(193 100% 82% / 0.1)', color: 'hsl(193 100% 82%)' }}>
              Servicios
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-display text-foreground md:text-5xl lg:text-6xl">
              Soluciones integrales para tu negocio
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground" style={{ lineHeight: 1.6 }}>
              Desde la estrategia hasta la ejecución, te acompañamos en cada paso de tu transformación digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl surface-high p-8 shadow-card transition-all duration-250 hover:shadow-card-hover hover:bg-surface-bright hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-250 group-hover:bg-primary/20">
                  <svc.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{svc.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="surface-low py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <span className="section-badge">Metodología</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-display text-foreground md:text-4xl">
              Nuestro proceso de trabajo
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground" style={{ lineHeight: 1.6 }}>
              Un enfoque estructurado que garantiza resultados medibles.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl surface-high p-7 shadow-card"
              >
                <span className="font-display text-3xl font-bold text-primary/20">{p.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="rounded-3xl gradient-hero p-12 text-center md:p-20"
          >
            <Handshake className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-display text-3xl font-bold tracking-display text-foreground md:text-4xl">
              Trabajemos juntos
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground" style={{ lineHeight: 1.6 }}>
              Contanos tu desafío y diseñamos la solución perfecta para tu empresa.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contacto">
                <Button size="lg" className="px-8">
                  Solicitar presupuesto <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/5492984510883" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="px-8">
                  WhatsApp directo
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
