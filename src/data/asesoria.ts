import { homeFaq } from "./home";

export { ASESORIA_PATH } from "./routes";

export const asesoriaMeta = {
  title: "Asesoría de procesos y automatización: qué incluye | Albariza Digital",
  description:
    "Ordenamos cómo trabaja tu empresa y automatizamos las tareas repetitivas con las herramientas que ya usas. Un proceso cada vez, medido en horas y en euros.",
};

export const asesoriaHero = {
  eyebrow: "Asesoría de procesos y automatización",
  title: "Ponemos orden en cómo trabaja tu empresa.",
  sub: "Entendemos cómo se hace hoy cada cosa y la llevamos a un sistema que os hace el día a día más fácil: menos tareas repetidas, menos cosas que se escapan y los datos a mano para decidir. Automatizamos lo que merece la pena, no todo.",
};

export const signals = [
  "Cada persona tiene su propio Excel y solo ella lo entiende.",
  "Los clientes se pierden entre WhatsApp, correo y llamadas.",
  "Nadie sabe cuántos presupuestos hay abiertos ahora mismo.",
  "Si alguien falta, lo suyo se para.",
  "Los informes se hacen a mano, y llegan tarde.",
  "Copias los mismos datos en tres sitios distintos.",
];

export const offer = [
  {
    icon: "audit",
    title: "Auditoría de procesos",
    text: "Vemos cómo se trabaja de verdad: quién hace qué, con qué herramienta y cuánto tiempo se va en cada cosa.",
  },
  {
    icon: "connect",
    title: "Automatizaciones entre tus herramientas",
    text: "Conectamos WhatsApp, correo, hojas de cálculo, calendario y CRM para que los datos pasen solos de un sitio a otro.",
  },
  {
    icon: "system",
    title: "CRM y ERP a vuestra medida",
    text: "Clientes, pedidos y facturación en un solo sitio, adaptado a cómo trabajáis y no al revés.",
  },
  {
    icon: "dashboard",
    title: "Paneles de datos",
    text: "Ventas, cierres y seguimiento en un panel que se actualiza solo, como el que montamos en STEP.",
  },
  {
    icon: "ai",
    title: "IA donde aporta",
    text: "Asistentes que responden, clasifican o resumen. Solo cuando de verdad os ahorran tiempo.",
  },
  {
    icon: "team",
    title: "Formación del equipo",
    text: "Enseñamos a usarlo y lo dejamos documentado, para que no dependa de nosotros ni de una sola persona.",
  },
] as const;

export const asesoriaSteps = [
  {
    title: "Sesión gratuita",
    text: "30 minutos para entender tu negocio y señalar el proceso que más tiempo os roba. Sales con una idea clara, contrates o no.",
  },
  {
    title: "Auditoría de procesos",
    text: "Nos sentamos con el equipo y mapeamos cómo se trabaja hoy: qué se repite, qué se pierde y cuánto cuesta.",
  },
  {
    title: "Diseño e implementación",
    text: "Diseñamos cómo debería funcionar ese proceso y lo montamos sobre las herramientas que ya usáis.",
  },
  {
    title: "Medición y ajuste",
    text: "Medimos horas y errores antes y después, lo afinamos con el equipo y, si funciona, pasamos al siguiente proceso.",
  },
];

export const fit = {
  yes: [
    "Tienes una pyme o eres autónomo y el día a día te come.",
    "Usáis Excel, WhatsApp y correo para casi todo.",
    "Quieres empezar por algo concreto y comprobar que funciona.",
  ],
  no: [
    "Buscas un programa cerrado sin revisar cómo trabajáis.",
    "Quieres digitalizar toda la empresa de golpe.",
    "Solo buscas la herramienta más barata, sin acompañamiento.",
  ],
};

const pick = (q: string) => homeFaq.find((f) => f.q === q)!;

export const asesoriaFaq = [
  {
    q: "¿Qué es una asesoría de procesos y automatización?",
    a: "Es un servicio para ordenar cómo trabaja tu empresa y quitar las tareas repetitivas. Primero entendemos tus procesos, después elegimos cuál mejorar y lo implementamos con las herramientas que ya usas, automatizando lo que merece la pena.",
  },
  pick("¿Tengo que cambiar las herramientas que ya uso?"),
  {
    q: "¿Qué diferencia hay entre un CRM y un ERP?",
    a: "El CRM gestiona la relación con tus clientes: ventas, seguimiento y oportunidades. El ERP gestiona la operativa interna: facturación, stock y contabilidad. Muchas pymes empiezan por uno solo, según dónde esté el problema más urgente.",
  },
  pick("¿Necesito saber de tecnología?"),
  pick("¿Qué pasa con los datos de mi empresa?"),
  pick("¿Cuánto cuesta automatizar un proceso?"),
  pick("¿Cuánto se tarda en tener algo funcionando?"),
];
