import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Counter from "@/components/Counter";
import * as THREE from "three";
import { BarChart3, Bell, CircleCheck, FileSpreadsheet, Mail, MessageCircle, Receipt, Users } from "lucide-react";

// drei <Html transform>: CSS px * (DF / 400) = world units. With DF = 2, 200px = 1 unit.
const DF = 2;
// Tabs render 20% larger than the screen UI; when they land on a 175px tile they shrink to match.
const TAB_DF = 2.2;
const TAB_MERGE_SCALE = (175 * DF) / (230 * TAB_DF);
const LOOP = 11;
const CHAOS_END = 4;
const CONVERGE_END = 6.4;
const HOLD_END = 9;

const CAM_Y = 1.9;
const LOOK_Y = 0.1;
// Laptop model (public/models/laptop/laptop.glb, "Laptop (FREE)" by Brandon Westlake, Sketchfab).
// The file holds two laptops; we use the open one ("Cube.002": body + keys). Its mesh space is
// Z-up, 220 units wide: base in XY (front edge y=-70, hinge y=+70), lid rising to z=134 while
// leaning back to y=98.9. Rotated -90° on X it faces the camera; scaled to 3.2 scene units wide.
const MODEL_S = 3.2 / 220;
const LID_TILT = -Math.atan2(98.9 - 70, 134.3 - 3);
const LID_PIVOT = new THREE.Vector3(0, 3 * MODEL_S, -70 * MODEL_S);
const SCREEN_CENTER = new THREE.Vector3(0, 0.81, 0.045);

type Tab = {
  title: string;
  url: string;
  icon: ReactNode;
  tone: string;
  orbit: { radius: number; height: number; speed: number; phase: number; tilt: number };
  target?: number;
};

const TABS: Tab[] = [
  { title: "Factura_final_v3 (2).xlsx", url: "drive / facturas / 2026", icon: <FileSpreadsheet size={13} />, tone: "#1f7a4d", orbit: { radius: 2.1, height: 2.2, speed: 0.32, phase: 0.2, tilt: 0.1 }, target: 0 },
  { title: "WhatsApp · 47 sin leer", url: "web.whatsapp.com", icon: <MessageCircle size={13} />, tone: "#1b8a5a", orbit: { radius: 2.4, height: 1.1, speed: -0.26, phase: 2.3, tilt: -0.08 }, target: 1 },
  { title: "Informe mensual (sin hacer)", url: "docs / informes", icon: <BarChart3 size={13} />, tone: "#4f32e0", orbit: { radius: 1.9, height: 2.7, speed: 0.22, phase: 4.3, tilt: 0.12 }, target: 2 },
  { title: "Presupuesto (copia).xlsx", url: "escritorio / nuevo", icon: <Receipt size={13} />, tone: "#8a6d1f", orbit: { radius: 2.5, height: 1.7, speed: 0.4, phase: 1.3, tilt: -0.1 } },
  { title: "Re: ¿me reenvías el pedido?", url: "mail / bandeja", icon: <Mail size={13} />, tone: "#b3413a", orbit: { radius: 2.2, height: 0.5, speed: -0.34, phase: 3.4, tilt: 0.06 } },
  { title: "Recordatorio: llamar a…", url: "calendario / hoy", icon: <Bell size={13} />, tone: "#5c5b66", orbit: { radius: 2.3, height: 2.6, speed: 0.28, phase: 5.4, tilt: -0.05 } },
];

