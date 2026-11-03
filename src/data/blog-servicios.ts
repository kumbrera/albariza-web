import type { BlogPost } from "./blog";

// One article per thing pymes search to automate (WhatsApp, invoices, chatbots, appointments),
// plus a hub that maps them all. Weekly from 11 Nov 2026. No prices of ours or of third-party
// tools; legal dates cite the BOE / AEAT and say "a fecha de este artículo" when still moving.

export const serviciosPosts: BlogPost[] = [
  {
    slug: "automatizar-whatsapp-business",
    title: "Automatizar WhatsApp en tu empresa: qué se puede hacer y cómo empezar",
    metaDescription:
      "Qué se puede automatizar en WhatsApp Business: respuestas, recordatorios, avisos de pedidos y conexión con tu CRM. Diferencias entre la app y la plataforma, y cómo empezar.",
    excerpt:
      "Lo que ya trae la app de WhatsApp Business, cuándo se queda corta y qué se puede automatizar conectándolo con tus programas.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "automatizar WhatsApp Business",
      "mensajes automáticos WhatsApp Business",
      "WhatsApp Business API",
      "WhatsApp para empresas",
      "conectar WhatsApp con CRM",
      "recordatorios por WhatsApp",
      "respuestas automáticas WhatsApp",
    ],
    datePublished: "2026-11-11",
    sources: [
      { label: "WhatsApp: aplicación de WhatsApp Business", url: "https://business.whatsapp.com/products/business-app" },
      { label: "WhatsApp: Plataforma de WhatsApp Business", url: "https://business.whatsapp.com/products/business-platform" },
      { label: "Meta: precios de la Plataforma de WhatsApp Business", url: "https://developers.facebook.com/docs/whatsapp/pricing" },
    ],
    intro: [
      {
        type: "p",
        text: "En WhatsApp se pueden automatizar las respuestas a lo que más se pregunta, los recordatorios de citas y pagos, los avisos de «tu pedido está listo» y el paso de cada conversación a tu CRM o a tu Excel para que no se pierda ningún cliente. Una parte la trae ya gratis la app de WhatsApp Business; el resto necesita conectar WhatsApp con tus programas a través de la plataforma oficial de WhatsApp para empresas.",
      },
      {
        type: "p",
        text: "En este artículo te explico qué puedes hacer con cada opción, cuándo merece la pena dar el salto y por dónde empezar sin volver loco al equipo.",
      },
    ],
    sections: [
      {
        heading: "El problema no es WhatsApp: es que todo pasa por ahí",
        blocks: [
          {
            type: "p",
            text: "En muchas pymes WhatsApp se ha convertido en el sistema de trabajo sin que nadie lo decidiera. Por ahí llegan los pedidos, se mandan los presupuestos, se confirman las citas y se reclaman los pagos. Funciona mientras hay pocos clientes. Cuando crecen, aparecen los síntomas de siempre:",
          },
          {
            type: "ul",
            items: [
              "Los mensajes importantes se quedan enterrados debajo de los nuevos.",
              "Cada persona del equipo tiene sus propias conversaciones en su móvil.",
              "Se contesta veinte veces al día lo mismo: horario, precios, dónde estáis.",
              "Para saber qué se habló con un cliente hay que hacer scroll hasta marzo.",
              "Si alguien se va de vacaciones, sus clientes se quedan sin respuesta.",
            ],
          },
          {
            type: "p",
            text: "Automatizar WhatsApp no va de poner un robot a hablar con tus clientes. Va de que lo repetitivo salga solo y de que cada conversación acabe apuntada en un sitio donde todo el equipo la vea.",
          },
        ],
      },
      {
        heading: "Lo que ya trae la app de WhatsApp Business",
        blocks: [
          {
            type: "p",
            text: "Antes de montar nada, conviene exprimir la app gratuita de WhatsApp Business. Muchas empresas la tienen instalada y no usan la mitad de lo que ofrece:",
          },
          {
            type: "ul",
            items: [
              "Mensaje de bienvenida: sale solo cuando alguien te escribe por primera vez o tras un tiempo sin hablar.",
              "Mensaje de ausencia: avisa fuera de horario de cuándo vais a responder.",
              "Respuestas rápidas: textos guardados que se insertan con un atajo, para no escribir veinte veces lo mismo.",
              "Etiquetas: para marcar conversaciones como «nuevo cliente», «pendiente de pago» o «pedido enviado» y filtrarlas.",
              "Catálogo: tus servicios o productos dentro del propio chat.",
              "Perfil de empresa con horario, dirección y web, y un enlace directo para que te escriban desde tu web o tus redes.",
            ],
          },
          {
            type: "p",
            text: "Con eso bien configurado ya se ahorra un buen rato al día. Pero tiene un límite claro: todo se queda dentro de WhatsApp. Nada pasa solo a tu agenda, a tu programa de facturación ni a tu CRM.",
          },
        ],
      },
      {
        heading: "Cuándo se queda corta la app",
        blocks: [
          {
            type: "p",
            text: "La app está pensada para que una persona atienda desde su móvil. Empieza a quedarse corta cuando:",
          },
          {
            type: "ul",
            items: [
              "Varias personas tienen que atender el mismo número a la vez y saber quién lleva cada cliente.",
              "Quieres que los mensajes salgan solos cuando pasa algo en otro programa: se confirma una cita, se emite una factura, un pedido cambia de estado.",
              "Necesitas que cada conversación quede guardada en la ficha del cliente.",
              "Envías avisos a muchos clientes y las listas de difusión no te llegan, porque solo reciben el mensaje quienes tienen tu número guardado.",
            ],
          },
        ],
      },
      {
        heading: "La plataforma de WhatsApp para empresas, explicada sin jerga",
        blocks: [
          {
            type: "p",
            text: "Para todo lo anterior existe la Plataforma de WhatsApp Business, a la que en internet verás llamar «WhatsApp Business API». Una API no es más que una puerta para que dos programas se hablen. En este caso, permite que tu CRM, tu agenda o tu tienda online envíen y reciban mensajes de WhatsApp sin que nadie los escriba a mano.",
          },
          {
            type: "p",
            text: "Lo que conviene saber antes de decidir:",
          },
          {
            type: "ul",
            items: [
              "No se usa desde el móvil, sino a través de un proveedor autorizado por Meta o de herramientas que ya la integran (CRM, programas de reservas, bandejas de entrada compartidas).",
              "Cuando es la empresa la que inicia la conversación, el mensaje tiene que salir de una plantilla aprobada antes por Meta: «Hola, te recordamos tu cita del día…».",
              "Cuando es el cliente quien escribe, se abre un plazo de 24 horas para contestarle con mensajes libres.",
              "Meta cobra por mensaje según el tipo de mensaje y el país. Las tarifas cambian, así que lo mejor es consultarlas en su página oficial antes de calcular.",
              "El cliente tiene que haber aceptado recibir tus mensajes. Además de ser una norma de WhatsApp, es lo que pide la protección de datos.",
            ],
          },
        ],
      },
      {
        heading: "Qué se puede automatizar, con ejemplos",
        blocks: [
          {
            type: "p",
            text: "Estas son las automatizaciones de WhatsApp que más tiempo devuelven en negocios de servicios:",
          },
          {
            type: "ul",
            items: [
              "Confirmación y recordatorio de citas: al reservar sale la confirmación y, el día antes, un recordatorio con opción de cambiarla.",
              "Avisos de estado: «tu pedido está listo», «el técnico va de camino», «hemos recibido tu documentación».",
              "Seguimiento de presupuestos: si el cliente no ha respondido en unos días, sale un mensaje ya redactado que el comercial puede revisar antes.",
              "Recordatorios de pago: un aviso amable cuando una factura vence, con el enlace para pagarla.",
              "Alta de clientes nuevos: las preguntas básicas (nombre, qué necesita, cuándo) se recogen solas y se crean como ficha en el CRM.",
              "Reparto de conversaciones: según lo que pida el cliente, la conversación llega a la persona que corresponde.",
            ],
          },
          {
            type: "p",
            text: "En todos los casos la conversación de verdad la sigue llevando una persona. Lo que se automatiza es lo que se repite y lo que depende de acordarse.",
          },
        ],
      },
      {
        heading: "Cómo empezar sin liarla",
        blocks: [
          {
            type: "ul",
            items: [
              "Paso 1: durante una semana, apunta qué mensajes se repiten más y cuánto tiempo llevan. Casi siempre salen tres o cuatro.",
              "Paso 2: configura bien la app gratuita (bienvenida, ausencia, respuestas rápidas y etiquetas). A veces con esto basta.",
              "Paso 3: si no basta, elige un solo proceso, el que más horas suma, y conecta WhatsApp solo para ese: por ejemplo, los recordatorios de citas.",
              "Paso 4: mide durante unas semanas cuántas horas y cuántos errores te ha quitado. Si funciona, pasa al siguiente.",
            ],
          },
          {
            type: "p",
            text: "Lo que no recomiendo es empezar al revés: contratar una herramienta grande de WhatsApp y después buscarle uso. Primero el orden, luego la herramienta.",
          },
        ],
      },
      {
        heading: "Lo vivimos en nuestra propia empresa",
        blocks: [
          {
            type: "p",
            text: "En STEP, la empresa de eventos de nuestro equipo, las oportunidades se perdían entre conversaciones de WhatsApp, correos y llamadas. Lo que lo cambió no fue dejar de usar WhatsApp, sino que cada conversación acabara en un sistema común con su siguiente paso apuntado. Ahí se recuperaron más de 14 horas a la semana.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Se pueden enviar mensajes automáticos con WhatsApp Business gratis?",
        a: "Sí, la app gratuita de WhatsApp Business permite mensajes de bienvenida, de ausencia y respuestas rápidas. Para mensajes que salgan solos cuando pasa algo en otro programa (una cita, una factura, un pedido) hace falta la Plataforma de WhatsApp Business, que tiene coste por mensaje.",
      },
      {
        q: "¿Qué diferencia hay entre WhatsApp Business y la API de WhatsApp?",
        a: "La app de WhatsApp Business está pensada para atender desde el móvil y todo se queda dentro de WhatsApp. La Plataforma de WhatsApp Business (la API) permite conectar WhatsApp con tu CRM, tu agenda o tu tienda para enviar y recibir mensajes automáticamente y que varias personas atiendan el mismo número.",
      },
      {
        q: "¿Puedo conectar WhatsApp con mi CRM?",
        a: "Sí. Muchos CRM ya lo integran, y si el tuyo no, se puede conectar con herramientas de automatización. Así cada conversación queda en la ficha del cliente y se pueden lanzar mensajes según lo que pase en el CRM.",
      },
      {
        q: "¿Es legal enviar recordatorios por WhatsApp a mis clientes?",
        a: "Sí, siempre que el cliente haya dado su consentimiento para recibir mensajes por ese canal y los mensajes tengan que ver con el servicio. Conviene recogerlo por escrito al darle de alta y ofrecer siempre la opción de dejar de recibirlos.",
      },
    ],
  },
  {
    slug: "facturacion-automatica-pyme",
    title: "Facturación automática: cómo dejar de hacer facturas a mano",
    metaDescription:
      "Cómo automatizar la facturación de una pyme: facturas que se generan solas, envío, recordatorios de cobro, facturas de proveedores y qué cambia con VeriFactu y la factura electrónica.",
    excerpt:
      "Qué partes de la facturación se pueden automatizar, qué necesitas tener ordenado antes y qué cambia con VeriFactu y la factura electrónica obligatoria.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "facturación automática",
      "automatizar facturas",
      "facturas automáticas",
      "automatizar facturación pyme",
      "recordatorio de pago automático",
      "VeriFactu",
      "factura electrónica obligatoria",
    ],
    datePublished: "2026-11-18",
    sources: [
      {
        label: "Agencia Tributaria: Sistemas Informáticos de Facturación y VERI*FACTU",
        url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html",
      },
      {
        label: "BOE: Orden HAC/1028/2026, solución pública de facturación electrónica",
        url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20587",
      },
    ],
    intro: [
      {
        type: "p",
        text: "Automatizar la facturación significa que las facturas se generan solas a partir de lo que ya está apuntado (un pedido, un presupuesto aceptado, una cuota mensual), se envían al cliente sin que nadie las adjunte a mano y, si no se pagan, sale un recordatorio a tiempo. También se pueden automatizar las facturas que recibes: que las de proveedores lleguen solas a contabilidad en vez de rescatarlas del correo.",
      },
      {
        type: "p",
        text: "En este artículo te explico qué partes merece la pena automatizar, qué tiene que estar ordenado antes y qué cambia con VeriFactu y la factura electrónica obligatoria, que afectan al programa con el que facturas.",
      },
    ],
    sections: [
      {
        heading: "Dónde se va el tiempo cuando se factura a mano",
        blocks: [
          {
            type: "p",
            text: "Hacer una factura no lleva mucho. Lo que lleva tiempo es todo lo de alrededor:",
          },
          {
            type: "ul",
            items: [
              "Buscar qué hay que facturar: repasar pedidos, partes de trabajo o correos para no dejarse nada.",
              "Copiar los mismos datos del cliente y de los servicios que ya están en otro sitio.",
              "Adjuntar el PDF, escribir el correo y enviarlo uno a uno.",
              "Revisar qué se ha cobrado y qué no, normalmente cruzando el banco con un Excel.",
              "Perseguir a quien no paga, cuando alguien se acuerda.",
              "Reenviar a la gestoría las facturas de proveedores que llegan por correo, WhatsApp o en papel.",
            ],
          },
          {
            type: "p",
            text: "Cada paso es pequeño, pero se repite cada mes con cada cliente. Y es justo donde aparecen los errores: una factura que no se hizo, un cobro que nadie reclamó.",
          },
        ],
      },
      {
        heading: "Qué se puede automatizar en la facturación",
        blocks: [
          {
            type: "ul",
            items: [
              "Generar la factura sola cuando pasa algo: se acepta un presupuesto, se entrega un pedido, se cierra un parte de trabajo.",
              "Facturas recurrentes: cuotas mensuales o trimestrales que se emiten solas el día que toca.",
              "Envío automático al cliente por correo, con el PDF y el enlace para pagar.",
              "Conciliación de cobros: marcar la factura como pagada cuando entra el dinero en el banco.",
              "Recordatorios de cobro: un aviso amable al vencer la factura y otro unos días después si sigue pendiente.",
              "Facturas recibidas: leer las de proveedores que llegan al correo, guardarlas en su carpeta y pasarlas a contabilidad o a la gestoría.",
              "Un resumen semanal: qué se ha facturado, qué se ha cobrado y qué está pendiente.",
            ],
          },
          {
            type: "p",
            text: "No hace falta hacerlo todo. Normalmente se empieza por una de estas piezas, la que más horas o más disgustos da.",
          },
        ],
      },
      {
        heading: "Un ejemplo de cómo queda",
        blocks: [
          {
            type: "p",
            text: "Un ejemplo inventado para ilustrarlo: una empresa de mantenimiento con clientes a cuota mensual. Antes, el primer día de cada mes alguien repasaba el Excel de clientes, hacía cada factura copiando los datos y la enviaba por correo. A mitad de mes revisaba el banco para ver quién había pagado.",
          },
          {
            type: "p",
            text: "Después: el programa de facturación emite las cuotas solo el día 1 y las envía. Cuando entra un pago, la factura se marca como cobrada. Si a los siete días sigue pendiente, sale un recordatorio. La persona de administración solo mira un listado con las excepciones. El trabajo de un día al mes pasa a ser un rato de revisión.",
          },
        ],
      },
      {
        heading: "Antes de automatizar: los datos en orden",
        blocks: [
          {
            type: "p",
            text: "La facturación automática solo funciona si lo que hay que facturar está apuntado en un sitio fiable. Antes de conectar nada, revisa:",
          },
          {
            type: "ul",
            items: [
              "Que los clientes estén en un solo sitio, con sus datos fiscales completos y sin duplicados.",
              "Que tus servicios tengan nombres y precios fijos, no escritos de forma distinta cada vez.",
              "Que esté claro qué hecho dispara la factura: el presupuesto aceptado, la entrega, el fin de mes.",
              "Que alguien sea responsable de revisar las excepciones: abonos, descuentos, facturas rectificativas.",
            ],
          },
          {
            type: "p",
            text: "Si cada persona apunta los trabajos en su propio Excel, lo primero es juntarlo. Automatizar sobre el desorden solo hace que los errores salgan más rápido.",
          },
        ],
      },
      {
        heading: "VeriFactu: qué cambia en tu programa de facturación",
        blocks: [
          {
            type: "p",
            text: "VeriFactu es el sistema de la Agencia Tributaria que obliga a que los programas de facturación cumplan unos requisitos: que las facturas no se puedan modificar sin dejar rastro y que el registro de cada una se pueda enviar a Hacienda. No te obliga a cambiar cómo facturas, pero sí a usar un programa que cumpla.",
          },
          {
            type: "p",
            text: "A fecha de este artículo, la norma en vigor fija el 1 de enero de 2027 para las sociedades y el 1 de julio de 2027 para autónomos y el resto. En octubre de 2026 Hacienda anunció que quiere retrasarlo a octubre de 2028, pero ese cambio todavía tiene que aprobarse. Comprueba la fecha que te aplica en la web de la Agencia Tributaria o con tu gestoría.",
          },
          {
            type: "p",
            text: "Para quien ya está pensando en automatizar es una buena noticia: si vas a revisar tu programa de facturación de todas formas, es el momento de que también haga lo repetitivo.",
          },
        ],
      },
      {
        heading: "La factura electrónica obligatoria entre empresas",
        blocks: [
          {
            type: "p",
            text: "Aparte de VeriFactu, la Ley Crea y Crece obliga a que las facturas entre empresas y autónomos sean electrónicas: un archivo con un formato estándar que los programas pueden leer, no un PDF. La Orden HAC/1028/2026, publicada en el BOE el 5 de octubre de 2026, puso en marcha los plazos: las empresas que facturan más de 8 millones de euros al año tendrán que emitirla desde octubre de 2027, y el resto un año después.",
          },
          {
            type: "p",
            text: "Lo interesante para una pyme es que la factura electrónica facilita automatizar las facturas que recibe: si llegan en un formato que se lee solo, pasarlas a contabilidad deja de ser trabajo manual.",
          },
        ],
      },
      {
        heading: "Qué no conviene automatizar",
        blocks: [
          {
            type: "ul",
            items: [
              "Las facturas que se hacen pocas veces y cada una es distinta.",
              "Los abonos y facturas rectificativas: mejor que pasen por una persona.",
              "Las decisiones sobre clientes que no pagan: el recordatorio puede ser automático, la llamada o el corte de servicio no.",
            ],
          },
          {
            type: "p",
            text: "Automatizamos lo que merece la pena, no todo.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Se pueden hacer facturas automáticas?",
        a: "Sí. La mayoría de programas de facturación permiten facturas recurrentes y, conectados con tu CRM, tu tienda o tu Excel, pueden generar la factura sola cuando se acepta un presupuesto o se entrega un pedido, y enviarla al cliente sin intervención.",
      },
      {
        q: "¿Cómo automatizo los recordatorios de pago?",
        a: "Con un programa de facturación que sepa qué facturas están cobradas (conectado al banco o actualizado a diario) y que envíe un aviso al vencer y otro unos días después si sigue pendiente. La decisión de qué hacer con quien no paga sigue siendo de una persona.",
      },
      {
        q: "¿Qué es VeriFactu y a quién afecta?",
        a: "Es el sistema de la Agencia Tributaria que exige que los programas de facturación garanticen que las facturas no se alteran y que sus registros puedan enviarse a Hacienda. Afecta a empresas y autónomos que facturan con un programa informático. A fecha de este artículo, la norma fija 2027 y Hacienda ha anunciado su intención de retrasarlo a octubre de 2028, pendiente de aprobarse.",
      },
      {
        q: "¿Cuándo es obligatoria la factura electrónica entre empresas?",
        a: "Según la Orden HAC/1028/2026, desde octubre de 2027 para las empresas que facturan más de 8 millones de euros al año, y desde octubre de 2028 para el resto de empresas y autónomos.",
      },
    ],
  },
  {
    slug: "chatbot-para-empresas",
    title: "Chatbot para tu empresa: cuándo merece la pena y cuándo no",
    metaDescription:
      "Qué es un chatbot para empresas, para qué sirve de verdad en una pyme (web, WhatsApp, Instagram), cuándo no merece la pena y qué necesita para funcionar bien.",
    excerpt:
      "Para qué sirve un chatbot en una pyme, cuándo es mejor no ponerlo y qué tiene que estar ordenado antes para que responda bien.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "chatbot para empresas",
      "chatbot para pymes",
      "chatbot con inteligencia artificial",
      "chatbot para web",
      "chatbot WhatsApp",
      "atención al cliente automatizada",
      "asistente virtual para empresas",
    ],
    datePublished: "2026-11-25",
    sources: [
      { label: "EUR-Lex: Reglamento (UE) 2024/1689 de inteligencia artificial", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
    ],
    intro: [
      {
        type: "p",
        text: "Un chatbot merece la pena en una pyme cuando recibe muchas preguntas que se repiten y que tienen una respuesta clara: horarios, disponibilidad, estado de un pedido, cómo pedir cita, qué documentación hace falta. Ahí responde al momento, a cualquier hora, y libera al equipo. No merece la pena cuando cada consulta es distinta, cuando la venta necesita conversación o cuando la información de la empresa está desordenada, porque responderá mal.",
      },
      {
        type: "p",
        text: "En este artículo te explico qué tipos de chatbot hay, para qué sirven de verdad, cuándo es mejor no ponerlo y qué tiene que estar listo antes para que no se convierta en una fuente de quejas.",
      },
    ],
    sections: [
      {
        heading: "Qué es un chatbot, sin rodeos",
        blocks: [
          {
            type: "p",
            text: "Un chatbot es un programa que contesta mensajes por escrito. Puede estar en tu web, en WhatsApp, en Instagram o en Facebook. Hay dos tipos, y conviene distinguirlos:",
          },
          {
            type: "ul",
            items: [
              "Chatbot de reglas: funciona con menús y botones («1. Pedir cita, 2. Horarios…»). Solo hace lo que se le ha programado, pero nunca se inventa nada.",
              "Chatbot con inteligencia artificial: entiende lo que el cliente escribe con sus palabras y contesta en lenguaje natural a partir de la información que le das. Es más flexible, pero hay que vigilar que no conteste lo que no sabe.",
            ],
          },
          {
            type: "p",
            text: "Muchos de los que funcionan bien mezclan los dos: la inteligencia artificial para entender la pregunta y reglas fijas para lo delicado, como precios, plazos o citas.",
          },
        ],
      },
      {
        heading: "Para qué sirve de verdad en una pyme",
        blocks: [
          {
            type: "ul",
            items: [
              "Responder las preguntas frecuentes a cualquier hora: horario, ubicación, servicios, qué hay que traer.",
              "Dar y cambiar citas consultando la agenda real, no una lista de huecos inventada.",
              "Informar del estado de un pedido o de un trámite consultando tu programa.",
              "Recoger los datos de un cliente nuevo (qué necesita, cuándo, cómo contactarle) y dejarlos en el CRM.",
              "Filtrar: resolver lo sencillo y pasar a una persona lo que lo necesita, con la conversación ya resumida.",
            ],
          },
          {
            type: "p",
            text: "Fíjate en que casi todo depende de que el chatbot esté conectado con algo: la agenda, el CRM, el programa de pedidos. Un chatbot que solo sabe charlar sirve de poco.",
          },
        ],
      },
      {
        heading: "Cuándo no merece la pena",
        blocks: [
          {
            type: "ul",
            items: [
              "Cuando recibes pocas consultas al día. Contestarlas a mano es más rápido que mantener un chatbot.",
              "Cuando cada consulta es distinta y necesita criterio: valorar una obra, un caso legal, una reclamación.",
              "Cuando vendes servicios caros o a medida, donde la primera conversación es justo lo que convence.",
              "Cuando la información de la empresa no está escrita en ningún sitio o cada persona la cuenta distinto. El chatbot repetirá ese desorden.",
            ],
          },
          {
            type: "p",
            text: "En esos casos suele dar más resultado ordenar cómo entran las consultas y automatizar el seguimiento que poner a alguien, o algo, a contestar.",
          },
        ],
      },
      {
        heading: "Qué necesita un chatbot para funcionar bien",
        blocks: [
          {
            type: "ul",
            items: [
              "Respuestas escritas y revisadas: un documento con las preguntas reales de tus clientes y la respuesta buena para cada una.",
              "Límites claros: qué puede responder y qué no. Precios, plazos y condiciones, mejor desde datos fijos que redactados por la IA.",
              "Conexión con tus herramientas, para que lo que hace quede apuntado (citas en la agenda, clientes en el CRM).",
              "Una salida a una persona siempre visible: «prefiero hablar con alguien».",
              "Alguien que revise las conversaciones las primeras semanas y corrija lo que conteste mal.",
            ],
          },
          {
            type: "p",
            text: "La parte de las respuestas escritas es la que más se salta y la que más importa. Un chatbot con inteligencia artificial sin buena información detrás se inventa respuestas con mucha seguridad.",
          },
        ],
      },
      {
        heading: "Transparencia y protección de datos",
        blocks: [
          {
            type: "p",
            text: "El cliente tiene que saber que habla con un sistema automático. Además de ser lo honesto, el reglamento europeo de inteligencia artificial obliga a informar a las personas cuando interactúan con un sistema de este tipo. Y como el chatbot recoge datos personales, aplica la protección de datos como en cualquier formulario: informar de para qué se usan y no pedir más de lo necesario.",
          },
        ],
      },
      {
        heading: "Web, WhatsApp o Instagram: dónde ponerlo",
        blocks: [
          {
            type: "p",
            text: "Donde ya te escriben tus clientes. Si casi todo entra por WhatsApp, un chatbot en la web servirá de poco. Para WhatsApp hace falta la plataforma oficial de WhatsApp para empresas, que está pensada para bots de atención al cliente de tu propio negocio. En la web es lo más sencillo de instalar, y suele ser un buen sitio para empezar a probar.",
          },
        ],
      },
      {
        heading: "Cómo empezar",
        blocks: [
          {
            type: "ul",
            items: [
              "Paso 1: junta las preguntas que más te hacen, sacadas de WhatsApp, correo y llamadas de las últimas semanas. Con veinte basta.",
              "Paso 2: escribe la respuesta buena para cada una y decide cuáles puede contestar el chatbot y cuáles deben pasar a una persona.",
              "Paso 3: ponlo en un solo canal y para una sola tarea, por ejemplo preguntas frecuentes y pedir cita.",
              "Paso 4: revisa las conversaciones durante unas semanas y mide cuántas consultas resuelve solo y cuánto tiempo devuelve al equipo.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué es un chatbot para empresas?",
        a: "Un programa que contesta por escrito a los clientes en la web, WhatsApp o redes sociales. Puede funcionar con menús y reglas fijas o con inteligencia artificial, que entiende lo que el cliente escribe con sus palabras.",
      },
      {
        q: "¿Merece la pena un chatbot en una pyme?",
        a: "Merece la pena cuando hay muchas preguntas repetidas con respuesta clara (horarios, citas, estado de pedidos) y el chatbot está conectado con la agenda o el CRM. Si las consultas son pocas o cada una necesita criterio, suele ser mejor contestar a mano y automatizar el seguimiento.",
      },
      {
        q: "¿Un chatbot con inteligencia artificial puede equivocarse?",
        a: "Sí. Si no tiene buena información o se le deja contestar de todo, puede dar respuestas falsas con mucha seguridad. Por eso conviene darle respuestas revisadas, limitar lo que puede decir y que alguien revise las conversaciones al principio.",
      },
      {
        q: "¿Puedo poner un chatbot en WhatsApp?",
        a: "Sí, a través de la Plataforma de WhatsApp Business y de un proveedor o herramienta que la integre. Está pensada para bots de atención al cliente de tu propio negocio: citas, pedidos, preguntas frecuentes.",
      },
    ],
  },
  {
    slug: "automatizar-citas-recordatorios",
    title: "Citas y recordatorios automáticos: menos ausencias y menos llamadas",
    metaDescription:
      "Cómo automatizar las citas de tu negocio: reserva online con tu agenda real, confirmación, recordatorios por WhatsApp o SMS, cambios sin llamadas y aviso al equipo.",
    excerpt:
      "Reserva online, confirmación, recordatorio y cambios sin llamadas: cómo dejar de gestionar la agenda a mano.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "recordatorios de citas automáticos",
      "automatizar citas",
      "sistema de reservas online",
      "recordatorio de cita por WhatsApp",
      "reducir ausencias citas",
      "agenda online para negocios",
      "gestión de citas",
    ],
    datePublished: "2026-12-02",
    intro: [
      {
        type: "p",
        text: "Automatizar las citas significa que el cliente reserva solo sobre los huecos reales de tu agenda, recibe la confirmación al momento y un recordatorio antes de venir, y puede cambiar o cancelar con un enlace sin llamar. El equipo deja de pasar el día al teléfono, y los huecos que deja una cancelación se pueden volver a ocupar.",
      },
      {
        type: "p",
        text: "En este artículo te explico qué partes se pueden automatizar, qué canal usar para los recordatorios y cómo hacerlo sin cambiar la agenda con la que ya trabajáis.",
      },
    ],
    sections: [
      {
        heading: "Lo que cuesta gestionar la agenda a mano",
        blocks: [
          {
            type: "p",
            text: "En una clínica, un taller, una asesoría o un centro de estética, la agenda se come una parte grande del día:",
          },
          {
            type: "ul",
            items: [
              "Llamadas y WhatsApp para pedir cita, que interrumpen lo que se esté haciendo.",
              "Ir y venir de mensajes hasta encontrar un hueco que les venga bien a los dos.",
              "Llamar uno a uno el día antes para recordar las citas, o no hacerlo y comerse las ausencias.",
              "Huecos que se quedan vacíos porque alguien canceló y nadie avisó a quien estaba esperando.",
              "Citas apuntadas en la agenda de una persona que el resto del equipo no ve.",
            ],
          },
        ],
      },
      {
        heading: "Qué se puede automatizar",
        blocks: [
          {
            type: "ul",
            items: [
              "Reserva online: el cliente elige día y hora desde tu web, Google o un enlace en WhatsApp, viendo solo los huecos libres de verdad.",
              "Confirmación al momento, con la dirección, qué tiene que traer y cómo cambiar la cita.",
              "Recordatorio automático uno o dos días antes, con la opción de confirmar, cambiar o cancelar.",
              "Cambios y cancelaciones con un enlace, sin llamar, que liberan el hueco al momento.",
              "Lista de espera: si se libera un hueco, se avisa a quien lo quería.",
              "Aviso al equipo de las citas del día y de los cambios de última hora.",
              "Después de la cita: un mensaje de seguimiento, la factura o la petición de reseña.",
            ],
          },
        ],
      },
      {
        heading: "Correo, SMS o WhatsApp: qué canal usar",
        blocks: [
          {
            type: "ul",
            items: [
              "Correo: sirve para la confirmación con todos los detalles, pero se lee menos y más tarde.",
              "SMS: llega a cualquier móvil sin depender de ninguna aplicación. Útil si tus clientes son de más edad.",
              "WhatsApp: es lo que más se lee y permite responder con un botón. Para enviarlo automáticamente hace falta la plataforma oficial de WhatsApp para empresas y el consentimiento del cliente.",
            ],
          },
          {
            type: "p",
            text: "Lo habitual es combinar: confirmación por correo y recordatorio por WhatsApp o SMS.",
          },
        ],
      },
      {
        heading: "Un ejemplo de la cuenta",
        blocks: [
          {
            type: "p",
            text: "Un ejemplo con números inventados para ilustrarlo: un negocio con 60 citas a la semana dedica unos 3 minutos a llamar para recordar cada una. Son 3 horas a la semana solo en recordatorios, unas 140 horas al año. A eso hay que sumarle las citas que se pierden porque el cliente se olvidó y el hueco ya no se puede llenar.",
          },
          {
            type: "p",
            text: "Haz la misma cuenta con tus números: citas a la semana, minutos por llamada y ausencias al mes. Es la forma más rápida de saber si te merece la pena.",
          },
        ],
      },
      {
        heading: "Con tu agenda, no con una nueva",
        blocks: [
          {
            type: "p",
            text: "Muchos negocios ya tienen una agenda que funciona: la de Google, la de Outlook o la de su programa de gestión. No siempre hace falta cambiarla. En muchos casos basta con conectar una herramienta de reservas a esa agenda y montar los avisos alrededor. Lo importante es que haya una sola agenda de verdad, la que ve todo el equipo, y que todo lo demás la lea y la escriba.",
          },
          {
            type: "p",
            text: "Si cada persona lleva sus citas en un sitio distinto, el primer paso es juntar las agendas. Automatizar recordatorios sobre agendas que no cuadran solo manda avisos equivocados más rápido.",
          },
        ],
      },
      {
        heading: "Cuidado con los datos",
        blocks: [
          {
            type: "p",
            text: "Una cita dice mucho de una persona, sobre todo en sanidad, estética o asesoría. Pide solo los datos necesarios para la reserva, informa de para qué los usas y no pongas en los recordatorios información sensible, como el motivo de la consulta. Ante la duda, mejor «tu cita del martes a las 10:00» que el nombre del tratamiento.",
          },
        ],
      },
      {
        heading: "Cómo empezar",
        blocks: [
          {
            type: "ul",
            items: [
              "Paso 1: cuenta durante una semana cuántas citas das, cuánto tiempo va en llamadas y mensajes, y cuántas ausencias tienes.",
              "Paso 2: elige una sola agenda de referencia para todo el equipo.",
              "Paso 3: empieza por los recordatorios automáticos, que es lo que antes se nota, y después añade la reserva online.",
              "Paso 4: compara ausencias y horas de teléfono antes y después.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cómo puedo enviar recordatorios de citas automáticos?",
        a: "Con una herramienta de reservas o un programa de gestión conectado a tu agenda, que envíe un mensaje por correo, SMS o WhatsApp uno o dos días antes de cada cita, con la opción de confirmar, cambiar o cancelar.",
      },
      {
        q: "¿Los recordatorios reducen las ausencias?",
        a: "Es su objetivo principal: el cliente se acuerda y, si no puede venir, cancela a tiempo y el hueco se puede volver a dar. Para saber cuánto te funciona, apunta las ausencias de unas semanas antes de activarlos y compáralas después.",
      },
      {
        q: "¿Puedo mandar recordatorios de cita por WhatsApp automáticamente?",
        a: "Sí, a través de la Plataforma de WhatsApp Business, normalmente integrada en la herramienta de reservas. El cliente tiene que haber aceptado recibir mensajes por WhatsApp, y los recordatorios se envían con plantillas aprobadas por Meta.",
      },
      {
        q: "¿Tengo que cambiar de agenda para automatizar las citas?",
        a: "No necesariamente. Muchas herramientas de reservas se conectan con Google Calendar, Outlook o tu programa de gestión. Lo importante es que haya una sola agenda de referencia para todo el equipo.",
      },
    ],
  },
  {
    slug: "que-se-puede-automatizar-en-una-empresa",
    title: "Qué se puede automatizar en una empresa: ejemplos por áreas",
    metaDescription:
      "Ejemplos de lo que se puede automatizar en una pyme, área por área: ventas, atención al cliente, WhatsApp, facturas, cobros, citas, pedidos, equipo e informes.",
    excerpt:
      "Un mapa de las tareas que más se automatizan en una pyme, de las ventas a los informes, y cómo elegir por cuál empezar.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "qué se puede automatizar en una empresa",
      "ejemplos de automatización de procesos",
      "procesos que se pueden automatizar",
      "automatizar tareas administrativas",
      "automatización de procesos en empresas",
      "automatizar atención al cliente",
      "automatizar procesos con inteligencia artificial",
    ],
    datePublished: "2026-12-09",
    intro: [
      {
        type: "p",
        text: "En una empresa se puede automatizar casi todo lo que se repite con las mismas reglas: pasar los datos de un cliente nuevo al CRM, el seguimiento de presupuestos, las respuestas a WhatsApp, las facturas y los recordatorios de cobro, las citas, los avisos de pedidos, las altas de empleados y los informes semanales. Lo que no conviene automatizar es lo que necesita criterio: negociar, valorar un caso, decidir.",
      },
      {
        type: "p",
        text: "Aquí tienes un mapa con ejemplos concretos, área por área, para que veas cuáles te suenan. Al final te cuento cómo elegir por cuál empezar.",
      },
    ],
    sections: [
      {
        heading: "Ventas y clientes",
        blocks: [
          {
            type: "ul",
            items: [
              "Los contactos que llegan por el formulario de la web, por correo o por WhatsApp se crean solos como ficha en el CRM.",
              "Cada presupuesto enviado queda apuntado con su fecha de siguiente paso, y el comercial recibe un aviso el día que toca.",
              "Si el cliente no responde, sale un mensaje de seguimiento ya redactado para revisar y enviar.",
              "Cuando se acepta un presupuesto, se crea el proyecto, se avisa al equipo y se prepara la factura.",
            ],
          },
        ],
      },
      {
        heading: "Atención al cliente",
        blocks: [
          {
            type: "ul",
            items: [
              "Mensajes de bienvenida, de ausencia y respuestas rápidas en WhatsApp Business.",
              "Avisos automáticos de estado: pedido listo, técnico en camino, documentación recibida.",
              "Un chatbot que responde las preguntas frecuentes y pasa a una persona lo que necesita criterio.",
              "Los correos que entran a la dirección general se reparten solos a quien corresponde.",
            ],
          },
          {
            type: "p",
            text: "En el blog tienes dos artículos dedicados: cómo automatizar WhatsApp en tu empresa y cuándo merece la pena un chatbot.",
          },
        ],
      },
      {
        heading: "Administración, facturas y cobros",
        blocks: [
          {
            type: "ul",
            items: [
              "Facturas que se generan solas al cerrar un pedido o el día que toca una cuota.",
              "Envío automático de la factura con el enlace de pago.",
              "Recordatorios de cobro cuando una factura vence.",
              "Facturas de proveedores que llegan al correo y se guardan y se pasan solas a contabilidad o a la gestoría.",
            ],
          },
          {
            type: "p",
            text: "Lo explico con detalle, incluyendo qué cambia con VeriFactu y la factura electrónica, en el artículo sobre facturación automática.",
          },
        ],
      },
      {
        heading: "Citas, pedidos y operaciones",
        blocks: [
          {
            type: "ul",
            items: [
              "Reserva online sobre la agenda real, con confirmación y recordatorio automáticos.",
              "Los pedidos que llegan por correo o por la web se apuntan solos en la hoja o el programa de pedidos.",
              "Aviso cuando el stock de algo baja de un mínimo.",
              "Partes de trabajo que se rellenan desde el móvil y llegan solos a la oficina.",
            ],
          },
        ],
      },
      {
        heading: "Equipo",
        blocks: [
          {
            type: "ul",
            items: [
              "Solicitudes de vacaciones y ausencias con aprobación y calendario común.",
              "Alta de una persona nueva: cuentas, accesos y documentación con una lista que se lanza sola.",
              "Recordatorios de tareas que se repiten cada semana o cada mes.",
            ],
          },
        ],
      },
      {
        heading: "Informes y datos",
        blocks: [
          {
            type: "ul",
            items: [
              "Un resumen cada lunes con lo vendido, lo facturado, lo cobrado y lo pendiente, sin que nadie junte Excel.",
              "Avisos cuando algo se sale de lo normal: un cliente sin actividad, un presupuesto parado, un cobro atrasado.",
              "Un cuadro de mando con los números que de verdad miras para decidir.",
            ],
          },
        ],
      },
      {
        heading: "¿Y la inteligencia artificial?",
        blocks: [
          {
            type: "p",
            text: "La inteligencia artificial amplía lo que se puede automatizar, sobre todo en tareas con texto: leer un correo y saber qué pide, sacar los datos de una factura en PDF, resumir una conversación o redactar un primer borrador de respuesta. Pero no cambia la regla de fondo: funciona bien sobre procesos ordenados y con una persona revisando lo importante. Usarla porque está de moda, sin un problema concreto que resolver, suele acabar en una herramienta más que nadie usa.",
          },
        ],
      },
      {
        heading: "Cómo elegir por dónde empezar",
        blocks: [
          {
            type: "p",
            text: "La lista es larga, pero no se trata de hacerlo todo. Elige una sola tarea: la que más horas suma al año y menos se complica. Para encontrarla, apunta durante una semana lo que se hace a mano, calcula las horas al año de cada tarea y ordénalas. Tienes el método paso a paso en el artículo sobre qué proceso automatizar primero.",
          },
          {
            type: "p",
            text: "Así lo hicimos en nuestra propia empresa: primero juntar la información en un solo sitio, después automatizar lo que se repetía. Y medir en horas lo que devolvía cada paso antes de dar el siguiente.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué procesos se pueden automatizar en una empresa?",
        a: "Los que se repiten con las mismas reglas: registro de clientes en el CRM, seguimiento de presupuestos, respuestas y avisos por WhatsApp, facturas y recordatorios de cobro, citas, pedidos, altas de empleados e informes periódicos.",
      },
      {
        q: "¿Qué tareas no conviene automatizar?",
        a: "Las que necesitan criterio o cambian cada vez, como negociar un precio, valorar una incidencia o atender una reclamación delicada, y las que se hacen tan pocas veces que automatizarlas lleva más tiempo que hacerlas a mano.",
      },
      {
        q: "¿Hace falta cambiar de programas para automatizar?",
        a: "Normalmente no. La mayoría de automatizaciones conectan las herramientas que ya usas (correo, Excel, WhatsApp, el programa de facturación, el CRM) para que los datos pasen solos de una a otra.",
      },
      {
        q: "¿Por dónde empiezo a automatizar mi empresa?",
        a: "Por una sola tarea: la que más horas te cuesta al año y es más sencilla de automatizar. Mide cuánto tiempo lleva antes y después, y si funciona, pasa a la siguiente.",
      },
    ],
  },
];
