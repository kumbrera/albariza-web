import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, type Transition } from "motion/react";
import { Download, Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { formatPhone, team, whatsappUrl, type Persona } from "@/data/contacto";

// "¿A quién has conocido?": one person's card open with their direct line, the rest of the team as
// small faces above it. Tapping a face morphs it into the big card (shared layoutId). An NFC card
// opens the page with its owner already open; with nobody chosen, the three cards sit in a row.

const spring: Transition = { type: "spring", stiffness: 320, damping: 32 };

// simple-icons dropped LinkedIn's mark at LinkedIn's request; this is its standard "in" glyph.
function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const track = (event: string, slug: string) => window.gtag?.("event", event, { persona: slug, source: "tarjeta_nfc" });

function OpenCard({ p }: { p: Persona }) {
  return (
    <motion.article
      layoutId={`card-${p.slug}`}
      transition={spring}
      className="overflow-hidden rounded-[28px] bg-ink text-white shadow-[0_40px_80px_-40px_rgba(22,21,31,0.65)]"
    >
      <div className="relative aspect-[4/4.2] overflow-hidden">
        <motion.img
          layoutId={`photo-${p.slug}`}
          transition={spring}
          src={`/team/${p.slug}.webp`}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
          <p className="text-[0.92rem] font-semibold text-[#a99bff]">{p.role.split(" · ")[0]}</p>
          <h3 className="mt-1 text-[2.1rem] font-bold leading-none tracking-[-0.045em]">{p.name}</h3>
          {p.role.includes(" · ") && <p className="mt-2 text-[1rem] text-white/70">{p.role.split(" · ")[1]}</p>}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.3 }} className="space-y-2.5 px-5 pb-5 pt-4">
        <a
          href={whatsappUrl(p)}
          target="_blank"
          rel="noopener"
          onClick={() => track("whatsapp_click", p.slug)}
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25d366] px-5 py-3.5 text-[1.05rem] font-semibold text-[#0b3d22] transition active:scale-[0.98]"
        >
          <SiWhatsapp size={20} /> Escríbeme por WhatsApp
        </a>
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`tel:+34${p.phone}`}
            onClick={() => track("phone_call", p.slug)}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/10 px-2 py-3 text-[0.92rem] font-semibold transition active:scale-[0.98]"
          >
            <Phone size={17} /> {formatPhone(p.phone)}
          </a>
          <a
            href={`/contacto/${p.slug}.vcf`}
            download={`${p.name}.vcf`}
            onClick={() => track("save_contact", p.slug)}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-2 py-3 text-[0.92rem] font-semibold text-ink transition active:scale-[0.98]"
          >
            <Download size={17} /> Guardar contacto
          </a>
        </div>
        <div className="flex items-center justify-center gap-5 pt-1.5 text-[0.9rem] text-white/65">
          <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 hover:text-white">
            <Mail size={15} /> {p.email}
          </a>
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener" aria-label={`LinkedIn de ${p.name}`} className="flex items-center gap-1.5 hover:text-white">
              <LinkedInIcon /> LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

function Face({ p, onPick, big = false }: { p: Persona; onPick: () => void; big?: boolean }) {
  return (
    <motion.button
      type="button"
      layoutId={`card-${p.slug}`}
      transition={spring}
      onClick={onPick}
      aria-label={`Ver la tarjeta de ${p.name}`}
      className={
        big
          ? "group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-ink text-left text-white shadow-[0_24px_50px_-30px_rgba(22,21,31,0.6)]"
          : "flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-left shadow-[0_8px_20px_-14px_rgba(22,21,31,0.5)] ring-1 ring-ink/8"
      }
    >
      <motion.img
        layoutId={`photo-${p.slug}`}
        transition={spring}
        src={`/team/${p.slug}.webp`}
        alt=""
        className={big ? "absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" : "h-9 w-9 rounded-full object-cover object-top"}
      />
      {big ? (
        <>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-3">
            <span className="block text-[0.95rem] font-bold leading-tight tracking-[-0.03em]">{p.name.split(" ")[0]}</span>
            <span className="block text-[0.75rem] text-white/65">Co-founder</span>
          </span>
        </>
      ) : (
        <span className="text-[0.92rem] font-semibold text-ink">{p.name.split(" ")[0]}</span>
      )}
    </motion.button>
  );
}

export default function TeamCards({ initial = null }: { initial?: Persona["slug"] | null }) {
  const [open, setOpen] = useState<Persona["slug"] | null>(initial);
  const current = team.find((p) => p.slug === open) ?? null;
  const others = team.filter((p) => p.slug !== open);

  return (
    <LayoutGroup>
      {current ? (
        <div>
          <p className="mb-2 text-center text-[0.8rem] font-medium text-graphite">Ver resto del equipo</p>
          <div className="mb-4 flex items-center justify-center gap-2">
            {others.map((p) => (
              <Face key={p.slug} p={p} onPick={() => setOpen(p.slug)} />
            ))}
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <OpenCard key={current.slug} p={current} />
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {team.map((p) => (
            <Face key={p.slug} p={p} big onPick={() => setOpen(p.slug)} />
          ))}
        </div>
      )}
    </LayoutGroup>
  );
}