const TILES = [
  { title: "Facturación", detail: "Se emite sola al cerrar el pedido", icon: <Receipt size={15} /> },
  { title: "Clientes", detail: "Todos en el CRM, con seguimiento", icon: <Users size={15} /> },
  { title: "Informe del mes", detail: "Actualizado cada mañana", icon: <BarChart3 size={15} /> },
];
// Tile centres on the screen, in lid-local units (screen is 590x340px = 2.95x1.7 units, sized
// to the model's display).
// Grid: 20px side padding, 3 cols of ~175px with 12px gaps -> centres at -187/0/+187px (±0.94);
// tiles are 160px tall starting ~66px from the top, so their centre sits ~24px above the screen
// centre (+0.12).
const TILE_LOCAL = [-0.94, 0, 0.94].map((x) => new THREE.Vector3(x, SCREEN_CENTER.y + 0.12, SCREEN_CENTER.z + 0.02));

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function phaseAt(t: number) {
  const merge = t < CHAOS_END ? 0 : t < CONVERGE_END ? smooth(CHAOS_END, CONVERGE_END, t) : t < HOLD_END ? 1 : 1 - smooth(HOLD_END, LOOP, t);
  const noise = t < CHAOS_END ? 1 : t < HOLD_END ? 1 - smooth(CHAOS_END, 5.4, t) : smooth(HOLD_END, 10.3, t);
  const screen = t < 5.6 ? 0 : t < HOLD_END ? smooth(5.6, CONVERGE_END + 0.2, t) : 1 - smooth(HOLD_END, 9.7, t);
  return { merge, noise, screen };
}

const MODEL_URL = "/models/laptop/laptop.glb";

function LaptopModel() {
  // Meshopt-compressed (decoder ships with three), no Draco -> no decoder fetched from a CDN.
  const { scene } = useGLTF(MODEL_URL, false, true);
  const parts = useMemo(() => {
    const out: THREE.Mesh[] = [];
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && o.name.includes("002")) out.push(o as THREE.Mesh);
    });
    return out;
  }, [scene]);
  return (
    <group scale={MODEL_S} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Each mesh keeps its own local transform: meshopt quantization stores the dequantize
          scale/offset there, so geometry alone would render tiny. */}
      {parts.map((m) => (
        <mesh key={m.uuid} geometry={m.geometry} material={m.material} position={m.position} quaternion={m.quaternion} scale={m.scale} />
      ))}
    </group>
  );
}
useGLTF.preload(MODEL_URL, false, true);

// A fixed portal target for every drei <Html>. Without it, Html's target switches from the canvas
// parent to R3F's event wrapper right after mount; drei then unmounts the React root mid-render
// ("Attempted to synchronously unmount a root…") and the recreated root sometimes never repaints.
type Portal = React.RefObject<HTMLElement>;

function Laptop({
  lidRef,
  tilesRef,
  portal,
  screenApi,
}: {
  lidRef: React.RefObject<THREE.Group | null>;
  tilesRef: React.RefObject<HTMLDivElement | null>;
  portal: Portal;
  screenApi: React.RefObject<ScreenApi>;
}) {
  return (
    <group>
      <LaptopModel />
      <group ref={lidRef} position={LID_PIVOT} rotation={[LID_TILT, 0, 0]}>
        <Html portal={portal} zIndexRange={[20, 0]} transform distanceFactor={DF} position={[SCREEN_CENTER.x, SCREEN_CENTER.y, SCREEN_CENTER.z]} pointerEvents="none">
          <Screen tilesRef={tilesRef} api={screenApi} />
        </Html>
      </group>
    </group>
  );
}

// Opacity is driven straight on the DOM from useFrame — re-rendering the drei <Html> tree every
// frame makes React 19 tear its root down mid-render and the screen never appears. The hours
// counter lives in the Html's own React root, so updating it there is safe.
export type ScreenApi = { setHours: ((h: number) => void) | null };

