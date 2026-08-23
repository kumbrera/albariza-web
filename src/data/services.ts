export interface Tagline {
  normal: string;
  emphasis: string;
}

export interface ProcessStep {
  title: string;
  text: string;
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
  {
    slug: "ia-automatizacion",
    name: "IA & Automatización",
    tagline: {
      normal: "Multiplica tu tiempo.",
      emphasis: "Escala tu negocio",
    },
    video: "/videos/ia-automatizacion.mp4",
    description:
      "Implementamos inteligencia artificial generativa, chatbots y automatización de procesos para que tu negocio funcione solo mientras tú creces.",
    longIntro:
      "No hablamos de IA como palabra de moda: hablamos de quitarte de encima el trabajo repetitivo de verdad. Facturas que se generan solas, leads que entran directos a tu CRM, informes que se escriben sin que nadie los toque. Empezamos siempre por el proceso que más tiempo te roba, y lo automatizamos sin tocar las herramientas que ya usas.",
    bullets: [
      "Implementación de IA generativa",
      "Chatbots y asistentes virtuales",
      "Automatización de procesos (RPA)",
      "Desarrollo no-code / low-code",
    ],
    process: [
      {
        title: "Auditoría de procesos",
        text: "Identificamos qué tareas repetitivas están consumiendo el tiempo de tu equipo cada semana.",
      },
      {
        title: "Diseño del flujo",
        text: "Mapeamos cómo debe funcionar la automatización, sobre los sistemas que ya usas hoy.",
      },
      {
        title: "Implementación y ajuste",
        text: "Lo ponemos en marcha, medimos el tiempo ahorrado y lo afinamos contigo.",
      },
    ],
    ctaLine: "Cuéntanos qué tareas repetitivas te quitan más tiempo",
    gradient: "from-violet-600 via-fuchsia-500 to-indigo-700",
    accent: "#a855f7",
  },
  {
    slug: "consultoria",
    name: "Consultoría",
    tagline: {
      normal: "La base estratégica",
      emphasis: "de tu éxito online",
    },
    video: "/videos/consultoria.mp4",
    description:
      "Te ayudamos a digitalizar procesos, integrar tu CRM y ERP, y a formar a tu equipo para que la tecnología trabaje a tu favor.",
    longIntro:
      "La mayoría de pymes no tienen un problema de ventas: tienen un problema de organización. Clientes que se pierden entre WhatsApp y Excel, decisiones que se toman a ojo porque nadie tiene los datos a mano. Ponemos orden primero, tecnología después — y siempre empezando por el proceso piloto que más impacto tiene, no por toda la empresa a la vez.",
    bullets: [
      "Digitalización de procesos",
      "CRM personalizado",
      "Sistemas ERP e integración",
      "Formación y coaching en marketing",
    ],
    process: [
      {
        title: "Diagnóstico inicial",
        text: "Analizamos cómo gestionáis hoy clientes, ventas y procesos internos, sin dar nada por hecho.",
      },
      {
        title: "Plan de digitalización",
        text: "Priorizamos qué digitalizar primero según impacto real y esfuerzo necesario.",
      },
      {
        title: "Acompañamiento",
        text: "Implementamos, formamos a tu equipo y medimos resultados a los 90 días.",
      },
    ],
    ctaLine: "Cuéntanos cómo gestionas hoy tus clientes y procesos",
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    accent: "#f59e0b",
  },
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
    ctaLine: "Cuéntanos qué debería conseguir tu web y cuánto te cuesta hoy no tenerla",
    gradient: "from-sky-500 via-blue-600 to-indigo-800",
    accent: "#38bdf8",
  },
];
