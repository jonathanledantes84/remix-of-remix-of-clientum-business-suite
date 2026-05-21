
## Objetivo

Traer las funcionalidades clave del export de Base44 (`base44-export-2026-05-21`) al proyecto Lovable actual, reescribiéndolas en **TypeScript + Tailwind + design tokens "Cognitive Edge"**, y reemplazando el `Dashboard.tsx` actual (que es básico) por una experiencia tipo app con sidebar y sub‑módulos.

Solo se migran componentes de UI/mock. No se trae `base44Client` ni `AuthContext` de Base44 — se sigue usando el `AuthContext` mock actual del proyecto.

## Alcance — qué se migra

De `src/components/clientum/` del export:

1. **Dashboard.jsx** → reescribir como `src/pages/Dashboard.tsx` (reemplaza el actual)
   Sidebar con secciones: Inicio, CRM/Leads, Chatbot 24/7, Reportes, ERP/Stock, Alertas, Agendamiento, Campañas, Config. Chatbot, Soporte.
   Vista "Inicio" con KPIs + mini‑bars.
2. **KanbanBoard.jsx** → `src/components/dashboard/KanbanBoard.tsx` (CRM/Leads).
   Reemplaza `@hello-pangea/dnd` por **`@dnd-kit/core` + `@dnd-kit/sortable`** (ya alineado con el ecosistema del proyecto; instalación nueva).
3. **ChatbotConfig.jsx** → `src/components/dashboard/ChatbotConfig.tsx` (tono, FAQs, saludo, keywords de transferencia).
4. **Agendamiento.jsx** → `src/components/dashboard/Agendamiento.tsx` (slots, conexión mock a calendarios).
5. **Campanas.jsx** → `src/components/dashboard/Campanas.tsx` (secuencias WhatsApp/email por etapa del pipeline).
6. **EcommercePresentation.jsx** → **no se migra ahora** (es contenido de marketing, ya cubierto por las landings actuales). Lo dejo fuera salvo que lo pidas.
7. `ClientumLogo.jsx`, `Navbar.jsx`, `LoginModal.jsx`, `WhatsAppIcon.jsx`, `Home.jsx` → **no se migran**: la web pública ya tiene su propio `Navbar`, `WhatsAppButton`, `Login` y páginas.

## Adaptaciones de diseño (Cognitive Edge)

El export de Base44 usa estilos inline con `#1A3A80`, `rgba(13,36,97,.08)`, bordes `border-gray-100`, `bg-white`, sombras grises difusas. Esto **viola** las reglas del design system actual. Se reescribe usando solo tokens:

- Fondos de tarjetas → `surface-high` / `surface-container` / `surface-bright` (sin bordes 1px).
- Texto → `text-foreground` / `text-muted-foreground`.
- Acentos / CTAs → `bg-primary`, gradiente cian `gradient-text`, `shadow-card` / `shadow-ambient`.
- Sidebar del dashboard → panel `surface-low` con `glass` en mobile drawer.
- Sin colores hex inline, sin `bg-white`, sin `border-gray-*`.
- Emojis del sidebar → reemplazados por íconos `lucide-react` (Home, Users, Bot, BarChart3, Package, Bell, CalendarDays, Send, Settings, LifeBuoy).
- Tipografía: `font-display` (Plus Jakarta) para headings y `tracking-display` donde aplique.

## Estructura propuesta

```text
src/
  pages/
    Dashboard.tsx              # shell con sidebar + router interno por sección
  components/dashboard/
    DashboardShell.tsx         # layout sidebar + main
    SectionInicio.tsx          # KPIs, mini-bars, actividad reciente
    KanbanBoard.tsx            # CRM/Leads (dnd-kit)
    ChatbotConfig.tsx
    Agendamiento.tsx
    Campanas.tsx
    Placeholder.tsx            # para Reportes/ERP/Alertas/Soporte (stubs)
  data/
    dashboardMocks.ts          # SAMPLE_CAMPAIGNS, INITIAL_LEADS, SLOTS, FAQs, KPIs
```

Las secciones "Reportes", "ERP/Stock", "Alertas" y "Soporte" se renderizan como placeholders con `surface-high` y un CTA "Próximamente / Hablar con ventas" (igual que Base44, que tampoco las tenía implementadas).

## Detalles técnicos

- **Routing**: el shell del dashboard maneja la sección activa con `useState` (igual que Base44). No se agregan rutas anidadas en `App.tsx`.
- **Auth**: se reutiliza `useAuth()` actual; el botón "Salir" llama a `logout()`. La página sigue protegida con el patrón actual (chequeo de `isAuthenticated` y redirect a `/login`).
- **Dependencias nuevas**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`. Se evita `@hello-pangea/dnd` para no traer una dep extra fuera del stack actual.
- **Mocks**: todos los datos (`INITIAL_LEADS`, `SAMPLE_CAMPAIGNS`, `SLOTS`, `BOOKED`, `DEFAULT_FAQS`, KPIs) se mueven a `src/data/dashboardMocks.ts` con tipos TS.
- **Estado**: cada sub‑componente mantiene su `useState` local (igual que en Base44). No se introduce store global.
- **Persistencia**: ninguna — todo en memoria, igual que el export.
- **WhatsApp**: el número `+5492984510883` se centraliza en una constante `WA_NUMBER` en `src/data/dashboardMocks.ts` y se reutiliza.
- **Tipos**: se tipan `Lead`, `Campaign`, `CampaignStep`, `Faq`, `Slot`, `KPI`. Sin `any`.
- **Drag & Drop Kanban**: 4 columnas (`nuevo`, `contactado`, `propuesta`, `cerrado`); mover lead entre columnas actualiza el estado local; se conserva el card UI (avatar, valor, fuente, interés, "hace X").
- **Campañas**: lista de secuencias con detalle expandible, toggle active/paused, métricas (sent/opened/converted) en `surface-bright`.
- **Chatbot**: tono (selector), upload mock de FAQ, listado editable, saludo y keywords de transferencia, botón "Guardar" con toast (`use-toast` existente).
- **Agendamiento**: grilla semanal de slots, marcado de reservados, tarjetas de conexión a Google/Outlook/Calendly (mock con toggle).

## Fuera de alcance (confirmar si los querés en otra iteración)

- `EcommercePresentation.jsx` (landing de e‑commerce).
- Integraciones reales (Calendar, WhatsApp Business API, email).
- Persistencia en Lovable Cloud para leads / campañas / FAQs.
- Reportes / ERP / Alertas / Soporte completos.

## Pasos de implementación

1. Instalar `@dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`.
2. Crear `src/data/dashboardMocks.ts` con tipos + datos.
3. Crear `src/components/dashboard/{DashboardShell,SectionInicio,KanbanBoard,ChatbotConfig,Agendamiento,Campanas,Placeholder}.tsx`.
4. Reescribir `src/pages/Dashboard.tsx` para montar `DashboardShell`.
5. Verificar build, ruta `/dashboard` autenticada, navegación entre secciones, drag & drop del Kanban, y que ningún componente use colores hex/bg-white/borders 1px.
