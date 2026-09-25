export interface Tagline {
  normal: string;
  emphasis: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Slogan shown as the hero of the service page, styled like the home hero */
  tagline: Tagline;
  description: string;
  /** Second, more detailed paragraph — the service page's expanded explanation */
  longIntro: string;
  bullets: string[];
  /** 3-step "how we work" process, shown on the service page */
  process: ProcessStep[];
  /** Shown on the service page + emitted as FAQPage JSON-LD (GEO/AI-answer visibility) */
  faq: FaqItem[];
  /** Short line typed out in the service page's closing CTA */
  ctaLine: string;
  /** Tailwind gradient classes used for the animated plasma background (fallback / overlay tint) */
  gradient: string;
  /** Solid hex matching the gradient's dominant hue — used for glows/accents that need a real color value, not a gradient utility */
  accent: string;
  /** Looping background video for the carousel card, in /public/videos */
  video: string;
}

export const homeTagline: Tagline = {
  normal: "Construimos tu presencia.",
  emphasis: "Domina tu mercado",
};

export const services: Service[] = [
  // The old "IA & Automatización" and "Consultoría" pages merged into the flagship
  // asesoría page (src/pages/servicios/asesoria-procesos-automatizacion.astro).
  {
    slug: "seo-geo",
    name: "Posicionamiento SEO / GEO",
    tagline: {
      normal: "Tu marca,",
      emphasis: "en el radar",
    },
    video: "/videos/seo-geo.mp4",
    description:
      "Hacemos que te encuentren: posicionamiento SEO local y nacional, y optimización para que las IAs generativas también te recomienden.",
    longIntro:
      "Tu competencia con peor producto te está ganando clientes por una única razón: aparece antes que tú. Trabajamos SEO local de verdad (Google Maps, reseñas, contenido por ciudad) y GEO — que tu contenido esté tan claro y estructurado que ChatGPT o Google AI Overviews te citen directamente como respuesta, sin que el cliente ni siquiera llegue a buscar más.",
    bullets: [
      "SEO local y nacional",
      "Optimización para buscadores IA (GEO)",
      "Auditorías técnicas",
      "Contenido orientado a resultados",
    ],
    process: [
      {
        title: "Auditoría SEO y GEO",
        text: "Revisamos tu posicionamiento actual en Google y en las respuestas de las IAs generativas.",
      },
      {
        title: "Estrategia de contenido",
        text: "Definimos qué palabras clave y qué contenido necesitas para posicionar de verdad.",
      },
      {
        title: "Ejecución y medición",
        text: "Publicamos, optimizamos tu ficha local y medimos la evolución mes a mes.",
      },
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre SEO y GEO?",
        a: "El SEO busca posicionarte en los resultados de búsqueda tradicionales de Google para tu zona. El GEO busca que las IAs generativas (ChatGPT, Google AI Overviews) te citen directamente como respuesta. Comparten base, pero el GEO exige contenido aún más claro y estructurado.",
      },
      {
        q: "¿Cuánto se tarda en ver resultados de SEO local?",
        a: "Las mejoras en tu ficha de Google Business Profile pueden notarse en semanas. El posicionamiento orgánico por contenido suele tardar de 3 a 6 meses en consolidarse.",
      },
      {
        q: "¿Trabajáis con negocios de toda España?",
        a: "Sí. Trabajamos en remoto con empresas de toda España, y el SEO local lo adaptamos a la zona donde está cada negocio.",
      },
    ],
    ctaLine: "Cuéntanos qué buscan tus clientes y dónde no apareces",
    gradient: "from-teal-500 via-emerald-500 to-cyan-600",
    accent: "#14b8a6",
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: {
      normal: "Visibilidad",
      emphasis: "que convierte",
    },
    video: "/videos/social-media.mp4",
    description:
      "Gestionamos tus redes sociales y campañas publicitarias en Google, Meta y TikTok, con social commerce que convierte seguidores en clientes.",
    longIntro:
      "Tener Instagram no es tener una estrategia. Publicar sin rumbo quema tiempo y presupuesto sin resultados. Trabajamos con un sistema de contenidos que se repite en bucle — educar, mostrar, vender, conectar — y solo invertimos en publicidad cuando ya hay algo que demuestre interés real. Menos publicaciones, mejor pensadas, más conversión.",
    bullets: [
      "Gestión de redes sociales",
      "Campañas Google / Meta / TikTok",
      "Social commerce",
      "Contenido y creatividad",
    ],
    process: [
      {
        title: "Auditoría de redes",
        text: "Revisamos qué está funcionando -y qué no- en tus canales actuales.",
      },
      {
        title: "Estrategia de contenidos",
        text: "Definimos pilares de contenido, tono de marca y un calendario realista.",
      },
      {
        title: "Producción y gestión",
        text: "Creamos, publicamos y gestionamos la comunidad cada semana.",
      },
    ],
    faq: [
      {
        q: "¿Cuántas veces a la semana debería publicar mi empresa?",
        a: "Mejor 3 publicaciones semanales sostenibles y con estrategia que 7 improvisadas. La constancia y la calidad pesan más que la frecuencia.",
      },
      {
        q: "¿Qué red social es mejor para mi negocio?",
        a: "Depende de tu cliente ideal: Instagram/TikTok para consumo visual, LinkedIn para B2B, Facebook para comunidad local. No hace falta estar en todas.",
      },
      {
        q: "¿Gestionáis también la publicidad de pago?",
        a: "Sí, gestionamos campañas en Google, Meta y TikTok, siempre después de validar qué contenido funciona de forma orgánica.",
      },
    ],
    ctaLine: "Cuéntanos qué resultado esperas de tus redes",
    gradient: "from-pink-500 via-rose-500 to-purple-700",
    accent: "#ec4899",
  },
  {
    slug: "web",
    name: "Web",
    tagline: {
      normal: "No solo creamos tu web.",
      emphasis: "Hacemos que te elijan",
    },
    video: "/videos/web.mp4",
    description:
      "Diseñamos y desarrollamos páginas web y plataformas eCommerce rápidas, cuidadas y preparadas para vender desde el primer día.",
    longIntro:
      "Muchas empresas tienen página web y aun así reciben cero clientes por ella — el problema casi nunca es estética, es que se diseñó como una tarjeta de visita digital en vez de como una herramienta para vender. Diseñamos y construimos webs (o tiendas online) rápidas, con una llamada a la acción clara en cada página y el SEO técnico integrado desde el primer día, no añadido después.",
    bullets: [
      "Creación de páginas web",
      "Plataformas eCommerce",
      "Rendimiento y SEO técnico",
      "Diseño a medida",
    ],
    process: [
      {
        title: "Descubrimiento",
        text: "Entendemos tu negocio, tu cliente ideal y qué debe conseguir la web realmente.",
      },
      {
        title: "Diseño y desarrollo",
        text: "Diseñamos y construimos la web (o tienda) optimizada para conversión, no solo para verse bien.",
      },
      {
        title: "Lanzamiento y SEO",
        text: "Publicamos, configuramos analítica y dejamos las bases de SEO técnico listas.",
      },
    ],
    faq: [
      {
        q: "¿Cuánto cuesta una página web?",
        a: "Una web corporativa sencilla suele rondar entre 600€ y 1.500€. Una tienda online (eCommerce) parte desde 2.000€, según catálogo e integraciones.",
      },
      {
        q: "¿Necesito una tienda online o me vale una web informativa?",
        a: "Si tus clientes suelen contactarte antes de comprar (servicios, presupuestos), una web informativa optimizada suele bastar. Si vendes producto físico sin hablar antes contigo, el eCommerce tiene más sentido.",
      },
      {
        q: "¿La web incluye SEO técnico?",
        a: "Sí, el SEO técnico básico (velocidad, estructura, etiquetas, adaptación móvil) va integrado en el propio diseño desde el primer día.",
      },
    ],
    ctaLine: "Cuéntanos qué debería conseguir tu web y cuánto te cuesta hoy no tenerla",
    gradient: "from-sky-500 via-blue-600 to-indigo-800",
    accent: "#38bdf8",
  },
];
