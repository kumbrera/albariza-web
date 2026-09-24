import { useEffect, useRef, useState } from "react";
import Counter from "@/components/Counter";

interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  pending: boolean;
}

// Odometer places for a value, with "." as the Spanish thousands separator (Counter renders
// a "." place as a literal dot).
function placesFor(value: number): (number | ".")[] {
  const digits = String(value).length;
  const places: (number | ".")[] = [];
  for (let i = digits - 1; i >= 0; i--) {
    places.push(10 ** i);
    if (i === 3) places.push(".");
  }
  return places;
}

export default function StepMetrics({ metrics }: { metrics: Metric[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <dl ref={ref} className="grid gap-10 sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="border-t border-ink/15 pt-6">
          <dd className="flex items-center font-bold tracking-[-0.05em] text-teal" aria-label={`${m.prefix}${m.value}${m.suffix}`}>
            {m.prefix && <span className="mr-0.5 text-[2.9rem] leading-none">{m.prefix}</span>}
            <Counter
              value={live ? m.value : 0}
              places={placesFor(m.value)}
              fontSize={60}
              padding={6}
              gap={0}
              horizontalPadding={0}
              textColor="currentColor"
              fontWeight={700}
              gradientHeight={10}
              gradientFrom="#f1f1ee"
              digitStyle={{ width: "0.6em" }}
            />
            {m.suffix && <span className="ml-1.5 self-end pb-2 text-[1.9rem] leading-none">{m.suffix}</span>}
          </dd>
          <dt className="mt-4 max-w-[30ch] text-[1rem] leading-snug text-graphite">{m.label}</dt>
          {m.pending && (
            <span className="mt-3 inline-block rounded-full bg-[#fdecc8] px-2.5 py-1 text-[0.72rem] font-semibold text-[#8a5a00]">
              Dato de ejemplo, falta la cifra real
            </span>
          )}
        </div>
      ))}
    </dl>
  );
}
