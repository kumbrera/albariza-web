// Renders social media images into interno/redes/ (gitignored: drafts until Pablo approves them).
// Same pipeline as build-og.mjs: headless Edge draws the HTML with the real Geist font.
//   node scripts/build-social.mjs
//
// Instagram banner: three 1080x1350 posts that together read as one banner on the profile grid.
// The grid shows each post cropped to 3:4 (1012px of its 1080px width), so the design is laid out
// on the visible strip and every tile takes 34px of bleed from its neighbour: seams line up on the grid.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "interno", "redes");
const tmp = path.join(out, ".tmp");
mkdirSync(tmp, { recursive: true });

const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
if (!browser) throw new Error("Edge or Chrome is needed to render the images.");

const font = pathToFileURL(path.join(root, "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")).href;
const wordmark = readFileSync(path.join(root, "public/brand/albariza-wordmark.svg"), "utf8").replace(/width="350" height="84"/, 'width="100%" height="100%"');

const noise = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
).toString("base64");

const base = `
@font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { overflow: hidden; font-family: Geist, sans-serif; color: #16151f; }
body { position: relative; background: #f1f1ee; }
.grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml;base64,${noise}"); background-size: 220px; opacity: .08; mix-blend-mode: multiply; pointer-events: none; }
.pill { display: inline-block; background: #4f32e0; color: #fff; font-weight: 600; border-radius: 999px; box-shadow: 0 14px 30px -12px rgba(79,50,224,.7); }
.tag { display: inline-block; border: 1.5px solid rgba(22,21,31,.14); background: rgba(255,255,255,.55); border-radius: 999px; color: #16151f; font-weight: 500; }
`;

