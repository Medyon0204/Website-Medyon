"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";
import { SparklesCore } from "@/components/ui/sparkles";

// 70% white (#f0f4f8), 30% magenta (#e6007e)
const MOBILE_PARTICLE_COLORS = [
  "#f0f4f8", "#f0f4f8", "#f0f4f8", "#f0f4f8", "#f0f4f8",
  "#f0f4f8", "#f0f4f8",
  "#e6007e", "#e6007e", "#e6007e",
];

// Pre-allocate reusable vectors to avoid GC pressure in the animation loop
const _cur = new THREE.Vector3();
const _ori = new THREE.Vector3();
const _vel = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _mouse3 = new THREE.Vector3();

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const PARTICLE_COUNT = 40000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const origPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const srcPos = torusKnot.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vi = i % srcPos.count;
      const x = srcPos.getX(vi);
      const y = srcPos.getY(vi);
      const z = srcPos.getZ(vi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      origPositions[i * 3] = x;
      origPositions[i * 3 + 1] = y;
      origPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      if (Math.random() < 0.08) {
        color.setRGB(0.88, 0.94, 1.0);
      } else {
        color.setHSL(0.51 + Math.random() * 0.40, 0.95, 0.62);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    let splashFired = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      _mouse3.set(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

        _cur.set(positions[ix], positions[iy], positions[iz]);
        _ori.set(origPositions[ix], origPositions[iy], origPositions[iz]);
        _vel.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = _cur.distanceTo(_mouse3);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          _dir.subVectors(_cur, _mouse3).normalize();
          _vel.addScaledVector(_dir, force);
        }

        _dir.subVectors(_ori, _cur).multiplyScalar(0.001);
        _vel.add(_dir);
        _vel.multiplyScalar(0.95);

        positions[ix] += _vel.x;
        positions[iy] += _vel.y;
        positions[iz] += _vel.z;
        velocities[ix] = _vel.x;
        velocities[iy] = _vel.y;
        velocities[iz] = _vel.z;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);

      if (!splashFired) {
        splashFired = true;
        window.dispatchEvent(new Event("hero:canvas:ready"));
      }
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export function WovenLightHero() {
  const { locale } = useLanguage();
  const tr = t[locale].hero;
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;
    const delay = isMobile ? 0.5 : 1.2;
    textControls.start((i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + delay,
        duration: 1.0,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: isMobile ? 1.2 : 2.3, duration: 0.9 },
    });
  }, [isMobile, textControls, buttonControls]);

  // SSR / before hydration: dark placeholder
  if (isMobile === null) {
    return <section style={{ height: "100vh", backgroundColor: "#010a1b" }} />;
  }

  /* ── MOBILE / TABLET HERO ── */
  if (isMobile) {
    return (
      <section
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100svh", backgroundColor: "#010a1b" }}
      >
        {/* Sparkles — denser, more impactful */}
        <SparklesCore
          id="mobile-hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={2.2}
          particleDensity={260}
          className="absolute inset-0 w-full h-full"
          particleColor={MOBILE_PARTICLE_COLORS}
          speed={0.8}
          onLoaded={() => window.dispatchEvent(new Event("hero:canvas:ready"))}
        />

        {/* Radial glow behind text for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 50%, rgba(1,10,27,0.72) 20%, transparent 100%)",
          }}
        />

        {/* Text centered in particles */}
        <div className="relative z-10 px-6 flex flex-col items-center text-center w-full">
          <motion.h1
            className="font-black tracking-tight leading-[1.1] w-full"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.4rem)" }}
          >
            <motion.span
              custom={1}
              initial={{ opacity: 0, y: 35 }}
              animate={textControls}
              className="block"
              style={{ color: "#f0f4f8" }}
            >
              {tr.headline1}
            </motion.span>
            <motion.span
              custom={2}
              initial={{ opacity: 0, y: 35 }}
              animate={textControls}
              className="block text-gradient-dual"
            >
              {tr.headline2}
            </motion.span>
          </motion.h1>

          {/* Teal accent line */}
          <motion.div
            custom={3}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={textControls}
            className="my-5 h-px w-16"
            style={{
              background: "linear-gradient(90deg, transparent, #00c2cb, transparent)",
              transformOrigin: "center",
            }}
          />

          <motion.p
            custom={4}
            initial={{ opacity: 0, y: 20 }}
            animate={textControls}
            className="text-sm leading-relaxed mb-8 max-w-[280px]"
            style={{ color: "rgba(240,244,248,0.62)" }}
          >
            {tr.sub}{" "}
            <span style={{ color: "#f0f4f8", fontWeight: 600 }}>{tr.subBold}</span>
            {tr.subEnd}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={buttonControls}
            className="flex flex-col items-center gap-3 w-full max-w-[280px]"
          >
            <Link
              href="/kontakt"
              className="w-full inline-flex items-center justify-center gap-2 bg-magenta text-white font-semibold px-7 py-4 rounded-lg hover:bg-magenta-light transition-all duration-200 shadow-[0_0_28px_rgba(230,0,126,0.45)] active:scale-95 text-sm"
            >
              {tr.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/medyon-methode"
              className="inline-flex items-center gap-2 font-medium text-sm group transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(240,244,248,0.55)" }}
            >
              {tr.ctaSecondary}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP HERO (unverändert) ── */
  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#010a1b" }}
    >
      <WovenCanvas />

      <div className="relative z-10 w-full px-6 lg:pl-16 xl:pl-24 text-center lg:text-left mx-auto lg:mx-0 lg:max-w-[52%]">
        {/* Label pill */}
        <motion.div
          custom={0}
          initial={{ opacity: 0, y: 20 }}
          animate={textControls}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] uppercase tracking-[0.4em]"
          style={{
            border: "1px solid rgba(0, 194, 203, 0.28)",
            background: "rgba(0, 194, 203, 0.07)",
            color: "rgba(0, 194, 203, 0.85)",
          }}
        >
          {tr.label}
        </motion.div>

        {/* Headline */}
        <h1
          className="font-black tracking-tight leading-[1.05]"
          style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)" }}
        >
          <motion.span
            custom={1}
            initial={{ opacity: 0, y: 50 }}
            animate={textControls}
            className="block"
            style={{ color: "#f0f4f8" }}
          >
            {tr.headline1}
          </motion.span>
          <motion.span
            custom={2}
            initial={{ opacity: 0, y: 50 }}
            animate={textControls}
            className="block text-gradient-dual"
          >
            {tr.headline2}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={3}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className="mt-6 max-w-xl text-lg leading-relaxed mx-auto lg:mx-0"
          style={{ color: "rgba(240, 244, 248, 0.58)" }}
        >
          {tr.sub}{" "}
          <span style={{ color: "#f0f4f8", fontWeight: 600 }}>{tr.subBold}</span>
          {tr.subEnd}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={buttonControls}
          className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-7 py-4 rounded-lg hover:bg-magenta-light transition-all duration-200 shadow-[0_0_28px_rgba(230,0,126,0.4)] hover:shadow-[0_0_48px_rgba(230,0,126,0.6)] active:scale-95 text-sm"
          >
            {tr.ctaPrimary}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/medyon-methode"
            className="inline-flex items-center gap-2 font-medium text-sm group transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(240,244,248,0.55)" }}
          >
            {tr.ctaSecondary}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(240,244,248,0.3)" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>
    </section>
  );
}
