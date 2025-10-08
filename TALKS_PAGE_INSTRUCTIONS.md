# Página de Charlas y Conferencias

## 🎉 ¡Página creada exitosamente!

He creado una nueva página personalizada para "Charlas y conferencias" con un diseño coherente con el resto de tu sitio.

## 📁 Archivos creados

1. **custom-talks.hbs** - Template de la página
2. **assets/css/site/talks.css** - Estilos específicos de la página
3. **dist/custom-edition.zip** - Tema actualizado listo para instalar

## 🚀 Cómo usar esta página en Ghost

### Opción 1: Subir el tema actualizado

1. Ve al panel de administración de Ghost
2. Navega a **Settings → Design**
3. Haz clic en **Change theme**
4. Sube el archivo `dist/custom-edition.zip`
5. Activa el tema

### Opción 2: Si ya tienes el tema instalado

1. Crea una nueva página en Ghost (no un post)
2. En el título, ponle: **Charlas y conferencias** (o el que prefieras)
3. En el sidebar derecho, busca la sección **"Template"**
4. Selecciona **"Charlas y Conferencias"** del dropdown
5. Publica la página

## 🎨 Características del diseño

- **Hero atractivo** con título destacado y CTA principal
- **Sección de introducción** con texto amplio y respiración
- **Bloques de valor** con iconos y descripciones claras
- **Catálogo de charlas** con 3 charlas disponibles
- **Testimonio destacado** para generar confianza
- **Sección "Sobre mí"** breve pero efectiva
- **CTA final** llamativo para cerrar la conversión

## 🎨 Paleta de colores utilizada

- **Fondo principal**: #222535 (gris oscuro)
- **Color de marca**: #5271FF (azul)
- **Texto principal**: #f1f1f1 (blanco/gris claro)
- **Texto secundario**: rgba(241, 241, 241, 0.85)

## 📱 Diseño responsive

La página está completamente optimizada para:
- 📱 Móviles (< 480px)
- 📱 Tablets (< 768px)
- 💻 Desktop (> 768px)

## ✏️ Cómo editar el contenido

Si necesitas modificar el texto, edita el archivo `custom-talks.hbs`. El contenido está organizado en secciones claramente marcadas:

```handlebars
{{!-- Hero Section --}}
{{!-- Introducción --}}
{{!-- Qué provocan mis charlas --}}
{{!-- Charlas Disponibles --}}
{{!-- Testimonio --}}
{{!-- Sobre mí --}}
{{!-- CTA Final --}}
```

Después de editar, ejecuta:

```bash
npx gulp zip
```

Y sube el nuevo archivo zip a Ghost.

## 📧 CTAs configurados

Todos los botones de CTA apuntan a: `mailto:hola@paramasticar.com`

Si necesitas cambiar el email, busca y reemplaza en el archivo `custom-talks.hbs`.

## 🎯 SEO y accesibilidad

La página incluye:
- ✅ Estructura semántica HTML5
- ✅ Contraste de colores accesible
- ✅ Textos alternativos y roles ARIA cuando es necesario
- ✅ Soporte para `prefers-reduced-motion`
- ✅ Estilos de impresión optimizados

## 💡 Próximos pasos sugeridos

1. **Agrega una imagen hero**: Puedes agregar una imagen de fondo al hero o una foto tuya
2. **Personaliza los emojis**: Los iconos 🌱🔥🤝 pueden reemplazarse con iconos SVG si prefieres
3. **Agrega más testimonios**: Puedes duplicar la sección de testimonios
4. **Integra un formulario de contacto**: Si usas Typeform, Calendly u otro servicio

## 🐛 Troubleshooting

Si la página no aparece en el dropdown de templates:
1. Asegúrate de que el tema esté actualizado
2. Verifica que el archivo `custom-talks.hbs` esté en la raíz del tema
3. Reinicia Ghost si es necesario

---

**¿Preguntas?** El código está bien documentado y sigue las mismas convenciones que el resto del tema.

