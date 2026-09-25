import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import BookingForm from "@/components/BookingForm";
import { TOPICS, topicCopy } from "@/data/booking";

const TABS: { topic: string; label: string }[] = [
  { topic: "", label: "Sesión gratuita" },
  { topic: "web", label: "Web" },
  { topic: "seo-geo", label: "SEO / GEO" },
  { topic: "social-media", label: "Redes" },
];

export default function ContactPanel() {
  const [topic, setTopic] = useState("");
  const copy = topicCopy(topic);

  // Service pages link here as /contacto?servicio=<slug> when JS is off or the dialog isn't used.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("servicio") ?? "";
    if (s in TOPICS) setTopic(s);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-ink/8 bg-white p-6 shadow-[0_40px_90px_-40px_rgba(22,21,31,0.45)] sm:p-9">
      <BorderBeam size={260} duration={8} colorFrom="#7c66ff" colorTo="#3fd3bf" borderWidth={2} />

      <div role="tablist" aria-label="Qué necesitas" className="flex flex-wrap gap-1.5 rounded-full bg-chalk p-1.5">
        {TABS.map((t) => {
          const active = t.topic === topic;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTopic(t.topic)}
              className={`relative flex-1 whitespace-nowrap rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${active ? "text-white" : "text-graphite hover:text-ink"}`}
            >
              {active && <motion.span layoutId="contact-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={topic}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-7"
        >
          <h2 className="text-[1.7rem] font-bold leading-[1.05] tracking-[-0.045em] text-ink">{copy.title}</h2>
          <p className="mt-2.5 text-[0.98rem] leading-relaxed text-graphite">{copy.description}</p>
          <div className="mt-6">
            <BookingForm topic={topic} source="contacto" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
