# Signup Card Styles - Resumen

## Problema Resuelto

Las signup cards de Ghost (kg-signup-card) mostraban textos mucho más grandes que el contenido normal de los posts, rompiendo la coherencia tipográfica.

## Solución Implementada (Cambios Mínimos)

### Archivo Creado
- `assets/css/misc/signup-card.css` - Ajustes tipográficos para las signup cards

### Cambios en Screen.css
- Añadido `@import "misc/signup-card.css";` para incluir los nuevos estilos

## ⚠️ Enfoque Minimalista

**Solo se ajustan fuentes y tamaños de texto**. No se modifican:
- Colores (mantiene los colores por defecto de Ghost)
- Fondos
- Bordes
- Sombras
- Espaciados (padding/margin)
- Otros estilos visuales

## Tamaños de Fuente Ajustados

### Coherencia Tipográfica con Posts:

| Elemento | Tamaño | Referencia |
|----------|--------|------------|
| **Título (h2/h3/h4)** | `2.86rem` | Mismo tamaño que h3 en posts |
| **Párrafos/Descripción** | `2.42rem` | Mismo tamaño que el cuerpo del post |
| **Input de email** | `1.8rem` | Tamaño apropiado para campos de formulario |
| **Botón** | `1.6rem` | Tamaño coherente con otros botones |
| **Texto pequeño/disclaimer** | `1.6rem` | Para información secundaria |
| **Mensajes success/error** | `1.7rem` | Tamaño para mensajes de estado |

### Responsive:

**Tablet (max-width: 991px):**
- Título: `2.64rem`
- Párrafos: `1.98rem`

**Mobile (max-width: 768px):**
- Título: `2.2rem`
- Párrafos: `1.87rem`
- Input: `1.6rem`
- Botón: `1.45rem`
- Disclaimer: `1.4rem`

## Tipografía Aplicada

- **Títulos**: `var(--font-display)` - Misma fuente que títulos del sitio
- **Párrafos**: `var(--font-post-body)` - Misma fuente que el cuerpo de los posts
- **Inputs/Botones**: `var(--font-base)` - Fuente base del sitio
- **Line-height**: Coherente con el resto del contenido

## Uso en Posts

Las signup cards ahora tendrán una tipografía coherente con el resto del post:

1. En el editor de Ghost, agrega una "Signup Card" desde el menú de cards
2. Configura el título, descripción, y botón
3. Los ajustes tipográficos se aplicarán automáticamente
4. El diseño visual (colores, fondos, etc.) se mantiene según lo definido en Ghost

## Next Steps

1. **Build del tema**: Ejecuta `gulp` para compilar los CSS
2. **Test**: Agrega una signup card en un post para verificar que los tamaños sean coherentes
3. **Ajusta si es necesario**: Si algún tamaño necesita ajuste fino, edita `assets/css/misc/signup-card.css`

## Notas

- Todos los estilos usan `!important` para asegurar que sobrescriban los tamaños por defecto de Ghost
- Los tamaños están en `rem` para mantener la escalabilidad
- Los breakpoints responsive coinciden con los del resto del tema
- **Solo se modifican aspectos tipográficos**, todo lo demás se mantiene intacto

