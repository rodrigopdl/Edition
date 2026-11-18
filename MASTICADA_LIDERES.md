# Masticada para líderes

URL prevista: `/masticada-lideres/`.

## Publicación en Ghost

1. Subir y activar el ZIP del tema actualizado.
2. Crear una página de Ghost con el título “Masticada para líderes” y el slug exacto `masticada-lideres`.
3. En los ajustes de la página, seleccionar la plantilla “Masticada para líderes” (`custom-masticada-lideres.hbs`) y publicar. El cuerpo de la página lo define esa plantilla.
4. No agregarla a la navegación principal.

El tema por sí solo no crea ni publica el registro de la página en Ghost. No es necesario reemplazar `routes.yaml` ni cambiar rutas existentes.

## Implementación

- La nueva plantilla reutiliza `default.hbs`, su variante de header mínimo, `assets/css/site/masticadas-campana.css`, el icono compartido de WhatsApp y todas las imágenes existentes.
- Conserva el footer mínimo, los testimonios originales y la expansión de la cita de Joaquín.
- Los tres CTA conservan el mismo número y mensaje de la campaña original, navegan en la misma pestaña y registran `fbq('track', 'Contact')` usando el Pixel global, sin inicializar otro.
- El título, la descripción y las etiquetas sociales se generan desde los bloques SEO existentes del layout. La URL canónica corresponde a `/masticada-lideres/`.
- La campaña original y las demás páginas no se modifican.
