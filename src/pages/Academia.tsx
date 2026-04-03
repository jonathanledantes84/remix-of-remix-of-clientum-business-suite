import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Clock, Users, Target, Award, Building2, ArrowRight, Briefcase, BarChart3, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const courses = [
  {
    title: "Administración Estratégica",
    description: "Diseño e implementación de estrategias empresariales sostenibles.",
    duration: "30 h",
    level: "Intermedio / Avanzado",
    topics: ["Modelos de negocio", "Planeación estratégica", "Indicadores de gestión"],
    icon: Target,
  },
  {
    title: "Gestión de Proyectos",
    description: "Metodologías ágiles y tradicionales para ejecución exitosa.",
    duration: "25 h",
    level: "Principiante / Intermedio",
    topics: ["Scrum & Kanban", "Gestión de riesgos", "Liderazgo de equipos"],
    icon: BarChart3,
  },
  {
    title: "Liderazgo y Gestión de Equipos",
    description: "Dirección de equipos de alto rendimiento y cultura organizacional.",
    duration: "20 h",
    level: "Intermedio",
    topics: ["Comunicación efectiva", "Resolución de conflictos", "Motivación 3.0"],
    icon: Users,
  },
];

const valueProps = [
  { icon: BookOpen, title: "Formación práctica", desc: "Aplicable desde el primer día" },
  { icon: Briefcase, title: "Expertos reales", desc: "Directivos y consultores senior" },
  { icon: Building2, title: "Visión enterprise", desc: "Alineado a estándares globales" },
  { icon: Lightbulb, title: "Modalidad flexible", desc: "Individual o in-company" },
];

const stats = [
  { value: "+200", label: "Profesionales formados" },
  { value: "98%", label: "Satisfacción" },
  { value: "3", label: "Programas ejecutivos" },
  { value: "75h", label: "De contenido práctico" },
];

export default function Academia() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="section-badge" style={{ background: 'hsl(193 100% 82% / 0.1)', color: 'hsl(193 100% 82%)' }}
          >
            <GraduationCap className="mr-1.5 inline h-3.5 w-3.5" />
            Clientum Academia
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold tracking-display text-foreground md:text-5xl lg:text-6xl"
          >
            Cursos de Gestión Empresarial
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Programas ejecutivos diseñados para líderes modernos que buscan transformar su organización.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <a href="#cursos">
              <Button size="lg">
                Ver todos los cursos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="grid gap-6 rounded-2xl surface-high p-8 shadow-card-hover sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-extrabold gradient-text">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-display text-foreground">Gestión Empresarial</h2>
            <p className="mt-2 text-lg font-medium gradient-text">
              Habilidades directivas para liderar con impacto
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Programas diseñados para fortalecer liderazgo, estrategia, operaciones y toma de decisiones basadas en datos. Formación enterprise con enfoque práctico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section id="cursos" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 text-center font-display text-2xl font-bold tracking-display text-foreground">
            Cursos Destacados
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl surface-high p-8 shadow-card transition-all duration-250 hover:shadow-card-hover hover:bg-surface-bright hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-250 group-hover:bg-primary/20">
                  <course.icon className="h-6 w-6 text-primary" />
                </div>

                <h4 className="font-display text-xl font-bold text-foreground">{course.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{course.description}</p>

                <div className="mt-4 flex items-center gap-4">
                  <span className="chip">
                    <Clock className="h-3 w-3" /> {course.duration}
                  </span>
                  <span className="chip">
                    <Award className="h-3 w-3" /> {course.level}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {course.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      {topic}
                    </li>
                  ))}
                </ul>

                <Link to="/contacto">
                  <Button variant="outline" className="mt-8 w-full">
                    Ver Programa <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="surface-low py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-10 text-center font-display text-2xl font-bold tracking-display text-foreground">¿Por qué Clientum Academia?</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((vp, i) => (
              <motion.div
                key={vp.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl surface-high p-6 text-center shadow-card transition-all duration-250 hover:shadow-card-hover hover:bg-surface-bright"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <vp.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{vp.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{vp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GraduationCap className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-display text-3xl font-bold tracking-display text-foreground md:text-4xl">
              Capacitá a tu equipo
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Solicitá el programa académico completo o diseñamos una formación a medida para tu organización.
            </p>
            <div className="mt-8">
              <Link to="/contacto">
                <Button size="lg">
                  Solicitar Información <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
