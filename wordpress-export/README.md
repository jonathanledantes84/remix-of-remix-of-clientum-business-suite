# Exportación para WordPress Gutenberg

## Instrucciones

1. **Agregar el CSS**: Copiá el contenido de `styles.css` en tu WordPress:
   - Ir a **Apariencia > Personalizar > CSS adicional**
   - O usar un plugin como "Simple Custom CSS"
   - O agregarlo al `style.css` de tu tema hijo

2. **Crear cada página**: Para cada archivo HTML:
   - Crear una nueva página en WordPress
   - Agregar un bloque **"HTML personalizado"**
   - Pegar el contenido del archivo HTML correspondiente
   - Publicar

## Notas
- Las animaciones de Framer Motion no están incluidas (no son compatibles con Gutenberg)
- Los filtros interactivos (Blog, Testimonios) no funcionarán — se muestran todos los items
- El toggle mensual/anual de Planes no funciona — se muestra el precio mensual
- El formulario de Contacto es visual, necesitarás un plugin como Contact Form 7 o WPForms para funcionalidad real
- Los links internos (`/contacto`, `/planes`, etc.) deben actualizarse a las URLs de tu WordPress
- Reemplazá `/logo.png` con la URL real de tu logo en WordPress

## Archivos
- `styles.css` — CSS compartido (agregar una sola vez)
- `01-inicio.html` — Página de Inicio
- `02-soluciones.html` — Soluciones
- `03-servicios.html` — Servicios
- `04-planes.html` — Planes y Precios
- `05-blog.html` — Blog
- `06-testimonios.html` — Testimonios
- `07-academia.html` — Academia
- `08-contacto.html` — Contacto
- `09-login.html` — Login (opcional, WordPress tiene su propio login)
