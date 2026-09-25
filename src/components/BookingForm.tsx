import { useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { TOPICS, topicCopy } from "@/data/booking";

// Web3Forms relays submissions to albarizadigital@gmail.com. The key is public by design.
const WEB3FORMS_ACCESS_KEY = "f9022aa9-8b7b-416b-9c2d-3930ab6193b6";

const PAINS = ["Facturas y presupuestos", "Seguimiento de clientes", "Informes y datos", "Tareas internas", "Otra cosa"];

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-xl border border-ink/12 bg-chalk/60 px-4 py-2.5 text-[0.98rem] text-ink placeholder:text-graphite/60 outline-none transition focus:border-violet focus:bg-white focus:ring-4 focus:ring-violet/10";

interface Props {
  topic: string;
  /** Pre-filled message, e.g. the signals ticked on the asesoría page. */
  note?: string;
  /** Shown as a button on the success screen when the form lives in a dialog. */
  onClose?: () => void;
  /** Where the lead came from, for analytics. */
  source: string;
  onDone?: () => void;
}

export default function BookingForm({ topic, note = "", onClose, source, onDone }: Props) {
  const [pain, setPain] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const copy = topicCopy(topic);
  const isSession = !TOPICS[topic] || topic === "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          tarea: pain,
          servicio: copy.name,
          origen: source,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: isSession ? "Nueva sesión de asesoría gratuita — Albariza" : `Nueva consulta de ${copy.name} — Albariza`,
          from_name: "Web Albariza",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("done");
      onDone?.();
      form.reset();
      setPain("");
      window.gtag?.("event", "generate_lead", { form: isSession ? "sesion_asesoria" : `consulta_${topic}`, source });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="py-6 text-center" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CircleCheck size={28} />
        </span>
        <p className="mt-5 text-[1.7rem] font-bold leading-tight tracking-[-0.04em]">Recibido.</p>
        <p className="mx-auto mt-3 max-w-[38ch] text-[1.02rem] leading-relaxed text-graphite">{copy.done}</p>
        {onClose ? (
          <button type="button" onClick={onClose} className="mt-7 rounded-full bg-ink px-6 py-3 text-[0.95rem] font-semibold text-chalk transition hover:bg-violet">
            Cerrar
          </button>
        ) : (
          <button type="button" onClick={() => setStatus("idle")} className="mt-7 text-[0.95rem] font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
            Enviar otra consulta
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Nombre *</span>
          <input name="nombre" required autoComplete="name" className={field} placeholder="Tu nombre" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Empresa</span>
          <input name="empresa" autoComplete="organization" className={field} placeholder="Opcional" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="tu@email.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Teléfono</span>
          <input name="telefono" type="tel" autoComplete="tel" className={field} placeholder="Para llamarte, si prefieres" />
        </label>
      </div>

      {isSession && (
        <fieldset>
          <legend className="mb-2 text-[0.85rem] font-medium text-ink">¿Qué te roba más tiempo?</legend>
          <div className="flex flex-wrap gap-2">
            {PAINS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={pain === p}
                onClick={() => setPain(pain === p ? "" : p)}
                className={`rounded-full border px-3.5 py-1.5 text-[0.88rem] transition ${
                  pain === p ? "border-violet bg-violet text-white" : "border-ink/12 bg-chalk/60 text-graphite hover:border-violet/50 hover:text-ink"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-ink">Cuéntanos un poco más</span>
        <textarea
          key={note}
          name="mensaje"
          rows={note ? 4 : 3}
          defaultValue={note}
          className={`${field} resize-none`}
          placeholder={copy.placeholder}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-violet px-6 py-3.5 text-[1.02rem] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(79,50,224,0.7)] transition hover:bg-ink disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : copy.submit}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-[0.9rem] text-[#b3413a]">
          No se ha podido enviar. Escríbenos a albarizadigital@gmail.com o llama al 601 386 534.
        </p>
      )}
      <p className="text-center text-[0.8rem] text-graphite">
        Usamos tus datos solo para responderte.{" "}
        <a href="/politica-privacidad" className="underline decoration-graphite/40 underline-offset-2">Política de privacidad</a>
      </p>
    </form>
  );
}
