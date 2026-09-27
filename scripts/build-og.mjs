// Renders the social share image (Open Graph / Twitter card) into public/brand/og-image.jpg.
// Headless Edge draws the HTML with the real Geist font; app logos come from the same
// simple-icons package the site uses, rendered to static SVG.
//   node scripts/build-og.mjs
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { SiGmail, SiGooglecalendar, SiGooglesheets, SiHubspot, SiWhatsapp } = require("@icons-pack/react-simple-icons");

const root = path.resolve(import.meta.dirname, "..");
const tmp = path.join(root, "design-src", ".og-tmp");
mkdirSync(tmp, { recursive: true });

const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
if (!browser) throw new Error("Edge or Chrome is needed to render the image.");

const W = 1200;
const H = 630;
const font = pathToFileURL(path.join(root, "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")).href;
const wordmark = readFileSync(path.join(root, "public/brand/albariza-wordmark.svg"), "utf8").replace('width="350" height="84"', 'width="210" height="50.4"');
const icon = (C) => renderToStaticMarkup(createElement(C, { color: "default", size: 18 }));

const noise = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
).toString("base64");

const columns = [
  { name: "Entra", tasks: [["Presupuesto", SiGmail], ["Pedido 214", SiWhatsapp], ["Alta cliente", SiGmail]] },
  { name: "En marcha", tasks: [["Reserva 12", SiGooglecalendar], ["Seguimiento", SiHubspot], ["Proveedor", SiWhatsapp]] },
  { name: "Hecho", tasks: [["Facturas", SiGooglesheets, true], ["Informe", SiGooglesheets, true]] },
];

const card = ([title, Icon, done]) => `
  <div class="card">
    <span class="ico">${icon(Icon)}</span>
    <span class="t${done ? " done" : ""}">${title}</span>
    ${done ? '<span class="check">✓</span>' : ""}
  </div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: Geist, sans-serif; color: #16151f; }
body { position: relative; background: #f1f1ee; }
.glow { position: absolute; inset: 0;
  background: radial-gradient(42% 60% at 80% 40%, rgba(109,85,255,.30), transparent 70%),
              radial-gradient(30% 40% at 8% 100%, rgba(63,211,191,.14), transparent 70%); }
.grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml;base64,${noise}"); background-size: 220px; opacity: .08; mix-blend-mode: multiply; }
.left { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 560px; display: flex; flex-direction: column; }
h1 { margin-top: 64px; font-size: 64px; line-height: .98; font-weight: 700; letter-spacing: -0.05em; }
.sub { margin-top: 26px; font-size: 25px; line-height: 1.35; color: #5c5b66; letter-spacing: -0.01em; max-width: 30ch; }
.foot { margin-top: auto; display: flex; align-items: center; gap: 18px; }
.pill { background: #4f32e0; color: #fff; font-size: 20px; font-weight: 600; padding: 12px 22px; border-radius: 999px; box-shadow: 0 14px 30px -12px rgba(79,50,224,.7); }
.url { font-size: 20px; color: #5c5b66; }
.board { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); width: 500px; padding: 14px; border-radius: 28px;
  background: rgba(255,255,255,.62); border: 1px solid rgba(22,21,31,.08); box-shadow: 0 40px 80px -40px rgba(22,21,31,.4); }
.bh { display: flex; justify-content: space-between; align-items: center; padding: 4px 8px 14px; font-size: 15px; color: #5c5b66; }
.ok { color: #0f9c8b; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.ok::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #0f9c8b; }
.cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; background: rgba(241,241,238,.85); border-radius: 20px; padding: 10px; }
.col { background: rgba(227,226,220,.6); border-radius: 16px; padding: 10px 8px 12px; min-height: 220px; }
.ch { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: #5c5b66; padding: 2px 4px 10px; }
.card { display: flex; align-items: center; gap: 7px; background: #fff; border: 1px solid rgba(22,21,31,.08); border-radius: 12px; padding: 9px 7px; margin-bottom: 8px; box-shadow: 0 6px 16px -10px rgba(22,21,31,.45); }
.ico { width: 24px; height: 24px; border-radius: 8px; background: #f1f1ee; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.t { font-size: 12.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.t.done { color: #5c5b66; text-decoration: line-through; text-decoration-color: rgba(92,91,102,.4); }
.check { margin-left: auto; width: 18px; height: 18px; border-radius: 50%; background: #0f9c8b; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
</style></head><body>
<div class="glow"></div>
<div class="left">
  <div>${wordmark}</div>
  <h1>Ponemos orden en cómo trabaja tu empresa.</h1>
  <p class="sub">Asesoría de procesos y automatización para pymes y autónomos.</p>
  <div class="foot"><span class="pill">Sesión gratuita de 30 min</span><span class="url">albarizadigital.com</span></div>
</div>
<div class="board">
  <div class="bh"><span>Con un sistema: todo en un sitio</span><span class="ok">Al día</span></div>
  <div class="cols">
    ${columns.map((c) => `<div class="col"><div class="ch"><span>${c.name}</span><span>${c.tasks.length}</span></div>${c.tasks.map(card).join("")}</div>`).join("")}
  </div>
</div>
<div class="grain"></div>
</body></html>`;

const file = path.join(tmp, "og.html");
writeFileSync(file, html);
const png = path.join(tmp, "og.png");
execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--window-size=${W},${H}`, "--force-device-scale-factor=1", `--screenshot=${png}`, pathToFileURL(file).href], { stdio: "ignore" });
// JPEG: the grain makes a PNG ~0.5 MB, and share previews load faster when small.
await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(root, "public/brand/og-image.jpg"));
rmSync(tmp, { recursive: true, force: true });
console.log("public/brand/og-image.jpg written");