function Screen({ tilesRef, api }: { tilesRef: React.RefObject<HTMLDivElement | null>; api: React.RefObject<ScreenApi> }) {
  const [hours, setHours] = useState(0);
  useEffect(() => {
    api.current.setHours = setHours;
    return () => {
      api.current.setHours = null;
    };
  }, [api]);
  return (
    <div
      className="relative h-[340px] w-[590px] overflow-hidden rounded-[6px] font-grotesk"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #2a2150 0%, #14131b 62%)" }}
    >
      <div className="flex items-center justify-between px-6 pt-5 text-[13px] text-white/55">
        <span className="font-semibold text-white/85">Tu sistema</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0f9c8b]" />
          Todo al día
        </span>
      </div>
      <div ref={tilesRef} className="grid grid-cols-3 gap-3 px-5 pt-7" style={{ opacity: 0 }}>
        {TILES.map((tile) => (
          <div key={tile.title} className="h-[160px] rounded-[10px] border border-white/10 bg-white/[0.06] p-3.5 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4f32e0]">{tile.icon}</div>
            <div className="mt-4 text-[14px] font-semibold leading-tight">{tile.title}</div>
            <div className="mt-1.5 text-[11.5px] leading-snug text-white/55">{tile.detail}</div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#3fd3bf]">
              <CircleCheck size={12} /> Automático
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white">
        <div>
          <div className="text-[12px] text-white/55">Horas recuperadas esta semana</div>
          <div className="mt-1 h-1 w-44 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#3fd3bf] transition-[width] duration-[1600ms] ease-out" style={{ width: `${(hours / 12) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-baseline font-bold tracking-[-0.04em] text-[#3fd3bf]">
          <Counter value={hours} places={[10, 1]} fontSize={40} padding={4} gap={0} horizontalPadding={0} textColor="currentColor" fontWeight={700} gradientHeight={6} gradientFrom="#17161f" />
          <span className="ml-1 text-[20px]">h</span>
        </div>
      </div>
    </div>
  );
}

function TabCard({ tab }: { tab: Tab }) {
  return (
    <div className="w-[230px] overflow-hidden rounded-[9px] border border-black/10 bg-white font-grotesk text-[#16151f] shadow-[0_18px_40px_-18px_rgba(22,21,31,0.45)]">
      <div className="flex items-center gap-1.5 bg-[#ecebf0] px-2.5 pt-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6159]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c941]" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-t-md bg-white px-2 py-1.5 text-[11px] font-medium">
          <span style={{ color: tab.tone }}>{tab.icon}</span>
          <span className="truncate">{tab.title}</span>
        </div>
      </div>
      <div className="px-2.5 py-1.5">
        <div className="truncate rounded bg-[#f1f1ee] px-2 py-1 text-[10px] text-[#3f3e48]">{tab.url}</div>
      </div>
      <div className="space-y-1.5 px-2.5 pb-3 pt-1">
        <div className="h-1.5 w-[88%] rounded bg-[#e3e2dc]" />
        <div className="h-1.5 w-[64%] rounded bg-[#e3e2dc]" />
        <div className="h-1.5 w-[76%] rounded bg-[#e3e2dc]" />
      </div>
    </div>
  );
}

function Scene({ reduced, portal }: { reduced: boolean; portal: Portal }) {
  const lidRef = useRef<THREE.Group>(null);
  const tabRefs = useRef<(THREE.Group | null)[]>([]);
  const tabEls = useRef<(HTMLDivElement | null)[]>([]);
  const tilesRef = useRef<HTMLDivElement>(null);
  const screenApi = useRef<ScreenApi>({ setHours: null });
  const hoursShown = useRef(false);
  const { camera, pointer } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const orbitQuat = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame((state) => {
    const t = reduced ? HOLD_END - 0.5 : state.clock.elapsedTime % LOOP;
    const { merge, noise, screen: screenP } = phaseAt(t);

    if (!reduced) {
      camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (CAM_Y + pointer.y * 0.25 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, LOOK_Y, 0);

    if (tilesRef.current) {
      tilesRef.current.style.opacity = String(screenP);
      tilesRef.current.style.transform = `translateY(${(1 - screenP) * 10}px)`;
    }
    const showHours = screenP > 0.6;
    if (showHours !== hoursShown.current && screenApi.current.setHours) {
      hoursShown.current = showHours;
      screenApi.current.setHours(showHours ? 12 : 0);
    }

    const lid = lidRef.current;
    if (!lid) return;
    lid.updateWorldMatrix(true, false);
    lid.getWorldQuaternion(targetQuat);

    TABS.forEach((tab, i) => {
      const g = tabRefs.current[i];
      const el = tabEls.current[i];
      if (!g || !el) return;
      const { radius, height, speed, phase, tilt } = tab.orbit;
      const time = reduced ? 0 : state.clock.elapsedTime;
      const a = phase + time * speed;
      // Horizontal extent squeezed so cards never cross the canvas edge (drei clips Html there).
      const ox = Math.sin(a) * radius * 0.74;
      const oz = Math.cos(a) * radius * 0.7;
      const oy = height - 0.55 + Math.sin(time * 0.9 + phase) * 0.12;
      // Mostly facing the viewer (a card seen edge-on collapses to a line), with a slight
      // yaw toward the centre and a gentle wobble so they still read as loose, floating tabs.
      euler.set(tilt, -ox * 0.12 + Math.sin(a * 1.7) * 0.18, tilt * 0.8 + Math.sin(a) * 0.08);
      orbitQuat.setFromEuler(euler);

      // Behind the laptop (negative z) the DOM card still paints over the canvas, so fake the
      // depth instead: fade and shrink as it swings round the back.
      const depth = THREE.MathUtils.clamp((oz + 1.2) / 2.4, 0, 1);
      const depthOpacity = 0.25 + depth * 0.75;
      const depthScale = 0.8 + depth * 0.2;

      if (tab.target !== undefined) {
        lid.localToWorld(tmp.copy(TILE_LOCAL[tab.target]));
        g.position.set(
          THREE.MathUtils.lerp(ox, tmp.x, merge),
          THREE.MathUtils.lerp(oy, tmp.y, merge),
          THREE.MathUtils.lerp(oz, tmp.z, merge),
        );
        g.quaternion.copy(orbitQuat).slerp(targetQuat, merge);
        g.scale.setScalar(THREE.MathUtils.lerp(depthScale, TAB_MERGE_SCALE, merge));
        const handoff = 1 - smooth(0.82, 1, merge) * screenP;
        el.style.opacity = String(THREE.MathUtils.lerp(depthOpacity, 1, merge) * handoff);
      } else {
        g.position.set(ox * (1 + (1 - noise) * 0.5), oy + (1 - noise) * 0.8, oz);
        g.quaternion.copy(orbitQuat);
        g.scale.setScalar(depthScale);
        el.style.opacity = String(depthOpacity * noise);
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} />
      <pointLight position={[0, 2.6, -2.6]} intensity={7} distance={5} color="#6d55ff" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 2, 1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#bdb3ff" position={[5, 2, -1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>

      <group position={[0, -0.4, 0]}>
        <Laptop lidRef={lidRef} tilesRef={tilesRef} portal={portal} screenApi={screenApi} />
        <ContactShadows position={[0, -0.07, 0]} opacity={0.45} scale={9} blur={2.6} far={3} color="#16151f" />
      </group>

      <group>
        {TABS.map((tab, i) => (
          <group key={tab.title} ref={(el) => { tabRefs.current[i] = el; }}>
            <Html portal={portal} zIndexRange={[20, 0]} transform distanceFactor={TAB_DF} pointerEvents="none">
              <div ref={(el) => { tabEls.current[i] = el; }} style={{ willChange: "opacity" }}>
                <TabCard tab={tab} />
              </div>
            </Html>
          </group>
        ))}
      </group>
    </>
  );
}

// Mounts only once the Suspense boundary resolves (model loaded), so the hero fades in whole
// instead of popping in piece by piece.
function OnReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

export default function HeroLaptop() {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Same box as the canvas, committed before R3F renders the scene — so drei's Html target is
  // stable from the very first effect.
  const portalRef = useRef<HTMLDivElement>(null!);
  const [ready, setReady] = useState(false);
  return (
    <div className="relative aspect-[5/4] w-full" aria-hidden="true">
    {/* First frame of the loop, shown until the model is loaded, then crossfaded out. */}
    <img
      src="/hero/laptop-poster.webp"
      alt=""
      width={1226}
      height={980}
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700"
      style={{ opacity: ready ? 0 : 1 }}
    />
    <div
      ref={portalRef}
      className="hero-3d absolute inset-0 transition-opacity duration-700 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, CAM_Y, 6.8], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene reduced={reduced} portal={portalRef} />
          <OnReady onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
    </div>
    </div>
  );
}
