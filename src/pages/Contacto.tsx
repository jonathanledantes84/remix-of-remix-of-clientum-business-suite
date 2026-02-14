import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const WHATSAPP_NUMBER = "5492984510883";
const EMAIL_TO = "clientumlatam@proton.me";

export default function Contacto() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nombre es obligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.message.trim()) e.message = "Mensaje es obligatorio";
    if (form.name.length > 100) e.name = "Máximo 100 caracteres";
    if (form.message.length > 1000) e.message = "Máximo 1000 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildText = () =>
    `Solicitud de Demo - Clientum\n\nNombre: ${form.name}\nEmpresa: ${form.company}\nEmail: ${form.email}\nTeléfono: ${form.phone}\n\nMensaje:\n${form.message}`;

  const handleWhatsApp = () => {
    if (!validate()) return;
    const text = encodeURIComponent(buildText());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSent(true);
  };

  const handleEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Solicitud de Demo - ${form.company || form.name}`);
    const body = encodeURIComponent(buildText());
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <PageLayout>
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Contacto</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Solicitá una demo personalizada o consultanos cualquier duda.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {sent ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">¡Mensaje enviado!</h2>
                  <p className="mt-2 text-muted-foreground">
                    Nos pondremos en contacto con vos a la brevedad.
                  </p>
                  <Button className="mt-6" onClick={() => { setSent(false); setForm({ name: "", company: "", email: "", phone: "", message: "" }); }}>
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                  <h2 className="font-display text-2xl font-bold text-foreground">Solicitar Demo</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Completá el formulario y elegí cómo contactarnos.</p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Nombre *</label>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          maxLength={100}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Tu nombre completo"
                        />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Empresa</label>
                        <input
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          maxLength={100}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          maxLength={255}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="tu@empresa.com.ar"
                        />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Teléfono</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          maxLength={30}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="+54 11 1234-5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Mensaje *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        maxLength={1000}
                        rows={4}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Contanos qué necesitás: módulos de interés, tamaño de equipo, industria..."
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button onClick={handleWhatsApp} className="flex-1 shadow-hero">
                        <MessageCircle className="mr-2 h-4 w-4" /> Enviar por WhatsApp
                      </Button>
                      <Button onClick={handleEmail} variant="outline" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" /> Enviar por Email
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              className="space-y-6 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground">Información de Contacto</h3>
                <div className="mt-4 space-y-4">
                  <a href="mailto:clientumlatam@proton.me" className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>clientumlatam@proton.me</span>
                  </a>
                  <a href="tel:+5492984510883" className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>+54 9 298 4510883</span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>Argentina</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground">¿Por qué elegirnos?</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Demo personalizada sin compromiso</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Implementación en menos de 7 días</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Soporte 24/7 en español</li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />30 días de garantía de satisfacción</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
