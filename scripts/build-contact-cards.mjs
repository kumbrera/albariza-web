// Assets for the NFC contact page (/hola/): a portrait per person in public/team/ and a vCard
// ("Guardar contacto") in public/contacto/, with the photo embedded so it shows in the phone's contacts.
//   node scripts/build-contact-cards.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { team } from "../src/data/contacto.ts";

const root = path.resolve(import.meta.dirname, "..");
mkdirSync(path.join(root, "public/contacto"), { recursive: true });

// Crop boxes (x, y, size of a 4:5 window's width) per source photo, framing head and shoulders.
const crops = {
  pablo: { photo: "foto_pablo.png", left: 0.16, top: 0.04, width: 0.68 },
  miguel: { photo: "foto miguel.png", left: 0.16, top: 0.05, width: 0.68 },
  alejandro: { photo: "foto Alejandro.png", left: 0.16, top: 0.06, width: 0.68 },
};

const esc = (s) => s.replace(/([,;\\])/g, "\\$1");

for (const p of team) {
  const c = crops[p.slug];
  const src = sharp(path.join(root, "design-src/equipo", c.photo));
  const { width: W, height: H } = await src.metadata();
  const w = Math.round(W * c.width);
  const h = Math.min(Math.round(w * 1.25), H - Math.round(H * c.top));
  const box = { left: Math.round(W * c.left), top: Math.round(H * c.top), width: w, height: h };

  await sharp(path.join(root, "design-src/equipo", c.photo)).extract(box).resize(640, 800, { fit: "cover", position: "top" }).webp({ quality: 82 }).toFile(path.join(root, "public/team", `${p.slug}.webp`));
  const jpeg = await sharp(path.join(root, "design-src/equipo", c.photo)).extract(box).resize(320, 320, { fit: "cover", position: "top" }).jpeg({ quality: 78 }).toBuffer();

  const [first, ...rest] = p.name.split(" ");
  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(rest.join(" "))};${esc(first)};;;`,
    `FN:${esc(p.name)}`,
    "ORG:Albariza Digital",
    `TITLE:${esc(p.role)}`,
    `TEL;TYPE=CELL,VOICE:+34${p.phone}`,
    `EMAIL;TYPE=WORK:${p.email}`,
    "URL:https://albarizadigital.com/",
    ...(p.linkedin ? [`X-SOCIALPROFILE;TYPE=linkedin:${p.linkedin}`] : []),
    "NOTE:Asesoría de procesos y automatización para pymes.",
    `PHOTO;ENCODING=b;TYPE=JPEG:${jpeg.toString("base64")}`,
    "END:VCARD",
    "",
  ].join("\r\n");
  writeFileSync(path.join(root, "public/contacto", `${p.slug}.vcf`), vcf);
}
console.log("Portraits in public/team/, vCards in public/contacto/");
