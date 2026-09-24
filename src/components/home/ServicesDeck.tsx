import BounceCards from "@/components/BounceCards";

export interface DeckService {
  slug: string;
  name: string;
  description: string;
  video: string;
}

function ServiceCard({ service }: { service: DeckService }) {
  return (
    <a
      href={`/servicios/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
    >
      <div className="relative h-[190px] shrink-0 overflow-hidden">
        <video
          className="h-full w-full scale-[1.03] object-cover transition duration-700 group-hover:scale-110"
          src={service.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.3rem] font-bold leading-tight">{service.name}</h3>
        <p className="mt-2 text-[0.92rem] leading-snug text-graphite">{service.description}</p>
        <span className="mt-auto pt-4 text-[0.9rem] font-semibold text-violet">Ver el servicio</span>
      </div>
    </a>
  );
}

export default function ServicesDeck({ services }: { services: DeckService[] }) {
  return (
    <>
      <div className="hidden justify-center md:flex">
        <BounceCards
          items={services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          cardClassName="w-[280px] h-[380px] rounded-[24px] border-[5px] border-white"
          containerWidth="100%"
          containerHeight={460}
          transformStyles={["rotate(-7deg) translate(-250px)", "rotate(2deg) translate(0px)", "rotate(8deg) translate(250px)"]}
          animationDelay={0.15}
          animationStagger={0.09}
          enableHover
          pushOffset={70}
          startOnView
        />
      </div>
      <div className="grid gap-5 md:hidden">
        {services.map((s) => (
          <div key={s.slug} className="h-[380px] rounded-[24px] border-[5px] border-white shadow-[0_18px_40px_-20px_rgba(22,21,31,0.35)]">
            <ServiceCard service={s} />
          </div>
        ))}
      </div>
    </>
  );
}
