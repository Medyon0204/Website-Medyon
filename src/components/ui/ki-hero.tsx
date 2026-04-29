'use client';

import dynamic from 'next/dynamic';
import { Spotlight } from '@/components/ui/spotlight';

const NeuralNetworkAnimation = dynamic(
  () => import('@/components/ui/neural-network').then((m) => m.NeuralNetworkAnimation),
  { ssr: false }
);

interface KIHeroProps {
  headline: string;
  description: string;
}

export function KIHero({ headline, description }: KIHeroProps) {
  return (
    <div className="px-6 pt-8 pb-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="w-full rounded-2xl relative overflow-hidden"
          style={{
            minHeight: '460px',
            background: 'rgba(13, 31, 54, 0.92)',
            border: '1px solid rgba(0, 194, 203, 0.18)',
            boxShadow: '0 0 60px rgba(0, 194, 203, 0.06)',
          }}
        >
          {/* Spotlight */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#00c2cb"
          />

          <div className="flex flex-col md:flex-row h-full" style={{ minHeight: '460px' }}>
            {/* Left: text content */}
            <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
              <p
                className="text-[10px] uppercase tracking-[0.4em] mb-5"
                style={{ color: 'rgba(0, 194, 203, 0.6)' }}
              >
                Medyon · KI-Automatisierung
              </p>

              <h2
                className="font-black leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                {headline.split('\n').map((line, i) => {
                  const isTeal = i === 0;
                  return (
                    <span key={i} className={`block ${isTeal ? 'text-gradient-teal' : 'text-text-primary'}`}>
                      {line}
                    </span>
                  );
                })}
              </h2>

              <p className="text-text-secondary leading-relaxed max-w-sm" style={{ fontSize: '0.9rem' }}>
                {description}
              </p>

              {/* Teal accent line */}
              <div
                className="mt-8 w-10 h-px"
                style={{ background: 'linear-gradient(90deg, #00c2cb, transparent)' }}
              />
            </div>

            {/* Right: neural network visualization */}
            <div className="flex-1 relative overflow-hidden" style={{ minHeight: '280px' }}>
              <NeuralNetworkAnimation />

              {/* Fade edge to blend with left panel */}
              <div
                className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(13,31,54,0.92), transparent)' }}
              />
              {/* Bottom fade on mobile */}
              <div
                className="md:hidden absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(13,31,54,0.92), transparent)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
