import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts } from "@/data/mockData";

const categories = ["Todos", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function Blog() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = cat === "Todos" || p.category === cat;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  return (
    <PageLayout>
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Blog</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Recursos, guías y novedades para tu empresa.</p>
        </div>
      </section>

      <section className="py-12">
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
                className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.article key={post.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover">
                <div className="h-40 rounded-t-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-primary/20">{post.category.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent">{post.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Leer más <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No se encontraron artículos.</div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
