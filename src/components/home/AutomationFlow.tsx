import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { SiGmail, SiGooglecalendar, SiGooglesheets, SiHubspot, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { BarChart3, BellRing, FileCheck2, UserPlus, CalendarCheck, PackageCheck } from "lucide-react";

const TOOLS = [
  { name: "WhatsApp", icon: <SiWhatsapp color="default" size={22} /> },
  { name: "Gmail", icon: <SiGmail color="default" size={22} /> },
  { name: "Google Sheets", icon: <SiGooglesheets color="default" size={22} /> },
  { name: "Google Calendar", icon: <SiGooglecalendar color="default" size={22} /> },
  { name: "HubSpot", icon: <SiHubspot color="default" size={22} /> },
];

// Example events of "the system working" — a demo feed, not real client activity.
const EVENTS = [
  { icon: <FileCheck2 size={16} />, title: "Factura #0142 enviada al cliente", meta: "Al cerrar el pedido" },
  { icon: <UserPlus size={16} />, title: "Nuevo contacto de la web, ya en el CRM", meta: "Con aviso de seguimiento" },
  { icon: <BellRing size={16} />, title: "Recordatorio: presupuesto sin respuesta", meta: "Enviado por WhatsApp" },
  { icon: <BarChart3 size={16} />, title: "Informe semanal de ventas listo", meta: "En tu correo" },
  { icon: <CalendarCheck size={16} />, title: "Cita de mañana confirmada", meta: "Calendario actualizado" },
  { icon: <PackageCheck size={16} />, title: "Pedido confirmado, stock actualizado", meta: "Hoja de cálculo al día" },
];

function Node({ refEl, children, className = "", label }: { refEl: RefObject<HTMLDivElement | null>; children: ReactNode; className?: string; label?: string }) {
  return (
    <div ref={refEl} title={label} className={`z-10 flex items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] ${className}`}>
      {children}
    </div>
  );
}

// Age since the item appeared, on an accelerated clock (1 s real = 1 min shown) so the demo feed
// reads like a live log: the newest entry is "ahora" and older ones drift down the list.
function TimeAgo() {
  const [mins, setMins] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMins((m) => m + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return <>{mins < 1 ? "ahora" : `hace ${mins} min`}</>;
}

function Feed() {
  // AnimatedList stops once every item is shown; remount it to keep the feed alive.
  const [cycle, setCycle] = useState(0);
  const step = 1700;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCycle((c) => c + 1), step * EVENTS.length + 2600);
    return () => clearTimeout(t);
  }, [cycle]);
  return (
    <AnimatedList key={cycle} delay={step} className="w-full gap-2.5">
      {EVENTS.map((e) => (
        <div key={e.title} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet text-white">{e.icon}</span>
          <span className="min-w-0">
            <span className="block truncate text-[0.93rem] font-medium text-white">{e.title}</span>
            <span className="block text-[0.78rem] text-white/50">{e.meta}</span>
          </span>
          <span className="ml-auto shrink-0 text-[0.72rem] text-[#3fd3bf]">
            <TimeAgo />
          </span>
        </div>
      ))}
    </AnimatedList>
  );
}

export default function AutomationFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const toolRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  return (
    <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[28px] bg-ink p-6 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 45% at 70% 25%, rgba(109,85,255,0.35), transparent 70%), radial-gradient(40% 40% at 10% 95%, rgba(63,211,191,0.12), transparent 70%)" }} />

      <div ref={containerRef} className="relative flex h-[250px] items-center justify-between">
        <div className="flex h-full flex-col justify-between">
          {TOOLS.map((t, i) => (
            <Node key={t.name} refEl={toolRefs[i]} label={t.name} className="h-11 w-11">
              {t.icon}
            </Node>
          ))}
        </div>
        <div className="mr-2 flex flex-col items-center gap-3">
          <div ref={hubRef} className="z-10 h-[76px] w-[76px] rounded-[22px] shadow-[0_0_60px_-10px_rgba(109,85,255,0.9)]">
            <img src="/brand/albariza-favicon.svg" alt="" width={76} height={76} className="h-full w-full" />
          </div>
          <span className="text-[0.85rem] font-medium text-white/80">Tu sistema</span>
        </div>
        {toolRefs.map((r, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={r}
            toRef={hubRef}
            curvature={(2 - i) * 34}
            duration={3.2}
            delay={i * 0.45}
            pathColor="#ffffff"
            pathOpacity={0.12}
            pathWidth={2}
            gradientStartColor="#7c66ff"
            gradientStopColor="#3fd3bf"
            endYOffset={(i - 2) * 6}
          />
        ))}
      </div>

      <div className="relative mt-7 flex-1">
        <p className="mb-3 flex items-center gap-2 text-[0.8rem] font-medium text-white/55">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fd3bf] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fd3bf]" />
          </span>
          Pasando ahora, sin que nadie lo toque
        </p>
        <div className="relative h-[250px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
          <Feed />
        </div>
      </div>

      <p className="relative mt-4 text-[0.98rem] leading-snug text-white/85">Sin cambiar tus herramientas: conectamos las que ya usas.</p>
    </div>
  );
}
