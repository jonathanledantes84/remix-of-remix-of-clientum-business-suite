import { motion } from "framer-motion";
import { ShoppingBag, Car, Briefcase, Building2, Brain, Link2, Cog, Database, BarChart3, Settings2, Bot } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const industries = [
  { name: "Retail", icon: ShoppingBag, desc: "Gestión de inventario, punto de venta, programa de fidelización y análisis de ventas en tiempo real." },
  { name: "Automotriz", icon: Car, desc: "Control de flota, gestión de turnos de taller, catálogo de repuestos y seguimiento de clientes." },
  { name: "Servicios Profesionales", icon: Briefcase, desc: "Facturación electrónica, agenda de citas, gestión de proyectos y timetracking." },
  { name: "Construcción", icon: Building2, desc: "Presupuestos detallados, control de obra, gestión de proveedores y subcontratistas." },
];

const capabilities = [
  { icon: Brain, title: "Inteligencia de Datos", desc: "Dashboards en tiempo real, predicciones y reportes automatizados para decisiones informadas." },
  { icon: Link2, title: "Integración Total", desc: "Conectá todas tus herramientas: facturación, e-commerce, bancos, WhatsApp y más." },
  { icon: Cog, title: "Automatización", desc: "Eliminá tareas repetitivas con workflows inteligentes y triggers configurables." },
];

const levels = [
  { level: 1, title: "CRM", icon: Database, desc: "Gestión de contactos, seguimiento de leads y pipeline de ventas.", color: "bg-primary/10 text-primary" },
  { level: 2, title: "Ventas & BI", icon: BarChart3, desc: "Reportes avanzados, pronósticos y análisis de rendimiento comercial.", color: "bg-accent/10 text-accent" },
  { level: 3, title: "ERP", icon: Settings2, desc: "Facturación, inventario, compras, contabilidad y RRHH integrados.", color: "bg-success/10 text-success" },
  { level: 4, title: "IA & Automatización", icon: Bot, desc: "Machine learning, chatbots, automatizaciones avanzadas y predicciones.", color: "bg-warning/10 text-warning" },
];

export default function Soluciones() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Soluciones</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Tecnología modular que se adapta a tu industria y crece con tu negocio.</p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Por Industria</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {industries.map((ind, i) => (
              <motion.div key={ind.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-card-hover">
                <ind.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">{ind.name}</h3>
                <p className="mt-2 text-muted-foreground">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Capacidades Core</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-xl bg-card p-8 text-center shadow-card">
                <cap.icon className="mx-auto mb-4 h-12 w-12 text-accent" />
                <h3 className="font-display text-xl font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-3 text-muted-foreground">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modular architecture */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Arquitectura Modular</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">Empezá con lo que necesitás y escalá a medida que tu empresa crece.</p>
          <div className="mx-auto mt-12 max-w-2xl space-y-4">
            {levels.map((lvl, i) => (
              <motion.div key={lvl.level} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${lvl.color}`}>
                  <lvl.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Nivel {lvl.level}: {lvl.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{lvl.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
