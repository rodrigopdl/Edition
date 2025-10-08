# Ideas de personalización para la página de Charlas

## 🎨 Mejoras visuales opcionales

### 1. Agregar tu foto o imagen hero

Edita `custom-talks.hbs` y agrega una imagen en el hero:

```handlebars
{{!-- Hero Section --}}
<section class="talks-hero">
    <div class="gh-canvas">
        <div class="talks-hero-image-wrapper">
            <img src="{{asset "images/rodrigo-speaking.jpg"}}" alt="Rodrigo en una charla" class="talks-hero-bg">
        </div>
        <h1 class="talks-hero-title">...</h1>
        ...
    </div>
</section>
```

Y agrega estos estilos en `talks.css`:

```css
.talks-hero-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: 0;
}

.talks-hero {
    position: relative;
}

.talks-hero > .gh-canvas {
    position: relative;
    z-index: 1;
}
```

### 2. Reemplazar emojis con iconos SVG

Los emojis (🌱🔥🤝) pueden reemplazarse con SVG personalizados para más control visual:

```handlebars
<div class="talks-value-icon">
    {{> "icons/flame"}}  {{!-- o el icono que prefieras --}}
</div>
```

### 3. Agregar animaciones al scroll

Puedes usar bibliotecas como AOS (Animate On Scroll) para animar elementos al hacer scroll:

```html
<div class="talks-value-card" data-aos="fade-up">
```

### 4. Galería de fotos de eventos

Agrega una sección con fotos de charlas anteriores:

```handlebars
<section class="talks-gallery">
    <div class="gh-canvas">
        <h2 class="talks-section-title">Charlas anteriores</h2>
        <div class="talks-gallery-grid">
            <img src="..." alt="...">
            <img src="..." alt="...">
            <img src="..." alt="...">
        </div>
    </div>
</section>
```

## 📝 Mejoras de contenido

### 1. Agregar preguntas frecuentes (FAQ)

```handlebars
<section class="talks-faq">
    <div class="gh-canvas">
        <h2 class="talks-section-title">Preguntas frecuentes</h2>
        
        <div class="faq-list">
            <details class="faq-item">
                <summary>¿Cuánto dura una charla?</summary>
                <p>Normalmente entre 45 y 60 minutos...</p>
            </details>
            
            <details class="faq-item">
                <summary>¿Es posible adaptar el contenido?</summary>
                <p>Sí, cada charla se adapta al contexto...</p>
            </details>
        </div>
    </div>
</section>
```

### 2. Agregar más testimonios

Puedes duplicar la sección de testimonios o crear un carrusel:

```handlebars
<section class="talks-testimonials">
    <div class="gh-canvas">
        <h2 class="talks-section-title">Lo que dicen los asistentes</h2>
        
        <div class="testimonials-grid">
            <blockquote>...</blockquote>
            <blockquote>...</blockquote>
            <blockquote>...</blockquote>
        </div>
    </div>
</section>
```

### 3. Agregar logos de empresas

Si has dado charlas en empresas conocidas:

```handlebars
<section class="talks-clients">
    <div class="gh-canvas">
        <h3>Han confiado en mí</h3>
        <div class="clients-logos">
            <img src="..." alt="Logo empresa 1">
            <img src="..." alt="Logo empresa 2">
            ...
        </div>
    </div>
</section>
```

## 🔗 Integraciones útiles

### 1. Formulario de contacto personalizado

En lugar de solo `mailto:`, puedes integrar:

**Typeform:**
```html
<a href="https://form.typeform.com/to/TU-FORM-ID" class="talks-hero-cta">
    Solicitar una charla
</a>
```

**Calendly:**
```html
<a href="https://calendly.com/tu-usuario/charla-empresas" class="talks-hero-cta">
    Agendar una llamada
</a>
```

**Google Forms:**
```html
<a href="https://forms.gle/TU-FORM-ID" class="talks-hero-cta">
    Solicitar información
</a>
```

### 2. Video introductorio

Agrega un video corto mostrándote en acción:

```handlebars
<section class="talks-video">
    <div class="gh-canvas">
        <h2 class="talks-section-title">Mirá un adelanto</h2>
        
        <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/TU-VIDEO-ID" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
    </div>
</section>
```

### 3. Descargable con más información

Ofrece un PDF con detalles de las charlas:

```handlebars
<a href="{{asset "downloads/charlas-info.pdf"}}" class="download-btn" download>
    📄 Descargar información completa
</a>
```

## 💰 Agregar información de precios (opcional)

Si decides mostrar precios o paquetes:

```handlebars
<section class="talks-pricing">
    <div class="gh-canvas">
        <h2 class="talks-section-title">Opciones de inversión</h2>
        
        <div class="pricing-grid">
            <div class="pricing-card">
                <h3>Charla única</h3>
                <p class="price">$X.XXX USD</p>
                <ul>
                    <li>1 charla de 60 minutos</li>
                    <li>Material digital</li>
                    <li>Q&A incluido</li>
                </ul>
                <a href="#" class="pricing-cta">Solicitar</a>
            </div>
            
            <!-- más paquetes... -->
        </div>
    </div>
</section>
```

## 🎯 SEO y marketing

### 1. Meta descripción personalizada

Agrega en `custom-talks.hbs` al final:

```handlebars
{{#contentFor "meta_description"}}
Charlas sobre liderazgo, autoliderazgo y claridad mental para equipos. 
Rodrigo Ponce de León, creador de Para Masticar, ayuda a líderes a 
encontrar claridad en medio de la incertidumbre.
{{/contentFor}}
```

### 2. Schema.org markup

Para mejorar el SEO:

```handlebars
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rodrigo Ponce de León",
  "description": "Speaker sobre liderazgo y claridad mental",
  "url": "{{@site.url}}/charlas",
  "sameAs": [
    "https://linkedin.com/in/tu-perfil",
    "https://twitter.com/tu-usuario"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Charlas sobre liderazgo y autoliderazgo para equipos"
  }
}
</script>
```

### 3. Open Graph tags

Para mejor compartición en redes sociales:

```handlebars
{{#contentFor "og_title"}}Charlas y Conferencias - Rodrigo Ponce de León{{/contentFor}}
{{#contentFor "og_description"}}Charlas que invitan a pausar, pensar y reconectar. Para equipos que buscan claridad.{{/contentFor}}
{{#contentFor "og_image"}}{{asset "images/talks-og-image.jpg"}}{{/contentFor}}
```

## 📊 Analytics y tracking

### 1. Eventos personalizados para botones CTA

Si usas Google Analytics:

```handlebars
<a href="mailto:hola@paramasticar.com" 
   class="talks-hero-cta"
   onclick="gtag('event', 'click', {
     'event_category': 'CTA',
     'event_label': 'Hero CTA - Charlas'
   })">
    Invitame a hablar
</a>
```

### 2. Pixel de Facebook/Meta

Para remarketing:

```handlebars
{{#contentFor "head"}}
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TU-PIXEL-ID');
  fbq('track', 'PageView');
</script>
{{/contentFor}}
```

## 🌍 Multiidioma

Si necesitas versión en inglés:

1. Crea `custom-talks-en.hbs`
2. Traduce todo el contenido
3. En Ghost, crea dos páginas: una en español y otra en inglés

## 🎭 Variaciones por tipo de charla

Puedes crear páginas específicas para cada charla:

- `custom-talks-bestias.hbs`
- `custom-talks-lider.hbs`
- `custom-talks-curiosidad.hbs`

Cada una con foco en esa charla específica.

---

**💡 Recuerda:** Después de cada cambio, ejecuta `npx gulp zip` para generar el nuevo tema.

