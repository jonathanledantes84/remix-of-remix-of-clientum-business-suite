import { motion } from "framer-motion";
import { Database, ShoppingCart, Cog, Megaphone, Globe, Palette } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  { icon: Database, title: "ERP / CRM", desc: "Implementación y personalización de sistemas de gestión integral adaptados a tu empresa. Migración de datos, capacitación y soporte continuo." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Tiendas online integradas con tu sistema de gestión. Catálogo, pagos, envíos y stock sincronizados en tiempo real." },
  { icon: Cog, title: "Automatización Comercial", desc: "Workflows inteligentes que eliminan tareas repetitivas. Seguimiento automático de leads, alertas y notificaciones." },
  { icon: Megaphone, title: "Marketing Digital", desc: "Estrategias de adquisición y retención. Email marketing, redes sociales, SEO/SEM y análisis de campañas." },
  { icon: Globe, title: "Desarrollo Web", desc: "Sitios web corporativos, landing pages y aplicaciones web a medida con las últimas tecnologías." },
  { icon: Palette, title: "Diseño & Comunicación", desc: "Identidad visual, diseño UI/UX, material gráfico y estrategia de marca para destacar en tu mercado." },
];

export default function Servicios() {
  return (
    <PageLayout>
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Servicios</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Soluciones integrales para cada aspecto de tu negocio digital.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div key={svc.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group rounded-xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svc.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{svc.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
