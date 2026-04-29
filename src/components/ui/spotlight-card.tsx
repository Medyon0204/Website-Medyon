import React, { useEffect, useRef, ReactNode } from 'react';

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'magenta' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue:    { base: 220, spread: 200 },
  purple:  { base: 280, spread: 300 },
  green:   { base: 120, spread: 200 },
  red:     { base: 0,   spread: 200 },
  orange:  { base: 30,  spread: 200 },
  // Medyon CI: magenta (#e6007e, hue ~327°) shifts toward teal as cursor moves right
  magenta: { base: 327, spread: -144 },
  // Medyon CI: teal (#00c2cb, hue ~183°) shifts toward magenta as cursor moves right
  teal:    { base: 183, spread: 144 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const isMedyon = glowColor === 'magenta' || glowColor === 'teal';

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = (): CustomCSSProperties => {
    const baseStyles: CustomCSSProperties = {
      '--base': base,
      '--spread': spread,
      '--radius': '16',
      '--border': '1',
      '--size': customSize ? '280' : '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      // Medyon CI: dark surface backdrop + subtle glow intensities
      '--backdrop':            isMedyon ? 'rgba(13, 31, 54, 0.65)' : 'hsl(0 0% 60% / 0.12)',
      '--backup-border':       isMedyon ? 'rgba(255,255,255,0.07)'  : 'var(--backdrop)',
      '--saturation':          isMedyon ? '100'                      : '100',
      '--lightness':           isMedyon ? '58'                       : '70',
      '--bg-spot-opacity':     isMedyon ? '0.09'                     : '0.1',
      '--border-spot-opacity': isMedyon ? '0.9'                      : '1',
      '--border-light-opacity': isMedyon ? '0.12'                    : '1',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
    };

    if (width !== undefined)  baseStyles.width  = typeof width  === 'number' ? `${width}px`  : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          rounded-2xl relative backdrop-blur-[6px]
          ${!customSize ? 'grid grid-rows-[1fr_auto] aspect-[3/4] p-4 gap-4 shadow-[0_1rem_2rem_-1rem_black]' : ''}
          ${className}
        `.trim()}
      >
        <div ref={innerRef} data-glow />
        {children}
      </div>
    </>
  );
};

export { GlowCard };
