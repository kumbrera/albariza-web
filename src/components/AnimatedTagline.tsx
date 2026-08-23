import { motion } from "framer-motion";

interface Props {
  normal: string;
  emphasis: string;
  /** Service accent colour (hex) — service pages tint the emphasis word with their own
      identity colour instead of the generic home violet. */
  accent?: string;
}

export default function AnimatedTagline({ normal, emphasis, accent }: Props) {
  // Home (no accent passed): the whole tagline stays white, with a stronger glow —
  // this is the original home treatment. Service pages (accent passed): tint the
  // emphasis word in the service's own colour, with a more moderate glow so five
  // different hues don't each come on as strong as the home's single white one.
  const color = accent ?? "#ffffff";
  const textShadow = accent
    ? `0 0 20px ${accent}80, 0 0 46px ${accent}40`
    : "0 0 22px rgba(255,255,255,0.85), 0 0 50px rgba(255,255,255,0.55), 0 0 90px rgba(255,255,255,0.3)";

  return (
    <h1 className="mx-auto max-w-3xl text-center font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {normal}
      </motion.span>{" "}
      <motion.span
        className="inline-block font-semibold not-italic"
        style={{ color, textShadow }}
        initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        {emphasis}
      </motion.span>
    </h1>
  );
}
