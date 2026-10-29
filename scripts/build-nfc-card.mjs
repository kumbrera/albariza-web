// Print files and a mockup for the sticker on the team's NFC cards (same design for everyone: the
// chip carries each person's link, the QR on the back opens the whole team's page).
// Sticker 83 x 51 mm (a white CR80 card is 85.6 x 54), 2 mm bleed. Output in interno/tarjeta-nfc/.
//   node scripts/build-nfc-card.mjs
import QRCode from "qrcode";
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "interno", "tarjeta-nfc");
const tmp = path.join(out, ".tmp");
mkdirSync(tmp, { recursive: true });

const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
if (!browser) throw new Error("Edge or Chrome is needed to render the card.");

const TRIM = { w: 83, h: 51 };
const BLEED = 2;
const W = TRIM.w + BLEED * 2;
const H = TRIM.h + BLEED * 2;

const font = pathToFileURL(path.join(root, "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")).href;
const wordmark = readFileSync(path.join(root, "public/brand/albariza-wordmark.svg"), "utf8");
const wordmarkWhite = readFileSync(path.join(root, "public/brand/albariza-wordmark-white.svg"), "utf8").replaceAll('fill="#4F32E0"', 'fill="#FFFFFF"');
const sized = (svg, mm) => svg.replace('width="350" height="84"', `width="${mm}mm" height="${(mm * 84) / 350}mm"`);
const qr = await QRCode.toString("https://albarizadigital.com/t/albariza", { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#16151f", light: "#ffffff" } });

// lucide "smartphone-nfc"
const nfcIcon = (mm, color) => `<svg width="${mm}mm" height="${mm}mm" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="12" x="2" y="6" rx="1"/><path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/></svg>`;

const css = `
@font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { font-family: Geist, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.face { position: relative; width: ${W}mm; height: ${H}mm; overflow: hidden; }
/* everything important stays 3 mm inside the trim line */
.safe { position: absolute; left: ${BLEED + 4}mm; right: ${BLEED + 4}mm; top: ${BLEED + 4}mm; bottom: ${BLEED + 4}mm; }
.front { background: linear-gradient(135deg, #6a4ff7 0%, #4f32e0 58%, #2f1c9c 100%); color: #fff; }
.front::before { content: ""; position: absolute; inset: 0; background: radial-gradient(70% 80% at 18% 10%, rgba(255,255,255,0.26), rgba(255,255,255,0) 65%); }
.front::after { content: ""; position: absolute; width: 46mm; height: 46mm; right: -13mm; bottom: -21mm; transform: rotate(45deg); border-radius: 4mm; background: linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0)); }
.back { background: #ffffff; color: #16151f; }
.back::before { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: ${BLEED + 2.2}mm; background: linear-gradient(90deg, #6a4ff7, #4f32e0 60%, #2f1c9c); }
`;

const front = `<div class="face front"><div class="safe">
  <div style="position:absolute;left:0;top:9.5mm">${sized(wordmarkWhite, 44)}</div>
  <div style="position:absolute;left:0.4mm;top:23.5mm;font-size:6.6pt;font-weight:500;letter-spacing:0.01em;color:rgba(255,255,255,0.82)">Asesoría de procesos y automatización</div>
  <div style="position:absolute;left:0;bottom:0;right:0;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:1.6mm">
      ${nfcIcon(5.2, "#ffffff")}
      <div style="font-size:6.4pt;font-weight:600;line-height:1.15">Acerca tu móvil<br><span style="font-weight:400;color:rgba(255,255,255,0.72)">y guarda nuestro contacto</span></div>
    </div>
  </div>
</div></div>`;

const back = `<div class="face back"><div class="safe">
  <div style="position:absolute;left:0;top:0">${sized(wordmark, 25)}</div>
  <div style="position:absolute;left:0;top:10.5mm;width:44mm;font-size:9.2pt;font-weight:700;letter-spacing:-0.035em;line-height:1.08">Ponemos orden en cómo trabaja tu empresa.</div>
  <div style="position:absolute;left:0;top:21.6mm;width:44mm;font-size:6pt;line-height:1.35;color:#5c5b66">Asesoría de procesos y automatización para pymes y autónomos.</div>
  <div style="position:absolute;left:0;bottom:1.2mm;font-size:6pt;line-height:1.5;color:#16151f">
    <b style="font-weight:600">albarizadigital.com</b><br>
    <span style="color:#5c5b66">hola@albarizadigital.com · 644 349 817</span>
  </div>
  <div style="position:absolute;right:0;top:0;width:21mm;text-align:center">
    <div style="width:21mm;height:21mm">${qr.replace("<svg ", '<svg width="21mm" height="21mm" ')}</div>
    <div style="margin-top:1.4mm;font-size:5.2pt;line-height:1.25;color:#5c5b66">¿Sin NFC?<br>Escanea el código</div>
  </div>
</div></div>`;

function render(name, body, { pdf = null, png = null, pageW = W, pageH = H } = {}) {
  const file = path.join(tmp, `${name}.html`);
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>${css}@page{size:${pageW}mm ${pageH}mm;margin:0}</style></head><body>${body}</body></html>`);
  const url = pathToFileURL(file).href;
  const base = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-pdf-header-footer"];
  if (pdf) execFileSync(browser, [...base, `--print-to-pdf=${pdf}`, url], { stdio: "ignore" });
  if (png) {
    // 300 dpi: 1 mm = 11.811 px; CSS 1 mm = 3.7795 px, so scale 3.125.
    const px = (mm) => Math.round((mm * 96) / 25.4);
    execFileSync(browser, [...base, `--window-size=${px(pageW)},${px(pageH)}`, "--force-device-scale-factor=3.125", `--screenshot=${png}`, url], { stdio: "ignore" });
  }
}

render("delante", front, { pdf: path.join(out, "pegatina-delante-83x51-sangrado2mm.pdf"), png: path.join(tmp, "delante.png") });
render("detras", back, { pdf: path.join(out, "pegatina-detras-83x51-sangrado2mm.pdf"), png: path.join(tmp, "detras.png") });

// A4 sheet for the copy shop: 2 columns x 4 rows (4 fronts, 4 backs), crop marks at the trim line.
const cols = 2;
const rows = 4;
const gapX = 10;
const gapY = 8;
const sheetW = cols * W + (cols - 1) * gapX;
const sheetH = rows * H + (rows - 1) * gapY;
const ox = (210 - sheetW) / 2;
const oy = (297 - sheetH) / 2;
const marks = (x, y) => {
  const l = 3;
  const s = "position:absolute;background:#000";
  const tx = [x + BLEED, x + BLEED + TRIM.w];
  const ty = [y + BLEED, y + BLEED + TRIM.h];
  return [
    ...tx.flatMap((cx) => [`<i style="${s};left:${cx}mm;top:${y - l - 0.5}mm;width:0.1mm;height:${l}mm"></i>`, `<i style="${s};left:${cx}mm;top:${y + H + 0.5}mm;width:0.1mm;height:${l}mm"></i>`]),
    ...ty.flatMap((cy) => [`<i style="${s};top:${cy}mm;left:${x - l - 0.5}mm;height:0.1mm;width:${l}mm"></i>`, `<i style="${s};top:${cy}mm;left:${x + W + 0.5}mm;height:0.1mm;width:${l}mm"></i>`]),
  ].join("");
};
let sheet = `<div style="position:relative;width:210mm;height:297mm">`;
for (let r = 0; r < rows; r++)
  for (let c = 0; c < cols; c++) {
    const x = ox + c * (W + gapX);
    const y = oy + r * (H + gapY);
    sheet += `<div style="position:absolute;left:${x}mm;top:${y}mm">${c === 0 ? front : back}</div>${marks(x, y)}`;
  }
sheet += `<div style="position:absolute;left:${ox}mm;bottom:4mm;font-size:6pt;color:#777">Albariza · pegatina NFC 83×51 mm · sangrado 2 mm · cortar por las marcas · izquierda: delante, derecha: detrás · imprimir al 100 %</div></div>`;
render("hoja", sheet, { pdf: path.join(out, "hoja-A4-4-delante-4-detras.pdf"), pageW: 210, pageH: 297 });

// Mockup: the stickers on two white cards, cut to the trim and rounded like the card.
const cardPx = { w: 1011, h: 638 }; // 85.6 x 54 mm at 300 dpi
const sticker = async (png) =>
  sharp(png)
    .extract({ left: Math.round(BLEED * 11.811), top: Math.round(BLEED * 11.811), width: Math.round(TRIM.w * 11.811), height: Math.round(TRIM.h * 11.811) })
    .composite([{ input: Buffer.from(`<svg width="${Math.round(TRIM.w * 11.811)}" height="${Math.round(TRIM.h * 11.811)}"><rect width="100%" height="100%" rx="26" fill="#fff"/></svg>`), blend: "dest-in" }])
    .png()
    .toBuffer();
const card = async (png) =>
  sharp({ create: { width: cardPx.w, height: cardPx.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: Buffer.from(`<svg width="${cardPx.w}" height="${cardPx.h}"><rect width="100%" height="100%" rx="38" fill="#fbfbf9"/></svg>`) },
      { input: await sticker(png), gravity: "center" },
    ])
    .png()
    .toFile(path.join(tmp, `card-${path.basename(png)}`));
await card(path.join(tmp, "delante.png"));
await card(path.join(tmp, "detras.png"));

const cardUrl = (n) => pathToFileURL(path.join(tmp, `card-${n}.png`)).href;
writeFileSync(
  path.join(tmp, "mockup.html"),
  `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
  html,body{margin:0;width:2400px;height:1600px;overflow:hidden;font-family:Geist,sans-serif}
  body{background:radial-gradient(80% 90% at 30% 20%,#ffffff 0%,#ecebe6 55%,#dcdbd4 100%);perspective:2600px}
  .c{position:absolute;width:1011px;height:638px;border-radius:38px;background-size:cover;transform-style:preserve-3d}
  .a{left:330px;top:300px;transform:rotateX(38deg) rotateZ(-14deg);background-image:url("${cardUrl("delante")}");box-shadow:0 60px 80px -30px rgba(22,21,31,.45),0 18px 30px -12px rgba(22,21,31,.3)}
  .b{left:1080px;top:610px;transform:rotateX(38deg) rotateZ(9deg);background-image:url("${cardUrl("detras")}");box-shadow:0 60px 80px -30px rgba(22,21,31,.4),0 18px 30px -12px rgba(22,21,31,.25)}
  .edge{position:absolute;inset:0;border-radius:38px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55),inset 0 -3px 0 rgba(0,0,0,.06)}
  .sheen{position:absolute;inset:0;border-radius:38px;background:linear-gradient(120deg,rgba(255,255,255,.28) 0%,rgba(255,255,255,0) 35%)}
  </style></head><body>
  <div class="c a"><div class="sheen"></div><div class="edge"></div></div>
  <div class="c b"><div class="sheen"></div><div class="edge"></div></div>
  </body></html>`,
);
execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--window-size=2400,1600", "--force-device-scale-factor=1", `--screenshot=${path.join(tmp, "mockup.png")}`, pathToFileURL(path.join(tmp, "mockup.html")).href], { stdio: "ignore" });
await sharp(path.join(tmp, "mockup.png")).jpeg({ quality: 90 }).toFile(path.join(out, "mockup-tarjeta-nfc.jpg"));
await sharp(path.join(tmp, "delante.png")).png().toFile(path.join(out, "pegatina-delante-300dpi.png"));
await sharp(path.join(tmp, "detras.png")).png().toFile(path.join(out, "pegatina-detras-300dpi.png"));

rmSync(tmp, { recursive: true, force: true });
console.log(`NFC sticker files in ${out}`);
