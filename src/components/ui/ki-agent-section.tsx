'use client'

import dynamic from 'next/dynamic'
import { Spotlight } from '@/components/ui/spotlight'

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then((m) => m.SplineScene),
  { ssr: false }
)

interface KIAgentSectionProps {
  headline: string
  description: string
}

export function KIAgentSection({ headline, description }: KIAgentSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="w-full rounded-2xl relative overflow-hidden"
          style={{
            height: '500px',
            background: 'rgba(13, 31, 54, 0.92)',
            border: '1px solid rgba(230, 0, 126, 0.18)',
            boxShadow: '0 0 60px rgba(230, 0, 126, 0.05)',
          }}
        >
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#e6007e"
            filterId="ki-agent-spotlight"
          />

          <div className="flex h-full">
            {/* Left: text */}
            <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
              <p
                className="text-[10px] uppercase tracking-[0.4em] mb-5"
                style={{ color: 'rgba(230, 0, 126, 0.6)' }}
              >
                Medyon · KI-Agent
              </p>

              <h2
                className="font-black leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
              >
                {headline.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={`block ${i === 0 ? 'text-gradient-magenta' : 'text-text-primary'}`}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <p className="text-text-secondary leading-relaxed max-w-sm" style={{ fontSize: '0.875rem' }}>
                {description}
              </p>

              <div
                className="mt-8 w-10 h-px"
                style={{ background: 'linear-gradient(90deg, #e6007e, transparent)' }}
              />
            </div>

            {/* Right: interactive Spline robot */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              {/* Left fade to blend with text panel */}
              <div
                className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(13,31,54,0.92), transparent)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
