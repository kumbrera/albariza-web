// Renders the Lanyard badge faces (front per person, shared back) into public/lanyard/.
// Front faces are sized to the card atlas' front UV rect (0.5 x 0.755 of a square atlas).
//   node scripts/build-team-cards.mjs
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public", "lanyard");
const tmp = path.join(root, "design-src", ".cards-tmp");
mkdirSync(tmp, { recursive: true });

const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
if (!browser) throw new Error("Edge or Chrome is needed to render the cards.");

const W = 1000;
const H = 1510;
const font = pathToFileURL(path.join(root, "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")).href;
const wordmarkWhite = readFileSync(path.join(root, "public/brand/albariza-wordmark-white.svg"), "utf8");

const people = [
  { slug: "pablo", photo: "foto_pablo.png", name: "Pablo Cumbrera", role: "Growth Manager", pos: "50% 18%" },
  { slug: "miguel", photo: "foto miguel.png", name: "Miguel López", role: "Ingeniero y empresario", pos: "50% 22%" },
];

const shell = (body) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url("${font}") format("woff2"); font-weight: 100 900; }
html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; font-family: Geist, sans-serif; }
</style></head><body>${body}</body></html>`;

function shot(name, html) {
  const file = path.join(tmp, `${name}.html`);
  writeFileSync(file, html);
  const png = path.join(tmp, `${name}.png`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--window-size=${W},${H}`, "--force-device-scale-factor=1", `--screenshot=${png}`, pathToFileURL(file).href], { stdio: "ignore" });
  return png;
}

for (const p of people) {
  const photo = pathToFileURL(path.join(root, "design-src/equipo", p.photo)).href;
  const png = shot(
    p.slug,
    shell(`<div style="position:relative;width:${W}px;height:${H}px;background:#16151f;color:#fff">
      <img src="${photo}" style="position:absolute;inset:0 0 auto 0;width:100%;height:1060px;object-fit:cover;object-position:${p.pos}">
      <div style="position:absolute;left:0;right:0;top:760px;height:320px;background:linear-gradient(to bottom, rgba(22,21,31,0), #16151f)"></div>
      <div style="position:absolute;left:80px;right:80px;top:1090px">
        <div style="font-size:34px;font-weight:600;color:#a99bff;letter-spacing:-0.01em">Co-founder</div>
        <div style="margin-top:14px;font-size:92px;font-weight:700;letter-spacing:-0.05em;line-height:1">${p.name}</div>
        <div style="margin-top:18px;font-size:44px;font-weight:500;color:rgba(255,255,255,0.72);letter-spacing:-0.02em">${p.role}</div>
      </div>
      <div style="position:absolute;left:80px;right:80px;bottom:70px;display:flex;align-items:center;justify-content:space-between">
        <div style="width:230px">${wordmarkWhite.replace('width="350" height="84"', 'width="230" height="55.2"')}</div>
        <div style="font-size:30px;color:rgba(255,255,255,0.45)">albarizadigital.com</div>
      </div>
    </div>`),
  );
  await sharp(png).webp({ quality: 88 }).toFile(path.join(out, `${p.slug}-front.webp`));
}

const back = shot(
  "back",
  shell(`<div style="position:relative;width:${W}px;height:${H}px;background:linear-gradient(135deg,#6a4ff7 0%,#4f32e0 60%,#2f1c9c 100%)">
    <div style="position:absolute;inset:0;background:radial-gradient(60% 45% at 30% 18%, rgba(255,255,255,0.28), rgba(255,255,255,0) 70%)"></div>
    <div style="position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:640px">${wordmarkWhite.replace('width="350" height="84"', 'width="640" height="153.6"').replaceAll('fill="#4F32E0"', 'fill="#FFFFFF"')}</div>
    <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center;font-size:34px;font-weight:500;color:rgba(255,255,255,0.75)">Asesoría de procesos y automatización</div>
  </div>`),
);
await sharp(back).webp({ quality: 88 }).toFile(path.join(out, "back.webp"));

// Strap texture: the u axis runs along the band and tiles 3x (repeat in Lanyard.tsx), so each tile is
// ~2.7:1 on screen. Matching that aspect keeps the wordmark from being squashed along the strap.
const strapSvg = wordmarkWhite.replace('width="350" height="84"', 'width="860" height="206.4"').replaceAll('fill="#4F32E0"', 'fill="#8b78ff"');
const strapMeta = await sharp(Buffer.from(strapSvg)).png().toBuffer();
await sharp({ create: { width: 1080, height: 400, channels: 4, background: "#16151f" } })
  .composite([{ input: strapMeta, gravity: "center" }])
  .png()
  .toFile(path.join(out, "lanyard.png"));

rmSync(tmp, { recursive: true, force: true });
console.log("Team cards written to public/lanyard/");
