import type { BlogPost } from "./blog";

// Method articles on picking and measuring processes. No outside statistics: every figure is a
// worked example, and the text says so (brand guide: invented savings only as marked examples).

export const procesosPosts: BlogPost[] = [
  {
    slug: "que-proceso-automatizar-primero-pyme",
    title: "Qué proceso automatizar primero en tu pyme",
    metaDescription:
      "Cómo elegir la primera tarea que automatizar en una pyme: apunta lo que se repite, calcula las horas que cuesta al año y empieza por la que más pesa y menos se complica.",
    excerpt:
      "Un método en cuatro pasos para elegir la primera tarea que automatizar, con la cuenta de cuántas horas te cuesta al año.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "qué proceso automatizar primero",
      "qué tareas automatizar en una empresa",
      "automatizar tareas repetitivas pyme",
      "calcular horas tareas repetitivas",
      "por dónde empezar a automatizar",
      "automatización de procesos para pymes",
    ],
    datePublished: "2026-10-21",
    intro: [
      {
        type: "p",
        text: "El primer proceso que conviene automatizar en una pyme es el que cumple tres cosas a la vez: se repite muchas veces a la semana, sigue siempre las mismas reglas y, cuando sale mal, cuesta dinero o un cliente. Para encontrarlo no hace falta ningún programa: basta con apuntar durante una semana lo que se hace a mano, calcular cuántas horas al año suma cada tarea y ordenarlas por horas y por dificultad.",
      },
      {
        type: "p",
        text: "En este artículo te explico ese método paso a paso, con un ejemplo de cálculo que puedes copiar en una hoja de Excel. Es lo mismo que hacemos en la primera fase de cualquier proyecto, antes de tocar una sola herramienta.",
      },
    ],
    sections: [
      {
        heading: "Por qué empezar por un solo proceso",
        blocks: [
          {
            type: "p",
            text: "Cuando una empresa decide «digitalizarse», lo normal es querer arreglarlo todo a la vez: un programa nuevo para clientes, otro para facturar, otro para el almacén. El equipo tiene que aprender tres cosas en un mes, nadie tiene tiempo para hacerlo bien y a los tres meses se vuelve al Excel de siempre.",
          },
          {
            type: "p",
            text: "Empezar por un solo proceso tiene tres ventajas: el equipo solo cambia una costumbre, el resultado se ve en semanas y no en meses, y puedes medir si ha merecido la pena antes de pasar al siguiente. Si funciona, el siguiente proceso se hace con más confianza. Si no, has arriesgado poco.",
          },
        ],
      },
      {
        heading: "Paso 1: apunta durante una semana lo que se hace a mano",
        blocks: [
          {
            type: "p",
            text: "Pide a cada persona del equipo (y a ti mismo) que apunte durante una semana normal las tareas que repite. No hace falta precisión de reloj: con una estimación honesta basta. Para cada tarea, cuatro datos:",
          },
          {
            type: "ul",
            items: [
              "Qué es, en una frase: «pasar los pedidos del correo al Excel», «mandar el recordatorio de cita por WhatsApp».",
              "Cuántas veces a la semana se hace.",
              "Cuántos minutos lleva cada vez.",
              "Qué pasa cuando sale mal: nada, un retraso, un cliente molesto, una factura con errores.",
            ],
          },
          {
            type: "p",
            text: "Las tareas que más interesan suelen ser las que nadie menciona porque «son cinco minutos»: copiar datos de un sitio a otro, buscar información en conversaciones antiguas, preparar el mismo informe cada lunes o perseguir a un cliente para que confirme un presupuesto.",
          },
        ],
      },
      {
        heading: "Paso 2: calcula cuántas horas al año suma cada tarea",
        blocks: [
          {
            type: "p",
            text: "Una tarea de cinco minutos no parece nada hasta que se multiplica. La cuenta es sencilla:",
          },
          {
            type: "ul",
            items: [
              "Horas al año = veces por semana × minutos cada vez × semanas de trabajo al año ÷ 60.",
              "Coste al año = horas al año × lo que cuesta una hora de la persona que la hace (sueldo y Seguridad Social incluidos).",
            ],
          },
          {
            type: "p",
            text: "Un ejemplo, con números inventados para ilustrar el cálculo: en una empresa de servicios entran unos 25 pedidos por correo a la semana, y pasar cada uno al Excel lleva 6 minutos. Son 150 minutos a la semana. Con 46 semanas de trabajo al año, salen 115 horas al año dedicadas solo a copiar pedidos. Si la hora de esa persona cuesta 20 €, son 2.300 € al año. Y eso sin contar los errores al copiar.",
          },
          {
            type: "p",
            text: "Haz la misma cuenta con cada tarea de tu lista. Casi siempre aparecen dos o tres que suman muchas más horas de las que nadie habría dicho.",
          },
        ],
      },
      {
        heading: "Paso 3: comprueba si de verdad se puede automatizar",
        blocks: [
          {
            type: "p",
            text: "No todo lo que se repite merece automatizarse. Una tarea es buena candidata cuando:",
          },
          {
            type: "ul",
            items: [
              "Sigue siempre las mismas reglas: «si llega un pedido, se apunta aquí y se avisa a almacén».",
              "Los datos ya están en formato digital: un correo, un formulario, un Excel, un programa de facturación.",
              "No necesita que alguien decida algo distinto cada vez.",
              "Los errores son caros: una factura mal hecha, un cliente al que nadie llamó.",
            ],
          },
          {
            type: "p",
            text: "Y es mala candidata cuando cambia cada vez, depende del criterio de una persona (negociar un precio, valorar una incidencia) o se hace tan pocas veces que montar la automatización lleva más tiempo que hacerla a mano. Automatizamos lo que merece la pena, no todo.",
          },
          {
            type: "p",
            text: "Un apunte sobre palabras: a esto a veces se le llama RPA (automatización robótica de procesos), que no es más que un programa que repite los pasos que haría una persona en el ordenador. El nombre da igual; lo que importa es que la tarea tenga reglas claras.",
          },
        ],
      },
      {
        heading: "Paso 4: ordena por horas y por dificultad",
        blocks: [
          {
            type: "p",
            text: "Con las horas al año y la valoración del paso 3, pon cada tarea en uno de estos cuatro grupos:",
          },
          {
            type: "ul",
            items: [
              "Muchas horas y fácil de automatizar: tu primer proceso. Empieza por aquí.",
              "Muchas horas pero difícil: el segundo o tercer proyecto, cuando el equipo ya haya visto el primero funcionando.",
              "Pocas horas y fácil: se puede hacer de paso, si aprovecha la misma herramienta.",
              "Pocas horas y difícil: déjalo como está.",
            ],
          },
          {
            type: "p",
            text: "Si dos tareas empatan, elige la que más moleste al equipo o a los clientes. Un primer proyecto que todos notan en su día a día hace que el segundo se reciba con ganas y no con desconfianza.",
          },
        ],
      },
      {
        heading: "Las tareas que más suelen salir primero",
        blocks: [
          {
            type: "p",
            text: "Cada empresa es distinta, pero en negocios de servicios con mucha gestión manual estas tareas aparecen arriba de la lista una y otra vez:",
          },
          {
            type: "ul",
            items: [
              "Pasar datos de un formulario, un correo o un WhatsApp al Excel o al CRM.",
              "Hacer el seguimiento de presupuestos enviados: quién respondió, a quién hay que llamar.",
              "Recordatorios a clientes: citas, pagos pendientes, documentación que falta.",
              "Preparar facturas a partir de lo que ya está apuntado en otro sitio.",
              "El informe semanal o mensual que alguien monta a mano juntando varios Excel.",
              "Dar de alta a un cliente nuevo: los mismos datos en tres programas distintos.",
            ],
          },
        ],
      },
      {
        heading: "Antes de automatizar, pon orden",
        blocks: [
          {
            type: "p",
            text: "Automatizar un proceso desordenado solo consigue que el desorden vaya más rápido. Si cada persona apunta los clientes en su propio Excel, con columnas distintas, lo primero no es conectar herramientas: es acordar un único sitio y una única forma de apuntar las cosas.",
          },
          {
            type: "p",
            text: "Lo vivimos en nuestra propia empresa antes de ofrecerlo como servicio. El primer paso no fue ninguna automatización, sino juntar los Excel de cada persona en un solo sistema que todo el equipo entendiera. Las automatizaciones vinieron después, y funcionaron porque había orden debajo.",
          },
        ],
      },
      {
        heading: "Mide antes y después",
        blocks: [
          {
            type: "p",
            text: "La cuenta del paso 2 no sirve solo para elegir: es tu punto de partida. Cuando el proceso esté automatizado, vuelve a medir las mismas tareas durante una semana: cuántas horas lleva ahora y cuántos errores salen. La diferencia es lo que has ganado, en horas y en euros.",
          },
          {
            type: "p",
            text: "Con ese dato en la mano, decidir el siguiente proceso es fácil. Y si el resultado no es el esperado, lo sabrás pronto y con poco gastado, que es justo la ventaja de ir de uno en uno.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué tareas de una empresa se pueden automatizar?",
        a: "Las que se repiten muchas veces, siguen siempre las mismas reglas y trabajan con datos digitales: pasar datos de un sitio a otro, recordatorios, seguimiento de presupuestos, facturas a partir de pedidos o informes periódicos. Las que dependen del criterio de una persona, como negociar o valorar una incidencia, es mejor dejarlas a mano.",
      },
      {
        q: "¿Cómo calculo cuánto tiempo me cuesta una tarea repetitiva?",
        a: "Multiplica las veces que se hace a la semana por los minutos que lleva cada vez y por las semanas de trabajo al año, y divide entre 60. Eso te da las horas al año. Si lo multiplicas por lo que cuesta una hora de la persona que la hace, tienes el coste anual.",
      },
      {
        q: "¿Tengo que cambiar los programas que uso para automatizar?",
        a: "Normalmente no. La mayoría de automatizaciones conectan las herramientas que ya tienes (correo, Excel, el programa de facturación, el CRM) para que los datos pasen solos de una a otra.",
      },
      {
        q: "¿Cuánto se tarda en automatizar el primer proceso?",
        a: "Depende del proceso y de lo ordenados que estén los datos. Por eso conviene empezar por uno solo: el alcance es pequeño, el resultado se ve pronto y se puede medir antes de seguir.",
      },
    ],
  },
  {
    slug: "seguimiento-presupuestos-pyme",
    title: "Seguimiento de presupuestos: que no se escape ninguno",
    metaDescription:
      "Cómo organizar el seguimiento de presupuestos en una pyme: un solo listado, estados claros, una fecha para cada siguiente paso y recordatorios automáticos.",
    excerpt:
      "Un sistema sencillo para saber qué presupuestos están abiertos, a quién hay que llamar hoy y por qué se pierden los que se pierden.",
    categorySlug: "asesoria-procesos-automatizacion",
    categoryLabel: "Procesos y automatización",
    keywords: [
      "seguimiento de presupuestos",
      "cómo hacer seguimiento a un presupuesto",
      "control de presupuestos enviados",
      "plantilla seguimiento presupuestos Excel",
      "automatizar seguimiento comercial",
      "CRM para pymes",
    ],
    datePublished: "2026-11-04",
    intro: [
      {
        type: "p",
        text: "Para que no se escape ningún presupuesto hacen falta cuatro cosas: todos los presupuestos en un solo listado, un estado claro para cada uno, una fecha para el siguiente paso y alguien responsable de darlo. Con eso ya sabes cada mañana a quién hay que llamar. Después, los recordatorios se pueden automatizar para que nadie tenga que acordarse.",
      },
      {
        type: "p",
        text: "En este artículo te explico cómo montarlo paso a paso, empezando con lo que ya tienes (un Excel compartido sirve), y cuándo merece la pena pasar a un CRM.",
      },
    ],
    sections: [
      {
        heading: "Por qué se escapan los presupuestos",
        blocks: [
          {
            type: "p",
            text: "Casi nunca es por falta de ganas. Los presupuestos se pierden por cómo está organizado el trabajo:",
          },
          {
            type: "ul",
            items: [
              "Se envían por correo, se comentan por WhatsApp y se apuntan, si se apuntan, en el Excel de cada comercial.",
              "Nadie sabe cuántos hay abiertos ni cuánto suman sin preguntar a varias personas.",
              "No hay fecha para el siguiente paso, así que el seguimiento depende de la memoria.",
              "Da apuro insistir, y el «ya me dirá» se convierte en semanas sin noticias.",
              "Cuando un presupuesto se pierde, nadie apunta por qué, así que no se aprende nada.",
            ],
          },
        ],
      },
      {
        heading: "Paso 1: un solo listado con todos los presupuestos",
        blocks: [
          {
            type: "p",
            text: "Lo primero no es una herramienta nueva: es acordar un único sitio donde se apuntan todos los presupuestos, los envíe quien los envíe. Para empezar, una hoja compartida basta. Estas columnas son suficientes:",
          },
          {
            type: "ul",
            items: [
              "Cliente y persona de contacto.",
              "Qué se ha presupuestado y por qué importe.",
              "Fecha de envío.",
              "Estado.",
              "Siguiente paso y fecha en que toca darlo.",
              "Responsable.",
              "Motivo, si se pierde.",
            ],
          },
          {
            type: "p",
            text: "La regla que lo cambia todo: un presupuesto que no está en el listado no existe. Si se envía por WhatsApp, se apunta igual.",
          },
        ],
      },
      {
        heading: "Paso 2: pocos estados y bien definidos",
        blocks: [
          {
            type: "p",
            text: "Si cada persona entiende una cosa distinta por «pendiente», el listado no sirve. Con cuatro estados basta para la mayoría de negocios de servicios:",
          },
          {
            type: "ul",
            items: [
              "Enviado: el cliente lo tiene y aún no ha respondido.",
              "En seguimiento: ha respondido, pide cambios o lo está valorando.",
              "Aceptado: hay un sí.",
              "Perdido: hay un no, o no hay respuesta después del último intento. Siempre con el motivo.",
            ],
          },
        ],
      },
      {
        heading: "Paso 3: ningún presupuesto sin fecha de siguiente paso",
        blocks: [
          {
            type: "p",
            text: "Es la columna más importante. Cada presupuesto abierto tiene que tener apuntado qué toca hacer y cuándo: «llamar el jueves», «enviar versión con cambios el lunes». Así, cada mañana basta con filtrar por la fecha de hoy para saber a quién hay que contactar.",
          },
          {
            type: "p",
            text: "Una pauta que funciona en muchos negocios, y que conviene ajustar a tu ciclo de venta: a los dos o tres días, confirmar que lo ha recibido y resolver dudas; a la semana, una llamada; a las dos semanas, un último mensaje claro preguntando si sigue adelante. Si no hay respuesta, se marca como perdido con su motivo. Siempre se puede reabrir.",
          },
        ],
      },
      {
        heading: "Paso 4: automatiza los recordatorios",
        blocks: [
          {
            type: "p",
            text: "Con el listado ordenado, automatizar el seguimiento es sencillo y no exige cambiar de programas. Lo más útil suele ser:",
          },
          {
            type: "ul",
            items: [
              "Un aviso al responsable el día que vence el siguiente paso de un presupuesto.",
              "Un mensaje de seguimiento ya redactado que sale solo si el cliente no ha respondido en unos días, y que el comercial puede revisar antes de enviarlo.",
              "Que el presupuesto se apunte solo en el listado al enviarlo desde el programa de facturación o desde el correo.",
              "Un resumen cada lunes con los presupuestos abiertos, cuánto suman y cuáles llevan más tiempo sin moverse.",
            ],
          },
          {
            type: "p",
            text: "La decisión de cuándo llamar y qué decir sigue siendo de una persona. Lo que se automatiza es acordarse.",
          },
        ],
      },
      {
        heading: "Paso 5: mide para mejorar",
        blocks: [
          {
            type: "p",
            text: "Con unas semanas de datos en el listado aparecen respuestas que antes eran intuiciones:",
          },
          {
            type: "ul",
            items: [
              "Qué porcentaje de presupuestos acaba aceptado, en total y por comercial o por tipo de servicio.",
              "Cuántos días pasan de media entre el envío y la respuesta.",
              "Por qué se pierden: precio, plazo, no contestan, se lo quedó otro.",
            ],
          },
          {
            type: "p",
            text: "Con eso ya se puede decidir con datos: si casi todos los que se pierden es porque no contestan, el problema está en el seguimiento, no en el precio.",
          },
        ],
      },
      {
        heading: "Lo vivimos en nuestra propia empresa",
        blocks: [
          {
            type: "p",
            text: "Antes de ofrecer esto como servicio, lo montamos en STEP, la empresa de eventos de nuestro equipo. Las oportunidades estaban repartidas entre conversaciones y Excel, y el seguimiento se hacía a mano. Al centralizarlo todo en un sistema, el comercial lo resumió así: «Antes me pasaba horas buscando entre conversaciones para hacer los seguimientos y no fallar en nada. Después solo dedicaba mi tiempo a atender a los clientes cuando tocaba y a tiempo».",
          },
        ],
      },
      {
        heading: "¿Excel o CRM?",
        blocks: [
          {
            type: "p",
            text: "Un Excel compartido y bien ordenado es un buen punto de partida, y para un equipo pequeño puede bastar mucho tiempo. Merece la pena pasar a un CRM cuando varias personas trabajan los mismos clientes a la vez, cuando quieres que las conversaciones de correo o WhatsApp queden unidas a cada presupuesto, o cuando los recordatorios automáticos empiezan a ser imprescindibles. Lo importante es que el orden venga primero: un CRM sobre un proceso sin definir solo traslada el desorden a otro sitio.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuántas veces hay que hacer seguimiento a un presupuesto?",
        a: "Depende del tipo de venta, pero una pauta habitual son tres contactos: a los dos o tres días para confirmar que lo ha recibido, a la semana con una llamada y a las dos semanas con un último mensaje claro. Si no hay respuesta, se marca como perdido con su motivo y se puede reabrir más adelante.",
      },
      {
        q: "¿Sirve un Excel para controlar los presupuestos?",
        a: "Sí, para empezar es suficiente si está compartido, todo el equipo apunta ahí todos los presupuestos y cada uno tiene estado, siguiente paso, fecha y responsable. Cuando hay varias personas trabajando los mismos clientes o se necesitan recordatorios automáticos, conviene pasar a un CRM.",
      },
      {
        q: "¿Se puede automatizar el seguimiento de presupuestos?",
        a: "Sí. Se pueden automatizar los avisos al responsable, los mensajes de seguimiento cuando el cliente no contesta, el registro del presupuesto al enviarlo y un resumen semanal de los abiertos. La conversación con el cliente sigue siendo de una persona.",
      },
      {
        q: "¿Qué hago con los presupuestos que no contestan?",
        a: "Tras el último intento, márcalos como perdidos con el motivo «no contesta». Así el listado refleja la realidad y, si son muchos, sabrás que el problema está en el seguimiento o en el primer contacto, no en el precio.",
      },
    ],
  },
];
