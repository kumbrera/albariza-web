import BorderGlow from "@/components/BorderGlow";
import Magnet from "@/components/Magnet";
import { Check } from "lucide-react";

interface Props {
  bullets: string[];
  cta: { label: string; href: string };
}

export default function FreeSessionCard({ bullets, cta }: Props) {
  return (
    <BorderGlow
      glowColor="252 85 72"
      colors={["#7c66ff", "#4f32e0", "#3fd3bf"]}
      backgroundColor="#1c1a28"
      borderRadius={26}
      glowRadius={46}
      glowIntensity={1.1}
      fillOpacity={0.35}
      animated
    >
      <div className="p-8 sm:p-10">
        <ul className="space-y-4">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[1.06rem] leading-snug text-white/85">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-[#3fd3bf]">
                <Check size={14} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Magnet padding={80} magnetStrength={4} wrapperClassName="mt-9 block">
          <a
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-[1.05rem] font-semibold text-ink transition hover:bg-[#e7e3fb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            {cta.label}
          </a>
        </Magnet>
      </div>
    </BorderGlow>
  );
}
