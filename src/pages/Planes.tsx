import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, CreditCard, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { plans } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

export default function Planes() {
  const [annual, setAnnual] = useState(false);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="section-badge" style={{ background: 'hsl(193 100% 82% / 0.1)', color: 'hsl(193 100% 82%)' }}
          >
            Precios transparentes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold tracking-display text-foreground md:text-5xl lg:text-6xl"
          >
            Elegí el plan ideal para tu empresa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Sin costos ocultos. Escalá cuando quieras. Cancelá en cualquier momento.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-14 flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-semibold transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-8 w-16 rounded-full transition-colors ${annual ? "bg-primary" : "bg-surface-container"}`}
            >
              <span className={`absolute top-1 h-6 w-6 rounded-full bg-surface shadow-ambient transition-transform ${annual ? "translate-x-9" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm font-semibold transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Anual{" "}
              <span className="ml-1 inline-block rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success">
                Ahorrá 17%
              </span>
            </span>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl p-8 shadow-card transition-all duration-250 hover:shadow-card-hover ${
                  plan.popular ? "surface-bright shadow-glow lg:scale-105" : "surface-high"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-hero">
                    Más Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-accent"}`} />
                    <h3 className="font-display text-lg font-bold tracking-wide text-foreground">{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-foreground">
                      {formatPrice(annual ? plan.annualPrice : plan.monthlyPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground">/mes</span>
                  </div>
                  {annual && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Facturado anualmente · {formatPrice(plan.annualPrice * 12)}/año
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contacto">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20 grid gap-8 rounded-2xl surface-low p-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Shield, title: "30 días de garantía", desc: "Satisfacción garantizada o devolución total" },
              { icon: CreditCard, title: "Medios de pago flexibles", desc: "Transferencia · Débito · Mercado Pago · Tarjetas" },
              { icon: Zap, title: "Activación inmediata", desc: "Empezá a usar Clientum en menos de 24hs" },
              { icon: Check, title: "Sin permanencia", desc: "Cancelá o cambiá de plan cuando quieras" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
