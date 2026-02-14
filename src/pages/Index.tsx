import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ShoppingBag, Car, Briefcase, Building2,
  TrendingUp, Clock, Zap, Users, Star, Headphones, CalendarDays,
  Database, BarChart3, Bot, Shield, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const metrics = [
  { label: "Empresas confían en nosotros", value: "500+", icon: Users },
  { label: "Satisfacción del cliente", value: "98%", icon: Star },
  { label: "Soporte permanente", value: "24/7", icon: Headphones },
  { label: "Años de experiencia", value: "15+", icon: CalendarDays },
];

const industries = [
  { name: "Retail", icon: ShoppingBag, desc: "Inventario, POS y fidelización de clientes integrados." },
  { name: "Automotriz", icon: Car, desc: "Flota, turnos de taller y gestión de repuestos." },
  { name: "Servicios", icon: Briefcase, desc: "Facturación, agenda y seguimiento de proyectos." },
  { name: "Construcción", icon: Building2, desc: "Presupuestos, control de obra y subcontratistas." },
];

const modules = [
  { icon: Database, title: "CRM Avanzado", desc: "Pipeline visual, scoring de leads y automatización de seguimiento." },
  { icon: BarChart3, title: "Business Intelligence", desc: "Dashboards en tiempo real con predicciones y alertas inteligentes." },
  { icon: Bot, title: "Automatización IA", desc: "Workflows inteligentes que eliminan tareas repetitivas." },
  { icon: Shield, title: "ERP Integrado", desc: "Facturación, stock, compras y contabilidad en un solo lugar." },
];

const impacts = [
  { value: "+40%", label: "Aumento en ventas", icon: TrendingUp },
  { value: "-60%", label: "Reducción tiempo admin", icon: Clock },
  { value: "3x", label: "Mayor productividad", icon: Zap },
];

const trustedLogos = [
  "Retail Plus", "AutoSur", "TechBA", "Constructora Norte", "GastroNet", "Servicios Digitales"
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Index() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm"
            >
              <img src={logo} alt="Clientum" className="h-10 w-10" />
            </motion.div>

            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Goberná tu empresa con{" "}
              <span className="text-accent">datos confiables</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              Plataforma enterprise que integra ERP, CRM, ventas y operaciones en una única fuente de verdad para la toma de decisiones estratégicas.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contacto">
                <Button size="lg" className="shadow-hero text-base px-8">
                  Solicitar demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/5492984510883" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trusted by strip */}
        <div className="relative border-t border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                Confían en nosotros
              </span>
              {trustedLogos.map((name) => (
                <span key={name} className="text-sm font-semibold text-primary-foreground/40">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative -mt-1 z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground">{m.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Plataforma
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Todo lo que necesitás en un solo lugar
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Módulos integrados que trabajan juntos para darte visibilidad total de tu operación.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <mod.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{mod.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Industrias
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Soluciones adaptadas a tu sector
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada industria tiene sus propios desafíos. Nuestra plataforma se adapta con módulos específicos y workflows preconfigurados para maximizar tu productividad desde el primer día.
              </p>
              <div className="mt-6 space-y-3">
                {["Configuración por industria en minutos", "Flujos de trabajo predefinidos", "Métricas específicas del sector", "Integraciones especializadas"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2"
            >
              {industries.map((ind, i) => (
                <motion.div key={ind.name} custom={i} variants={fadeUp}>
                  <Link to="/soluciones" className="group block rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <ind.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground">{ind.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{ind.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <span className="inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Resultados
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Impacto medible en tu negocio
            </h2>
          </motion.div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {impacts.map((imp, i) => (
              <motion.div
                key={imp.label}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 text-center backdrop-blur-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/10">
                  <imp.icon className="h-7 w-7 text-accent" />
                </div>
                <div className="font-display text-5xl font-bold text-primary-foreground">{imp.value}</div>
                <div className="mt-2 text-primary-foreground/70">{imp.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="rounded-3xl border border-border bg-card p-12 text-center shadow-card md:p-20"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <img src={logo} alt="" className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Agendá una demo personalizada y descubrí cómo Clientum puede impulsar tu crecimiento con datos confiables.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contacto">
                <Button size="lg" className="shadow-hero px-8">Solicitar Demo Gratuita</Button>
              </Link>
              <a href="https://wa.me/5492984510883" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="px-8">Hablar con un Asesor</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
