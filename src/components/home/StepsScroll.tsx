import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Step {
  title: string;
  text: string;
}

export default function StepsScroll({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.querySelectorAll("li").forEach((li) => li.classList.add("is-active"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      list.querySelectorAll("li").forEach((li) => {
        ScrollTrigger.create({
          trigger: li,
          start: "top 62%",
          onEnter: () => li.classList.add("is-active"),
          onLeaveBack: () => li.classList.remove("is-active"),
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={listRef} className="steps relative space-y-24 pl-16 sm:pl-20">
      <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-ink/12 sm:left-[23px]" />
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-violet sm:left-[23px]"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="step-dot absolute -left-16 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-chalk text-[1rem] font-semibold text-graphite transition-colors duration-500 sm:-left-20 sm:h-12 sm:w-12">
            {i + 1}
          </span>
          <h3 className="step-title text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.05] text-graphite/60 transition-colors duration-500">
            {step.title}
          </h3>
          <p className="mt-4 max-w-[46ch] text-[1.08rem] leading-relaxed text-graphite">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
