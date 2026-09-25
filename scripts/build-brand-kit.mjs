// Builds the downloadable brand kit (brand-kit/) from the master SVGs in public/brand.
// PNGs of pure-vector marks: sharp (transparent background). Banner + all PDFs: headless Edge,
// so text renders in real Geist and PDFs stay vector. Re-run after any logo change:
//   node scripts/build-brand-kit.mjs
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const brand = path.join(root, "public", "brand");
const out = path.join(root, "brand-kit");
const tmp = path.join(out, ".tmp");
for (const d of ["logo", "icono", "linkedin"]) mkdirSync(path.join(out, d), { recursive: true });
mkdirSync(tmp, { recursive: true });

const logoSvg = readFileSync(path.join(brand, "albariza-wordmark.svg"), "utf8");
const logoWhiteSvg = readFileSync(path.join(brand, "albariza-wordmark-white.svg"), "utf8");
const iconSvg = readFileSync(path.join(brand, "albariza-favicon.svg"), "utf8");
// LinkedIn applies its own rounding, so the profile image is a full-bleed square.
const iconSquareSvg = iconSvg.replace(/rx="[^"]*"/g, 'rx="0"');

const EDGE_CANDIDATES = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = EDGE_CANDIDATES.find((p) => existsSync(p));
if (!browser) throw new Error("Edge or Chrome is needed to render the banner and PDFs.");

const geistFont = pathToFileURL(
  path.join(root, "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"),
).href;

function page(width, height, body, background = "transparent") {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${geistFont}") format("woff2"); font-weight: 100 900; }
@page { size: ${width}px ${height}px; margin: 0; }
html, body { margin: 0; width: ${width}px; height: ${height}px; background: ${background}; overflow: hidden; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
svg { display: block; }
</style></head><body>${body}</body></html>`;
}

function render(name, html, { pdf, png, width, height, scale = 2 }) {
  const file = path.join(tmp, `${name}.html`);
  writeFileSync(file, html);
  const url = pathToFileURL(file).href;
  const common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--disable-extensions"];
  if (pdf) execFileSync(browser, [...common, "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, url], { stdio: "ignore" });
  if (png)
    execFileSync(browser, [...common, `--window-size=${width},${height}`, `--force-device-scale-factor=${scale}`, `--screenshot=${png}`, url], { stdio: "ignore" });
}

const svgPng = (svg, width, file) => sharp(Buffer.from(svg), { density: 600 }).resize({ width }).png().toFile(file);

// --- Logo ---
writeFileSync(path.join(out, "logo/albariza-logo.svg"), logoSvg);
writeFileSync(path.join(out, "logo/albariza-logo-blanco.svg"), logoWhiteSvg);
await svgPng(logoSvg, 2400, path.join(out, "logo/albariza-logo.png"));
await svgPng(logoWhiteSvg, 2400, path.join(out, "logo/albariza-logo-blanco.png"));
render("logo", page(350, 84, logoSvg), { pdf: path.join(out, "logo/albariza-logo.pdf") });
render("logo-blanco", page(350, 84, logoWhiteSvg), { pdf: path.join(out, "logo/albariza-logo-blanco.pdf") });

// --- Icon (favicon mark) ---
writeFileSync(path.join(out, "icono/albariza-icono.svg"), iconSvg);
await svgPng(iconSvg, 1024, path.join(out, "icono/albariza-icono.png"));
render("icono", page(512, 512, iconSvg), { pdf: path.join(out, "icono/albariza-icono.pdf") });

// --- LinkedIn ---
await svgPng(iconSquareSvg, 800, path.join(out, "linkedin/albariza-linkedin-perfil.png"));

// Banner 1584x396. LinkedIn covers the bottom-left with the profile picture, so content
// starts at x≈470.
const banner = page(
  1584,
  396,
  `<div style="position:relative;width:1584px;height:396px;font-family:Geist,sans-serif;
      background: radial-gradient(38% 95% at 58% 52%, rgba(110,84,255,0.28), rgba(110,84,255,0) 70%), #f1f1ee;">
    <div style="position:absolute;left:470px;top:158px;width:385px">${logoSvg.replace('width="350" height="84"', 'width="385" height="92.4"')}</div>
    <div style="position:absolute;left:910px;top:123px;width:1px;height:150px;background:rgba(22,21,31,0.15)"></div>
    <div style="position:absolute;left:960px;top:126px;color:#16151f;font-weight:700;font-size:34px;line-height:1.1;letter-spacing:-0.03em">
      Del caos de Excel y WhatsApp<br>a un sistema que funciona solo.
    </div>
    <div style="position:absolute;left:962px;top:224px;color:#4f32e0;font-weight:500;font-size:19px">Asesoría de procesos y automatización</div>
  </div>`,
  "#f1f1ee",
);
render("linkedin-banner", banner, {
  pdf: path.join(out, "linkedin/albariza-linkedin-banner.pdf"),
  png: path.join(out, "linkedin/albariza-linkedin-banner.png"),
  width: 1584,
  height: 396,
});

rmSync(tmp, { recursive: true, force: true });
console.log("Brand kit written to brand-kit/");
