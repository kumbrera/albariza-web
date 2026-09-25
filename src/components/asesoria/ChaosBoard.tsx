import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SiGmail, SiGooglecalendar, SiGooglesheets, SiHubspot, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Check, StickyNote } from "lucide-react";

// Demo tasks: what a small business juggles across apps. Not client data.
const TASKS: { id: string; title: string; icon: ReactNode }[] = [
  { id: "a", title: "Presupuesto Laura", icon: <SiGmail color="default" size={15} /> },
  { id: "b", title: "Pedido 214", icon: <SiWhatsapp color="default" size={15} /> },
  { id: "c", title: "Facturas marzo", icon: <SiGooglesheets color="default" size={15} /> },
  { id: "d", title: "Llamar proveedor", icon: <StickyNote size={15} className="text-[#e0a31a]" /> },
  { id: "e", title: "Reserva día 12", icon: <SiGooglecalendar color="default" size={15} /> },
  { id: "f", title: "Cliente nuevo", icon: <SiHubspot color="default" size={15} /> },
  { id: "g", title: "Informe semanal", icon: <SiGooglesheets color="default" size={15} /> },
  { id: "h", title: "Alta cliente", icon: <SiGmail color="default" size={15} /> },
];

const COLUMNS = ["Entra", "En marcha", "Hecho"];
const CARD_H = 50;
const ROW_GAP = 10;
const HEAD_H = 44;
const PAD = 14;

// Where each card lies before there's a system: overlapping, tilted, all over the place.
// Fractions of the board size so it scales with the container.
const CHAOS = [
  { x: 0.03, y: 0.08, r: -8 },
  { x: 0.46, y: 0.02, r: 7 },
  { x: 0.16, y: 0.32, r: 4 },
  { x: 0.5, y: 0.28, r: -6 },
  { x: 0.01, y: 0.58, r: 9 },
  { x: 0.34, y: 0.52, r: -3 },
  { x: 0.52, y: 0.74, r: 7 },
  { x: 0.18, y: 0.84, r: -10 },
];

type Columns = [string[], string[], string[]];
const START: Columns = [["a", "b", "c"], ["d", "e", "f"], ["g", "h"]];

export default function ChaosBoard() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 560, h: 380 });
  const [ordered, setOrdered] = useState(false);
  const [cols, setCols] = useState<Columns>(START);
  // Bumped when a finished card re-enters as new work, so it remounts instead of flying across the board.
  const [gen, setGen] = useState<Record<string, number>>({});

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Chaos first, then the board snaps into place once the visitor can see it.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOrdered(true);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        t = setTimeout(() => setOrdered(true), 1400);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  // Once ordered, work keeps flowing on its own: each column hands its oldest card to the next,
  // and a finished card comes back in as new work.
  useEffect(() => {
    if (!ordered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setCols(([e, m, h]) => {
        const [fromE, ...restE] = e;
        const [fromM, ...restM] = m;
        const [fromH, ...restH] = h;
        setGen((g) => ({ ...g, [fromH]: (g[fromH] ?? 0) + 1 }));
        return [[...restE, fromH], [...restM, fromE], [...restH, fromM]];
      });
    }, 2200);
    return () => clearInterval(t);
  }, [ordered]);

  const colW = (size.w - PAD * 4) / 3;
  const cardW = ordered ? colW : Math.min(250, size.w * 0.46);

  function target(id: string, i: number) {
    if (!ordered) {
      const c = CHAOS[i];
      return { x: c.x * size.w, y: c.y * (size.h - CARD_H), rotate: c.r };
    }
    const col = cols.findIndex((c) => c.includes(id));
    const row = cols[col].indexOf(id);
    return { x: PAD + col * (colW + PAD), y: HEAD_H + PAD + row * (CARD_H + ROW_GAP), rotate: 0 };
  }

  return (
    <div className="relative rounded-[28px] border border-ink/8 bg-white/55 p-3 shadow-[0_40px_80px_-40px_rgba(22,21,31,0.35)] backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 pb-3 pt-1.5">
        <span className="text-[0.82rem] font-medium text-graphite">
          {ordered ? "Con un sistema: todo en un sitio" : "Hoy: cada cosa en una app distinta"}
        </span>
        <span className={`flex items-center gap-1.5 text-[0.78rem] font-medium transition-colors duration-500 ${ordered ? "text-teal" : "text-[#c2410c]"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${ordered ? "bg-teal" : "bg-[#ea580c]"}`} />
          {ordered ? "Al día" : "3 pendientes sin dueño"}
        </span>
      </div>

      <div ref={boxRef} className="relative h-[330px] overflow-hidden rounded-[20px] bg-chalk/80 sm:h-[300px]">
        {COLUMNS.map((name, c) => (
          <motion.div
            key={name}
            aria-hidden="true"
            className="absolute top-0 rounded-2xl"
            style={{ left: PAD + c * (colW + PAD), width: colW, top: PAD, bottom: PAD }}
            initial={false}
            animate={{ opacity: ordered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: ordered ? 0.25 + c * 0.08 : 0 }}
          >
            <div className="h-full rounded-2xl bg-limestone/55" />
            <div className="absolute inset-x-3 top-2.5 flex items-center justify-between text-[0.78rem] font-semibold text-graphite">
              {name}
              <span className="tabular-nums text-graphite/60">{cols[c].length}</span>
            </div>
          </motion.div>
        ))}

        <AnimatePresence initial={false}>
          {TASKS.map((task, i) => {
            const done = ordered && cols[2].includes(task.id);
            const g = gen[task.id] ?? 0;
            const to = target(task.id, i);
            return (
              <motion.div
                key={`${task.id}-${g}`}
                className="absolute left-0 top-0 flex items-center gap-2.5 rounded-xl border border-ink/8 bg-white px-3 text-[0.84rem] font-medium text-ink shadow-[0_6px_16px_-10px_rgba(22,21,31,0.45)]"
                style={{ height: CARD_H }}
                initial={g === 0 ? false : { ...to, y: to.y + 24, width: cardW, opacity: 0, scale: 0.94 }}
                animate={{ ...to, width: cardW, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: ordered && g === 0 && !Object.keys(gen).length ? i * 0.06 : 0 }}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chalk">{task.icon}</span>
                <span className={`min-w-0 truncate ${done ? "text-graphite line-through decoration-graphite/40" : ""}`}>{task.title}</span>
                {done && (
                  <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
