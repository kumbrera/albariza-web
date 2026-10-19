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

// ---- Second batch (Nov 2026): RPA, CRM, Bono IA and the "qué proceso automatizar primero" article ----
// Extra pieces of interface (flows, a CRM board, a priority grid, a timeline) so every carousel doesn't
// read as the same text card. Anything that looks like data is labelled as an example.
const uiCss = `
.compare { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.row { border-radius: 32px; padding: 34px 40px; }
.row.manual { background: rgba(22,21,31,.045); border: 2px dashed rgba(22,21,31,.16); }
.row.auto { background: #fff; border: 1px solid rgba(22,21,31,.08); box-shadow: 0 40px 80px -48px rgba(22,21,31,.55); }
.row .label { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 600; color: #5c5b66; }
.row.auto .label { color: #0a6f63; }
.row.auto .label span { width: 40px; height: 40px; border-radius: 50%; background: #0f9c8b; color: #fff; display: flex; align-items: center; justify-content: center; }
.row.auto .label span svg { width: 24px; height: 24px; }
.chain { margin-top: 24px; display: flex; flex-direction: column; align-items: stretch; gap: 8px; font-size: 30px; line-height: 1.2; letter-spacing: -0.015em; }
.chip { padding: 18px 22px; border-radius: 18px; background: rgba(255,255,255,.7); border: 1px solid rgba(22,21,31,.1); font-weight: 500; color: #5c5b66; }
.row.auto .chip { background: rgba(79,50,224,.07); border-color: rgba(79,50,224,.2); color: #2b1aa0; }
.chain .to { color: rgba(22,21,31,.3); display: flex; justify-content: center; transform: rotate(90deg); }
.chain .to svg { width: 26px; height: 26px; }
.board { margin-top: auto; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 36px; padding: 28px; box-shadow: 0 40px 80px -48px rgba(22,21,31,.55); }
.board-head { display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #5c5b66; padding: 0 6px 22px; }
.board-head b { color: #16151f; font-size: 28px; letter-spacing: -0.02em; }
.ex { font-size: 20px; font-weight: 600; color: #4f32e0; background: rgba(79,50,224,.08); border-radius: 999px; padding: 6px 14px; }
.cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.col { background: #f6f6f3; border-radius: 20px; padding: 16px 14px; }
.col h4 { display: flex; justify-content: space-between; font-size: 23px; font-weight: 600; color: #5c5b66; margin-bottom: 14px; }
.col h4 em { font-style: normal; color: #16151f; font-variant-numeric: tabular-nums; }
.card { background: #fff; border: 1px solid rgba(22,21,31,.07); border-radius: 16px; padding: 18px 16px; margin-bottom: 10px; box-shadow: 0 8px 18px -14px rgba(22,21,31,.5); }
.card b { display: block; font-size: 26px; letter-spacing: -0.01em; }
.card small { display: block; margin-top: 6px; font-size: 21px; color: #5c5b66; }
.card i { display: inline-block; margin-top: 10px; font-style: normal; font-size: 19px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: rgba(79,50,224,.08); color: #4f32e0; }
.card.warn i { background: rgba(220,120,40,.12); color: #a24d0c; }
.checks { margin-top: auto; display: flex; flex-direction: column; gap: 18px; }
.checks li { list-style: none; display: flex; gap: 22px; align-items: flex-start; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 28px; padding: 28px 34px; font-size: 36px; line-height: 1.25; letter-spacing: -0.015em; box-shadow: 0 30px 60px -44px rgba(22,21,31,.5); }
.checks li span { flex: none; width: 46px; height: 46px; border-radius: 50%; background: #4f32e0; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; margin-top: 2px; }
.checks li span svg { width: 26px; height: 26px; }
.checks.no li span { background: rgba(22,21,31,.1); color: #5c5b66; font-size: 34px; font-weight: 500; line-height: 1; }
.stats { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.stat { background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 32px; padding: 34px 36px; box-shadow: 0 30px 60px -44px rgba(22,21,31,.5); }
.stat.wide { grid-column: span 2; }
.stat strong { display: block; font-size: 96px; line-height: .95; font-weight: 700; letter-spacing: -0.06em; color: #16151f; font-variant-numeric: tabular-nums; }
.stat strong small { font-size: 52px; letter-spacing: -0.04em; }
.stat p { margin-top: 14px; font-size: 30px; line-height: 1.3; color: #5c5b66; letter-spacing: -0.01em; }
.timeline { margin-top: auto; position: relative; padding-left: 64px; display: flex; flex-direction: column; gap: 26px; }
.timeline::before { content: ""; position: absolute; left: 21px; top: 30px; bottom: 30px; width: 3px; background: linear-gradient(#4f32e0, rgba(79,50,224,.15)); border-radius: 3px; }
.tl { position: relative; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 28px; padding: 28px 34px; box-shadow: 0 30px 60px -44px rgba(22,21,31,.5); }
.tl::before { content: ""; position: absolute; left: -54px; top: 34px; width: 22px; height: 22px; border-radius: 50%; background: #f1f1ee; border: 5px solid #4f32e0; }
.tl b { display: block; font-size: 26px; font-weight: 600; color: #4f32e0; }
.tl p { margin-top: 8px; font-size: 36px; line-height: 1.22; letter-spacing: -0.02em; font-weight: 600; }
.note { margin-top: 26px; font-size: 26px; color: #5c5b66; }
.matrix { margin-top: auto; display: grid; grid-template-columns: 60px 1fr 1fr; grid-template-rows: 1fr 1fr 56px; gap: 16px; height: 640px; }
.matrix .q { border-radius: 28px; padding: 28px 30px; background: #fff; border: 1px solid rgba(22,21,31,.08); display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 30px 60px -44px rgba(22,21,31,.5); }
.matrix .q b { font-size: 38px; line-height: 1.05; letter-spacing: -0.035em; }
.matrix .q p { font-size: 27px; line-height: 1.3; color: #5c5b66; }
.matrix .q.go { background: #4f32e0; color: #fff; border: none; box-shadow: 0 34px 60px -26px rgba(79,50,224,.75); }
.matrix .q.go p { color: rgba(255,255,255,.8); }
.matrix .q.no { background: rgba(22,21,31,.04); box-shadow: none; border-style: dashed; }
.matrix .axis { font-size: 24px; font-weight: 600; color: #5c5b66; display: flex; align-items: center; justify-content: center; }
.matrix .axis.y { writing-mode: vertical-rl; transform: rotate(180deg); grid-row: span 2; }
.matrix .axis.x { grid-column: 2 / span 2; justify-content: space-between; padding: 0 8px; }
.formula { margin-top: auto; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 36px; padding: 40px 44px; box-shadow: 0 40px 80px -48px rgba(22,21,31,.55); }
.formula .eq { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; font-size: 30px; font-weight: 600; letter-spacing: -0.015em; }
.formula .eq span { padding: 10px 18px; border-radius: 14px; background: #f1f1ee; }
.formula .eq em { font-style: normal; color: #5c5b66; }
.formula hr { border: 0; border-top: 1px solid rgba(22,21,31,.1); margin: 32px 0 28px; }
.formula .ex-line { font-size: 30px; line-height: 1.4; color: #5c5b66; letter-spacing: -0.01em; }
.formula .total { margin-top: 18px; display: flex; align-items: baseline; gap: 18px; }
.formula .total strong { font-size: 104px; line-height: .9; font-weight: 700; letter-spacing: -0.06em; color: #0a6f63; font-variant-numeric: tabular-nums; }
.formula .total span { font-size: 34px; color: #0a6f63; font-weight: 600; }
`;
const slideCss2 = slideCss + uiCss;
const to = `<span class="to"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;
const chain = (items) => `<div class="chain">${items.map((t) => `<span class="chip">${t}</span>`).join(to)}</div>`;
const checkList = (items, cls = "") => `<ul class="checks ${cls}">${items.map((t) => `<li><span>${cls === "no" ? "×" : check}</span>${t}</li>`).join("")}</ul>`;

// Same as carousel() but with the extra interface styles.
async function carousel2(name, slides) {
  mkdirSync(path.join(out, name), { recursive: true });
  const total = slides.length;
  const pages = slides.map((s, i) => s(i, total));
  for (const [i, page] of pages.entries()) {
    const png = render(`${name}-${i + 1}`, SW, SH + 200, `<!doctype html><html><head><meta charset="utf-8"><style>${slideCss2} html,body{width:${SW}px;height:${SH + 200}px;}</style></head><body>${page}</body></html>`);
    await sharp(png).extract({ left: 0, top: 0, width: SW, height: SH }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(out, name, `${String(i + 1).padStart(2, "0")}.jpg`));
  }
  const pdfHtml = path.join(tmp, `${name}.html`);
  writeFileSync(pdfHtml, `<!doctype html><html><head><meta charset="utf-8"><style>${slideCss2} @page { size: ${SW}px ${SH}px; margin: 0; } html,body{margin:0;}</style></head><body>${pages.join("")}</body></html>`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer", `--print-to-pdf=${path.join(out, name, `${name}.pdf`)}`, pathToFileURL(pdfHtml).href], { stdio: "ignore" });
}

// RPA: tasks that can run on their own, each as "a mano" vs "solo".
const tasksData = [
  ["Pasar los pedidos del correo al Excel.", ["Abrir el correo", "Copiar", "Pegar en Excel", "Avisar a almacén"], ["Llega el pedido", "Se apunta solo", "Aviso a almacén"]],
  ["Perseguir los presupuestos que nadie ha contestado.", ["Revisar el Excel", "Buscar el WhatsApp", "Escribir uno a uno"], ["Pasan 3 días", "Recordatorio automático", "Aviso si no responde"]],
  ["Recordar citas y pagos a cada cliente.", ["Mirar la agenda", "Escribir a cada uno"], ["Día anterior", "Mensaje automático", "Confirmación"]],
  ["Hacer la factura con datos que ya están en otro sitio.", ["Abrir el pedido", "Copiar al programa", "Revisar errores"], ["Pedido cerrado", "Factura generada", "Enviada al cliente"]],
  ["Montar a mano el informe de cada lunes.", ["Juntar 4 Excel", "Copiar cifras", "Hacer el gráfico"], ["Lunes 8:00", "Datos al día", "Informe en tu correo"]],
];
await carousel2("carrusel-rpa-tareas", [
  (i, t) => frame(`<p class="eyebrow">Procesos y automatización</p><h1>5 tareas que tu empresa puede dejar de hacer a mano.</h1><p class="lead">Se repiten cada semana, siguen siempre las mismas reglas y nadie las echa de menos.</p>`, i, t),
  ...tasksData.map(([task, manual, auto], s) => (i, t) =>
    frame(`<p class="eyebrow">Tarea ${s + 1} de 5</p><p class="problem" style="margin-top:36px">${task}</p><div class="compare"><div class="row manual"><p class="label">Hoy, a mano</p>${chain(manual)}</div><div class="row auto"><p class="label"><span>${check}</span>Con una automatización</p>${chain(auto)}</div></div>`, i, t)),
  (i, t) => frame(`<p class="eyebrow">Antes de automatizar</p><h2 style="margin-top:36px">¿Se puede hacer sola? Mira si cumple esto.</h2>${checkList(["Se repite muchas veces a la semana.", "Sigue siempre las mismas reglas.", "Los datos ya están en el ordenador.", "Si sale mal, cuesta dinero o un cliente."])}`, i, t),
  ctaSlide("¿Cuál os roba más tiempo?", "En 30 minutos vemos qué tarea merece la pena automatizar primero en tu empresa."),
]);

// CRM: five questions before choosing one. The board is a made-up example.
const board = `<div class="board"><div class="board-head"><b>Oportunidades</b><span class="ex">Ejemplo</span></div><div class="cols">
  <div class="col"><h4>Nuevo <em>3</em></h4><div class="card"><b>Reforma local</b><small>Por la web · hoy</small></div><div class="card"><b>Mantenimiento</b><small>Por WhatsApp · ayer</small></div></div>
  <div class="col"><h4>Presupuesto <em>2</em></h4><div class="card"><b>Evento empresa</b><small>Enviado el lunes</small><i>Llamar jueves</i></div></div>
  <div class="col"><h4>Seguimiento <em>2</em></h4><div class="card warn"><b>Instalación</b><small>Sin respuesta</small><i>5 días</i></div><div class="card"><b>Renovación</b><small>Pide cambios</small></div></div>
