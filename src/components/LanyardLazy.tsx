import { lazy, Suspense, useEffect, useState, type ComponentProps } from "react";

// The Lanyard is a WebGL canvas: nothing useful to pre-render, and importing three/rapier/meshline
// during the static build crashed on Cloudflare's Node ("Cannot require() ES Module three in a
// cycle"). This wrapper renders an empty box of the same size on the server and only loads the
// real component in the browser.
const Lanyard = lazy(() => import("./Lanyard"));

type Props = ComponentProps<typeof Lanyard>;

export default function LanyardLazy(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const box = <div className={`w-full ${props.className ?? "h-screen"}`} aria-hidden="true" />;
  if (!mounted) return box;
  return (
    <Suspense fallback={box}>
      <Lanyard {...props} />
    </Suspense>
  );
}
