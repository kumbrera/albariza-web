import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { services } from "../data/services";

const N = services.length;

/** Shortest signed circular distance from `active` to `i`, in range (-floor(N/2), floor(N/2)] */
function signedDistance(i: number, active: number, n: number) {
  let d = i - active;
  d = ((d % n) + n) % n; // normalize to [0, n)
  if (d > n / 2) d -= n;
  return d;
}

const AUTOPLAY_MS = 4000;

export default function ServicesCarousel() {
  const [active, setActive] = useState(Math.floor(N / 2));
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Ref, not state: pausing shouldn't trigger a re-render, it just gates the interval tick.
  const pausedRef = useRef(false);

  const goTo = useCallback((i: number) => {
    setActive(((i % N) + N) % N);
  }, []);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Auto-advance the wheel every few seconds, paused while dragging or hovered.
  // Uses a functional state update so the interval never captures a stale `active`.
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  // Only the active card's background video actually plays — everyone else sits paused
  // on whatever frame they're on. Keeps 5 looping clips from all decoding at once.
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        void el.play().catch(() => {
          /* a rejected autoplay (no user gesture yet) will just retry next time active changes */
        });
      } else {
        el.pause();
      }
    });
  }, [active]);

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      pausedRef.current = false;
      const OFFSET_THRESHOLD = 60;
      const VELOCITY_THRESHOLD = 350;
      if (info.offset.x < -OFFSET_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD) {
        next();
      } else if (info.offset.x > OFFSET_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD) {
        prev();
      }
    },
    [next, prev]
  );

  // A single invisible layer sits on top and owns every pointer gesture (drag AND click).
  // Cards underneath are purely presentational — this avoids fighting Framer Motion's
  // drag engine over the same x/y values that `animate` is trying to control on a card.
  //
  // This is a plain onClick (not Framer's onTap): onTap uses `info.point`, which is in
  // *page* coordinates, while elementFromPoint needs *viewport* coordinates — with the
  // carousel scrolled away from the top of the page those don't match, so onTap silently
  // missed every card except by coincidence. A native click's clientX/clientY are always
  // viewport-relative, and — since Framer only takes over the gesture once the pointer
  // has moved past its drag threshold — small in-place clicks still reach us untouched.
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      overlay.style.pointerEvents = "none";
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      overlay.style.pointerEvents = "";
      const cardEl = target?.closest<HTMLElement>("[data-card-index]");
      if (!cardEl) return;
      const index = Number(cardEl.dataset.cardIndex);
      const slug = cardEl.dataset.slug;
      if (index === active && slug) {
        window.location.href = `/servicios/${slug}`;
      } else {
        goTo(index);
      }
    },
    [active, goTo]
  );

  const cards = useMemo(
    () =>
      services.map((service, i) => ({
        service,
        diff: signedDistance(i, active, N),
        index: i,
      })),
    [active]
  );

  // Percentage (of a card's own width) by which each neighbour is offset from dead-center.
  const SPACING = 50;

  return (
    <div className="relative w-full select-none">
      <div
        className="relative mx-auto h-[280px] max-w-7xl overflow-visible sm:h-[340px] md:h-[400px] lg:h-[440px]"
        style={{ perspective: 1400 }}
        role="list"
        aria-label="Nuestros servicios"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {cards.map(({ service, diff, index }) => {
          const isActive = diff === 0;
          const abs = Math.abs(diff);
          const visible = abs <= Math.floor(N / 2);

          const scale = isActive ? 1 : abs === 1 ? 0.86 : 0.7;
          // Centered as its own "-50%" baseline, plus the wheel offset — same unit (% of
          // the card's own width), so framer-motion can tween it as one plain percentage.
          const x = `${-50 + diff * SPACING}%`;
          const rotateY = diff * -18;
          const opacity = !visible ? 0 : isActive ? 1 : abs === 1 ? 0.55 : 0.25;
          const blur = isActive ? 0 : abs === 1 ? 2 : 4;
          const z = 30 - abs * 10;

          return (
            <motion.div
              key={service.slug}
              data-card-index={index}
              data-slug={service.slug}
              role="listitem"
              aria-current={isActive}
              className={`corner-brackets ${isActive ? "is-active" : ""} absolute h-[220px] w-[86%] max-w-[460px] rounded-2xl border border-white/10 shadow-2xl shadow-black/60 sm:h-[270px] sm:w-[70%] sm:max-w-[620px] md:h-[320px] md:w-[58%] md:max-w-[720px] lg:h-[360px] lg:max-w-[820px]`}
              style={{ top: "50%", left: "50%", zIndex: z, filter: `blur(${blur}px)` }}
              animate={{ x, y: "-50%", scale, rotateY, opacity }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              <span className="bracket-tl" />
              <span className="bracket-tr" />
              <span className="bracket-bl" />
              <span className="bracket-br" />

              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {/* Fallback colour shows for an instant before the video has a frame ready */}
                <div
                  className={`plasma-bg absolute inset-0 bg-gradient-to-br ${service.gradient}`}
                />
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "brightness(0.72) saturate(1.15) contrast(1.05)" }}
                  src={service.video}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
                <div
                  className="shine-sweep"
                  style={{ "--shine-delay": `${index * 0.9}s` } as CSSProperties}
                />
                {/* Scrim: darkens the whole card a touch so any footage still reads as
                    premium/dark, and goes near-opaque at the bottom so text is always legible
                    regardless of what's happening in that particular frame of the clip. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

                <div className="relative flex h-full flex-col justify-end p-5 sm:p-7">
                  <h3 className="text-glow break-words text-[clamp(1.15rem,2.4vw,2.1rem)] font-black uppercase leading-[1.15] tracking-tight text-white">
                    {service.name}
                  </h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 max-w-md text-sm text-white/75"
                      >
                        {service.description}{" "}
                        <span className="whitespace-nowrap font-semibold text-white">
                          Ver servicio →
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Single gesture layer: owns drag (pan the wheel) and click (select/navigate) */}
        <motion.div
          ref={overlayRef}
          className="absolute inset-0 z-50 cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragElastic={0.15}
          dragSnapToOrigin
          onDragStart={() => {
            pausedRef.current = true;
          }}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
        />
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Servicio anterior"
        className="absolute left-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white sm:left-2 md:left-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente servicio"
        className="absolute right-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white sm:right-2 md:right-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {services.map((service, i) => (
          <button
            key={service.slug}
            type="button"
            aria-label={`Ir a ${service.name}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
