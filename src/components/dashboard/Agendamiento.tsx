import { useState } from "react";
import { Calendar, Check, Copy, MessageCircle, Mail, Code2, PartyPopper } from "lucide-react";
import { SLOTS, BOOKED } from "@/data/dashboardMocks";

const inputCls = "w-full rounded-xl bg-surface-container-highest px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40";

function ConnectCard({ name, desc, connected, onToggle }: { name: string; desc: string; connected: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl surface-high p-5 shadow-card">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-foreground">{name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
        {connected && <div className="mt-1 flex items-center gap-1 text-xs font-bold" style={{ color: "hsl(var(--tertiary))" }}><Check className="h-3 w-3" /> Sincronizado · hace 3 min</div>}
      </div>
      <button onClick={onToggle}
        className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-opacity hover:opacity-90 ${connected ? "bg-destructive/15 text-destructive" : "bg-primary"}`}
        style={!connected ? { color: "hsl(var(--on-primary))" } : undefined}>
        {connected ? "Desconectar" : "Conectar"}
      </button>
    </div>
  );
}

export default function Agendamiento() {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [outlookConnected, setOutlookConnected] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmName, setConfirmName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [booked, setBooked] = useState(false);
  const [duration, setDuration] = useState("30");
  const [buffer, setBuffer] = useState("10");
  const [linkCopied, setLinkCopied] = useState(false);
  const [widgetCopied, setWidgetCopied] = useState(false);

  const bookingLink = "https://clientum.com.ar/agenda/martin-ferreyra";
  const widgetCode = `<div id="clientum-booking" data-user="martin-ferreyra"></div>\n<script src="https://clientum.com.ar/widget.js"></script>`;

  const handleBook = () => {
    if (!confirmName || !confirmEmail || !selectedSlot) return;
    setBooked(true);
  };

  const copyText = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const pillCls = (active: boolean) =>
    `flex-1 rounded-xl py-2 text-xs font-bold transition-colors ${active ? "bg-primary" : "bg-surface-container-highest text-muted-foreground hover:bg-surface-bright"}`;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 font-display text-base font-bold text-foreground">Sincronización de calendario</h3>
        <p className="mb-4 text-xs text-muted-foreground">Conectá tu calendario para evitar superposición de reuniones.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <ConnectCard name="Google Calendar" desc="Sincroniza reuniones automáticamente con tu cuenta Google." connected={googleConnected} onToggle={() => setGoogleConnected((c) => !c)} />
          <ConnectCard name="Microsoft Outlook" desc="Conectá tu cuenta corporativa de Outlook / Microsoft 365." connected={outlookConnected} onToggle={() => setOutlookConnected((c) => !c)} />
        </div>
      </div>

      <div className="rounded-2xl surface-high p-6 shadow-card">
        <h3 className="mb-4 font-display text-sm font-bold text-foreground">Configuración de disponibilidad</h3>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground">Duración</label>
            <div className="flex gap-2">
              {["15", "30", "45", "60"].map((d) => (
                <button key={d} onClick={() => setDuration(d)} className={pillCls(duration === d)} style={duration === d ? { color: "hsl(var(--on-primary))" } : undefined}>{d}&apos;</button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground">Buffer</label>
            <div className="flex gap-2">
              {["0", "10", "15", "30"].map((b) => (
                <button key={b} onClick={() => setBuffer(b)} className={pillCls(buffer === b)} style={buffer === b ? { color: "hsl(var(--on-primary))" } : undefined}>{b === "0" ? "Sin" : `${b}'`}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground">Horario</label>
            <div className="flex items-center gap-2">
              <input type="time" defaultValue="09:00" className={inputCls} />
              <span className="text-xs text-muted-foreground">a</span>
              <input type="time" defaultValue="18:00" className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl surface-high p-6 shadow-card">
          <h3 className="mb-1 font-display text-sm font-bold text-foreground">Vista previa — Agendá un diagnóstico</h3>
          <p className="mb-4 text-xs text-muted-foreground">Así verán el widget tus leads y prospectos.</p>

          {!booked ? (
            <>
              <div className="mb-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                {SLOTS.map(({ day, times }) => (
                  <div key={day}>
                    <p className="mb-1.5 text-xs font-bold uppercase text-muted-foreground/70">{day}</p>
                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => {
                        const key = `${day}-${t}`;
                        const isBooked = BOOKED.includes(key);
                        const isSelected = selectedSlot === key;
                        return (
                          <button key={t} disabled={isBooked} onClick={() => setSelectedSlot(key)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                              isBooked ? "bg-surface-container text-muted-foreground/40 line-through" :
                              isSelected ? "bg-primary" : "bg-surface-container-highest text-foreground hover:bg-surface-bright"
                            }`}
                            style={isSelected ? { color: "hsl(var(--on-primary))" } : undefined}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSlot && (
                <div className="space-y-3 pt-4" style={{ borderTop: "1px solid hsl(var(--outline-variant) / 0.3)" }}>
                  <p className="text-xs font-bold text-foreground">Completá tus datos:</p>
                  <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder="Nombre y empresa" className={inputCls} />
                  <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder="Email" type="email" className={inputCls} />
                  <button onClick={handleBook} className="w-full rounded-2xl bg-primary py-3 text-sm font-bold transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
                    Confirmar diagnóstico gratuito →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-6 text-center">
              <PartyPopper className="mx-auto mb-3 h-10 w-10 text-primary" />
              <p className="mb-1 font-display font-bold text-foreground">¡Reunión agendada!</p>
              <p className="mb-1 text-xs text-muted-foreground">{selectedSlot?.replace("-", " a las ")}</p>
              <p className="text-xs text-muted-foreground">Confirmación enviada a <strong className="text-foreground">{confirmEmail}</strong></p>
              <button onClick={() => { setBooked(false); setSelectedSlot(null); setConfirmName(""); setConfirmEmail(""); }} className="mt-4 text-xs font-bold text-primary underline">
                Reiniciar demo
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl surface-high p-6 shadow-card">
            <h3 className="mb-3 font-display text-sm font-bold text-foreground">Link de reserva</h3>
            <p className="mb-3 text-xs text-muted-foreground">Compartilo en WhatsApp, emails y redes sociales.</p>
            <div className="flex gap-2">
              <input readOnly value={bookingLink} className={inputCls + " text-xs"} />
              <button onClick={() => copyText(bookingLink, setLinkCopied)} className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
                {linkCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <a href={`https://wa.me/?text=Agendá%20tu%20diagnóstico%20gratuito%20aquí%3A%20${encodeURIComponent(bookingLink)}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold"
                style={{ background: "hsl(var(--tertiary))", color: "hsl(var(--on-tertiary))" }}>
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a href={`mailto:?subject=Agendá tu diagnóstico Clientum&body=Reservá tu turno aquí: ${bookingLink}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary/15 py-2 text-xs font-bold text-primary">
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </div>

          <div className="rounded-2xl surface-high p-6 shadow-card">
            <h3 className="mb-1 flex items-center gap-2 font-display text-sm font-bold text-foreground"><Code2 className="h-4 w-4" /> Widget embebible</h3>
            <p className="mb-3 text-xs text-muted-foreground">Pegá este código en tu sitio web o chatbot.</p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-xl bg-surface-container-lowest p-3 text-xs text-muted-foreground" style={{ fontFamily: "monospace" }}>{widgetCode}</pre>
              <button onClick={() => copyText(widgetCode, setWidgetCopied)} className="absolute right-2 top-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
                {widgetCopied ? "✓" : "Copiar"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl surface-high p-5 shadow-card">
            <h3 className="mb-3 font-display text-sm font-bold text-foreground">Próximas reuniones</h3>
            {[
              { name: "Ana Suárez — Comercio Suárez", time: "Lun 26 May · 10:00", tag: "Diagnóstico" },
              { name: "Constructora Patagónica", time: "Mar 27 May · 14:00", tag: "Demo Pro" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid hsl(var(--outline-variant) / 0.2)" }}>
                <div>
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </div>
                <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-bold text-primary">{r.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
