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
];
