export const hero = {
  eyebrow: "Asesoría de procesos y automatización",
  headline: { normal: "Del caos de Excel y WhatsApp", emphasis: "a un sistema que funciona solo" },
  sub: "Detectamos las tareas que te roban horas cada semana y las automatizamos sobre las herramientas que ya usas. Empezamos por un proceso, medimos el tiempo que recuperas y seguimos desde ahí.",
  primaryCta: { label: "Reservar mi sesión gratuita", href: "#sesion-gratuita" },
  secondaryCta: { label: "Ver cómo trabajamos", href: "#como-trabajamos" },
  microcopy: ["30 minutos", "Sin compromiso", "Sales con un proceso por el que empezar"],
  proof: { stat: "+14 h/semana", text: "Lo probamos primero en casa, en STEP.", href: "#caso-step" },
};

export const painPoints = [
  "Facturas hechas a mano",
  "Clientes perdidos en WhatsApp",
  "17 pestañas abiertas",
  "Copiar y pegar entre Excels",
  "Informes de domingo por la noche",
  "Todo pasa por ti",
  "Presupuestos que tardan días",
  "Datos que nadie encuentra",
];

// STEP ERP case — results as reported by Pablo (STEP, 2026-09-25).
// `pending: true` would mark a placeholder — never publish with a pending figure.
export const stepCase = {
  title: "Antes de venderlo, lo resolvimos en casa.",
  problem:
    "STEP es una empresa de eventos. Cada empleado llevaba su propio Excel y solo él lo entendía: al juntarlos no cuadraban, y si alguien faltaba, faltaban sus datos. Las oportunidades se perdían entre WhatsApps y correos, y todo el seguimiento se hacía a mano.",
  solution:
    "Nos sentamos dentro para ver cómo trabajaban de verdad. Con eso construimos un sistema que lo centraliza todo en un solo sitio, y enseñamos al equipo a usarlo.",
  metrics: [
    { value: 14, prefix: "+", suffix: " h", label: "a la semana que el equipo ya no pierde en tareas a mano", pending: false },
    { value: 10000, prefix: "+", suffix: " €", label: "ganados al dejar de perder clientes por falta de seguimiento", pending: false },
    { value: 24, prefix: "+", suffix: " %", label: "más clientes cerrados", pending: false },
  ],
};

export const steps = [
  {
    title: "Auditoría de procesos",
    text: "Nos sentamos contigo y mapeamos cómo se trabaja hoy: qué se repite, qué se pierde y cuánto tiempo cuesta.",
  },
  {
    title: "Diseño del flujo",
    text: "Elegimos el proceso con más impacto y diseñamos cómo debería funcionar, conectando las herramientas que ya usas.",
  },
  {
    title: "Implementación y ajuste",
    text: "Lo ponemos en marcha, medimos las horas recuperadas y lo afinamos contigo hasta que funciona solo.",
  },
];

export const automations = [
  {
    title: "Facturas y presupuestos",
    text: "Se generan y se envían solos a partir de los datos que ya tienes. Sin copiar y pegar.",
    before: "Cada factura, hecha a mano",
    after: "Se envía sola al cerrar el pedido",
  },
  {
    title: "Clientes y oportunidades",
    text: "Cada contacto que entra por la web, el email o WhatsApp llega directo a tu CRM, con su seguimiento automático.",
    before: "Leads perdidos en el móvil",
    after: "Todos en el CRM, con aviso de seguimiento",
  },
  {
    title: "Informes y datos",
    text: "Tus números del mes en un panel que se actualiza solo, en vez de un Excel de domingo por la noche.",
    before: "Un Excel de domingo por la noche",
    after: "Panel actualizado cada mañana",
  },
  {
    title: "Tareas internas",
    text: "Recordatorios, avisos al equipo, altas de clientes: todo lo que hoy depende de que alguien se acuerde.",
    before: "Depende de que alguien se acuerde",
    after: "Pasa solo, cada vez",
  },
];

