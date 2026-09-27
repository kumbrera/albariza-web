import type { BlogPost } from "./blog";

// Bono de Inteligencia Artificial (Plan IA360, announced 21 Sep 2026). The programme's rules
// ("bases") are not published yet: every figure here is from the official announcement and its
// press coverage, and the articles say so. Update `dateModified` and the text when the bases,
// the pilot or the call come out.

const sources = {
  moncloa: {
    label: "La Moncloa: Pedro Sánchez anuncia el Plan IA360 (21/09/2026)",
    url: "https://www.lamoncloa.gob.es/presidente/actividades/paginas/2026/210926-sanchez-plan-ia.aspx",
  },
  planPdf: {
    label: "Plan IA360, documento oficial (La Moncloa, PDF)",
    url: "https://www.lamoncloa.gob.es/presidente/actividades/Documents/2026/20260920%20Plan%20IA360.pdf",
  },
  conecta: {
    label: "Conecta Industria: el Gobierno prepara 600 millones para llevar la IA a 25.000 empresas",
    url: "https://www.conectaindustria.es/innovacion/gobierno-prepara-600-millones-llevar-inteligencia-artificial-25000-empresas/20260921151846015394.html",
  },
  muycanal: {
    label: "MuyCanal: Plan IA360, a por la oportunidad para adoptar la IA",
    url: "https://www.muycanal.com/2026/09/22/plan-ia360-ia-oportunidad",
  },
  kitConsulting: {
    label: "Red.es: Kit Consulting",
    url: "https://www.red.es/es/iniciativas/proyectos/kit-consulting",
  },
};

