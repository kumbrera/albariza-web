// Campaign attribution for the panel's CRM lists: the first UTM-tagged landing of the session
// wins and is sent with every form. sessionStorage can be blocked (private mode), so every
// access is guarded and the form still works without it.
const CLAVE = "albariza_atribucion";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Atribucion = Record<(typeof UTM)[number] | "landing" | "referrer", string | null>;

export function guardarAtribucion() {
  try {
    if (sessionStorage.getItem(CLAVE)) return;
    const params = new URLSearchParams(location.search);
    if (!UTM.some((k) => params.get(k))) return;
    const a = Object.fromEntries(UTM.map((k) => [k, params.get(k) || null])) as Atribucion;
    a.landing = location.href;
    a.referrer = document.referrer || null;
    sessionStorage.setItem(CLAVE, JSON.stringify(a));
  } catch {}
}

export function leerAtribucion(): Atribucion {
  let a: Partial<Atribucion> = {};
  try {
    a = JSON.parse(sessionStorage.getItem(CLAVE) ?? "{}");
  } catch {}
  return {
    utm_source: a.utm_source ?? null,
    utm_medium: a.utm_medium ?? null,
    utm_campaign: a.utm_campaign ?? null,
    utm_content: a.utm_content ?? null,
    utm_term: a.utm_term ?? null,
    landing: a.landing ?? null,
    referrer: a.referrer ?? null,
  };
}
