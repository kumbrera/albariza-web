import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

export default function SignalsCheck({ signals }: { signals: readonly string[] }) {
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const n = picked.size;
  // Handed to the booking dialog so the ticked signals arrive with the request.
  const note = n
    ? ["Me pasa esto:", ...[...picked].sort((a, b) => a - b).map((i) => `- ${signals[i]}`)].join("\n")
    : undefined;

  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {signals.map((s, i) => {
          const on = picked.has(i);
          return (
            <li key={s}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`flex h-full w-full items-start gap-4 rounded-2xl border px-5 py-4 text-left text-[1.05rem] leading-snug transition duration-300 ${
                  on
                    ? "border-violet/40 bg-white text-ink shadow-[0_18px_40px_-24px_rgba(79,50,224,0.6)]"
                    : "border-ink/10 bg-white/40 text-graphite hover:border-ink/25 hover:bg-white/70 hover:text-ink"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition duration-300 ${
                    on ? "border-violet bg-violet text-white" : "border-ink/20 bg-white"
                  }`}
                >
                  {on && <Check size={15} strokeWidth={3} />}
                </span>
                {s}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex min-h-[64px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={n === 0 ? "none" : n < 2 ? "one" : "many"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="max-w-[52ch] text-[1.08rem] text-graphite"
          >
            {n === 0 && "Marca las que te suenen."}
            {n === 1 && "Una sola ya cuesta horas cada semana. ¿Alguna más?"}
            {n >= 2 && (
              <>
                <span className="font-semibold text-ink">{n} de {signals.length}.</span> En la sesión gratuita te decimos por cuál empezaríamos y cuánto tiempo te ahorraría.
              </>
            )}
          </motion.p>
        </AnimatePresence>
        <a
          href="/contacto/"
          data-open-booking
          data-booking-note={note}
          className={`shrink-0 rounded-full px-6 py-3.5 text-[0.98rem] font-semibold transition duration-300 ${
            n >= 2 ? "bg-violet text-white shadow-[0_14px_30px_-12px_rgba(79,50,224,0.7)] hover:bg-ink" : "bg-ink/6 text-ink hover:bg-ink hover:text-white"
          }`}
        >
          Reservar mi sesión gratuita
        </a>
      </div>
    </div>
  );
}
