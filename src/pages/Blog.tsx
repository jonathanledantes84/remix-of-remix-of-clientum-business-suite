import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts } from "@/data/mockData";

const categories = ["Todos", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const categoryIcons: Record<string, string> = {
  "Transformación Digital": "🚀",
  "Tecnología": "💻",
  "Automatización": "⚙️",
  "Marketing": "📣",
  "Analytics": "📊",
};

export default function Blog() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = cat === "Todos" || p.category === cat;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.id !== featured.id || cat !== "Todos" || search);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="section-badge" style={{ background: 'hsl(193 100% 82% / 0.1)', color: 'hsl(193 100% 82%)' }}
          >
            <BookOpen className="mr-1.5 inline h-3.5 w-3.5" />
            Centro de Recursos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold tracking-display text-foreground md:text-5xl lg:text-6xl"
          >
            Blog & Recursos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Guías prácticas, tendencias y estrategias para potenciar tu negocio.
          </motion.p>
        </div>
      </section>

      {/* Featured post */}
      {cat === "Todos" && !search && (
        <section className="relative -mt-12 z-10">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid overflow-hidden rounded-2xl surface-high shadow-card-hover md:grid-cols-2"
            >
              <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-12">
                <span className="text-8xl">{categoryIcons[featured.category] || "📄"}</span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="chip w-fit">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">{featured.publishedAt}</span>
                </div>
                <Button className="mt-6 w-fit" size="lg">
                  Leer artículo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search + filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl surface-highest pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-250 border-0"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-250 ${
                    cat === c
                      ? "gradient-primary text-primary-foreground shadow-hero"
                      : "surface-high text-muted-foreground hover:bg-surface-bright"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(cat === "Todos" && !search ? rest : filtered).map((post, i) => (
              <motion.article
                key={post.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl surface-high shadow-card transition-all duration-250 hover:shadow-card-hover hover:bg-surface-bright"
              >
                <div className="flex h-44 items-center justify-center rounded-t-2xl bg-gradient-to-br from-primary/8 via-accent/5 to-primary/5">
                  <span className="text-5xl">{categoryIcons[post.category] || "📄"}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="chip w-fit">
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-250">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between pt-4" style={{ borderTop: '1px solid hsl(215 15% 25% / 0.15)' }}>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Leer <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-lg font-medium">No se encontraron artículos</p>
              <p className="mt-1 text-sm">Intentá con otra búsqueda o categoría.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20 rounded-2xl gradient-hero p-10 text-center md:p-14"
          >
            <h2 className="font-display text-2xl font-bold tracking-display text-foreground md:text-3xl">
              Recibí contenido exclusivo en tu inbox
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Sumate a +2.000 profesionales que reciben nuestras guías semanales.
            </p>
            <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                className="h-12 flex-1 rounded-xl surface-highest px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring border-0"
              />
              <Button size="lg">
                Suscribirme
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
