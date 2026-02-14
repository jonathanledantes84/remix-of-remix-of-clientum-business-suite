import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Planes y Precios</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Elegí el plan que mejor se adapte a tu empresa. Sin sorpresas.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Toggle */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-7 w-14 rounded-full transition-colors ${annual ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition-transform ${annual ? "translate-x-7" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Anual <span className="text-xs text-accent font-semibold">-17%</span>
            </span>
          </div>

          {/* Plans */}
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className={`relative rounded-2xl border bg-card p-8 shadow-card ${plan.popular ? "border-primary ring-2 ring-primary/20 scale-105" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Más Popular
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span className="font-display text-4xl font-bold text-foreground">{formatPrice(annual ? plan.annualPrice : plan.monthlyPrice)}</span>
                  <span className="text-muted-foreground"> /mes</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-8 w-full ${plan.popular ? "shadow-hero" : ""}`} variant={plan.popular ? "default" : "outline"}>
                  Comenzar
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Guarantee & payments */}
          <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="h-8 w-8 text-success" />
              <div>
                <div className="text-sm font-semibold text-foreground">30 días de garantía</div>
                <div className="text-xs">Satisfacción garantizada o te devolvemos el dinero</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm font-semibold text-foreground">Medios de pago</div>
                <div className="text-xs">Transferencia · Débito · Mercado Pago · Tarjetas</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
