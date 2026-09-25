import { BrainCircuit, ChartNoAxesCombined, Database, GraduationCap, SearchCheck, Workflow, type LucideIcon } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

const ICONS: Record<string, LucideIcon> = {
  audit: SearchCheck,
  connect: Workflow,
  system: Database,
  dashboard: ChartNoAxesCombined,
  ai: BrainCircuit,
  team: GraduationCap,
};

interface Item {
  icon: string;
  title: string;
  text: string;
}

export default function OfferGrid({ items }: { items: readonly Item[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.title} className="rounded-[24px]">
            <MagicCard
              className="h-full rounded-[24px]"
              gradientSize={260}
              gradientColor="#ece8ff"
              gradientOpacity={0.7}
              gradientFrom="#4f32e0"
              gradientTo="#0f9c8b"
            >
              <div className="p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-[1.3rem] font-bold leading-tight tracking-[-0.03em] text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-graphite">{item.text}</p>
              </div>
            </MagicCard>
          </li>
        );
      })}
    </ul>
  );
}
