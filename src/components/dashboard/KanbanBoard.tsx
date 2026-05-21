import { useState } from "react";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor,
  useSensor, useSensors, useDraggable, useDroppable, closestCorners,
} from "@dnd-kit/core";
import { ChevronDown, ChevronUp, MessageCircle, FileText, Plus } from "lucide-react";
import { INITIAL_LEADS, Lead, StageId, STAGE_LABELS, WA_NUMBER } from "@/data/dashboardMocks";

const COLUMN_ORDER: StageId[] = ["nuevo", "contactado", "propuesta", "cerrado"];
const STAGE_DOT: Record<StageId, string> = {
  nuevo: "bg-blue-400",
  contactado: "bg-amber-400",
  propuesta: "bg-violet-400",
  cerrado: "bg-emerald-400",
};

function LeadCard({ lead, colId, isOverlay }: { lead: Lead; colId: StageId; isOverlay?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: { fromCol: colId },
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging && !isOverlay ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="select-none rounded-2xl surface-high p-4 shadow-card transition-all hover:shadow-card-hover"
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-xs font-bold text-primary">
          {lead.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{lead.name}</p>
          <p className="truncate text-xs text-muted-foreground">{lead.company}</p>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-base font-bold text-foreground">{lead.value}</span>
        <span className="text-xs text-muted-foreground">{lead.time}</span>
      </div>

      <div className="mb-3">
        <span className="rounded-full bg-surface-container-highest px-2 py-1 text-xs font-medium text-muted-foreground">
          {lead.interest}
        </span>
      </div>

      {expanded && (
        <div className="mb-3 space-y-1 pt-3 text-xs text-muted-foreground" style={{ borderTop: "1px solid hsl(var(--outline-variant) / 0.3)" }}>
          <div className="flex justify-between"><span className="font-semibold">Fuente:</span><span>{lead.source}</span></div>
          <div className="flex justify-between"><span className="font-semibold">Último contacto:</span><span>{lead.time}</span></div>
        </div>
      )}

      <div className="flex gap-2">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=Hola,%20te%20contacto%20en%20relación%20a%20${encodeURIComponent(lead.company)}`}
          target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-tertiary py-2 text-xs font-bold text-on-tertiary transition-opacity hover:opacity-90"
          style={{ background: "hsl(var(--tertiary))", color: "hsl(var(--on-tertiary))" }}
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=Hola%20${encodeURIComponent(lead.name)}%2C%20quiero%20enviarte%20una%20propuesta%20de%20Clientum`}
          target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary/15 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/25"
        >
          <FileText className="h-3.5 w-3.5" /> Propuesta
        </a>
      </div>
    </div>
  );
}

function Column({ id, leads }: { id: StageId; leads: Lead[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`flex flex-col rounded-2xl surface-low p-4 transition-colors ${isOver ? "ring-2 ring-primary/40" : ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${STAGE_DOT[id]}`} />
          <span className="font-display text-sm font-bold text-foreground">{STAGE_LABELS[id]}</span>
        </div>
        <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-xs font-bold text-foreground">
          {leads.length}
        </span>
      </div>
      <div className="flex min-h-32 flex-col gap-3">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} colId={id} />
        ))}
        {leads.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl py-8 text-xs font-semibold text-muted-foreground/60" style={{ border: "2px dashed hsl(var(--outline-variant) / 0.4)" }}>
            Arrastrá un lead aquí
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activeLead, setActiveLead] = useState<{ lead: Lead; col: StageId } | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const findColumn = (leadId: string): StageId | null => {
    for (const col of COLUMN_ORDER) if (leads[col].some((l) => l.id === leadId)) return col;
    return null;
  };

  const onDragStart = (e: DragStartEvent) => {
    const col = findColumn(String(e.active.id));
    if (!col) return;
    const lead = leads[col].find((l) => l.id === e.active.id)!;
    setActiveLead({ lead, col });
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = e;
    if (!over) return;
    const fromCol = findColumn(String(active.id));
    const toCol = (COLUMN_ORDER.includes(over.id as StageId) ? (over.id as StageId) : findColumn(String(over.id))) as StageId | null;
    if (!fromCol || !toCol || fromCol === toCol) return;
    setLeads((prev) => {
      const lead = prev[fromCol].find((l) => l.id === active.id);
      if (!lead) return prev;
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((l) => l.id !== active.id),
        [toCol]: [lead, ...prev[toCol]],
      };
    });
  };

  const totalValue = Object.values(leads).flat().reduce((s, l) => s + parseInt(l.value.replace(/\D/g, ""), 10), 0);

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {COLUMN_ORDER.map((id) => (
          <div key={id} className="rounded-2xl surface-high p-4 text-center shadow-card">
            <div className="font-display text-2xl font-bold text-foreground">{leads[id].length}</div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <span className={`h-2 w-2 rounded-full ${STAGE_DOT[id]}`} /> {STAGE_LABELS[id]}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-muted-foreground">
          Pipeline total: <span className="font-bold text-foreground">${totalValue.toLocaleString("es-AR")}</span>
          <span className="ml-2 text-muted-foreground/70">· Arrastrá las tarjetas para mover leads</span>
        </p>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-on-primary transition-opacity hover:opacity-90" style={{ color: "hsl(var(--on-primary))" }}>
          <Plus className="h-3.5 w-3.5" /> Nuevo lead
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {COLUMN_ORDER.map((id) => (
            <Column key={id} id={id} leads={leads[id]} />
          ))}
        </div>
        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead.lead} colId={activeLead.col} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
