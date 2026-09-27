import { useState } from "react";
import { motion } from "motion/react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
} from "@/components/ui/resizable-navbar";
import { ASESORIA_PATH } from "@/data/routes";

const LEFT = [
  { name: "Asesoría", link: ASESORIA_PATH },
  { name: "Servicios", link: "/#servicios" },
  { name: "Nosotros", link: "/nosotros/" },
];
const RIGHT = [
  { name: "Blog", link: "/blog/" },
  { name: "Contacto", link: "/contacto/" },
];
const CTA = { name: "Sesión gratuita", link: "/#sesion-gratuita" };

// "Servicios" points at the home section, so it lights up on the secondary service pages.
const isActive = (link: string, path: string) =>
  link === "/#servicios" ? path.startsWith("/servicios/") && !path.startsWith(ASESORIA_PATH) : path.startsWith(link);

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="/" aria-label="Albariza Digital, inicio" className={`block ${className}`}>
      <img src="/brand/albariza-wordmark.svg" alt="Albariza" width={350} height={84} className="h-[30px] w-auto" />
    </a>
  );
}

function Links({ items, group, path }: { items: { name: string; link: string }[]; group: string; path: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex items-center" onMouseLeave={() => setHovered(null)}>
      {items.map((item, i) => {
        const active = isActive(item.link, path);
        return (
        <a
          key={item.link}
          href={item.link}
          aria-current={active ? "page" : undefined}
          onMouseEnter={() => setHovered(i)}
          className={`relative rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-violet ${active ? "font-medium text-ink" : "text-graphite"}`}
        >
          {hovered === i && (
            <motion.span
              layoutId={`nav-hover-${group}`}
              className="absolute inset-0 rounded-full bg-ink/[0.06]"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
          )}
          <span className="relative">{item.name}</span>
          {active && <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 bg-violet" />}
        </a>
        );
      })}
    </div>
  );
}

export default function SiteNav({ path = "/" }: { path?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Navbar className="fixed top-0 z-50 pt-3">
      <NavBody className="px-3">
        <Links items={LEFT} group="left" path={path} />
        <Wordmark className="absolute left-1/2 -translate-x-1/2" />
        <div className="flex items-center gap-1">
          <Links items={RIGHT} group="right" path={path} />
          <a
            href={CTA.link}
            data-open-booking
            className="ml-2 rounded-full bg-ink px-5 py-2.5 text-[0.92rem] font-semibold text-chalk transition hover:bg-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            {CTA.name}
          </a>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader className="px-4">
          <Wordmark />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)} className="bg-white">
          {[...LEFT, ...RIGHT].map((item) => (
            <a
              key={item.link}
              href={item.link}
              aria-current={isActive(item.link, path) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`w-full py-1 text-lg ${isActive(item.link, path) ? "font-semibold text-violet" : "text-ink"}`}
            >
              {item.name}
            </a>
          ))}
          <a
            href={CTA.link}
            data-open-booking
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-full bg-ink px-5 py-3 text-center font-semibold text-chalk"
          >
            {CTA.name}
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
