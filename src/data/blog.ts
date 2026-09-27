import { bonoIaPosts } from "./blog-bono-ia";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** ~150-160 chars, keyword-rich, used as <meta description> and card excerpt fallback */
  metaDescription: string;
  /** Short teaser shown on the /blog listing card */
  excerpt: string;
  /** Which service this article supports internally (drives the related-service link) */
  categorySlug: string;
  categoryLabel: string;
  keywords: string[];
  datePublished: string; // ISO date
  /** ISO date of the last substantive update, when it differs from datePublished. */
  dateModified?: string;
  /** Primary sources cited in the article, shown at the end and linked. */
  sources?: { label: string; url: string }[];
  intro: ContentBlock[];
  sections: BlogSection[];
  faq: FaqItem[];
}

export const blogPosts: BlogPost[] = [
  ...bonoIaPosts,
  {
    slug: "automatizacion-procesos-pymes-rpa",
    title:
      "Automatización de procesos en pymes: guía práctica del RPA para empezar sin programar",
    metaDescription:
      "Qué es el RPA, qué procesos puedes automatizar ya en tu pyme y qué herramientas no-code usar. Guía práctica para pymes y autónomos.",
    excerpt:
      "Qué es el RPA, qué procesos automatizar primero y con qué herramientas no-code empezar sin programar.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "automatización de procesos",
      "RPA para pymes",
      "qué es el RPA",
      "automatización sin programar",
      "no-code para empresas",
      "automatizar facturación",
      "Make.com vs Zapier",
      "automatización de procesos para pymes",
    ],
    datePublished: "2026-08-23",
    intro: [
      {
        type: "p",
        text: "¿Cuántas horas a la semana dedica tu equipo a copiar datos de un sitio a otro, enviar emails repetitivos o rellenar formularios? La automatización de procesos (RPA) elimina ese trabajo manual para que tu equipo se centre en lo que realmente importa.",
      },
    ],
    sections: [
      {
        heading: "¿Qué es el RPA y por qué a una pyme le conviene prestarle atención?",
        blocks: [
          {
            type: "p",
            text: "RPA (Robotic Process Automation) es tecnología que permite automatizar tareas digitales repetitivas sin necesidad de programación compleja. Un “robot” software replica lo que haría un humano: abrir aplicaciones, copiar datos, enviar emails, generar informes. La diferencia clave es que lo hace 24/7, sin errores y a coste mínimo.",
          },
          {
            type: "ul",
            items: [
              "El empleado medio dedica el 40% de su tiempo a tareas repetitivas automatizables",
              "El RPA reduce errores manuales en un 80% de media en los procesos automatizados",
              "El retorno de inversión medio de un proyecto RPA en pymes es de 6-12 meses",
              "No requiere cambiar los sistemas actuales — el robot trabaja sobre lo que ya tienes",
            ],
          },
        ],
      },
      {
        heading: "Procesos que puedes automatizar en tu empresa desde ya",
        blocks: [
          {
            type: "p",
            text: "Estos son los procesos que más tiempo suelen robar en una pyme, y los primeros que conviene automatizar:",
          },
          {
            type: "ul",
            items: [
              "Facturación: generar y enviar facturas automáticamente al cerrar una venta en el CRM",
              "Captación de leads: cuando alguien rellena un formulario web, se crea automáticamente en el CRM y se envía un email de bienvenida",
              "Informes: recopilación automática de datos de ventas, tráfico web y RRSS en un informe semanal",
              "Gestión de stock: alerta automática cuando un producto baja de cierto stock mínimo",
              "Onboarding de clientes: secuencia de emails automática cuando un nuevo cliente firma contrato",
            ],
          },
        ],
      },
      {
        heading: "Herramientas de automatización para pymes: sin programar",
        blocks: [
          {
            type: "p",
            text: "No necesitas un programador para automatizar procesos en tu empresa. Estas herramientas no-code lo hacen posible:",
          },
          {
            type: "ul",
            items: [
              "Make.com (antes Integromat): la más potente para empresas. Conecta más de 1.500 apps. Desde 9€/mes",
              "Zapier: la más conocida y fácil de usar. Ideal para automatizaciones sencillas. Desde 0€",
              "n8n: código abierto y autoalojable. Más técnica pero coste muy bajo a largo plazo",
              "Microsoft Power Automate: si ya usáis Microsoft 365, está incluido en vuestra suscripción",
            ],
          },
        ],
      },
      {
        heading: "Cómo empezar: identifica tu primera automatización",
        blocks: [
          {
            type: "p",
            text: "El error más común es querer automatizarlo todo de golpe. El enfoque correcto es identificar el proceso más doloroso y empezar por él. Te proponemos este ejercicio:",
          },
          {
            type: "ul",
            items: [
              "Apunta durante una semana todo lo que haces de forma repetitiva",
              "Identifica cuál de esas tareas te quita más tiempo o genera más errores",
              "Comprueba si existe una herramienta que conecte los sistemas implicados (Make.com tiene integraciones para casi todo)",
              "Prueba con un presupuesto pequeño — muchas automatizaciones se pueden implementar por menos de 500€",
              "Mide el tiempo ahorrado y escala desde ahí",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué es el RPA en palabras sencillas?",
        a: "Es un “robot” de software que repite en tu ordenador las mismas acciones que haría una persona (copiar datos, enviar emails, generar informes), pero de forma automática, sin errores y sin descanso.",
      },
      {
        q: "¿Cuánto cuesta automatizar procesos en una pyme?",
        a: "Muchas automatizaciones se pueden implementar por menos de 500€ iniciales, con herramientas no-code desde 0-9€/mes de suscripción. El retorno de inversión medio ronda los 6-12 meses.",
      },
      {
        q: "¿Necesito programadores para automatizar mi empresa?",
        a: "No. Herramientas como Make.com, Zapier o Power Automate permiten crear automatizaciones sin escribir código, conectando las aplicaciones que ya usas.",
      },
    ],
  },
  {
    slug: "posicionamiento-seo-local-pymes",
    title:
      "Posicionamiento SEO local para pymes: cómo aparecer primero en Google (y en las respuestas de la IA)",
    metaDescription:
      "Guía de SEO local y GEO para pymes: los 5 factores que más influyen en tu posicionamiento en Google y cómo aparecer en las respuestas de ChatGPT o Google AI Overviews.",
    excerpt:
      "Los factores que más influyen en tu posicionamiento local y cómo optimizar tu contenido para que también te recomiende la IA.",
    categorySlug: "seo-geo",
    categoryLabel: "Posicionamiento SEO / GEO",
    keywords: [
      "posicionamiento SEO local",
      "SEO para pymes",
      "SEO local Cádiz",
      "GEO generative engine optimization",
      "aparecer en Google Maps",
      "Google Business Profile",
      "SEO para negocios locales",
      "optimización para IA generativa",
    ],
    datePublished: "2026-08-23",
    intro: [
      {
        type: "p",
        text: "Tu competencia con peores productos o servicios te está ganando clientes solo por una razón: aparece antes que tú cuando alguien busca en Google. El posicionamiento SEO local ya no va de trucos técnicos — va de ser la respuesta más clara y confiable, tanto para Google como para las nuevas IAs que la gente usa para buscar.",
      },
    ],
    sections: [
      {
        heading: "SEO local vs. SEO nacional: por qué tu pyme necesita una estrategia distinta",
        blocks: [
          {
            type: "p",
            text: "Si tu negocio atiende a clientes de una zona concreta (Cádiz, Jerez, Chiclana, Sevilla, El Puerto, Málaga...), competir por keywords nacionales genéricas es tirar el presupuesto. El SEO local prioriza señales distintas: dónde estás, qué dicen de ti y si Google confía en que existes de verdad.",
          },
          {
            type: "ul",
            items: [
              "Cerca de la mitad de las búsquedas en Google tienen intención local (\"cerca de mí\", \"en [ciudad]\")",
              "La mayoría de esas búsquedas terminan en una visita, llamada o compra en menos de 24 horas",
              "Un perfil de Google Business Profile completo aparece con mucha más frecuencia en el mapa y en el pack local",
              "Las reseñas influyen tanto en el ranking local como en la decisión final del cliente",
            ],
          },
        ],
      },
      {
        heading: "Los 5 factores que más influyen en tu posicionamiento local",
        blocks: [
          {
            type: "ul",
            items: [
              "Google Business Profile optimizado: categoría correcta, horarios, fotos reales y publicaciones activas",
              "Reseñas y valoraciones: cantidad, calidad y, sobre todo, si respondes a todas ellas",
              "Consistencia NAP: el mismo nombre, dirección y teléfono en tu web, Google y directorios",
              "Contenido local: páginas o artículos que mencionen tu ciudad, tu zona y los problemas reales de tus clientes",
              "Enlaces locales: menciones desde medios, asociaciones o directorios de tu provincia",
            ],
          },
        ],
      },
      {
        heading: "Qué es el GEO y por qué ya no basta con el SEO tradicional",
        blocks: [
          {
            type: "p",
            text: "GEO (Generative Engine Optimization) es optimizar tu contenido para que asistentes como ChatGPT, Google AI Overviews o Perplexity te citen o te recomienden directamente en su respuesta, sin que el usuario ni siquiera llegue a hacer clic en un resultado. Las reglas se parecen al SEO clásico, pero exigen más claridad:",
          },
          {
            type: "ul",
            items: [
              "Contenido estructurado en preguntas y respuestas directas (como esta misma sección)",
              "Datos y cifras concretas y verificables, no adjetivos vacíos",
              "Marcado de datos estructurados (schema) que la IA pueda leer sin ambigüedad",
              "Autoridad temática: cubrir un tema en profundidad, no una sola página suelta",
              "Menciones de marca consistentes en toda la web y en fuentes externas",
            ],
          },
        ],
      },
      {
        heading: "Cómo empezar a mejorar tu posicionamiento local esta semana",
        blocks: [
          {
            type: "ul",
            items: [
              "Reclama y completa al 100% tu ficha de Google Business Profile",
              "Pide activamente reseñas a tus últimos clientes satisfechos",
              "Crea una página o artículo por cada ciudad o servicio principal que ofrezcas",
              "Añade una sección de preguntas frecuentes con las dudas reales de tus clientes",
              "Revisa la velocidad de carga de tu web — es un factor de ranking directo",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre SEO local y GEO?",
        a: "El SEO local busca posicionarte en los resultados de búsqueda tradicionales de Google para tu zona. El GEO busca que las IAs generativas (ChatGPT, Google AI Overviews) te citen directamente como respuesta. Comparten base pero el GEO exige contenido aún más claro, estructurado y verificable.",
      },
      {
        q: "¿Cuánto se tarda en ver resultados de SEO local?",
        a: "Las mejoras en tu ficha de Google Business Profile pueden notarse en semanas. El posicionamiento orgánico por contenido suele tardar de 3 a 6 meses en consolidarse, dependiendo de la competencia de tu sector y zona.",
      },
      {
        q: "¿Necesito una página distinta por cada ciudad donde trabajo?",
        a: "Si atiendes a varias localidades de forma activa, sí: una página específica por ciudad (con contenido real, no duplicado) suele rendir mejor que una única página genérica para toda la provincia.",
      },
    ],
  },
  {
    slug: "redes-sociales-empresas-estrategia-contenidos",
    title:
      "Redes sociales para empresas: la estrategia de contenidos que convierte seguidores en clientes",
    metaDescription:
      "Cómo diseñar una estrategia de redes sociales para empresas que venda de verdad: qué canal elegir, cuánto publicar y cuándo invertir en publicidad en Meta o TikTok.",
    excerpt:
      "Qué canal elegir según tu negocio, cuánto publicar de verdad y cuándo merece la pena invertir en publicidad.",
    categorySlug: "social-media",
    categoryLabel: "Social Media",
    keywords: [
      "redes sociales para empresas",
      "gestión de redes sociales",
      "estrategia de contenidos",
      "social commerce",
      "publicidad en Meta",
      "publicidad en TikTok",
      "redes sociales que venden",
      "marketing de contenidos pymes",
    ],
    datePublished: "2026-08-23",
    intro: [
      {
        type: "p",
        text: "Tener Instagram no es tener una estrategia. Muchas pymes publican sin rumbo, ven pocos likes, y concluyen que “las redes no funcionan” para su negocio. El problema casi nunca es el canal: es la falta de un sistema detrás de lo que publicas.",
      },
    ],
    sections: [
      {
        heading: "Por qué tener redes sociales no es lo mismo que tener una estrategia",
        blocks: [
          {
            type: "p",
            text: "Publicar sin objetivo es la forma más rápida de quemar tiempo y presupuesto sin resultados. Los errores más comunes que vemos en empresas de nuestra zona:",
          },
          {
            type: "ul",
            items: [
              "Publicar solo ofertas y productos, sin contenido que aporte valor antes de vender",
              "No tener claro qué acción quieres que haga quien te ve (comprar, escribir, visitar la tienda)",
              "Cambiar de línea visual y de tono cada pocas semanas, sin construir una identidad reconocible",
              "Medir solo likes y seguidores, en vez de mensajes recibidos o ventas generadas",
            ],
          },
        ],
      },
      {
        heading: "Qué canal elegir según tu tipo de negocio",
        blocks: [
          {
            type: "ul",
            items: [
              "Instagram y TikTok: negocios visuales de consumo — hostelería, moda, belleza, retail",
              "LinkedIn: negocios B2B, servicios profesionales y captación de talento",
              "Facebook: comunidad local, negocios de barrio y públicos de mayor edad",
              "YouTube: contenido educativo o demostrativo con vida útil larga",
            ],
          },
        ],
      },
      {
        heading: "El sistema de contenidos que recomendamos: publicar menos, pero mejor",
        blocks: [
          {
            type: "p",
            text: "En vez de improvisar cada día, trabajamos con cuatro tipos de contenido que se repiten en bucle:",
          },
          {
            type: "ul",
            items: [
              "Educa: resuelve una duda real de tu cliente ideal",
              "Muestra: proceso, equipo o producto — genera confianza",
              "Vende: oferta clara con una única llamada a la acción",
              "Conecta: opinión, detrás de cámaras o interacción directa con la comunidad",
            ],
          },
        ],
      },
      {
        heading: "Cuándo tiene sentido invertir en publicidad en Meta o TikTok",
        blocks: [
          {
            type: "p",
            text: "La publicidad amplifica lo que ya funciona; no arregla un contenido que no conecta. Antes de invertir en anuncios, comprueba que tienes:",
          },
          {
            type: "ul",
            items: [
              "Al menos una oferta o producto con demanda ya probada de forma orgánica",
              "Una página de destino o WhatsApp de negocio listo para recibir consultas",
              "Un presupuesto mínimo constante en vez de picos puntuales",
              "Objetivos concretos: mensajes, ventas o visitas — no “más seguidores”",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuántas veces a la semana debería publicar mi empresa?",
        a: "Mejor 3 publicaciones semanales sostenibles y con estrategia que 7 improvisadas. La constancia y la calidad pesan más que la frecuencia.",
      },
      {
        q: "¿Qué red social es mejor para mi negocio?",
        a: "Depende de tu cliente ideal: Instagram/TikTok para consumo visual, LinkedIn para B2B, Facebook para comunidad local. No hace falta estar en todas — es mejor dominar una o dos.",
      },
      {
        q: "¿Cuándo debo empezar a pagar publicidad en redes?",
        a: "Cuando ya tengas contenido orgánico que demuestre interés real (mensajes, guardados, preguntas) y una forma clara de recibir y gestionar esas consultas.",
      },
    ],
  },
  {
    slug: "consultoria-digital-crm-pymes",
    title:
      "Consultoría digital para pymes: cómo elegir un CRM y digitalizar tu empresa sin fracasar en el intento",
    metaDescription:
      "Qué es un CRM, cuándo tu pyme lo necesita de verdad y cómo evitar los errores más comunes al digitalizar procesos, integrar sistemas y formar a tu equipo.",
    excerpt:
      "Cuándo tu empresa necesita un CRM, cómo elegirlo bien y los errores que hacen fracasar la digitalización.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "consultoría digital para pymes",
      "qué es un CRM",
      "CRM para pequeñas empresas",
      "digitalizar mi empresa",
      "ERP para pymes",
      "errores digitalización pyme",
      "software de gestión empresarial",
      "transformación digital pymes",
    ],
    datePublished: "2026-08-23",
    intro: [
      {
        type: "p",
        text: "Un cliente pregunta por WhatsApp, otro por email y un tercero en persona. Tres semanas después nadie recuerda quién dijo qué, ni si alguien llamó de vuelta. Si esto te suena, tu empresa no tiene un problema de ventas: tiene un problema de organización que la tecnología ya resolvió hace años.",
      },
    ],
    sections: [
      {
        heading: "¿Qué es un CRM y cuándo tu empresa realmente lo necesita?",
        blocks: [
          {
            type: "p",
            text: "Un CRM (Customer Relationship Management) es el sistema donde vive toda la información de tus clientes y oportunidades de venta: quién preguntó, qué le ofreciste, en qué punto está y quién debe hacer el siguiente paso. Si esa información vive solo en la cabeza de tu equipo o repartida entre WhatsApp, email y Excel, estas son las señales de que ya lo necesitas:",
          },
          {
            type: "ul",
            items: [
              "Se te olvidan leads o clientes porque quedaron en un chat perdido",
              "No sabes cuántas oportunidades de venta tienes abiertas ahora mismo",
              "Si un empleado se va, se va también el conocimiento de sus clientes",
              "No puedes sacar un informe de ventas sin pedírselo a alguien y esperar",
            ],
          },
        ],
      },
      {
        heading: "Los 5 errores más comunes al digitalizar una pyme",
        blocks: [
          {
            type: "ul",
            items: [
              "Comprar software antes de tener claro el proceso que se quiere resolver",
              "Querer digitalizarlo todo de golpe, en vez de empezar por un proceso piloto",
              "No dedicar tiempo a formar al equipo — la mejor herramienta falla si nadie la usa bien",
              "Elegir herramientas que no se integran entre sí y acaban generando más trabajo manual",
              "No medir el antes y el después, así que nunca se sabe si de verdad ha mejorado algo",
            ],
          },
        ],
      },
      {
        heading: "CRM, ERP e integración: qué necesita realmente tu negocio",
        blocks: [
          {
            type: "p",
            text: "Un CRM gestiona la relación comercial con tus clientes: leads, oportunidades, seguimiento. Un ERP gestiona la operativa interna: facturación, stock, contabilidad, producción. Muchas pymes solo necesitan uno de los dos para empezar — el error habitual es intentar implementar ambos a la vez sin que se hablen entre sí.",
          },
          {
            type: "ul",
            items: [
              "Si tu cuello de botella está en ventas y seguimiento de clientes, empieza por el CRM",
              "Si tu cuello de botella está en facturación, stock o procesos internos, empieza por el ERP",
              "Si ya tienes ambos y no se comunican entre sí, la integración (vía automatización) suele dar más retorno que cambiar de software",
            ],
          },
        ],
      },
      {
        heading: "Cómo abordar la digitalización paso a paso",
        blocks: [
          {
            type: "ul",
            items: [
              "Audita cómo funciona hoy el proceso que quieres mejorar, sin dar nada por hecho",
              "Elige un proceso piloto — no toda la empresa a la vez",
              "Selecciona herramientas que se integren entre sí (o automatiza el puente entre ellas)",
              "Forma a tu equipo con sesiones cortas y prácticas, no un manual de 50 páginas",
              "Mide resultados a los 90 días antes de decidir si escalar a otros procesos",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre un CRM y un ERP?",
        a: "El CRM gestiona la relación con tus clientes (ventas, seguimiento, oportunidades). El ERP gestiona la operativa interna (facturación, stock, contabilidad). Muchas pymes empiezan por uno solo, según dónde tengan el problema más urgente.",
      },
      {
        q: "¿Cuánto cuesta implementar un CRM en una pyme?",
        a: "Depende del tamaño del equipo y la complejidad del proceso, pero muchas soluciones para pymes empiezan desde planes gratuitos o de pocos euros al mes por usuario, más el tiempo de configuración e integración inicial.",
      },
      {
        q: "¿Cuánto tiempo lleva digitalizar una empresa pequeña?",
        a: "Un proceso piloto bien acotado (por ejemplo, digitalizar la gestión de leads) puede estar funcionando en 2-4 semanas. Digitalizar toda la operativa suele ser un proceso por fases de varios meses.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-pagina-web-pyme",
    title:
      "Cuánto cuesta una página web para tu negocio (y qué debe incluir para vender de verdad)",
    metaDescription:
      "Rangos de precio reales para una página web de pyme, qué debe incluir para convertir visitas en clientes y cuándo necesitas dar el salto al eCommerce.",
    excerpt:
      "Rangos de precio orientativos, qué debe incluir una web que convierte y cuándo necesitas una tienda online.",
    categorySlug: "web",
    categoryLabel: "Web",
    keywords: [
      "cuánto cuesta una página web",
      "precio página web pyme",
      "diseño web para empresas",
      "página web que vende",
      "crear tienda online",
      "eCommerce para pequeños negocios",
      "web rápida SEO técnico",
      "diseño web para pymes",
    ],
    datePublished: "2026-08-23",
    intro: [
      {
        type: "p",
        text: "Muchas empresas tienen página web y aun así reciben cero clientes por ella. El problema casi nunca es estética: es que la web se diseñó como una tarjeta de visita digital, no como una herramienta para vender.",
      },
    ],
    sections: [
      {
        heading: "Cuánto cuesta una página web en 2026: rangos orientativos",
        blocks: [
          {
            type: "p",
            text: "Los precios varían según alcance y complejidad, pero estos son los rangos habituales del mercado para una pyme:",
          },
          {
            type: "ul",
            items: [
              "Web corporativa sencilla (3-5 páginas): entre 600€ y 1.500€",
              "Web con blog y SEO técnico cuidado desde el diseño: entre 1.200€ y 3.000€",
              "Tienda online (eCommerce) con catálogo y pasarela de pago: desde 2.000€, según integraciones",
              "Mantenimiento, hosting y actualizaciones: entre 20€ y 60€ al mes",
            ],
          },
        ],
      },
      {
        heading: "Qué debe incluir una web para convertir visitas en clientes",
        blocks: [
          {
            type: "ul",
            items: [
              "Una llamada a la acción clara en cada página (llamar, escribir, comprar, reservar)",
              "Velocidad de carga cuidada — cada segundo de más reduce las conversiones",
              "Diseño adaptado de verdad a móvil, no solo \"que se vea bien\"",
              "Formulario de contacto simple, sin pedir más datos de los necesarios",
              "Testimonios, reseñas o casos reales que generen confianza",
              "SEO técnico integrado desde el diseño, no añadido después",
            ],
          },
        ],
      },
      {
        heading: "Página web informativa vs. tienda online: cuál necesitas",
        blocks: [
          {
            type: "p",
            text: "No toda empresa necesita una tienda online. Si vendes servicios o productos que se cierran por llamada, reunión o visita, una web informativa bien optimizada suele ser suficiente. El eCommerce tiene sentido cuando:",
          },
          {
            type: "ul",
            items: [
              "Vendes productos físicos que un cliente puede comprar sin hablar contigo antes",
              "Quieres vender fuera de tu zona geográfica habitual",
              "Tienes un catálogo lo bastante amplio para justificar un sistema de compra online",
              "Puedes gestionar el envío, la logística y las devoluciones de forma sostenible",
            ],
          },
        ],
      },
      {
        heading: "Errores que hacen que tu web no venda",
        blocks: [
          {
            type: "ul",
            items: [
              "Demasiado texto sin jerarquía visual clara",
              "Ninguna llamada a la acción visible sin hacer scroll",
              "Tiempos de carga por encima de 3 segundos",
              "Una versión móvil que es solo la de escritorio encogida",
              "Cero analítica instalada — sin datos, no sabes qué mejorar",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuánto tarda en hacerse una página web?",
        a: "Una web corporativa sencilla suele estar lista en 2-4 semanas. Un eCommerce completo, con catálogo e integraciones, puede llevar de 4 a 8 semanas según su complejidad.",
      },
      {
        q: "¿Necesito una tienda online o me vale con una web informativa?",
        a: "Si tus clientes suelen contactarte antes de comprar (servicios, presupuestos, productos a medida), una web informativa optimizada suele bastar. Si vendes producto físico que se compra sin hablar contigo, el eCommerce tiene más sentido.",
      },
      {
        q: "¿La web incluye SEO o hay que pagarlo aparte?",
        a: "El SEO técnico básico (velocidad, estructura, etiquetas, adaptación móvil) debería venir integrado en el propio diseño. El posicionamiento de contenido a largo plazo (artículos, enlaces, autoridad) suele ser un servicio continuo aparte.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/**
 * Content-calendar gate: posts dated in the future are kept in this file (ready to go)
 * but excluded from the built site until their `datePublished` arrives and the site is
 * rebuilt/redeployed. This is a static Astro site with no CMS, so "schedule a post" means
 * "give it a future date and rebuild later" rather than flipping a publish switch.
 */
export function isPublished(post: BlogPost, now: Date = new Date()) {
  // Compare as plain "YYYY-MM-DD" strings (which sort correctly lexicographically) instead
  // of Date objects: `new Date("2026-08-23")` parses as UTC midnight, which can sit *ahead*
  // of a same-day local "now" in timezones behind UTC — that mismatch was silently hiding
  // today's own posts.
  const todayLocal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
  return post.datePublished <= todayLocal;
}

export const publishedBlogPosts = blogPosts.filter((p) => isPublished(p));

const blockWords = (b: ContentBlock) => (b.type === "p" ? b.text : b.items.join(" ")).split(/\s+/).length;

/** Minutes at ~200 words per minute, counting intro, sections and FAQ. */
export function readingMinutes(post: BlogPost) {
  const words =
    post.intro.reduce((n, b) => n + blockWords(b), 0) +
    post.sections.reduce((n, s) => n + s.heading.split(/\s+/).length + s.blocks.reduce((m, b) => m + blockWords(b), 0), 0) +
    post.faq.reduce((n, f) => n + `${f.q} ${f.a}`.split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

/** URL-safe anchor for a section heading, used by the article's table of contents. */
export function headingId(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Booking-dialog topic for a post's category: the flagship session, or a secondary service. */
export function bookingTopicFor(post: BlogPost) {
  return ["web", "seo-geo", "social-media"].includes(post.categorySlug) ? post.categorySlug : "";
}
