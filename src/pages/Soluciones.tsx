import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag, Car, Briefcase, Building2, Brain, Link2, Cog,
  Database, BarChart3, Settings2, Bot, ArrowRight, CheckCircle2, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const industries = [
  {
    name: "Retail",
    icon: ShoppingBag,
    desc: "Gestión de inventario, punto de venta, programa de fidelización y análisis de ventas en tiempo real.",
    features: ["Inventario multi-sucursal", "POS integrado", "Fidelización de clientes"],
  },
  {
    name: "Automotriz",
    icon: Car,
    desc: "Control de flota, gestión de turnos de taller, catálogo de repuestos y seguimiento de clientes.",
    features: ["Turnos de taller", "Control de flota", "Catálogo de repuestos"],
  },
  {
    name: "Servicios Profesionales",
    icon: Briefcase,
    desc: "Facturación electrónica, agenda de citas, gestión de proyectos y timetracking.",
    features: ["Facturación electrónica", "Agenda inteligente", "Timetracking"],
  },
  {
    name: "Construcción",
    icon: Building2,
    desc: "Presupuestos detallados, control de obra, gestión de proveedores y subcontratistas.",
    features: ["Control de obra", "Presupuestos detallados", "Gestión de proveedores"],
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Inteligencia de Datos",
    desc: "Dashboards en tiempo real, predicciones basadas en IA y reportes automatizados que transforman datos en decisiones de negocio.",
  },
  {
    icon: Link2,
    title: "Integración Total",
    desc: "Conectá todas tus herramientas: facturación electrónica, e-commerce, bancos, WhatsApp, email y más de 50 integraciones.",
  },
  {
    icon: Cog,
    title: "Automatización Inteligente",
    desc: "Eliminá tareas repetitivas con workflows configurables, triggers automáticos y notificaciones inteligentes.",
  },
];

const levels = [
  { level: 1, title: "CRM", icon: Database, desc: "Gestión de contactos, seguimiento de leads y pipeline de ventas visual." },
  { level: 2, title: "Ventas & Business Intelligence", icon: BarChart3, desc: "Reportes avanzados, pronósticos predictivos y análisis de rendimiento comercial." },
  { level: 3, title: "ERP Integrado", icon: Settings2, desc: "Facturación, inventario, compras, contabilidad y RRHH en una sola plataforma." },
  { level: 4, title: "IA & Automatización", icon: Bot, desc: "Machine learning, chatbots, automatizaciones avanzadas y predicciones de negocio." },
];

export default function Soluciones() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Soluciones
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Tecnología que se adapta a tu negocio
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/80">
              Plataforma modular diseñada para crecer con tu empresa, desde el primer contacto hasta la operación completa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Industrias
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">Soluciones por sector</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Configuraciones específicas y flujos predefinidos para cada industria.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <ind.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground">{ind.name}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{ind.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ind.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Capacidades
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">Capacidades Core</h2>
          </motion.div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <cap.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modular architecture */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Arquitectura
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">Crecé a tu ritmo</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Empezá con los módulos que necesitás hoy y escalá sin fricciones a medida que tu empresa crece. Cada nivel se integra perfectamente con los anteriores.
              </p>
              <Link to="/planes" className="mt-6 inline-block">
                <Button className="shadow-hero">
                  Ver planes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="space-y-4">
              {levels.map((lvl, i) => (
                <motion.div
                  key={lvl.level}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <lvl.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Nivel {lvl.level}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{lvl.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{lvl.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Layers className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              ¿Qué solución necesita tu empresa?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Agendá una consultoría gratuita y te ayudamos a diseñar la arquitectura ideal para tu negocio.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contacto">
                <Button size="lg" variant="secondary" className="shadow-hero px-8">
                  Solicitar consultoría <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
