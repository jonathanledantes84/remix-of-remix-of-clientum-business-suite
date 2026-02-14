import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { testimonials } from "@/data/mockData";

const industries = ["Todas", ...Array.from(new Set(testimonials.map((t) => t.industry)))];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function Testimonios() {
  const [industry, setIndustry] = useState("Todas");

  const filtered = useMemo(
    () => testimonials.filter((t) => industry === "Todas" || t.industry === industry),
    [industry]
  );

  const avg = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <PageLayout>
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Testimonios</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Lo que dicen nuestros clientes sobre Clientum.</p>
        </div>
      </section>

      {/* Summary */}
      <section className="relative -mt-10 z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-xl bg-card p-8 text-center shadow-card">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-warning text-warning" />
              ))}
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-foreground">{avg}/5</div>
            <p className="text-muted-foreground">98% nos recomiendan · {testimonials.length} reseñas</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  industry === ind ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground italic">"{t.quote}"</p>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.company} · {t.industry}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl gradient-card border border-border p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">¿Querés ser el próximo caso de éxito?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">Sumate a las 500+ empresas que ya transformaron su gestión con Clientum.</p>
            <Link to="/planes" className="mt-6 inline-block">
              <Button size="lg" className="shadow-hero">
                Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
