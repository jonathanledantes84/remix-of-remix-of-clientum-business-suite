import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Car, Briefcase, Building2, TrendingUp, Clock, Zap, Users, Star, Headphones, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import heroBg from "@/assets/hero-bg.jpg";

const metrics = [
  { label: "Empresas", value: "500+", icon: Users },
  { label: "Satisfacción", value: "98%", icon: Star },
  { label: "Soporte", value: "24/7", icon: Headphones },
  { label: "Experiencia", value: "15+ años", icon: CalendarDays },
];

const industries = [
  { name: "Retail", icon: ShoppingBag, desc: "Inventario, POS y fidelización" },
  { name: "Automotriz", icon: Car, desc: "Flota, taller y repuestos" },
  { name: "Servicios", icon: Briefcase, desc: "Facturación y agenda" },
  { name: "Construcción", icon: Building2, desc: "Presupuestos y control de obra" },
];

const impacts = [
  { value: "+40%", label: "Ventas", icon: TrendingUp },
  { value: "-60%", label: "Tiempo administrativo", icon: Clock },
  { value: "3x", label: "Productividad", icon: Zap },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Transformá tus datos en{" "}
              <span className="text-accent">decisiones inteligentes</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Plataforma integral de gestión empresarial con CRM, ERP, automatización y analytics para PyMEs argentinas.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/planes">
                <Button size="lg" className="shadow-hero text-base">
                  Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base">
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl bg-card p-6 text-center shadow-card"
              >
                <m.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="font-display text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Soluciones por Industria</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tecnología adaptada a las necesidades específicas de tu sector.</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link to="/soluciones" className="group block rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                  <ind.icon className="mb-4 h-10 w-10 text-primary transition-colors group-hover:text-accent" />
                  <h3 className="font-display text-lg font-semibold text-foreground">{ind.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{ind.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-primary-foreground">Impacto Medible en tu Negocio</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {impacts.map((imp, i) => (
              <motion.div
                key={imp.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <imp.icon className="mx-auto mb-3 h-10 w-10 text-accent" />
                <div className="font-display text-5xl font-bold text-primary-foreground">{imp.value}</div>
                <div className="mt-2 text-primary-foreground/70">{imp.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl gradient-card border border-border p-10 text-center md:p-16">
            <h2 className="font-display text-3xl font-bold text-foreground">¿Listo para transformar tu empresa?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Agendá una demo personalizada y descubrí cómo Clientum puede impulsar tu crecimiento.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/planes">
                <Button size="lg" className="shadow-hero">Solicitar Demo Gratuita</Button>
              </Link>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">Hablar con un Asesor</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