</div></div>`;
const crmData = [
  ["¿Dónde están hoy vuestros clientes?", "Apunta todos los sitios: Excel, WhatsApp, correo, la libreta. Eso es lo que el CRM tiene que sustituir, no sumarse a ello."],
  ["¿Qué pasos sigue una venta?", null],
  ["¿Quién lo va a usar cada día?", "Un CRM que el equipo no usa es un Excel caro. Elígelo pensando en quien apunta, no solo en quien mira los informes."],
  ["¿Con qué tiene que conectarse?", "Correo, WhatsApp, la web, la facturación. Si no se conecta, alguien volverá a copiar datos a mano."],
  ["¿Qué quieres saber cada lunes?", "Presupuestos abiertos, seguimientos pendientes, lo cerrado este mes. Si no te lo da sin preguntar a nadie, no es el CRM."],
];
await carousel2("carrusel-crm-preguntas", [
  (i, t) => frame(`<p class="eyebrow">Antes de elegir un CRM</p><h1>5 preguntas que conviene responder primero.</h1><p class="lead">El programa es lo de menos. Lo que hace que funcione es tener claro cómo vendéis.</p>`, i, t),
  ...crmData.map(([q, a], s) => (i, t) =>
    frame(`<p class="eyebrow">Pregunta ${s + 1} de 5</p><p class="problem" style="margin-top:36px">${q}</p>${
      a
        ? `<div class="fix"><p class="label"><span>${check}</span>Por qué importa</p><p>${a}</p></div>`
        : `<p class="lead" style="max-width:none;margin-top:28px">Del primer contacto al cierre. Si no sabéis dibujarlo en un papel, el CRM tampoco.</p>${board}`
    }`, i, t)),
  ctaSlide("¿Lo ordenamos juntos?", "En 30 minutos vemos dónde se os pierden los clientes y qué necesitáis de verdad."),
]);

// Bono IA: only what was announced (guide: the bases are not published, never give requirements as facts).
await carousel2("carrusel-bono-ia", [
  (i, t) => frame(`<p class="eyebrow">Bono de Inteligencia Artificial</p><h1>Lo que se sabe del Bono de IA (y lo que no).</h1><p class="lead">Está anunciado. Las bases, todavía no. Esto es lo que hay hoy.</p>`, i, t),
  (i, t) => frame(`<p class="eyebrow">Lo que se sabe</p><h2 style="margin-top:36px">Anunciado el 21 de septiembre, dentro del Plan IA360.</h2><div class="stats"><div class="stat"><strong>600<small> M€</small></strong><p>en total para el bono</p></div><div class="stat"><strong>25.000</strong><p>pymes y autónomos, aproximadamente</p></div><div class="stat wide"><p style="margin-top:0;color:#16151f;font-size:34px;font-weight:600;letter-spacing:-0.02em">Para pagar servicios de IA prestados por empresas tecnológicas: desarrollo, integración, datos o rediseño de procesos.</p><p>No licencias ni suscripciones sueltas, según el anuncio.</p></div></div>`, i, t),
  (i, t) => frame(`<p class="eyebrow">Calendario previsto</p><h2 style="margin-top:36px">Las fechas que se han dado.</h2><div class="timeline"><div class="tl"><b>Antes de que acabe 2026</b><p>Piloto de la Red Neurona con 100 pymes.</p></div><div class="tl"><b>Primer semestre de 2027</b><p>Piloto del bono.</p></div><div class="tl"><b>Antes de que acabe 2027</b><p>Convocatoria general.</p></div></div><p class="note">Previsto, no aprobado. Puede cambiar.</p>`, i, t),
  (i, t) => frame(`<p class="eyebrow">Lo que todavía no se sabe</p><h2 style="margin-top:36px">Sin bases publicadas, nadie puede darte esto como seguro.</h2>${checkList(["Cuánto recibirá cada empresa.", "Qué requisitos hay que cumplir.", "Cómo y dónde se solicita.", "Los plazos exactos."], "no")}`, i, t),
  (i, t) => frame(`<p class="eyebrow">Qué puedes hacer ya</p><h2 style="margin-top:36px">Llegar a la convocatoria con el trabajo hecho.</h2>${checkList(["Elige un proceso concreto donde ganarías horas.", "Pon en orden los datos de ese proceso.", "Escribe el caso de uso: qué problema, qué cambia y cómo se mide."])}`, i, t),
  (i, t) => frame(`<p class="eyebrow">Ojo, no confundir</p><p class="problem" style="margin-top:36px">La convocatoria de Red.es de 40 millones no es este bono.</p><div class="fix"><p class="label" style="color:#4f32e0"><span style="background:#4f32e0">${check}</span>Para quién es</p><p>Es para asociaciones y centros tecnológicos, no para pymes ni autónomos.</p></div>`, i, t),
  ctaSlide("¿Preparamos tu caso de uso?", "En 30 minutos vemos qué proceso de tu empresa encajaría mejor."),
]);

// Blog article (21-10): which process to automate first.
const matrix = `<div class="matrix"><div class="axis y">Horas al año →</div>
  <div class="q go"><b>Empieza aquí</b><p>Muchas horas y fácil de automatizar.</p></div>
  <div class="q"><b>Después</b><p>Muchas horas, pero más difícil.</p></div>
  <div class="q"><b>De paso</b><p>Pocas horas y fácil.</p></div>
  <div class="q no"><b>Déjalo</b><p>Pocas horas y difícil.</p></div>
  <div class="axis x"><span>← Más fácil</span><span>Más difícil →</span></div></div>`;
await carousel2("carrusel-que-automatizar-primero", [
  (i, t) => frame(`<p class="eyebrow">Un proceso cada vez</p><h1>Qué automatizar primero en tu empresa.</h1><p class="lead">Un método en 4 pasos para elegir, con la cuenta de las horas que te cuesta.</p>`, i, t),
  (i, t) => frame(`<p class="eyebrow">Paso 1 de 4</p><h2 style="margin-top:36px">Apunta durante una semana lo que se hace a mano.</h2>${checkList(["Qué es, en una frase.", "Cuántas veces a la semana.", "Cuántos minutos cada vez.", "Qué pasa cuando sale mal."])}`, i, t),
  (i, t) => frame(`<p class="eyebrow">Paso 2 de 4</p><h2 style="margin-top:36px">Calcula cuántas horas al año suma.</h2><div class="formula"><div class="eq"><span>veces / semana</span><em>×</em><span>minutos</span><em>×</em><span>46 semanas</span><em>÷</em><span>60</span></div><hr><p class="ex-line"><span class="ex">Ejemplo</span>&nbsp; 25 pedidos a la semana, 6 minutos cada uno:</p><div class="total"><strong>115 h</strong><span>al año copiando pedidos</span></div></div>`, i, t),
  (i, t) => frame(`<p class="eyebrow">Paso 3 de 4</p><h2 style="margin-top:36px">Comprueba que se puede automatizar.</h2>${checkList(["Sigue siempre las mismas reglas.", "Los datos ya están en el ordenador.", "No hay que decidir algo distinto cada vez.", "Si sale mal, cuesta dinero o un cliente."])}`, i, t),
  (i, t) => frame(`<p class="eyebrow">Paso 4 de 4</p><h2 style="margin-top:36px">Ordena por horas y dificultad.</h2>${matrix}`, i, t),
  (i, t) => frame(`<p class="eyebrow">Antes de automatizar</p><p class="problem" style="margin-top:36px">Automatizar el desorden solo hace que vaya más rápido.</p><div class="fix"><p class="label"><span>${check}</span>Primero, orden</p><p>Un solo sitio y una sola forma de apuntar las cosas. Después, las automatizaciones.</p></div>`, i, t),
  ctaSlide("¿Hacemos la cuenta con tus tareas?", "En 30 minutos vemos qué proceso os roba más horas y por dónde empezar."),
]);

// ---- Google Business images (1200x900, 4:3) ----
const GW = 1200;
const GH = 900;
const gbpCss = `${slideCss2}
html, body { width: ${GW}px; height: ${GH}px; }
.g { position: relative; width: ${GW}px; height: ${GH}px; overflow: hidden; background: #f1f1ee; }
.g .glow { position: absolute; inset: 0; background: radial-gradient(55% 55% at 92% 8%, rgba(109,85,255,.26), transparent 70%), radial-gradient(45% 40% at 0% 100%, rgba(63,211,191,.15), transparent 70%); }
.g .top { left: 64px; right: 64px; top: 56px; }
.g .text { position: absolute; left: 64px; top: 170px; width: 560px; }
.g .text .eyebrow { font-size: 24px; }
.g .text h1 { margin-top: 24px; font-size: 68px; letter-spacing: -0.05em; }
.g .text .lead { margin-top: 28px; font-size: 28px; max-width: none; }
.g .vis { position: absolute; right: 64px; top: 170px; width: 470px; bottom: 120px; display: flex; flex-direction: column; }
.g .foot { left: 64px; right: 64px; bottom: 50px; font-size: 22px; }
.g .gpill { background: #4f32e0; color: #fff; font-weight: 600; font-size: 22px; padding: 14px 26px; border-radius: 999px; box-shadow: 0 16px 34px -14px rgba(79,50,224,.8); }
/* Shrunk versions of the slide interfaces */
.g .vis .compare { gap: 16px; }
.g .vis .row { padding: 24px 26px; border-radius: 24px; }
.g .vis .row .label { font-size: 20px; }
.g .vis .chain { font-size: 21px; gap: 4px; margin-top: 12px; } .g .vis .chip { padding: 10px 14px; }
.g .vis .chip { padding: 9px 14px; border-radius: 12px; }
.g .vis .chain .to svg { width: 18px; height: 18px; }
.g .vis .board { padding: 18px; border-radius: 26px; }
.g .vis .cols { grid-template-columns: 1fr 1fr; } .g .vis .card b { font-size: 21px; } .g .vis .card small { font-size: 17px; } .g .vis .col h4 { font-size: 18px; }
.g .vis .board-head { font-size: 18px; padding-bottom: 14px; } .g .vis .board-head b { font-size: 22px; }
.g .vis .ex { font-size: 15px; }
.g .vis .matrix { height: 520px; grid-template-columns: 44px 1fr 1fr; grid-template-rows: 1fr 1fr 40px; gap: 12px; }
.g .vis .matrix .q { padding: 20px; border-radius: 22px; } .g .vis .matrix .q b { font-size: 28px; } .g .vis .matrix .q p { font-size: 18px; }
.g .vis .matrix .axis { font-size: 17px; }
.g .vis .timeline { padding-left: 50px; gap: 18px; } .g .vis .timeline::before { left: 15px; }
.g .vis .tl { padding: 22px 26px; border-radius: 22px; } .g .vis .tl::before { left: -44px; top: 26px; width: 18px; height: 18px; border-width: 4px; }
.g .vis .tl b { font-size: 19px; } .g .vis .tl p { font-size: 26px; }
`;
async function gbp(name, { eyebrow, title, lead, button, vis }) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${gbpCss}</style></head><body><section class="g"><div class="glow"></div>
    <div class="top">${smallMark}</div>
    <div class="text"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${lead}</p></div>
    <div class="vis">${vis}</div>
    <div class="foot"><span>albarizadigital.com</span><span class="gpill">${button}</span></div>
    <div class="grain"></div></section></body></html>`;
  const png = render(name, GW, GH, html);
  mkdirSync(path.join(out, "gbp"), { recursive: true });
  await sharp(png).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(out, "gbp", `${name}.jpg`));
}
const smallBoard = board.replace(/\s*<div class="col"><h4>Seguimiento[\s\S]*?<\/div><\/div>/, "");
await gbp("gbp-que-automatizar-primero", { eyebrow: "Del blog", title: "Qué proceso automatizar primero.", lead: "Apunta lo que se repite, calcula las horas que cuesta al año y empieza por lo que más pesa.", button: "Leer el artículo", vis: matrix });
await gbp("gbp-tareas-a-mano", { eyebrow: "Procesos y automatización", title: "Tareas que pueden hacerse solas.", lead: "Pedidos, recordatorios, facturas, informes: si se repite y sigue reglas, se puede automatizar.", button: "Leer la guía", vis: `<div class="compare"><div class="row manual"><p class="label">Hoy, a mano</p>${chain(["Abrir el correo", "Copiar", "Pegar en Excel"])}</div><div class="row auto"><p class="label"><span>${check}</span>Con una automatización</p>${chain(["Llega el pedido", "Se apunta solo", "Aviso"])}</div></div>` });
await gbp("gbp-crm-preguntas", { eyebrow: "Antes de elegir un CRM", title: "Primero, cómo vendéis. Después, el programa.", lead: "Dónde están hoy los clientes, qué pasos sigue una venta y quién lo usará cada día.", button: "Leer el artículo", vis: smallBoard });
await gbp("gbp-6-senales", { eyebrow: "¿Te suena?", title: "6 señales de que tu empresa necesita orden.", lead: "Si te reconoces en dos o más, no necesitas más horas: necesitas orden.", button: "Reservar", vis: `<ul class="checks no" style="gap:12px">${signalsData.slice(0, 4).map(([p]) => `<li style="font-size:22px;padding:18px 22px;border-radius:20px;gap:14px"><span style="width:32px;height:32px;font-size:22px">×</span>${p}</li>`).join("")}</ul>` });
await gbp("gbp-sesion-gratuita", { eyebrow: "Sesión de asesoría gratuita", title: "Un proceso cada vez, medido en horas.", lead: "30 minutos para ver qué proceso os roba más tiempo y por dónde empezar. Sin compromiso.", button: "Reservar", vis: `<div class="timeline"><div class="tl"><b>Paso 1</b><p>Sesión gratuita.</p></div><div class="tl"><b>Paso 2</b><p>Auditoría de procesos.</p></div><div class="tl"><b>Paso 3</b><p>Diseño e implementación.</p></div><div class="tl"><b>Paso 4</b><p>Medición y ajuste.</p></div></div>` });
await gbp("gbp-bono-ia-prepararse", { eyebrow: "Bono de Inteligencia Artificial", title: "Cómo prepararte mientras salen las bases.", lead: "Elige un proceso, ordena sus datos y escribe el caso de uso. Lo que se sabe, en nuestra guía.", button: "Leer la guía", vis: `<div class="timeline"><div class="tl"><b>Final de 2026</b><p>Piloto Red Neurona.</p></div><div class="tl"><b>1.er semestre 2027</b><p>Piloto del bono.</p></div><div class="tl"><b>Final de 2027</b><p>Convocatoria general.</p></div></div><p class="note" style="font-size:19px">Calendario previsto, no aprobado.</p>` });

rmSync(tmp, { recursive: true, force: true });
console.log("interno/redes written");
