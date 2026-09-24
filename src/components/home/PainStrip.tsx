import { ScrollVelocity } from "@/components/ScrollVelocity";

function Row({ items }: { items: string[] }) {
  return (
    <span className="inline-flex items-center">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center">
          <span className="px-6">{item}</span>
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 bg-violet/70" />
        </span>
      ))}
    </span>
  );
}

export default function PainStrip({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  return (
    <ScrollVelocity
      texts={[<Row key="a" items={items.slice(0, half)} />, <Row key="b" items={items.slice(half)} />]}
      velocity={38}
      numCopies={4}
      className="text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold tracking-[-0.03em] text-ink"
      scrollerClassName="py-2"
    />
  );
}
