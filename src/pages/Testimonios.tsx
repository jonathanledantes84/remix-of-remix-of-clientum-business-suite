import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Quote, Users, TrendingUp, Award } from "lucide-react";
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
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="section-badge" style={{ background: 'hsl(193 100% 82% / 0.1)', color: 'hsl(193 100% 82%)' }}
          >
            Casos de éxito
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold tracking-display text-foreground md:text-5xl lg:text-6xl"
          >
            Lo que dicen nuestros clientes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            +500 empresas argentinas confían en Clientum para transformar su gestión.
          </motion.p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid gap-6 rounded-2xl surface-high p-8 shadow-card-hover sm:grid-cols-3"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <Star className="h-6 w-6 fill-warning text-warning" />
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-foreground">{avg}/5</div>
                <div className="text-sm text-muted-foreground">Calificación promedio</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Nos recomiendan</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-foreground">+45%</div>
                <div className="text-sm text-muted-foreground">Aumento promedio en ventas</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-250 ${
                  industry === ind
                    ? "gradient-primary text-primary-foreground shadow-hero"
                    : "surface-high text-muted-foreground hover:bg-surface-bright"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl surface-high p-8 shadow-card transition-all duration-250 hover:shadow-card-hover hover:bg-surface-bright"
              >
                <Quote className="h-8 w-8 text-primary/20" />

                <p className="mt-4 flex-1 text-muted-foreground leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${j < t.rating ? "fill-warning text-warning" : "text-surface-container"}`}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 pt-4" style={{ borderTop: '1px solid hsl(215 15% 25% / 0.15)' }}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company} · {t.industry}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20 rounded-2xl gradient-hero p-10 text-center md:p-14"
          >
            <Award className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-display text-2xl font-bold tracking-display text-foreground md:text-3xl">
              ¿Querés ser el próximo caso de éxito?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Sumate a las 500+ empresas que ya transformaron su gestión con Clientum.
            </p>
            <Link to="/planes" className="mt-8 inline-block">
              <Button size="lg" className="px-8">
                Ver planes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
