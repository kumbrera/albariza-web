import { lazy, Suspense, useEffect, useState } from "react";

// The 3D laptop costs ~270 KB of three.js plus the model, and parsing it blocked a mid-range
// phone for seconds, delaying the whole hero. The poster (the loop's first frame) is rendered
// on the server and is the page's LCP image; the 3D scene is only fetched once the page has
// fully loaded and the main thread is idle, then crossfades in over the identical poster.
const HeroLaptop = lazy(() => import("./HeroLaptop"));

const Poster = () => (
  <img
    src="/hero/laptop-poster.webp"
    alt=""
    width={1226}
    height={980}
    fetchPriority="high"
    className="aspect-[5/4] w-full"
  />
);

export default function HeroLaptopLazy() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return; // data saver on: keep the still image
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idleId = idle(() => setGo(true), { timeout: 3000 }) as number;
    };

    // Phones: wait for the first gesture, so the first screen loads without the 3D parse
    // competing for a weak CPU. Anyone who stays touches or scrolls within a moment.
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const gestures = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
    const onGesture = () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      start();
    };
    if (small) gestures.forEach((g) => window.addEventListener(g, onGesture, { once: true, passive: true }));
    else if (document.readyState === "complete") timer = setTimeout(start, 300);
    else window.addEventListener("load", () => (timer = setTimeout(start, 300)), { once: true });

    return () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      if (timer) clearTimeout(timer);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, []);

  if (!go) return <Poster />;
  return (
    <Suspense fallback={<Poster />}>
      <HeroLaptop />
    </Suspense>
  );
}
