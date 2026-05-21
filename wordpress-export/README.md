# Exportación para WordPress Gutenberg — "The Cognitive Edge"

Versión actualizada con el nuevo design system **"The Cognitive Edge"**:
tema oscuro editorial-tech, tipografía Plus Jakarta Sans + Inter,
glow cian (`#a8e8ff` → `#00d4ff`), glassmorphism y sombras tintadas en
azul profundo (`#071425`).

## Instrucciones

1. **Agregar el CSS** (una sola vez):
   - **Apariencia > Personalizar > CSS adicional**, o
   - Plugin "Simple Custom CSS", o
   - `style.css` de tu tema hijo

2. **Crear cada página**:
   - Nueva página → bloque **"HTML personalizado"**
   - Pegar el HTML correspondiente
   - Publicar

3. **Recomendado**: en tu tema, configurar el contenedor de página a
   ancho completo (sin sidebar) para que el hero respire bien.

## Cambios respecto a la versión anterior

- Paleta oscura `#071425` con jerarquía de superficies (base / low / high / bright)
- Tipografía: **Plus Jakarta Sans** (display) + **Inter** (body), con tracking ajustado
- Acento: glow cian con gradientes y sombras tintadas (no grises)
- Cards con hover-lift de 3px y borde activado en cyan
- Hero con grid sutil y radial-glow superior
- Botón WhatsApp con clase dedicada `.cl-btn-whatsapp` (verde `#45dd73`)
- Plan "más elegido" con badge gradient y borde glow (`.cl-card-featured`)
- Transiciones a 250ms con curva `cubic-bezier(0.4, 0, 0.2, 1)`

## Notas

- Las animaciones de Framer Motion no están incluidas (no son compatibles
  con Gutenberg). Se incluye una `fade-up` CSS-only para cards y hero.
- Filtros interactivos (Blog, Testimonios) muestran todos los items.
- Toggle mensual/anual de Planes: se muestra el precio mensual.
- Formulario de Contacto es visual; conectalo con Contact Form 7 o WPForms.
- Actualizá los links internos (`/contacto`, `/planes`, etc.) a las URLs
  reales de tu WordPress.
- Reemplazá `/logo.png` con la URL de tu logo subido a la Media Library.

## Archivos

- `styles.css` — Design system "Cognitive Edge" (agregar una sola vez)
- `01-inicio.html` — Inicio
- `02-soluciones.html` — Soluciones por industria
- `03-servicios.html` — Servicios
- `04-planes.html` — Planes y precios
- `05-blog.html` — Blog
- `06-testimonios.html` — Testimonios
- `07-academia.html` — Academia
- `08-contacto.html` — Contacto
- `09-login.html` — Login (opcional; WordPress trae el suyo)
