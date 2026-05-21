import { useState } from "react";
import { MessageSquare, Drama, BookOpen, Shuffle, HelpCircle, Plus, Check, Trash2, Paperclip, Loader2 } from "lucide-react";
import { DEFAULT_FAQS, Faq } from "@/data/dashboardMocks";
import { useToast } from "@/hooks/use-toast";

const TONES = [
  { id: "formal", title: "Formal", desc: "Trato profesional y respetuoso. Ideal para B2B y sectores corporativos." },
  { id: "cercano", title: "Cercano", desc: "Amigable y directo. Genera confianza con pequeños y medianos negocios." },
  { id: "tecnico", title: "Técnico", desc: "Preciso y detallado. Perfecto para talleres, distribuidoras y servicios." },
];

function Section({ icon: Icon, title, desc, children }: { icon: React.ElementType; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl surface-high p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40";

export default function ChatbotConfig() {
  const [tone, setTone] = useState("cercano");
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [faqs, setFaqs] = useState<Faq[]>(DEFAULT_FAQS);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [showNewFaq, setShowNewFaq] = useState(false);
  const [greeting, setGreeting] = useState("¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?");
  const [transferKeywords, setTransferKeywords] = useState("hablar con una persona, agente, humano");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    setTimeout(() => { setUploading(false); setUploaded(true); }, 1800);
  };

  const addFaq = () => {
    if (!newQ.trim() || !newA.trim()) return;
    setFaqs((p) => [...p, { id: Date.now(), q: newQ.trim(), a: newA.trim(), active: true }]);
    setNewQ(""); setNewA(""); setShowNewFaq(false);
  };

  const handleSave = () => toast({ title: "Configuración guardada", description: "Los cambios del chatbot ya están activos." });

  return (
    <div className="space-y-6">
      <Section icon={MessageSquare} title="Mensaje de bienvenida" desc="Lo primero que ve el cliente al iniciar una conversación">
        <textarea value={greeting} onChange={(e) => setGreeting(e.target.value)} rows={2} className={inputCls + " resize-none"} />
      </Section>

      <Section icon={Drama} title="Tono de voz" desc="Define cómo se comunica el bot con tus clientes">
        <div className="grid gap-3 sm:grid-cols-3">
          {TONES.map((t) => {
            const active = tone === t.id;
            return (
              <button key={t.id} onClick={() => setTone(t.id)}
                className={`rounded-2xl p-4 text-left transition-all ${active ? "bg-primary/10 ring-2 ring-primary/50" : "surface-container hover:bg-surface-bright"}`}>
                <div className="font-display text-sm font-bold text-foreground">{t.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.desc}</div>
                {active && <div className="mt-2 flex items-center gap-1 text-xs font-bold text-primary"><Check className="h-3 w-3" /> Seleccionado</div>}
              </button>
            );
          })}
        </div>
      </Section>

      <Section icon={BookOpen} title="Base de conocimientos" desc="El bot aprenderá de este documento para responder preguntas de tu negocio">
        <label className="block cursor-pointer">
          <input type="file" accept=".pdf,.txt,.doc,.docx" onChange={handleFileChange} className="hidden" />
          <div className="rounded-2xl p-8 text-center transition-colors hover:bg-surface-bright" style={{ border: `2px dashed hsl(var(--${uploaded ? "primary" : "outline-variant"}) / 0.5)` }}>
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm font-semibold text-muted-foreground">Procesando {fileName}...</p>
              </div>
            ) : uploaded ? (
              <div className="flex flex-col items-center gap-2">
                <Check className="h-6 w-6 text-primary" />
                <p className="text-sm font-bold text-foreground">{fileName} cargado</p>
                <p className="text-xs text-muted-foreground">El chatbot ya tiene acceso a este documento</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Paperclip className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-bold text-foreground">Subí tu documento base</p>
                <p className="text-xs text-muted-foreground">PDF, TXT, DOC o DOCX · Máx. 10 MB</p>
                <span className="mt-2 inline-block rounded-xl bg-primary px-4 py-2 text-xs font-bold" style={{ color: "hsl(var(--on-primary))" }}>Elegir archivo</span>
              </div>
            )}
          </div>
        </label>
      </Section>

      <Section icon={Shuffle} title="Palabras clave para derivar a humano" desc="El bot transferirá la conversación cuando detecte estas palabras">
        <input value={transferKeywords} onChange={(e) => setTransferKeywords(e.target.value)} className={inputCls} />
        <p className="mt-2 text-xs text-muted-foreground">Separalas con coma. Sin distinción de mayúsculas.</p>
      </Section>

      <div className="rounded-2xl surface-high p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">Preguntas frecuentes configuradas</h3>
              <p className="text-xs text-muted-foreground">El bot responderá automáticamente a estas preguntas</p>
            </div>
          </div>
          <button onClick={() => setShowNewFaq(!showNewFaq)} className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-bold transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
            <Plus className="h-3 w-3" /> Agregar
          </button>
        </div>

        {showNewFaq && (
          <div className="mb-4 space-y-3 rounded-2xl bg-primary/5 p-4">
            <input value={newQ} onChange={(e) => setNewQ(e.target.value)} placeholder="Pregunta del cliente..." className={inputCls} />
            <textarea value={newA} onChange={(e) => setNewA(e.target.value)} placeholder="Respuesta que dará el bot..." rows={3} className={inputCls + " resize-none"} />
            <div className="flex gap-2">
              <button onClick={addFaq} className="flex-1 rounded-xl bg-primary py-2 text-xs font-bold" style={{ color: "hsl(var(--on-primary))" }}>Guardar pregunta</button>
              <button onClick={() => { setShowNewFaq(false); setNewQ(""); setNewA(""); }} className="rounded-xl bg-surface-container-highest px-4 py-2 text-xs font-bold text-muted-foreground">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-2xl surface-container p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-foreground">{faq.q}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFaqs((p) => p.map((f) => f.id === faq.id ? { ...f, active: !f.active } : f))}
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${faq.active ? "bg-tertiary/20 text-tertiary" : "bg-muted text-muted-foreground"}`}
                    style={faq.active ? { color: "hsl(var(--tertiary))" } : undefined}>
                    {faq.active ? "Activa" : "Pausada"}
                  </button>
                  <button onClick={() => setFaqs((p) => p.filter((f) => f.id !== faq.id))} className="text-muted-foreground transition-colors hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
