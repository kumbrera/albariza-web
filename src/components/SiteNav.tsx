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

const LEFT = [
  { name: "Cómo trabajamos", link: "/#como-trabajamos" },
  { name: "Servicios", link: "/#servicios" },
];
const RIGHT = [
  { name: "Blog", link: "/blog" },
  { name: "Nosotros", link: "/nosotros" },
];
const CTA = { name: "Sesión gratuita", link: "/#sesion-gratuita" };

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="/" aria-label="Albariza Digital, inicio" className={`block ${className}`}>
      <img src="/brand/albariza-wordmark.svg" alt="Albariza" width={350} height={84} className="h-[30px] w-auto" />
    </a>
  );
}

function Links({ items, group }: { items: { name: string; link: string }[]; group: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex items-center" onMouseLeave={() => setHovered(null)}>
      {items.map((item, i) => (
        <a
          key={item.link}
          href={item.link}
          onMouseEnter={() => setHovered(i)}
          className="relative rounded-full px-4 py-2 text-[0.95rem] text-graphite transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-violet"
        >
          {hovered === i && (
            <motion.span
              layoutId={`nav-hover-${group}`}
              className="absolute inset-0 rounded-full bg-ink/[0.06]"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
          )}
          <span className="relative">{item.name}</span>
        </a>
      ))}
    </div>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <Navbar className="fixed top-0 z-50 pt-3">
      <NavBody className="px-3">
        <Links items={LEFT} group="left" />
        <Wordmark className="absolute left-1/2 -translate-x-1/2" />
        <div className="flex items-center gap-1">
          <Links items={RIGHT} group="right" />
          <a
            href={CTA.link}
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
            <a key={item.link} href={item.link} onClick={() => setOpen(false)} className="w-full py-1 text-lg text-ink">
              {item.name}
            </a>
          ))}
          <a
            href={CTA.link}
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