function render(name, w, h, html) {
  const file = path.join(tmp, `${name}.html`);
  writeFileSync(file, html);
  const png = path.join(tmp, `${name}.png`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--window-size=${w},${h}`, "--force-device-scale-factor=1", `--screenshot=${png}`, pathToFileURL(file).href], { stdio: "ignore" });
  return png;
}

// ---- Instagram banner (3 pinned posts) ----
const TILE = 1080;
const H = 1350;
const CROP = 34; // hidden on each side of a tile in the 3:4 grid
const VIS = TILE - 2 * CROP; // 1012
const W = 3 * VIS + 2 * CROP; // 3104: visible strip plus outer bleed
// Visible tile i spans [CROP + i*VIS, CROP + (i+1)*VIS] on the canvas.
const tx = (i) => CROP + i * VIS;
const SAFE = 90; // text keeps clear of the seams

const banner = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
html, body { width: ${W}px; height: ${H}px; }
.glow { position: absolute; inset: 0;
  background: radial-gradient(28% 55% at 62% 48%, rgba(109,85,255,.34), transparent 70%),
              radial-gradient(22% 45% at 12% 100%, rgba(63,211,191,.18), transparent 70%),
              radial-gradient(20% 40% at 96% 0%, rgba(109,85,255,.16), transparent 70%); }
/* Scaled and placed so both seams fall in letter gaps (l|b and i|z) instead of cutting a letter. */
.mark { position: absolute; left: 309px; width: 2540px; top: 394px; height: 562px; }
.mark svg { display: block; width: 100%; height: 100%; }
.t1 { position: absolute; left: ${tx(0) + SAFE}px; top: 120px; font-size: 38px; padding: 16px 30px; }
.t3 { position: absolute; right: ${W - tx(3) + SAFE}px; top: 120px; font-size: 38px; padding: 16px 30px; }
.claim { position: absolute; left: ${tx(1) + SAFE}px; width: ${VIS - 2 * SAFE}px; top: 1060px; font-size: 64px; line-height: 1.02; font-weight: 700; letter-spacing: -0.045em; text-align: center; }
.cta { position: absolute; right: ${W - tx(3) + SAFE}px; top: 1082px; text-align: right; }
.cta .pill { font-size: 36px; padding: 20px 36px; }
.cta p { margin-top: 20px; font-size: 32px; color: #5c5b66; }
.sub { position: absolute; left: ${tx(0) + SAFE}px; width: ${VIS - 2 * SAFE}px; top: 1076px; font-size: 38px; line-height: 1.3; color: #5c5b66; letter-spacing: -0.01em; }
</style></head><body>
<div class="glow"></div>
<span class="tag t1">Asesoría de procesos y automatización</span>
<span class="tag t3">Pymes · autónomos · directivos</span>
<div class="mark">${wordmark}</div>
<p class="sub">Menos Excel y WhatsApp sueltos. Más orden y horas libres.</p>
<p class="claim">Ponemos orden en cómo trabaja tu empresa.</p>
<div class="cta"><span class="pill">Sesión gratuita de 30 min</span><p>albarizadigital.com</p></div>
<div class="grain"></div>
</body></html>`;

const bannerPng = render("ig-banner", W, H, banner);
// Full-strip preview of what the grid will look like (with Instagram's 3px gaps).
const tiles = [];
for (let i = 0; i < 3; i++) {
  const tile = await sharp(bannerPng).extract({ left: i * VIS, top: 0, width: TILE, height: H }).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  // Numbered in publishing order: the right tile goes up first, so it ends up rightmost.
  writeFileSync(path.join(out, `ig-banner-${["izquierda", "centro", "derecha"][i]}-publicar-${["3o", "2o", "1o"][i]}.jpg`), tile);
  tiles.push(await sharp(tile).extract({ left: CROP, top: 0, width: VIS, height: H }).toBuffer());
}
const GAP = 3;
await sharp({ create: { width: 3 * VIS + 2 * GAP, height: H, channels: 3, background: "#ffffff" } })
  .composite(tiles.map((input, i) => ({ input, left: i * (VIS + GAP), top: 0 })))
  .jpeg({ quality: 85 })
  .toFile(path.join(out, "ig-banner-preview-grid.jpg"));

// ---- Carousels (1080x1350 slides: JPGs for Instagram, one PDF for a LinkedIn document post) ----
const SW = 1080;
const SH = 1350;
const smallMark = wordmark.replace('width="100%" height="100%"', 'width="150" height="36"');
const check = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

const slideCss = `${base}
.slide { position: relative; width: ${SW}px; height: ${SH}px; overflow: hidden; background: #f1f1ee; page-break-after: always; }
.slide .glow { position: absolute; inset: 0; background: radial-gradient(60% 45% at 85% 12%, rgba(109,85,255,.24), transparent 70%), radial-gradient(50% 35% at 0% 100%, rgba(63,211,191,.14), transparent 70%); }
.slide.dark { background: #16151f; color: #f1f1ee; }
.slide.dark .glow { background: radial-gradient(60% 50% at 80% 20%, rgba(109,85,255,.45), transparent 70%), radial-gradient(50% 40% at 10% 100%, rgba(63,211,191,.18), transparent 70%); }
.top { position: absolute; left: 88px; right: 88px; top: 80px; display: flex; justify-content: space-between; align-items: center; }
.count { font-size: 28px; color: #5c5b66; font-variant-numeric: tabular-nums; }
.dark .count { color: rgba(241,241,238,.6); }
.body { position: absolute; left: 88px; right: 88px; top: 250px; bottom: 170px; display: flex; flex-direction: column; }
.eyebrow { font-size: 32px; font-weight: 600; color: #4f32e0; letter-spacing: -0.01em; }
.dark .eyebrow { color: #a898ff; }
h1 { margin-top: 36px; font-size: 104px; line-height: .96; font-weight: 700; letter-spacing: -0.055em; }
h2 { font-size: 76px; line-height: 1; font-weight: 700; letter-spacing: -0.05em; }
.lead { margin-top: 44px; font-size: 40px; line-height: 1.35; color: #5c5b66; letter-spacing: -0.01em; max-width: 26ch; }
.dark .lead { color: rgba(241,241,238,.72); }
.foot { position: absolute; left: 88px; right: 88px; bottom: 80px; display: flex; justify-content: space-between; align-items: center; font-size: 28px; color: #5c5b66; }
.dark .foot { color: rgba(241,241,238,.6); }
.swipe { display: flex; align-items: center; gap: 14px; font-weight: 600; color: #16151f; }
.num { font-size: 300px; line-height: .8; font-weight: 700; letter-spacing: -0.07em; color: transparent; -webkit-text-stroke: 3px rgba(79,50,224,.55); }
.steps { display: flex; gap: 12px; }
.steps i { width: 64px; height: 8px; border-radius: 99px; background: rgba(22,21,31,.12); }
.steps i.on { background: #4f32e0; }
.problem { font-size: 68px; line-height: 1.05; font-weight: 700; letter-spacing: -0.045em; }
.fix { margin-top: auto; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 36px; padding: 44px 48px; box-shadow: 0 40px 80px -48px rgba(22,21,31,.55); }
.fix .label { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 600; color: #0a6f63; }
.fix .label span { width: 48px; height: 48px; border-radius: 50%; background: #0f9c8b; color: #fff; display: flex; align-items: center; justify-content: center; }
.fix p { margin-top: 22px; font-size: 42px; line-height: 1.3; letter-spacing: -0.015em; }
.cta-pill { display: inline-block; margin-top: 64px; background: #4f32e0; color: #fff; font-size: 40px; font-weight: 600; padding: 30px 48px; border-radius: 999px; box-shadow: 0 24px 50px -18px rgba(79,50,224,.8); }
.url { margin-top: 30px; font-size: 34px; color: rgba(241,241,238,.7); }
`;

const arrow = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const whiteMark = readFileSync(path.join(root, "public/brand/albariza-wordmark-white.svg"), "utf8").replace(/width="350" height="84"/, 'width="150" height="36"');

const frame = (inner, i, total, { dark = false, swipe = true } = {}) => `
<section class="slide${dark ? " dark" : ""}"><div class="glow"></div>
  <div class="top">${dark ? whiteMark : smallMark}<span class="count">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span></div>
  <div class="body">${inner}</div>
  <div class="foot"><span>albarizadigital.com</span>${swipe ? `<span class="swipe">Desliza ${arrow}</span>` : ""}</div>
  <div class="grain"></div></section>`;

const ctaSlide = (title, lead) => (i, total) =>
  frame(`<p class="eyebrow">Sesión gratuita · 30 min</p><h1>${title}</h1><p class="lead">${lead}</p><div><span class="cta-pill">Reserva desde el enlace</span></div>`, i, total, { dark: true, swipe: false });

async function carousel(name, slides) {
  const total = slides.length;
  const pages = slides.map((s, i) => s(i, total));
  for (const [i, page] of pages.entries()) {
    const png = render(`${name}-${i + 1}`, SW, SH + 200, `<!doctype html><html><head><meta charset="utf-8"><style>${slideCss} html,body{width:${SW}px;height:${SH + 200}px;}</style></head><body>${page}</body></html>`);
    await sharp(png).extract({ left: 0, top: 0, width: SW, height: SH }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(out, name, `${String(i + 1).padStart(2, "0")}.jpg`));
  }
  const pdfHtml = path.join(tmp, `${name}.html`);
  writeFileSync(pdfHtml, `<!doctype html><html><head><meta charset="utf-8"><style>${slideCss} @page { size: ${SW}px ${SH}px; margin: 0; } html,body{margin:0;}</style></head><body>${pages.join("")}</body></html>`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer", `--print-to-pdf=${path.join(out, name, `${name}.pdf`)}`, pathToFileURL(pdfHtml).href], { stdio: "ignore" });
}

const stepsData = [
  ["Sesión gratuita", "30 minutos para entender tu negocio y señalar el proceso que más tiempo os roba.", "Una idea clara de por dónde empezar, contrates o no."],
  ["Auditoría de procesos", "Nos sentamos con el equipo y mapeamos cómo se trabaja hoy: qué se repite, qué se pierde y cuánto cuesta.", "El mapa de ese proceso y las horas que os está costando."],
  ["Diseño e implementación", "Diseñamos cómo debería funcionar ese proceso y lo montamos sobre las herramientas que ya usáis.", "El sistema funcionando y tu equipo sabiendo usarlo."],
  ["Medición y ajuste", "Medimos horas y errores antes y después. Si funciona, pasamos al siguiente proceso.", "El ahorro real, en horas y en euros."],
];
mkdirSync(path.join(out, "carrusel-como-trabajamos"), { recursive: true });
await carousel("carrusel-como-trabajamos", [
  (i, t) => frame(`<p class="eyebrow">Cómo trabajamos</p><h1>4 pasos para poner orden en tu empresa.</h1><p class="lead">Sin digitalizar todo de golpe. Un proceso cada vez, medido en horas.</p>`, i, t),
  ...stepsData.map(([title, text, get], s) => (i, t) =>
    frame(`<div style="display:flex;justify-content:space-between;align-items:flex-end"><span class="num">0${s + 1}</span><div class="steps" style="margin-bottom:24px">${stepsData.map((_, k) => `<i class="${k <= s ? "on" : ""}"></i>`).join("")}</div></div><h2 style="margin-top:48px">${title}</h2><p class="lead" style="max-width:none">${text}</p><div class="fix"><p class="label"><span>${check}</span>Qué te llevas</p><p>${get}</p></div>`, i, t)),
  ctaSlide("¿Empezamos por el tuyo?", "Cuéntanos cómo trabajáis y te decimos por dónde empezaríamos."),
]);

const signalsData = [
  ["Cada persona tiene su propio Excel y solo ella lo entiende.", "Una sola fuente de datos que todo el equipo entiende y usa."],
  ["Los clientes se pierden entre WhatsApp, correo y llamadas.", "Un CRM donde cada conversación queda registrada y con su seguimiento."],
  ["Nadie sabe cuántos presupuestos hay abiertos ahora mismo.", "Un panel que te lo dice al momento, sin preguntar a nadie."],
  ["Si alguien falta, lo suyo se para.", "Procesos documentados y compartidos: el trabajo no depende de una persona."],
  ["Los informes se hacen a mano, y llegan tarde.", "Informes que se generan solos cada semana, con datos al día."],
  ["Copias los mismos datos en tres sitios distintos.", "Automatizaciones que pasan los datos de una herramienta a otra."],
];
mkdirSync(path.join(out, "carrusel-6-senales"), { recursive: true });
await carousel("carrusel-6-senales", [
  (i, t) => frame(`<p class="eyebrow">¿Te suena?</p><h1>6 señales de que tu empresa necesita orden.</h1><p class="lead">Y no más horas. Si te reconoces en dos o más, sigue leyendo.</p>`, i, t),
  ...signalsData.map(([problem, fix], s) => (i, t) =>
    frame(`<p class="eyebrow">Señal ${s + 1} de 6</p><p class="problem" style="margin-top:36px">${problem}</p><div class="fix"><p class="label"><span>${check}</span>Cómo lo ordenamos</p><p>${fix}</p></div>`, i, t)),
  ctaSlide("Si te reconoces en dos o más, hablemos.", "En 30 minutos vemos cuál de estas te está costando más horas."),
]);

rmSync(tmp, { recursive: true, force: true });
console.log("interno/redes written");