export const bonoIaPosts: BlogPost[] = [
  {
    slug: "bono-inteligencia-artificial-pymes-autonomos-plan-ia360",
    title: "Bono de Inteligencia Artificial para pymes y autónomos (Plan IA360): qué se sabe, requisitos y cómo prepararte",
    metaDescription:
      "Bono IA de 600 millones para pymes y autónomos: qué financiará, qué no, calendario 2027, requisitos conocidos y cómo preparar tu empresa antes de la convocatoria.",
    excerpt:
      "600 millones para que pymes y autónomos incorporen IA antes de que acabe 2027. Qué pagará, qué no, cuándo se podrá pedir y qué conviene tener listo desde ya.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Bono IA y ayudas",
    keywords: [
      "bono inteligencia artificial",
      "bono IA pymes",
      "Plan IA360",
      "ayudas inteligencia artificial pymes 2027",
      "subvención IA autónomos",
      "Red Neurona",
    ],
    datePublished: "2026-09-27",
    intro: [
      {
        type: "p",
        text: "El Bono de Inteligencia Artificial es una ayuda de 600 millones de euros anunciada por el Gobierno de España dentro del Plan IA360 (21 de septiembre de 2026) para que pymes y autónomos incorporen inteligencia artificial a su negocio. Pagará servicios de IA prestados por empresas tecnológicas europeas (desarrollo, integración, tratamiento de datos o rediseño de procesos), no licencias ni suscripciones sueltas. Está previsto un piloto en el primer semestre de 2027 y la convocatoria general antes de que termine 2027.",
      },
      {
        type: "p",
        text: "Las bases todavía no están publicadas, así que hay cosas que aún no se saben (por ejemplo, cuánto recibirá cada empresa). En este artículo separamos lo que está anunciado de lo que falta por concretar, y te contamos qué puedes preparar ya para llegar a la convocatoria con el trabajo hecho. Lo actualizaremos en cuanto haya novedades oficiales.",
      },
    ],
    sections: [
      {
        heading: "Qué es el Bono de Inteligencia Artificial",
        blocks: [
          {
            type: "p",
            text: "Es la medida estrella para empresas del Plan IA360, la hoja de ruta del Gobierno para desplegar la inteligencia artificial en España durante los próximos meses. Su objetivo declarado es que en 2030 más de la mitad de las empresas españolas hayan integrado la IA en su actividad. Según los datos que acompañaron al anuncio, hoy la usa en torno al 21 % de las empresas.",
          },
          {
            type: "p",
            text: "No es un cheque para comprar herramientas: está pensado para pagar el trabajo de implantar la IA en un proceso concreto de tu empresa y comprobar que mejora la productividad.",
          },
        ],
      },
      {
        heading: "Cuánto dinero hay y a cuántas empresas llegará",
        blocks: [
          {
            type: "ul",
            items: [
              "Presupuesto total anunciado: 600 millones de euros.",
              "Beneficiarios: pymes y autónomos.",
              "Objetivo: transformar en torno a 25.000 empresas.",
              "Importe por empresa: todavía no publicado. Lo fijarán las bases de la convocatoria.",
            ],
          },
          {
            type: "p",
            text: "Si divides 600 millones entre 25.000 empresas sale una media de unos 24.000 euros, pero es solo una cuenta orientativa: nada impide que haya tramos según el tamaño de la empresa, como ocurrió con el Kit Digital. Desconfía de quien hoy te prometa una cifra cerrada.",
          },
        ],
      },
      {
        heading: "Qué pagará el bono y qué no",
        blocks: [
          {
            type: "p",
            text: "Según lo anunciado, el bono financiará soluciones y servicios basados en IA prestados por empresas tecnológicas europeas que aporten alguna de estas cosas:",
          },
          {
            type: "ul",
            items: [
              "Desarrollo de soluciones de IA adaptadas a la empresa.",
              "Integración con las herramientas y sistemas que ya usa.",
              "Conocimiento del sector.",
              "Tratamiento de datos.",
              "Rediseño de procesos productivos.",
            ],
          },
          {
            type: "p",
            text: "Lo que no contará: las meras licencias o suscripciones de herramientas. Pagar un año de un chatbot o de un asistente genérico, sin más, no encaja. Lo que encaja es un proyecto: coger un proceso real (el seguimiento de clientes, la facturación, la atención por WhatsApp), rediseñarlo e implantar la IA donde de verdad ahorra tiempo.",
          },
        ],
      },
      {
        heading: "Qué te van a pedir",
        blocks: [
          {
            type: "p",
            text: "Por lo que se ha publicado sobre el diseño del programa, la ayuda irá ligada a tres cosas:",
          },
          {
            type: "ul",
            items: [
              "Un diagnóstico de madurez digital de la empresa: cómo trabajáis hoy, con qué herramientas y datos.",
              "Un caso de uso concreto: qué proceso vas a mejorar con IA y por qué ese.",
              "Medir el impacto en productividad: el antes y el después, en horas, errores o ventas.",
            ],
          },
          {
            type: "p",
            text: "Es exactamente la forma de trabajar que recomendamos con o sin ayuda: primero ordenar el proceso, después automatizar lo que merece la pena y medirlo. Si hoy no sabes cuánto tiempo te cuesta una tarea, no podrás demostrar que la IA lo ha reducido.",
          },
        ],
      },
      {
        heading: "Calendario: cuándo se podrá solicitar",
        blocks: [
          {
            type: "ul",
            items: [
              "21 de septiembre de 2026: presentación del Plan IA360 y del bono.",
              "Antes de que acabe 2026: arranque de la Red Neurona con un piloto de unas 100 pymes en dos comunidades autónomas.",
              "Primer semestre de 2027: fase piloto del bono.",
              "Durante 2027: la Red Neurona se amplía a diez comunidades y unas 5.000 empresas.",
              "Antes de que termine 2027: convocatoria general del bono.",
            ],
          },
          {
            type: "p",
            text: "Hoy no hay ninguna convocatoria abierta. Si alguien te pide dinero o datos para \"reservar\" el bono, no existe tal cosa: la solicitud se hará por los canales oficiales cuando se publiquen las bases.",
          },
        ],
      },
      {
        heading: "Qué es la Red Neurona y cómo encaja",
        blocks: [
          {
            type: "p",
            text: "La Red Neurona es una red público-privada de centros de demostración y despliegue de IA repartidos por el territorio. La idea es que una empresa pueda ver una solución de su sector, probarla con sus propios datos y avanzar hacia su implantación. Acompañará al bono: es el lugar donde muchas pymes harán su primer contacto con la IA antes de pedir la ayuda.",
          },
        ],
      },
      {
        heading: "Cómo prepararte desde hoy",
        blocks: [
          {
            type: "p",
            text: "La convocatoria llegará en 2027, pero lo que te van a pedir se puede tener listo ahora. Las empresas que lleguen con el diagnóstico y el caso de uso hechos serán las que antes y mejor aprovechen la ayuda.",
          },
          {
            type: "ul",
            items: [
              "Haz inventario de las tareas repetitivas: quién las hace, cuántas veces por semana y cuánto tiempo llevan.",
              "Apunta dónde viven tus datos: Excel, correo, WhatsApp, programa de facturación, CRM.",
              "Elige un solo proceso para empezar: el que más horas roba o más errores provoca.",
              "Mide hoy ese proceso, para poder demostrar mañana la mejora.",
              "Busca un proveedor que trabaje el proceso completo, no que solo te venda una licencia.",
            ],
          },
          {
            type: "p",
            text: "Lo explicamos paso a paso en nuestra guía para preparar el diagnóstico de madurez digital y el caso de uso.",
          },
        ],
      },
      {
        heading: "Cómo lo trabajamos en Albariza",
        blocks: [
          {
            type: "p",
            text: "Antes de ayudar a otras empresas lo hicimos en la nuestra. En STEP, una empresa de eventos, cada persona tenía su propio Excel y el seguimiento de clientes se hacía a mano por WhatsApp. Hicimos el diagnóstico, elegimos un proceso, lo centralizamos y medimos: el equipo recuperó unas 14 horas a la semana y el cierre de ventas subió un 24 %.",
          },
          {
            type: "p",
            text: "Ese es el mismo camino que pide el bono: diagnóstico, caso de uso y medición. Si quieres llegar a 2027 con tu proyecto preparado, en la sesión gratuita de 30 minutos te decimos qué proceso elegiríamos primero y cuánto tiempo te ahorraría. Cuando se publiquen las bases, te diremos con claridad qué parte encaja en la ayuda.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuándo se puede pedir el Bono de Inteligencia Artificial?",
        a: "Todavía no. Está prevista una fase piloto en el primer semestre de 2027 y la convocatoria general antes de que termine 2027. Hasta que se publiquen las bases no hay ninguna solicitud abierta.",
      },
      {
        q: "¿Cuánto dinero dará el bono a cada empresa?",
        a: "No está publicado. Se conoce el presupuesto total (600 millones de euros) y el objetivo de llegar a unas 25.000 empresas; el importe por empresa lo fijarán las bases de la convocatoria.",
      },
      {
        q: "¿Pueden pedirlo los autónomos?",
        a: "Sí, según lo anunciado el bono está dirigido a pymes y autónomos. Los requisitos concretos (tamaño, antigüedad, sector) se conocerán con las bases.",
      },
      {
        q: "¿Puedo pagar ChatGPT u otra suscripción con el bono?",
        a: "No, según lo anunciado. El bono no computa meras licencias o suscripciones de herramientas: financia servicios y soluciones de IA de empresas tecnológicas europeas, como desarrollo, integración, tratamiento de datos o rediseño de procesos.",
      },
      {
        q: "¿Es compatible con el Kit Digital o el Kit Consulting?",
        a: "Se sabrá cuando se publiquen las bases. El Kit Consulting tuvo una única convocatoria que ya cerró en 2025 y no hay fecha para una nueva, así que hoy no es una vía disponible.",
      },
      {
        q: "¿Qué es la Red Neurona?",
        a: "Una red público-privada de centros de demostración y despliegue de IA para empresas, donde una pyme podrá ver soluciones de su sector y probarlas con sus datos. Empieza con un piloto de unas 100 pymes en dos comunidades autónomas y se ampliará en 2027.",
      },
      {
        q: "¿Qué puedo hacer ahora para prepararme?",
        a: "Tener listo lo que previsiblemente pedirán: un diagnóstico de cómo trabajas hoy, un caso de uso concreto y una medición del proceso antes de cambiarlo. Con eso podrás solicitar la ayuda en cuanto se abra.",
      },
    ],
    sources: [sources.moncloa, sources.planPdf, sources.conecta, sources.muycanal, sources.kitConsulting],
  },
  {
    slug: "que-puedo-pagar-bono-ia-ejemplos-proyectos-pymes",
    title: "¿Qué puedo pagar con el Bono de IA? 8 proyectos de inteligencia artificial y automatización que encajan en una pyme",
    metaDescription:
      "Ejemplos reales de proyectos de IA y automatización para pymes y autónomos que encajan con lo anunciado del Bono de Inteligencia Artificial, y qué no se podrá pagar.",
    excerpt:
      "Del asistente que atiende WhatsApp al panel que se actualiza solo: ocho proyectos que encajan con el Bono IA y cómo elegir el tuyo.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Bono IA y ayudas",
    keywords: [
      "qué se puede pagar con el bono IA",
      "proyectos inteligencia artificial pymes",
      "ejemplos IA pequeñas empresas",
      "automatización con IA pymes",
      "bono inteligencia artificial gastos subvencionables",
    ],
    datePublished: "2026-09-27",
    intro: [
      {
        type: "p",
        text: "Con el Bono de Inteligencia Artificial podrás pagar, según lo anunciado, servicios de IA que se implantan en un proceso real de tu empresa: desarrollo, integración con tus herramientas, tratamiento de datos y rediseño de procesos. No podrás pagar licencias o suscripciones sueltas. Dicho de otra forma: el bono paga el trabajo de hacer que la IA funcione en tu negocio, no la herramienta en sí.",
      },
      {
        type: "p",
        text: "Las bases aún no están publicadas, así que tómate esta lista como una guía de proyectos que encajan con el espíritu del programa. Son los proyectos que más vemos en pymes y autónomos, ordenados por cómo de rápido suelen notarse.",
      },
    ],
    sections: [
      {
        heading: "El criterio: un proceso, no una herramienta",
        blocks: [
          {
            type: "p",
            text: "Un buen proyecto para el bono tiene tres piezas: un proceso concreto que hoy se hace a mano o con errores, una solución que combina IA con las herramientas que ya usas, y una forma de medir la mejora. Si falta alguna de las tres, probablemente no sea un buen candidato (ni para la ayuda ni para tu negocio).",
          },
        ],
      },
      {
        heading: "1. Atención al cliente por WhatsApp y correo",
        blocks: [
          {
            type: "p",
            text: "Un asistente que responde las preguntas frecuentes, recoge los datos del cliente y pasa a una persona los casos que lo necesitan. Encaja cuando el equipo pierde horas contestando lo mismo o se escapan mensajes fuera de horario.",
          },
        ],
      },
      {
        heading: "2. Presupuestos y facturas que se preparan solos",
        blocks: [
          {
            type: "p",
            text: "La IA lee el pedido o el correo del cliente, rellena el presupuesto con tus tarifas y lo deja listo para revisar. Al aceptarlo, se genera la factura sin copiar datos a mano.",
          },
        ],
      },
      {
        heading: "3. Lectura automática de facturas y documentos de proveedores",
        blocks: [
          {
            type: "p",
            text: "Extraer los datos de facturas, albaranes o contratos y pasarlos a la contabilidad o a una hoja de cálculo. Es de los proyectos con retorno más fácil de medir: horas de tecleo que desaparecen.",
          },
        ],
      },
      {
        heading: "4. CRM con seguimiento automático de oportunidades",
        blocks: [
          {
            type: "p",
            text: "Todos los contactos de la web, el correo y WhatsApp entran en un solo sitio, con recordatorios de seguimiento y una priorización de qué oportunidades están más cerca de cerrarse. Es lo que hicimos en STEP, donde el cierre de ventas subió un 24 %.",
          },
        ],
      },
      {
        heading: "5. Paneles de datos que se actualizan solos",
        blocks: [
          {
            type: "p",
            text: "Ventas, márgenes o producción en un panel que se alimenta de tus fuentes sin exportar Excel. Con una capa de IA, además, puedes preguntarle en lenguaje normal: \"¿qué clientes han bajado su pedido este trimestre?\".",
          },
        ],
      },
      {
        heading: "6. Previsión de demanda y stock",
        blocks: [
          {
            type: "p",
            text: "Usar tu histórico de ventas para anticipar pedidos y evitar roturas de stock o compras de más. Encaja en comercio, distribución y hostelería con datos de varios años.",
          },
        ],
      },
      {
        heading: "7. Clasificación y reparto del correo entrante",
        blocks: [
          {
            type: "p",
            text: "Los correos se leen, se clasifican (pedido, incidencia, factura, comercial) y llegan a la persona adecuada con un resumen. Útil cuando una sola bandeja concentra todo.",
          },
        ],
      },
      {
        heading: "8. Informes y documentación que se escriben solos",
        blocks: [
          {
            type: "p",
            text: "Actas de reuniones, informes semanales o fichas de producto generadas a partir de los datos que ya tienes, con una persona que revisa y firma.",
          },
        ],
      },
      {
        heading: "Lo que probablemente no podrás pagar",
        blocks: [
          {
            type: "ul",
            items: [
              "Licencias o suscripciones de herramientas por sí solas (ChatGPT, Copilot, un chatbot genérico).",
              "Hardware sin un proyecto de implantación detrás.",
              "Servicios de empresas no europeas, según lo anunciado.",
            ],
          },
          {
            type: "p",
            text: "Las bases dirán la última palabra. Cuando se publiquen, actualizaremos esta lista.",
          },
        ],
      },
      {
        heading: "Cómo elegir tu proyecto",
        blocks: [
          {
            type: "p",
            text: "Multiplica las horas que dedica tu equipo a cada tarea por las veces que se repite al mes. El proceso con el número más alto, y cuyos datos ya estén en algún sitio digital, suele ser el mejor candidato. Empieza por uno, mídelo y, si funciona, pasa al siguiente.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿El Bono de IA paga un chatbot?",
        a: "Pagar solo la suscripción de un chatbot no encaja, según lo anunciado. Sí encaja un proyecto que diseña e integra un asistente en tu proceso de atención al cliente, conectado a tus datos y herramientas.",
      },
      {
        q: "¿Puedo usar el bono para automatizar sin IA?",
        a: "El bono está orientado a soluciones basadas en IA. Muchos proyectos combinan automatización clásica (conectar herramientas) con IA (leer documentos, clasificar, responder); las bases aclararán cómo se valora cada parte.",
      },
      {
        q: "¿Qué proyecto de IA da resultados más rápido en una pyme?",
        a: "Los que eliminan trabajo manual repetitivo y fácil de medir: lectura de facturas, presupuestos automáticos y seguimiento de clientes. Suelen notarse en semanas.",
      },
      {
        q: "¿Necesito tener mis datos ordenados antes de pedir el bono?",
        a: "No perfectamente, pero sí saber dónde están y en qué estado. El diagnóstico previo sirve precisamente para eso, y ordenar los datos del proceso elegido forma parte del propio proyecto.",
      },
    ],
    sources: [sources.moncloa, sources.conecta, sources.muycanal],
  },
  {
    slug: "diagnostico-madurez-digital-caso-de-uso-ia-pyme",
    title: "Cómo preparar tu empresa para el Bono de IA: diagnóstico de madurez digital y caso de uso, paso a paso",
    metaDescription:
      "Guía práctica para hacer el diagnóstico de madurez digital, elegir un caso de uso de IA y medir el impacto: lo que previsiblemente pedirá el Bono de Inteligencia Artificial.",
    excerpt:
      "Lo que el Bono IA te va a pedir se puede preparar hoy: un diagnóstico de cómo trabajas, un caso de uso y la medición del antes. Te enseñamos a hacerlo.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Bono IA y ayudas",
    keywords: [
      "diagnóstico madurez digital pyme",
      "caso de uso inteligencia artificial empresa",
      "preparar bono IA",
      "cómo implantar IA en una pyme",
      "medir productividad IA",
    ],
    datePublished: "2026-09-27",
    intro: [
      {
        type: "p",
        text: "Para el Bono de Inteligencia Artificial, según lo anunciado, tendrás que presentar un diagnóstico de madurez digital, un caso de uso concreto y una forma de medir el impacto en productividad. Las tres cosas se pueden preparar hoy, sin esperar a la convocatoria, y en esta guía te explicamos cómo hacerlo en seis pasos.",
      },
      {
        type: "p",
        text: "Es el mismo método que usamos en nuestra asesoría y que aplicamos primero en STEP, nuestra empresa de eventos. Con o sin ayuda, es la forma de que la IA te ahorre tiempo de verdad en lugar de convertirse en otra herramienta que nadie usa.",
      },
    ],
    sections: [
      {
        heading: "Paso 1: haz inventario de las tareas repetitivas",
        blocks: [
          {
            type: "p",
            text: "Durante una semana, que cada persona apunte las tareas que repite: qué hace, cuántas veces y cuánto tarda. No hace falta un programa: una hoja de cálculo con cuatro columnas basta.",
          },
          {
            type: "ul",
            items: [
              "Tarea (por ejemplo, pasar pedidos de WhatsApp al Excel).",
              "Quién la hace.",
              "Veces por semana.",
              "Minutos cada vez.",
            ],
          },
        ],
      },
      {
        heading: "Paso 2: localiza dónde viven tus datos",
        blocks: [
          {
            type: "p",
            text: "Para cada tarea, anota de dónde salen y a dónde van los datos: correo, WhatsApp, Excel, programa de facturación, CRM, papel. La IA necesita datos accesibles; si la información está en la cabeza de una persona o en papel, ese es el primer punto a resolver.",
          },
        ],
      },
      {
        heading: "Paso 3: puntúa tu madurez digital",
        blocks: [
          {
            type: "p",
            text: "No hay aún un modelo oficial del programa, pero puedes situarte con una escala sencilla, proceso a proceso:",
          },
          {
            type: "ul",
            items: [
              "Nivel 0: se hace en papel o de memoria.",
              "Nivel 1: está en Excel o en el correo, cada persona a su manera.",
              "Nivel 2: hay una herramienta común (CRM, ERP, facturación), pero se rellena a mano.",
              "Nivel 3: las herramientas están conectadas y los datos pasan solos de una a otra.",
              "Nivel 4: hay automatización e IA sobre esos datos, y se mide el resultado.",
            ],
          },
          {
            type: "p",
            text: "La mayoría de pymes que vemos están entre el nivel 1 y el 2. Saltar directamente al 4 rara vez funciona: primero hay que ordenar.",
          },
        ],
      },
      {
        heading: "Paso 4: elige un caso de uso",
        blocks: [
          {
            type: "p",
            text: "Multiplica veces por semana por minutos en cada tarea del inventario. Ordénalas de más a menos tiempo y quédate con las que tengan los datos en el nivel 1 o superior. De ellas, elige una sola: la que más tiempo roba o la que, si falla, más te cuesta (un cliente perdido, una factura mal hecha).",
          },
          {
            type: "p",
            text: "Escribe el caso de uso en una frase: \"Queremos que los pedidos que llegan por WhatsApp entren solos en el sistema y se genere el albarán, para dejar de pasarlos a mano\".",
          },
        ],
      },
      {
        heading: "Paso 5: mide el antes",
        blocks: [
          {
            type: "p",
            text: "Antes de cambiar nada, deja por escrito cómo funciona hoy ese proceso y con qué números: horas a la semana, errores al mes, tiempo de respuesta al cliente, ventas cerradas. Sin esa foto no podrás demostrar la mejora, que es lo que el bono pide medir.",
          },
          {
            type: "p",
            text: "En STEP medimos el tiempo que el equipo dedicaba al seguimiento y la tasa de cierre antes de centralizar la información. Después pudimos decir con datos que se recuperaban unas 14 horas a la semana y que el cierre subía un 24 %.",
          },
        ],
      },
      {
        heading: "Paso 6: prepara el proyecto y elige proveedor",
        blocks: [
          {
            type: "ul",
            items: [
              "Describe el proceso actual, el problema y el objetivo en horas o euros.",
              "Enumera las herramientas que ya usas y que deben seguir funcionando.",
              "Pide a los proveedores un plan por fases, con una primera entrega medible en pocas semanas.",
              "Desconfía de propuestas que empiezan por una licencia en lugar de por tu proceso.",
            ],
          },
          {
            type: "p",
            text: "Con este dosier tendrás preparado lo que previsiblemente te pedirán y podrás solicitar la ayuda en cuanto se abra la convocatoria.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué es un diagnóstico de madurez digital?",
        a: "Una foto de cómo trabaja hoy tu empresa: qué procesos tienes, con qué herramientas, dónde están los datos y qué grado de automatización hay. Sirve para decidir por dónde empezar y para medir después la mejora.",
      },
      {
        q: "¿Cuánto se tarda en preparar el diagnóstico y el caso de uso?",
        a: "En una pyme pequeña, una o dos semanas: una semana apuntando tareas y un par de reuniones para analizarlas y elegir el caso de uso.",
      },
      {
        q: "¿Puedo hacer el diagnóstico yo mismo?",
        a: "Sí, con el método de esta guía. La ventaja de hacerlo con alguien externo es que ve patrones que desde dentro se normalizan, y que sabe qué procesos son automatizables y a qué coste.",
      },
      {
        q: "¿Qué métricas debo medir antes de implantar IA?",
        a: "Las que el proceso afecte directamente: horas dedicadas a la semana, errores o incidencias, tiempo de respuesta al cliente y, en procesos comerciales, oportunidades cerradas.",
      },
    ],
    sources: [sources.moncloa, sources.conecta],
  },
];
