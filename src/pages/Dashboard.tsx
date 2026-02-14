import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Phone, TrendingUp, Mail, UserPlus, PhoneCall, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { contacts, calls, deals, pipelineStages } from "@/data/mockData";

const kpis = [
  { label: "Total contactos", value: contacts.length.toString(), icon: Users, color: "text-primary bg-primary/10" },
  { label: "Próximas llamadas", value: calls.filter((c) => c.status === "pendiente").length.toString(), icon: Phone, color: "text-accent bg-accent/10" },
  { label: "Tasa de conversión", value: "23%", icon: TrendingUp, color: "text-success bg-success/10" },
  { label: "Emails enviados", value: "142", icon: Mail, color: "text-warning bg-warning/10" },
];

const quickActions = [
  { label: "Gestionar leads", icon: UserPlus },
  { label: "Agendar llamada", icon: PhoneCall },
  { label: "Plantillas email", icon: FileText },
  { label: "Ver reportes", icon: BarChart3 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <PageLayout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Hola, {user?.name} 👋</h1>
          <p className="text-muted-foreground">Resumen de tu gestión comercial</p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
              className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Pipeline */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">Pipeline de Ventas</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-3" style={{ minWidth: "900px" }}>
                {pipelineStages.map((stage) => {
                  const stageDeals = deals.filter((d) => d.stage === stage);
                  return (
                    <div key={stage} className="min-w-[150px] flex-1 rounded-xl border border-border bg-card p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">{stage}</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{stageDeals.length}</span>
                      </div>
                      <div className="space-y-2">
                        {stageDeals.map((deal) => (
                          <div key={deal.id} className="rounded-lg border border-border bg-background p-2.5">
                            <p className="text-sm font-medium text-foreground">{deal.contactName}</p>
                            <p className="text-xs text-muted-foreground">{deal.company}</p>
                            <p className="mt-1 text-xs font-semibold text-primary">
                              {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(deal.value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar panels */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-foreground">Acciones Rápidas</h2>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((a) => (
                  <Button key={a.label} variant="outline" className="h-auto flex-col gap-2 py-4 text-xs">
                    <a.icon className="h-5 w-5 text-primary" />
                    {a.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Upcoming calls */}
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-foreground">Próximas Llamadas</h2>
              <div className="space-y-2">
                {calls
                  .filter((c) => c.status === "pendiente")
                  .map((call) => (
                    <div key={call.id} className="rounded-lg border border-border bg-card p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{call.contactName}</span>
                        <span className="text-xs text-muted-foreground">{call.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{call.date} · {call.notes}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent contacts */}
        <div className="mt-8">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Contactos Recientes</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nombre</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Empresa</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Estado</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.company}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
