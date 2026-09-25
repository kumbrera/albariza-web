import { useEffect, useState, type FormEvent } from "react";
import type { Transition, Variants } from "motion/react";
import { CircleCheck } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BorderBeam } from "@/components/ui/border-beam";

// Same relay the contact page uses (web3forms → albarizadigital@gmail.com). The key is public by design.
const WEB3FORMS_ACCESS_KEY = "f9022aa9-8b7b-416b-9c2d-3930ab6193b6";

const variants: Variants = {
  initial: { scale: 0.9, filter: "blur(10px)", y: "100%" },
  animate: { scale: 1, filter: "blur(0px)", y: 0 },
  exit: { scale: 0.9, filter: "blur(10px)", y: "100%" },
};
const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const PAINS = ["Facturas y presupuestos", "Seguimiento de clientes", "Informes y datos", "Tareas internas", "Otra cosa"];

type Status = "idle" | "sending" | "done" | "error";

// data-open-booking="<slug>" on a trigger switches the copy to that secondary service.
// A bare data-open-booking keeps the default: the free process-consulting session.
const TOPICS: Record<string, { name: string; title: string; description: string; placeholder: string }> = {
  web: {
    name: "Web",
    title: "Cuéntanos qué necesita tu web",
    description: "Te respondemos con una propuesta y un precio orientativo. Sin compromiso.",
    placeholder: "Qué haces, si ya tienes web, qué debería conseguir...",
  },
  "seo-geo": {
    name: "SEO / GEO",
    title: "Cuéntanos dónde quieres aparecer",
    description: "Revisamos cómo te encuentran hoy en Google y en las IAs, y te decimos por dónde empezaríamos.",
    placeholder: "Tu web, tu zona, qué buscan tus clientes...",
  },
  "social-media": {
    name: "Social Media",
    title: "Cuéntanos qué esperas de tus redes",
    description: "Revisamos tus canales y te decimos qué haríamos primero. Sin compromiso.",
    placeholder: "Tus redes, qué publicas hoy, qué resultado buscas...",
  },
};

const field =
  "w-full rounded-xl border border-ink/12 bg-chalk/60 px-4 py-2.5 text-[0.98rem] text-ink placeholder:text-graphite/60 outline-none transition focus:border-violet focus:bg-white focus:ring-4 focus:ring-violet/10";

export default function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [pain, setPain] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const t = TOPICS[topic];

  // Any element with [data-open-booking] opens the dialog, from any island or plain Astro markup.
  // Their href stays as a no-JS fallback.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest("[data-open-booking]");
      if (!trigger) return;
      e.preventDefault();
      const el = trigger as HTMLElement;
      setTopic(el.dataset.openBooking ?? "");
      setNote(el.dataset.bookingNote ?? "");
      setStatus("idle");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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
          access_key: WEB3FORMS_ACCESS_KEY,
          servicio: t ? t.name : "Asesoría de procesos y automatización",
          subject: t ? `Nueva consulta de ${t.name} — Albariza` : "Nueva sesión de asesoría gratuita — Albariza",
          from_name: "Web Albariza",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("done");
      form.reset();
      setPain("");
      window.gtag?.("event", "generate_lead", { form: t ? `consulta_${topic}` : "sesion_asesoria" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} variants={variants} transition={transition}>
      <DialogContent className="max-h-[94vh] w-[min(560px,calc(100vw-2rem))] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[26px] border-0 bg-white p-0 font-grotesk text-ink shadow-[0_40px_120px_-30px_rgba(22,21,31,0.55)] backdrop:bg-ink/55 backdrop:backdrop-blur-sm">
        <div className="relative p-6 sm:p-8">
          <BorderBeam size={240} duration={7} colorFrom="#7c66ff" colorTo="#3fd3bf" borderWidth={3} />
          <BorderBeam size={240} duration={7} delay={3.5} reverse colorFrom="#3fd3bf" colorTo="#7c66ff" borderWidth={3} />

          {status === "done" ? (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                <CircleCheck size={28} />
              </span>
              <h2 className="mt-5 text-[1.7rem] font-bold leading-tight tracking-[-0.04em]">Recibido.</h2>
              <p className="mx-auto mt-3 max-w-[38ch] text-[1.02rem] leading-relaxed text-graphite">
                Te escribimos para cerrar día y hora de la sesión. Mientras, piensa en la tarea que más te gustaría no volver a hacer a mano.
              </p>
              <button type="button" onClick={() => setOpen(false)} className="mt-7 rounded-full bg-ink px-6 py-3 text-[0.95rem] font-semibold text-chalk transition hover:bg-violet">
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-[1.55rem] font-bold leading-[1.05] tracking-[-0.045em] text-ink">
                  {t ? t.title : "Reserva tu sesión de asesoría gratuita"}
                </DialogTitle>
                <DialogDescription className="mt-2.5 text-[0.95rem] leading-relaxed text-graphite">
                  {t ? t.description : "30 minutos para ver qué proceso automatizaríamos primero, cuánto tiempo te ahorraría y qué costaría. Sin compromiso."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
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

                {!t && (
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
                    rows={note ? 4 : 2}
                    defaultValue={note}
                    className={`${field} resize-none`}
                    placeholder={t ? t.placeholder : "Qué haces a mano hoy, qué herramientas usáis..."}
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-violet px-6 py-3.5 text-[1.02rem] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(79,50,224,0.7)] transition hover:bg-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando…" : t ? "Enviar" : "Reservar mi sesión gratuita"}
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
            </>
          )}
          <DialogClose className="text-graphite hover:text-ink" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
