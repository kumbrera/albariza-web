import { Component, lazy, Suspense, useEffect, useState, type ComponentProps, type ReactNode } from "react";

// The Lanyard is a WebGL canvas: nothing useful to pre-render, and importing three/rapier/meshline
// during the static build crashed on Cloudflare's Node ("Cannot require() ES Module three in a
// cycle"). This wrapper renders an empty box of the same size on the server and only loads the
// real component in the browser.
const Lanyard = lazy(() => import("./Lanyard"));

type Props = ComponentProps<typeof Lanyard>;

// Some browsers can't run the 3D scene: corporate "remote/isolated" browsers (Zscaler Cloud Browser
// Isolation and similar) stream the page from a server without a GPU, so WebGL — and sometimes
// WebAssembly, which the physics engine needs — is missing. Without this check the section stayed
// an empty box. Those visitors get the same cards as plain images.
function canRun3D(): boolean {
  try {
    if (typeof WebAssembly !== "object") return false;
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") ?? c.getContext("webgl");
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

// Anything that still fails at runtime (chunk blocked by a proxy, WebGL context refused…) also
// falls back instead of blanking the section.
class Fallback3D extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticCards({ cards, className }: Pick<Props, "cards" | "className">) {
  // The "drag the cards" hint makes no sense without the 3D scene.
  useEffect(() => {
    document.documentElement.dataset.noWebgl = "";
  }, []);
  const list = cards ?? [];
  const tilt = ["-rotate-3", "rotate-1", "rotate-3"];
  return (
    <div className={`flex w-full items-start justify-center ${className ?? ""} !h-auto !min-h-0 pb-20 pt-10`}>
      <ul className="flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 px-6 sm:gap-10">
        {list.map((c, i) => (
          <li key={i} className={`flex w-[min(42vw,15rem)] flex-col items-center ${tilt[i % tilt.length]}`}>
            <span className="h-14 w-6 rounded-b-sm bg-ink shadow-sm" aria-hidden="true" />
            <img
              src={c.frontImage ?? undefined}
              alt=""
              width={1000}
              height={1510}
              loading="lazy"
              decoding="async"
              className="-mt-1 w-full rounded-2xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LanyardLazy(props: Props) {
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  useEffect(() => setMode(canRun3D() ? "3d" : "static"), []);

  const box = <div className={`w-full ${props.className ?? "h-screen"}`} aria-hidden="true" />;
  const fallback = <StaticCards cards={props.cards} className={props.className} />;
  if (mode === "pending") return box;
  if (mode === "static") return fallback;
  return (
    <Fallback3D fallback={fallback}>
      <Suspense fallback={box}>
        <Lanyard {...props} />
      </Suspense>
    </Fallback3D>
  );
}
