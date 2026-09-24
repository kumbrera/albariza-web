import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  /** Custom card content (rendered instead of `images`). */
  items?: ReactNode[];
  /** Replaces the default 200px square image-card styling. */
  cardClassName?: string;
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  pushOffset?: number;
  /** Play the entrance when the deck scrolls into view instead of on mount. */
  startOnView?: boolean;
}

export default function BounceCards({
  className = '',
  images = [],
  items,
  cardClassName = 'w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden',
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = false,
  pushOffset = 160,
  startOnView = false
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = items ? items.length : images.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('.card', { scale: 0 });
    }, containerRef);

    const play = () =>
      ctx.add(() => {
        gsap.to('.card', { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay });
      });

    if (!startOnView) {
      play();
      return () => ctx.revert();
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(container);
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, [animationDelay, animationStagger, easeType, startOnView]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    const q = gsap.utils.selector(containerRef);
    if (!enableHover || !containerRef.current) return;

    for (let i = 0; i < count; i++) {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(selector, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -pushOffset : pushOffset;
        gsap.to(selector, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: 'auto'
        });
      }
    }
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    for (let i = 0; i < count; i++) {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);
      gsap.to(selector, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {Array.from({ length: count }, (_, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute ${cardClassName}`}
          style={{
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transform: transformStyles[idx] || 'none'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          {items ? items[idx] : <img className="w-full h-full object-cover" src={images[idx]} alt={`card-${idx}`} />}
        </div>
      ))}
    </div>
  );
}
