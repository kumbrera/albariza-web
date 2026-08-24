# Albariza Digital — sitio web

Web de marketing de Albariza Digital (agencia de transformación digital en Andalucía).
Astro 7 + React (islas puntuales) + Tailwind CSS v4 + Framer Motion. Sitio 100% estático
(`output: "static"`), pensado para desplegarse en Cloudflare Pages.

## Comandos

```sh
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (astro dev --background por defecto en este repo)
npm run build     # build de producción → carpeta dist/
npm run preview   # sirve dist/ localmente para probar el build
```

## Estructura

```
src/
├── components/     # componentes reutilizables (carrusel, CTAs, schema JSON-LD...)
├── data/           # contenido de servicios (services.ts) y blog (blog.ts)
├── layouts/        # Layout.astro — head, nav, footer, cookies, WhatsApp, JSON-LD
├── pages/          # cada archivo = una ruta (home, /servicios/[slug], /blog, /contacto...)
└── styles/         # global.css (Tailwind + animaciones custom)
public/
├── brand/          # logo, favicon, og-image (fuente: los .svg; los .png se generan a partir de ellos)
├── videos/         # vídeos de fondo de las tarjetas de servicio (comprimidos con ffmpeg)
├── robots.txt, llms.txt, _headers, sitemap (generado en build)
```

## Piezas que dependen de claves externas

- **Formularios de `/contacto`** (`src/pages/contacto.astro`): envían por Web3Forms.
  Clave en `WEB3FORMS_ACCESS_KEY` dentro del `<script>` de esa página.
- **Google Analytics** (`src/components/CookieConsent.astro`): ID en `GA_MEASUREMENT_ID`.
  Solo se carga si el visitante acepta el aviso de cookies.
- **Dominio de producción**: fijado en `astro.config.mjs` (`site: 'https://albarizadigital.com'`)
  — lo usa el sitemap y las URLs absolutas (`og:image`, JSON-LD). Si cambia el dominio,
  hay que actualizarlo aquí.
- **Redirect `www` → dominio raíz**: no se hace por `_redirects` (el motor de despliegue de
  Cloudflare usado por este proyecto, Workers con assets estáticos vía `wrangler deploy`,
  rechaza reglas con URL absoluta). Se configura en el panel de Cloudflare: Rules →
  Redirect Rules, o marcando la opción de redirección al añadir `www` como dominio personalizado.
- **`wrangler.jsonc`**: necesario para que `wrangler deploy` sirva `dist/` como assets
  estáticos sin más. Sin este archivo, `wrangler deploy` no encuentra config y lanza su
  propio asistente interactivo (`astro add cloudflare`), que reconfigura el proyecto como
  Worker con adaptador y **vuelve a ejecutar `astro build` una segunda vez** en otro
  proceso — esa segunda build fue la que realmente se desplegaba, y llegó a salir sin
  ninguna entrada de blog (bug real, visto en producción el 24/08/2026). No borrar este
  archivo.

## Contenido del blog

Los posts (`src/data/blog.ts`) tienen un campo `datePublished`. Si la fecha es futura,
el post queda escrito en el repo pero no se publica (no aparece en `/blog`, ni en el
home, ni se genera su URL) hasta que llegue esa fecha y se vuelva a construir el sitio.
Para publicar algo "ya", basta con ponerle la fecha de hoy o anterior.

## Añadir/cambiar un servicio

Todo el contenido de cada servicio (textos, proceso, FAQ, color de acento, vídeo) vive
en `src/data/services.ts`. La página `/servicios/[slug].astro` es una plantilla que lee
de ahí — no hay que tocar el `.astro` para cambiar texto.
