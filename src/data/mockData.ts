export interface Contact {
  id: string;
  name: string;
  company: string;
  status: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Call {
  id: string;
  contactId: string;
  contactName: string;
  date: string;
  time: string;
  status: "pendiente" | "completada" | "cancelada";
  notes: string;
}

export interface Deal {
  id: string;
  contactId: string;
  contactName: string;
  company: string;
  stage: string;
  value: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  industry: string;
  rating: number;
  quote: string;
  avatar: string;
}

export const contacts: Contact[] = [
  { id: "1", name: "María García", company: "Retail Plus SRL", status: "Nuevo", email: "maria@retailplus.com.ar", phone: "+54 11 4567-8901", createdAt: "2025-02-10" },
  { id: "2", name: "Carlos López", company: "AutoSur SA", status: "Contactado", email: "carlos@autosur.com.ar", phone: "+54 11 5678-9012", createdAt: "2025-02-08" },
  { id: "3", name: "Ana Rodríguez", company: "Constructora Norte", status: "Reunión agendada", email: "ana@constructoranorte.com.ar", phone: "+54 11 6789-0123", createdAt: "2025-02-05" },
  { id: "4", name: "Diego Martínez", company: "Servicios Digitales", status: "Propuesta enviada", email: "diego@servdigitales.com.ar", phone: "+54 11 7890-1234", createdAt: "2025-02-03" },
  { id: "5", name: "Laura Fernández", company: "TechBA", status: "Respondió", email: "laura@techba.com.ar", phone: "+54 11 8901-2345", createdAt: "2025-02-01" },
  { id: "6", name: "Martín Pérez", company: "GastroNet", status: "Cerrado ganado", email: "martin@gastronet.com.ar", phone: "+54 11 9012-3456", createdAt: "2025-01-28" },
];

export const calls: Call[] = [
  { id: "1", contactId: "1", contactName: "María García", date: "2025-02-15", time: "10:00", status: "pendiente", notes: "Seguimiento demo CRM" },
  { id: "2", contactId: "3", contactName: "Ana Rodríguez", date: "2025-02-15", time: "14:30", status: "pendiente", notes: "Presentación módulo ERP" },
  { id: "3", contactId: "5", contactName: "Laura Fernández", date: "2025-02-16", time: "11:00", status: "pendiente", notes: "Revisión propuesta" },
  { id: "4", contactId: "2", contactName: "Carlos López", date: "2025-02-14", time: "09:00", status: "completada", notes: "Primera llamada exploratoria" },
];

export const deals: Deal[] = [
  { id: "1", contactId: "1", contactName: "María García", company: "Retail Plus SRL", stage: "Nuevo", value: 15000 },
  { id: "2", contactId: "2", contactName: "Carlos López", company: "AutoSur SA", stage: "Contactado", value: 28000 },
  { id: "3", contactId: "5", contactName: "Laura Fernández", company: "TechBA", stage: "Respondió", value: 22000 },
  { id: "4", contactId: "3", contactName: "Ana Rodríguez", company: "Constructora Norte", stage: "Reunión agendada", value: 45000 },
  { id: "5", contactId: "4", contactName: "Diego Martínez", company: "Servicios Digitales", stage: "Propuesta enviada", value: 35000 },
  { id: "6", contactId: "6", contactName: "Martín Pérez", company: "GastroNet", stage: "Cerrado ganado", value: 18000 },
];

export const pipelineStages = [
  "Nuevo", "Contactado", "Respondió", "Reunión agendada", "Propuesta enviada", "Cerrado ganado"
];

export const blogPosts: BlogPost[] = [
  {
    id: "1", title: "5 Claves para Digitalizar tu PyME en 2025", slug: "digitalizar-pyme-2025",
    category: "Transformación Digital", excerpt: "Descubrí las estrategias esenciales para llevar tu empresa al siguiente nivel digital.",
    content: "", publishedAt: "2025-02-10", readTime: "5 min", image: "",
  },
  {
    id: "2", title: "CRM vs ERP: ¿Cuál Necesita tu Empresa?", slug: "crm-vs-erp",
    category: "Tecnología", excerpt: "Entendé las diferencias y elegí la solución correcta para tu negocio.",
    content: "", publishedAt: "2025-02-05", readTime: "7 min", image: "",
  },
  {
    id: "3", title: "Automatización Comercial: Guía Completa", slug: "automatizacion-comercial",
    category: "Automatización", excerpt: "Cómo implementar automatizaciones que ahorran tiempo y aumentan ventas.",
    content: "", publishedAt: "2025-01-28", readTime: "8 min", image: "",
  },
  {
    id: "4", title: "Marketing Digital para PyMEs Argentinas", slug: "marketing-digital-pymes",
    category: "Marketing", excerpt: "Estrategias efectivas y accesibles para potenciar tu presencia online.",
    content: "", publishedAt: "2025-01-20", readTime: "6 min", image: "",
  },
  {
    id: "5", title: "Inteligencia de Datos: Tomá Mejores Decisiones", slug: "inteligencia-datos",
    category: "Analytics", excerpt: "Usá tus datos para predecir tendencias y optimizar operaciones.",
    content: "", publishedAt: "2025-01-15", readTime: "5 min", image: "",
  },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Roberto Sánchez", company: "Distribuidora San Martín", industry: "Retail", rating: 5, quote: "Clientum transformó completamente nuestra gestión comercial. Aumentamos las ventas un 45% en 6 meses.", avatar: "" },
  { id: "2", name: "Lucía Morales", company: "AutoCenter Córdoba", industry: "Automotriz", rating: 5, quote: "La integración del CRM con nuestro sistema de turnos nos permitió reducir tiempos de espera un 60%.", avatar: "" },
  { id: "3", name: "Fernando Torres", company: "Constructora Pampa", industry: "Construcción", rating: 5, quote: "El módulo ERP nos dio visibilidad total de nuestros proyectos. Ahora controlamos costos en tiempo real.", avatar: "" },
  { id: "4", name: "Valentina Ruiz", company: "Estudio VR Consultores", industry: "Servicios", rating: 4, quote: "Excelente plataforma, fácil de implementar. El soporte 24/7 es realmente excepcional.", avatar: "" },
  { id: "5", name: "Marcos Aguirre", company: "TechShop BA", industry: "Retail", rating: 5, quote: "Pasamos de planillas Excel a un sistema profesional en una semana. La automatización nos ahorró 20hs semanales.", avatar: "" },
  { id: "6", name: "Sofía Blanco", company: "Diseño & Espacio", industry: "Servicios", rating: 5, quote: "Las analíticas en tiempo real nos permiten tomar decisiones basadas en datos reales, no suposiciones.", avatar: "" },
];

export const industries = [
  { name: "Retail", icon: "ShoppingBag", description: "Gestión de inventario, punto de venta y fidelización de clientes." },
  { name: "Automotriz", icon: "Car", description: "Control de flota, turnos de taller y gestión de repuestos." },
  { name: "Servicios", icon: "Briefcase", description: "Facturación, agenda de citas y seguimiento de proyectos." },
  { name: "Construcción", icon: "Building2", description: "Presupuestos, control de obra y gestión de subcontratistas." },
];

export const plans = [
  {
    name: "START",
    monthlyPrice: 29900,
    annualPrice: 24900,
    popular: false,
    features: [
      "Hasta 500 contactos",
      "CRM básico",
      "1 usuario",
      "Reportes estándar",
      "Soporte por email",
      "Integraciones básicas",
    ],
  },
  {
    name: "PRO",
    monthlyPrice: 59900,
    annualPrice: 49900,
    popular: true,
    features: [
      "Contactos ilimitados",
      "CRM + Ventas + BI",
      "Hasta 10 usuarios",
      "Automatizaciones",
      "Soporte prioritario 24/7",
      "Todas las integraciones",
      "API acceso",
      "Reportes personalizados",
    ],
  },
  {
    name: "PERFORMANCE",
    monthlyPrice: 99900,
    annualPrice: 84900,
    popular: false,
    features: [
      "Todo en PRO",
      "ERP completo",
      "Usuarios ilimitados",
      "IA & Predicciones",
      "Account manager dedicado",
      "Onboarding personalizado",
      "SLA garantizado",
      "Desarrollo a medida",
    ],
  },
];
