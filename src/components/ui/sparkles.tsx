"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/cn";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string | string[];
  particleDensity?: number;
  onLoaded?: () => void;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
    onLoaded,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 1 } });
      onLoaded?.();
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background || "transparent" } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 60,
            particles: {
              color: {
                value: particleColor || "#ffffff",
              },
              move: {
                enable: true,
                direction: "none",
                random: true,
                speed: { min: 0.1, max: speed || 0.8 },
                straight: false,
                outModes: { default: "out" },
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity || 80,
              },
              opacity: {
                value: { min: 0.15, max: 0.9 },
                animation: {
                  enable: true,
                  speed: speed || 1.2,
                  sync: false,
                  startValue: "random",
                  destroy: "none",
                  mode: "auto",
                  count: 0,
                  decay: 0,
                  delay: 0,
                },
              },
              shape: { type: "circle" },
              size: {
                value: { min: minSize || 0.4, max: maxSize || 1.6 },
              },
            },
            detectRetina: true,
            interactivity: {
              events: { resize: true as any },
            },
          }}
        />
      )}
    </motion.div>
  );
};
