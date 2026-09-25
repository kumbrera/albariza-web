// Copy for the booking form, per service. Kept out of BookingForm.tsx so that file only
// exports a component (Vite fast refresh).
export interface TopicCopy {
  name: string;
  title: string;
  description: string;
  placeholder: string;
  submit: string;
  done: string;
}

// "" is the flagship: the free process-consulting session. The rest are the secondary services,
// keyed by their /servicios slug so triggers can pass data-open-booking="<slug>".
export const TOPICS: Record<string, TopicCopy> = {
  "": {
    name: "Asesoría de procesos y automatización",
    title: "Reserva tu sesión de asesoría gratuita",
    description: "30 minutos para ver qué proceso automatizaríamos primero, cuánto tiempo te ahorraría y qué costaría. Sin compromiso.",
    placeholder: "Qué haces a mano hoy, qué herramientas usáis...",
    submit: "Reservar mi sesión gratuita",
    done: "Te escribimos para cerrar día y hora de la sesión. Mientras, piensa en la tarea que más te gustaría no volver a hacer a mano.",
  },
  web: {
    name: "Web",
    title: "Cuéntanos qué necesita tu web",
    description: "Te respondemos con una propuesta y un precio orientativo. Sin compromiso.",
    placeholder: "Qué haces, si ya tienes web, qué debería conseguir...",
    submit: "Enviar",
    done: "Te escribimos con las preguntas que nos falten y una propuesta orientativa.",
  },
  "seo-geo": {
    name: "SEO / GEO",
    title: "Cuéntanos dónde quieres aparecer",
    description: "Revisamos cómo te encuentran hoy en Google y en las IAs, y te decimos por dónde empezaríamos.",
    placeholder: "Tu web, tu zona, qué buscan tus clientes...",
    submit: "Enviar",
    done: "Revisamos cómo apareces hoy y te escribimos con lo que haríamos primero.",
  },
  "social-media": {
    name: "Social Media",
    title: "Cuéntanos qué esperas de tus redes",
    description: "Revisamos tus canales y te decimos qué haríamos primero. Sin compromiso.",
    placeholder: "Tus redes, qué publicas hoy, qué resultado buscas...",
    submit: "Enviar",
    done: "Revisamos tus canales y te escribimos con lo que haríamos primero.",
  },
};

export const topicCopy = (topic: string) => TOPICS[topic] ?? TOPICS[""];
