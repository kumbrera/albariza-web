// The NFC contact page (/hola/): who's on the team, their direct lines and the quick form's options.
// Each NFC card opens /t/<slug>/, which redirects here with ?de=<slug> and the «tarjetas-nfc» list tag.

export type Persona = {
  slug: "pablo" | "miguel" | "alejandro";
  name: string;
  /** Name the panel uses for task owners. */
  panel: "Pablo" | "Miguel" | "Alejandro";
  role: string;
  /** Spanish mobile, 9 digits, no prefix. */
  phone: string;
  email: string;
  linkedin?: string;
};

export const team: Persona[] = [
  {
    slug: "pablo",
    name: "Pablo Cumbrera",
    panel: "Pablo",
    role: "Co-founder · Growth Manager",
    phone: "644349817",
    email: "pablo@albarizadigital.com",
    linkedin: "https://www.linkedin.com/in/pablocumbreragomez",
  },
  {
    slug: "miguel",
    name: "Miguel López",
    panel: "Miguel",
    role: "Co-founder · Ingeniero y empresario",
    phone: "613049505",
    email: "miguel@albarizadigital.com",
    linkedin: "https://www.linkedin.com/in/miguellopezgandolfo/",
  },
  {
    slug: "alejandro",
    name: "Alejandro Pérez",
    panel: "Alejandro",
    role: "Co-founder · Empresario",
    phone: "613393597",
    email: "alejandro@albarizadigital.com",
  },
];

export const necesidades = ["Ordenar procesos", "Automatizar tareas", "CRM o ERP", "Web y SEO", "Solo curioseando"];

export const formatPhone = (p: string) => `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;

export const whatsappUrl = (p: Persona) =>
  `https://wa.me/34${p.phone}?text=${encodeURIComponent(`¡Hola ${p.name.split(" ")[0]}! Te he conocido en persona y me gustaría hablar contigo sobre mi empresa.`)}`;
