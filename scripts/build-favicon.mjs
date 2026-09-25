import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const brandDir = path.join(publicDir, "brand");

const markSvg = readFileSync(path.join(brandDir, "albariza-favicon.svg"));
writeFileSync(path.join(publicDir, "favicon.svg"), markSvg);

async function renderPng(size) {
  return sharp(markSvg, { density: 384 }).resize(size, size).png().toBuffer();
}

// --- PNG sizes (favicons / touch icons / social) ---
const sizes = [16, 32, 48, 180, 192, 512];
for (const size of sizes) {
  const buf = await renderPng(size);
  writeFileSync(path.join(brandDir, `favicon-${size}.png`), buf);
}
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), await renderPng(180));

// --- favicon.ico: modern ICO format can embed PNG payloads directly (Vista+), so we
// hand-write a minimal ICO container around the 16/32/48 PNGs instead of needing a
// dedicated ICO-encoding dependency. ---
const icoSizes = [16, 32, 48];
const pngBuffers = await Promise.all(icoSizes.map(renderPng));

const ICONDIR = Buffer.alloc(6);
ICONDIR.writeUInt16LE(0, 0); // reserved
ICONDIR.writeUInt16LE(1, 2); // type: 1 = icon
ICONDIR.writeUInt16LE(icoSizes.length, 4); // image count

const entries = [];
let offset = 6 + icoSizes.length * 16;
icoSizes.forEach((size, i) => {
  const png = pngBuffers[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image data size
  entry.writeUInt32LE(offset, 12); // offset
  offset += png.length;
  entries.push(entry);
});

const ico = Buffer.concat([ICONDIR, ...entries, ...pngBuffers]);
writeFileSync(path.join(publicDir, "favicon.ico"), ico);

console.log("Favicon assets written to public/ and public/brand/");
