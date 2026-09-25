import { useEffect, useState } from "react";
import type { Transition, Variants } from "motion/react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BorderBeam } from "@/components/ui/border-beam";
import BookingForm from "@/components/BookingForm";
import { topicCopy } from "@/data/booking";

const variants: Variants = {
  initial: { scale: 0.9, filter: "blur(10px)", y: "100%" },
  animate: { scale: 1, filter: "blur(0px)", y: 0 },
  exit: { scale: 0.9, filter: "blur(10px)", y: "100%" },
};
const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

export default function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  // Bumped on every open so the form starts fresh, not on the last success screen.
  const [session, setSession] = useState(0);
  const [done, setDone] = useState(false);
  const copy = topicCopy(topic);

  // Any element with [data-open-booking] opens the dialog, from any island or plain Astro markup.
  // Its value picks the service ("" = the free asesoría session), data-booking-note pre-fills the
  // message, and its href stays as the no-JS fallback.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-open-booking]");
      if (!trigger) return;
      e.preventDefault();
      setTopic(trigger.dataset.openBooking ?? "");
      setNote(trigger.dataset.bookingNote ?? "");
      setSession((n) => n + 1);
      setDone(false);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen} variants={variants} transition={transition}>
      <DialogContent className="max-h-[94vh] w-[min(560px,calc(100vw-2rem))] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[26px] border-0 bg-white p-0 font-grotesk text-ink shadow-[0_40px_120px_-30px_rgba(22,21,31,0.55)] backdrop:bg-ink/55 backdrop:backdrop-blur-sm">
        <div className="relative p-6 sm:p-8">
          <BorderBeam size={240} duration={7} colorFrom="#7c66ff" colorTo="#3fd3bf" borderWidth={3} />
          <BorderBeam size={240} duration={7} delay={3.5} reverse colorFrom="#3fd3bf" colorTo="#7c66ff" borderWidth={3} />

          <DialogHeader className={done ? "sr-only" : undefined}>
            <DialogTitle className="text-[1.55rem] font-bold leading-[1.05] tracking-[-0.045em] text-ink">{copy.title}</DialogTitle>
            <DialogDescription className="mt-2.5 text-[0.95rem] leading-relaxed text-graphite">{copy.description}</DialogDescription>
          </DialogHeader>
          <div className={done ? undefined : "mt-5"}>
            <BookingForm key={session} topic={topic} note={note} source="dialogo" onDone={() => setDone(true)} onClose={() => setOpen(false)} />
          </div>
          <DialogClose className="text-graphite hover:text-ink" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