export const freeSession = {
  eyebrow: "Sesión de asesoría gratuita",
  title: "30 minutos para encontrar las horas que estás perdiendo.",
  body: "Nos cuentas cómo trabajas hoy. Te decimos qué proceso automatizaríamos primero, cuánto tiempo te ahorraría y qué costaría. Si no tiene sentido para tu negocio, también te lo decimos.",
  bullets: [
    "Sales con un proceso concreto por el que empezar",
    "Una estimación de las horas que puedes recuperar",
    "Sin compromiso y sin presentación comercial",
  ],
  cta: { label: "Reservar mi sesión gratuita", href: "/contacto/" },
};

export const alsoHelp = {
  title: "También te ayudamos con…",
  sub: "Si además necesitas que te encuentren, lo cubrimos con el mismo cuidado.",
  slugs: ["web", "seo-geo", "social-media"] as const,
  // Short lines for the home deck — the full service descriptions don't fit a card.
  blurbs: {
    web: "Webs y tiendas online rápidas, pensadas para vender.",
    "seo-geo": "Que te encuentren en Google y te citen las IAs.",
    "social-media": "Redes y campañas que traen clientes, no solo likes.",
  } as Record<string, string>,
};

export const homeFaq = [
  {
    q: "¿Qué pasa en la sesión de asesoría gratuita?",
    a: "Es una llamada de 30 minutos. Nos cuentas cómo trabajas, detectamos el proceso que más tiempo te roba y te decimos cómo lo automatizaríamos, cuánto te ahorraría y qué costaría. Sin presentación comercial.",
  },
  {
    q: "¿Tengo que cambiar las herramientas que ya uso?",
    a: "No. Automatizamos sobre lo que ya tienes: tus hojas de cálculo, tu email, tu programa de facturación. Las conectamos entre sí en vez de sustituirlas.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Tú nos cuentas cómo trabajas y nosotros nos encargamos de la parte técnica. Al terminar te enseñamos a usar lo que montamos, igual que hicimos con el equipo de STEP.",
  },
  {
    q: "¿Qué pasa con los datos de mi empresa?",
    a: "Siguen siendo tuyos y se quedan en tus herramientas. Trabajamos con los accesos mínimos que hacen falta para cada automatización y los retiramos cuando ya no se necesitan.",
  },
  {
    q: "¿Cuánto cuesta automatizar un proceso?",
    a: "Depende del proceso, por eso empezamos con un piloto acotado y de precio cerrado. En la sesión gratuita te damos una cifra concreta antes de que decidas nada.",
  },
  {
    q: "¿Se podrá pagar con el Bono de Inteligencia Artificial?",
    a: "El Bono de Inteligencia Artificial del Plan IA360 (600 millones para pymes y autónomos) abrirá su convocatoria general antes de que termine 2027. Financiará proyectos de IA con diagnóstico, caso de uso y medición del impacto, que es justo como trabajamos. Cuando se publiquen las bases te diremos qué parte de tu proyecto encaja; mientras, podemos dejarte el diagnóstico y el caso de uso preparados.",
  },
  {
    q: "¿Cuánto se tarda en tener algo funcionando?",
    a: "Un proceso piloto bien acotado suele estar funcionando en 2 a 4 semanas. A partir de ahí ampliamos al ritmo que tenga sentido para tu negocio.",
  },
  {
    q: "¿Trabajáis con autónomos y negocios pequeños?",
    a: "Sí. De hecho es donde más se nota: cuando todo pasa por una o dos personas, cada hora recuperada cuenta. Trabajamos en remoto con negocios de toda España.",
  },
];

export const homeMeta = {
  title: "Asesoría de procesos y automatización | Albariza Digital",
  ogTitle: "Albariza · Ponemos orden en cómo trabaja tu empresa",
  description:
    "Albariza Digital ordena cómo trabaja tu empresa y automatiza las tareas repetitivas con tus propias herramientas. Menos horas perdidas y más control.",
};
