import { useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { necesidades, type Persona } from "@/data/contacto";
import { leerAtribucion } from "@/lib/atribucion";

// The NFC page's quick form: name plus a phone or an email, and what they need. Same two
// destinations as BookingForm (Web3Forms email + the panel's CRM), always into the «Tarjetas NFC»
// list, with the task for whoever they met.
const WEB3FORMS_ACCESS_KEY = "f9022aa9-8b7b-416b-9c2d-3930ab6193b6";
const PANEL_ENTRADA = "https://panel.albarizadigital.com/api/entrada/";
const POLITICA_VERSION = "2026-09";
const LISTA = "tarjetas-nfc";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[1rem] text-ink placeholder:text-graphite/80 outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/10";

export default function QuickForm({ conocido = null }: { conocido?: Persona["panel"] | null }) {
  const [elegidas, setElegidas] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [falta, setFalta] = useState(false);

  const alternar = (n: string) => setElegidas((e) => (e.includes(n) ? e.filter((x) => x !== n) : [...e, n]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.botcheck) return;
    if (!data.telefono?.trim() && !data.email?.trim()) {
      setFalta(true);
      return;
    }
    setFalta(false);
    setStatus("sending");
    const tarea = elegidas.join(", ");
    const origen = `Tarjeta NFC${conocido ? ` · ${conocido}` : ""}`;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          necesita: tarea,
          conocido: conocido ?? "Sin indicar",
          origen,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo contacto por tarjeta NFC${conocido ? ` (conoció a ${conocido})` : ""} — Albariza`,
          from_name: "Tarjeta NFC Albariza",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      if (import.meta.env.PROD) {
        fetch(PANEL_ENTRADA, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            tarea,
            servicio: elegidas[0] ?? null,
            origen,
            subject: "consulta",
            ...leerAtribucion(),
            lista: LISTA,
            conocido,
            consentimiento: true,
            consentimiento_version: POLITICA_VERSION,
          }),
          keepalive: true,
        }).catch(() => {});
      }
      setStatus("done");
      form.reset();
      setElegidas([]);
      window.gtag?.("event", "generate_lead", { form: "tarjeta_nfc", source: conocido ?? "sin_indicar" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="py-8 text-center" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CircleCheck size={28} />
        </span>
        <p className="mt-5 text-[1.7rem] font-bold leading-tight tracking-[-0.04em]">¡Apuntado!</p>
        <p className="mx-auto mt-3 max-w-[34ch] text-[1.02rem] leading-relaxed text-graphite">
          {conocido ? `${conocido} te escribe` : "Te escribimos"} en cuanto pueda, normalmente el mismo día.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Nombre *</span>
        <input name="nombre" required autoComplete="name" className={field} placeholder="Tu nombre" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Teléfono</span>
        <input name="telefono" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="600 000 000" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Email</span>
        <input name="email" type="email" autoComplete="email" className={field} placeholder="tu@empresa.com" />
      </label>
      {falta && (
        <p role="alert" className="-mt-1 text-[0.88rem] text-[#b3413a]">
          Déjanos un teléfono o un email para poder contestarte.
        </p>
      )}

      <fieldset>
        <legend className="mb-2 text-[0.85rem] font-medium text-ink">¿Qué necesitas?</legend>
        <div className="flex flex-wrap gap-2">
          {necesidades.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={elegidas.includes(n)}
              onClick={() => alternar(n)}
              className={`rounded-full border px-3.5 py-2 text-[0.9rem] transition ${
                elegidas.includes(n) ? "border-violet bg-violet text-white" : "border-ink/12 bg-white text-graphite hover:border-violet/50 hover:text-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">¿Algo más?</span>
        <textarea name="mensaje" rows={2} className={`${field} resize-none`} placeholder="Opcional" />
      </label>

      <label className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-graphite">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-violet" />
        <span>
          He leído y acepto la{" "}
          <a href="/politica-privacidad/" target="_blank" className="underline decoration-graphite/40 underline-offset-2 hover:text-ink">
            política de privacidad
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-violet px-6 py-3.5 text-[1.02rem] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(79,50,224,0.7)] transition hover:bg-ink disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Que me escribáis"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-[0.9rem] text-[#b3413a]">
          No se ha podido enviar. Escríbenos a hola@albarizadigital.com o llama al 644 349 817.
        </p>
      )}
    </form>
  );
}
