export const WA_NUMBER = "5492984510883";

export type StageId = "nuevo" | "contactado" | "propuesta" | "cerrado";

export const STAGE_LABELS: Record<StageId, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  propuesta: "Propuesta",
  cerrado: "Cerrado",
};

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: string;
  time: string;
  source: string;
  interest: string;
  avatar: string;
}

export const INITIAL_LEADS: Record<StageId, Lead[]> = {
  nuevo: [
    { id: "l1", name: "Ana Suárez", company: "Comercio Suárez", value: "$220.000", time: "hace 12 min", source: "chatbot", interest: "CRM + Chatbot", avatar: "AS" },
    { id: "l5", name: "Farmacia Del Centro", company: "Farmacia Del Centro", value: "$180.000", time: "hace 5 h", source: "formulario", interest: "Chatbot + Reportes", avatar: "FC" },
  ],
  contactado: [
    { id: "l3", name: "Constructora Patagónica", company: "Constructora Patagónica", value: "$560.000", time: "hace 2 días", source: "WhatsApp", interest: "ERP + Demo", avatar: "CP" },
  ],
  propuesta: [
    { id: "l2", name: "Pablo Torres", company: "Ferretería Torres", value: "$380.000", time: "ayer", source: "follow-up", interest: "Plan Pro", avatar: "PT" },
  ],
  cerrado: [
    { id: "l4", name: "Carlos Ramos", company: "Ramos Distribuidora", value: "$320.000", time: "hace 3 h", source: "pago", interest: "Renovación anual", avatar: "CR" },
  ],
};

export interface CampaignStep {
  delay: string;
  message: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "whatsapp" | "email";
  stage: StageId;
  status: "active" | "paused";
  sent: number;
  opened: number;
  converted: number;
  steps: CampaignStep[];
}

export const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "c1", name: "Follow-up leads contactados", channel: "whatsapp", stage: "contactado",
    status: "active", sent: 12, opened: 9, converted: 3,
    steps: [
      { delay: "1 día", message: "¡Hola {nombre}! Te contacto desde Clientum para ver si pudiste revisar la info que te enviamos. 😊" },
      { delay: "3 días", message: "¡Hola {nombre}! ¿Pudiste ver el material? Podemos hacer una demo de 20 min a tu conveniencia. 📅" },
      { delay: "7 días", message: "¡Hola {nombre}, es mi último recordatorio! Hay empresas de tu rubro que ya automatizaron con Clientum. ¿Agendamos?" },
    ],
  },
  {
    id: "c2", name: "Secuencia bienvenida nuevos leads", channel: "email", stage: "nuevo",
    status: "active", sent: 8, opened: 7, converted: 2,
    steps: [
      { delay: "Inmediato", message: "Asunto: ¡Bienvenido/a a Clientum, {nombre}! | Cuerpo: Gracias por tu interés." },
      { delay: "2 días", message: "Asunto: ¿Sabías que podés ahorrar 3 horas diarias? | Cuerpo: Hola {nombre}..." },
    ],
  },
  {
    id: "c3", name: "Empuje cierre propuestas enviadas", channel: "whatsapp", stage: "propuesta",
    status: "paused", sent: 5, opened: 5, converted: 1,
    steps: [
      { delay: "2 días", message: "¡Hola {nombre}! ¿Tuviste la posibilidad de revisar la propuesta?" },
      { delay: "5 días", message: "¡Hola {nombre}! La propuesta vence el próximo viernes. ¿La cerramos esta semana? 🚀" },
    ],
  },
];

export interface Faq {
  id: number;
  q: string;
  a: string;
  active: boolean;
}

export const DEFAULT_FAQS: Faq[] = [
  { id: 1, q: "¿Cuáles son sus horarios de atención?", a: "Atendemos de lunes a viernes de 9 a 18 hs. Fuera de ese horario, el chatbot responde automáticamente.", active: true },
  { id: 2, q: "¿Cómo puedo pedir un presupuesto?", a: "Podés pedirlo directamente por este chat, por WhatsApp al +54 298 451-0883, o completando el formulario en nuestra web.", active: true },
  { id: 3, q: "¿Tienen presencia en mi ciudad?", a: "Trabajamos con clientes en toda Argentina de forma 100% remota. También tenemos presencia física en Patagonia.", active: true },
];

export interface SlotDay {
  day: string;
  times: string[];
}

export const SLOTS: SlotDay[] = [
  { day: "Lun 26 May", times: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
  { day: "Mar 27 May", times: ["09:00", "10:30", "14:00", "15:30"] },
  { day: "Mié 28 May", times: ["09:00", "11:00", "16:00"] },
  { day: "Jue 29 May", times: ["10:00", "11:00", "14:00"] },
  { day: "Vie 30 May", times: ["09:00", "10:00", "12:00"] },
];

export const BOOKED = ["Lun 26 May-10:00", "Mar 27 May-14:00"];

export interface DashboardKpi {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
}

export const DASHBOARD_KPIS: DashboardKpi[] = [
  { label: "Leads activos", value: "5", delta: "+2", deltaUp: true },
  { label: "Pipeline total", value: "$1.66M", delta: "+12%", deltaUp: true },
  { label: "Conversión", value: "24%", delta: "+3pp", deltaUp: true },
  { label: "Tareas hoy", value: "8", delta: "-2", deltaUp: false },
];
