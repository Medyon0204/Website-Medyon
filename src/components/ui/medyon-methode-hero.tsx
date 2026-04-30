"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

const CARD_START_SCALE_DESKTOP = 0.70;
const CARD_START_SCALE_MOBILE = 0.92;
const IMMERSE_OVERFILL = 1.02;

// ─── root system types ────────────────────────────────────────────────────────
type RootColor = "teal" | "mag";
type RootBranch = {
  curve: THREE.CatmullRomCurve3;
  radius: number;
  color: RootColor;
  children: RootBranch[];
};
type Packet = { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; t: number; speed: number };

// ─── recursive root generator ─────────────────────────────────────────────────
function growRoot(
  start: THREE.Vector3,
  dir: THREE.Vector3,
  radius: number,
  depth: number,
  color: RootColor
): RootBranch {
  const segLen = Math.max(0.7, 4.5 - depth * 0.9) + Math.random() * 2;
  const pts: THREE.Vector3[] = [start.clone()];
  const curr = start.clone();

  for (let i = 0; i < 8; i++) {
    const wander = new THREE.Vector3(
      (Math.random() - 0.5) * 0.55,
      -0.08 - Math.random() * 0.18,
      (Math.random() - 0.5) * 0.55
    );
    curr.add(dir.clone().add(wander).normalize().multiplyScalar(segLen / 8));
    pts.push(curr.clone());
  }

  const branch: RootBranch = { curve: new THREE.CatmullRomCurve3(pts), radius, color, children: [] };

  if (depth < 3) {
    const numSplits = depth === 0 ? 3 : (depth === 1 ? 2 : (Math.random() > 0.35 ? 2 : 1));
    const end = pts[pts.length - 1];
    for (let i = 0; i < numSplits; i++) {
      const angle = (i / numSplits) * Math.PI * 2 + Math.random() * 0.9;
      const spread = 0.4 + depth * 0.12;
      const newDir = new THREE.Vector3(
        dir.x + Math.cos(angle) * spread,
        dir.y - 0.28 - Math.random() * 0.22,
        dir.z + Math.sin(angle) * spread
      ).normalize();
      const childColor: RootColor = Math.random() > 0.48 ? "teal" : "mag";
      branch.children.push(growRoot(end.clone(), newDir, radius * 0.63, depth + 1, childColor));
    }
  }
  return branch;
}

// ─── Three.js scene builder ───────────────────────────────────────────────────
function buildTreeScene(canvas: HTMLCanvasElement, W: number, H: number) {
  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x030b04);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.78;

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0x040e05, 0.025);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 130);
  camera.position.set(0, 10, 30);
  camera.lookAt(0, 5, 0);

  // ── ground plane ────────────────────────────────────────────────────────────
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0c1a08, roughness: 0.95, metalness: 0 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(50, 40), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.01;
  scene.add(ground);

  // subtle grass / earth detail ring
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x0f2010, roughness: 1 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.8, 12, 32), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  scene.add(ring);

  // ── trunk ───────────────────────────────────────────────────────────────────
  const trunkPts = [
    new THREE.Vector3(0, -2.5, 0),
    new THREE.Vector3(0.25, 1.2, 0.15),
    new THREE.Vector3(-0.18, 4.5, -0.1),
    new THREE.Vector3(0.12, 8, 0.22),
    new THREE.Vector3(0, 12, 0),
    new THREE.Vector3(0, 17, 0),
  ];
  const trunkCurve = new THREE.CatmullRomCurve3(trunkPts);
  const trunkGeo = new THREE.TubeGeometry(trunkCurve, 24, 0.85, 10, false);
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x1c0e06,
    roughness: 0.92,
    metalness: 0.04,
  });
  scene.add(new THREE.Mesh(trunkGeo, trunkMat));

  // root buttresses (thick surface roots radiating from base)
  for (let i = 0; i < 5; i++) {
    const ang = (i / 5) * Math.PI * 2;
    const bp = [
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(Math.cos(ang) * 1.8, -0.3, Math.sin(ang) * 1.8),
      new THREE.Vector3(Math.cos(ang) * 3.5, -0.8, Math.sin(ang) * 3.5),
    ];
    const bGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bp), 10, 0.3, 6, false);
    scene.add(new THREE.Mesh(bGeo, trunkMat));
  }

  // canopy hint (large transparent sphere above)
  const canopyMat = new THREE.MeshStandardMaterial({ color: 0x0b2008, roughness: 1, transparent: true, opacity: 0.65 });
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 8), canopyMat);
  canopy.position.set(0, 22, 0);
  scene.add(canopy);

  // ── root materials ──────────────────────────────────────────────────────────
  const matTeal = new THREE.MeshStandardMaterial({
    color: 0x0c1e10,
    roughness: 0.87,
    metalness: 0.05,
    emissive: new THREE.Color(0x00c2cb),
    emissiveIntensity: 0.22,
  });
  const matMag = new THREE.MeshStandardMaterial({
    color: 0x1c0a10,
    roughness: 0.87,
    metalness: 0.05,
    emissive: new THREE.Color(0xe6007e),
    emissiveIntensity: 0.17,
  });

  const allCurves: { curve: THREE.CatmullRomCurve3; color: RootColor }[] = [];

  function renderRoot(b: RootBranch) {
    const segs = b.radius > 0.32 ? 22 : (b.radius > 0.14 ? 15 : 10);
    const rSegs = b.radius > 0.32 ? 8 : (b.radius > 0.14 ? 6 : 5);
    const geo = new THREE.TubeGeometry(b.curve, segs, b.radius, rSegs, false);
    scene.add(new THREE.Mesh(geo, b.color === "teal" ? matTeal : matMag));
    allCurves.push({ curve: b.curve, color: b.color });
    for (const child of b.children) renderRoot(child);
  }

  // grow 7 main roots from trunk base
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.3;
    const dir = new THREE.Vector3(Math.cos(angle) * 0.75, -0.55, Math.sin(angle) * 0.75).normalize();
    const color: RootColor = i % 2 === 0 ? "teal" : "mag";
    renderRoot(growRoot(new THREE.Vector3(Math.cos(angle) * 0.5, -0.4, Math.sin(angle) * 0.5), dir, 0.52, 0, color));
  }

  // ── data packets on roots ────────────────────────────────────────────────────
  const packets: Packet[] = [];
  const pGeoSm = new THREE.SphereGeometry(0.055, 6, 5);
  const pGeoMd = new THREE.SphereGeometry(0.09, 7, 6);

  for (const { curve, color } of allCurves) {
    const count = Math.random() > 0.45 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const isMag = color === "mag" || Math.random() > 0.65;
      const mesh = new THREE.Mesh(
        Math.random() > 0.55 ? pGeoSm : pGeoMd,
        new THREE.MeshStandardMaterial({
          color: isMag ? 0xe6007e : 0x00c2cb,
          emissive: isMag ? 0xe6007e : 0x00c2cb,
          emissiveIntensity: 9,
          transparent: true,
          opacity: 0.94,
        })
      );
      scene.add(mesh);
      packets.push({ mesh, curve, t: Math.random(), speed: 0.002 + Math.random() * 0.007 });
    }
  }

  // ── lighting ─────────────────────────────────────────────────────────────────
  // above-ground: warm dappled sunlight
  const sun = new THREE.DirectionalLight(0xffd085, 1.4);
  sun.position.set(8, 25, 12);
  scene.add(sun);

  scene.add(new THREE.AmbientLight(0x061105, 2.5));

  // underground: root zone glow
  const tealGlow = new THREE.PointLight(0x00c2cb, 4, 22);
  tealGlow.position.set(-5, -7, 4);
  scene.add(tealGlow);

  const magGlow = new THREE.PointLight(0xe6007e, 3.5, 20);
  magGlow.position.set(6, -10, -5);
  scene.add(magGlow);

  const deepGlow = new THREE.PointLight(0x00c2cb, 2.5, 28);
  deepGlow.position.set(0, -16, 0);
  scene.add(deepGlow);

  const camFill = new THREE.PointLight(0x88bbaa, 1.4, 14);
  scene.add(camFill);

  // ── camera path: exterior → trunk → underground roots ─────────────────────
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 10, 30),
    new THREE.Vector3(0, 7, 20),
    new THREE.Vector3(0, 4, 12),
    new THREE.Vector3(0, 2, 5),
    new THREE.Vector3(0, 0, 1.5),
    new THREE.Vector3(0, -3, 1),
    new THREE.Vector3(1.5, -7, 2.5),
    new THREE.Vector3(3, -12, 4),
    new THREE.Vector3(2, -16, 2),
  ]);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 6, 8),
    new THREE.Vector3(0, 4, 2),
    new THREE.Vector3(0, 2, -4),
    new THREE.Vector3(0, 0, -8),
    new THREE.Vector3(0, -2, -10),
    new THREE.Vector3(0, -6, -8),
    new THREE.Vector3(-1, -10, -4),
    new THREE.Vector3(-2, -14, -2),
    new THREE.Vector3(-1, -20, 0),
  ]);

  // ── animation loop ─────────────────────────────────────────────────────────
  let scrollP = 0;
  let time = 0;
  let rafId = 0;
  const cPos = new THREE.Vector3();
  const cLook = new THREE.Vector3();

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.009;

    for (const p of packets) {
      p.t = (p.t + p.speed) % 1;
      p.mesh.position.copy(p.curve.getPoint(p.t));
      p.mesh.scale.setScalar(1 + 0.38 * Math.sin(time * 7 + p.t * 22));
    }

    const sp = Math.min(Math.max(scrollP, 0), 1);
    camPath.getPoint(sp, cPos);
    lookPath.getPoint(sp, cLook);
    camera.position.lerp(cPos, 0.05);
    camera.lookAt(cLook);
    camFill.position.copy(camera.position);
    camFill.position.y -= 0.8;

    // fog transitions: thin (above ground) → thick earthy (underground)
    const underground = THREE.MathUtils.clamp(-camera.position.y / 14, 0, 1);
    fog.density = 0.022 + underground * 0.05;
    fog.color.setRGB(
      0.012 + underground * 0.004,
      0.03 + underground * 0.01,
      0.016 + underground * 0.005
    );

    renderer.render(scene, camera);
  }
  animate();

  return {
    setScrollProgress: (p: number) => { scrollP = p; },
    resize: (w: number, h: number) => {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose: () => { cancelAnimationFrame(rafId); renderer.dispose(); },
  };
}

// ─── component ────────────────────────────────────────────────────────────────
export function MedyonMethodeHero() {
  const { locale } = useLanguage();
  const steps = t[locale].methodeSteps;

  const sectionRef = useRef<HTMLElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof buildTreeScene> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initScene = () => {
      if (sceneRef.current) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      sceneRef.current = buildTreeScene(canvas, w, h);
    };

    const ro = new ResizeObserver(() => {
      if (!sceneRef.current) initScene();
      else sceneRef.current.resize(canvas.offsetWidth, canvas.offsetHeight);
    });
    ro.observe(canvas);
    initScene();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return () => { ro.disconnect(); sceneRef.current?.dispose(); };

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const titleTop = titleTopRef.current;
      const titleBottom = titleBottomRef.current;
      const card = cardRef.current;
      if (!section || !titleTop || !titleBottom || !card) return;

      const isMobile = window.innerWidth < 768;
      const startScale = isMobile ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP;
      gsap.set(card, { scale: startScale });

      // Phase 1: titles slide away + card expands (first 100vh of scroll)
      // Phase 2: hold fully zoomed while camera flies through roots (remaining 160vh)
      // No reverse — scroll past = next content appears naturally
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          onUpdate: (self) => sceneRef.current?.setScrollProgress(self.progress),
        },
      })
        .to(titleTop, { xPercent: -130, duration: 1 }, 0)
        .to(titleBottom, { xPercent: 130, duration: 1 }, 0)
        .to(card, { scale: IMMERSE_OVERFILL, duration: 1 }, 0);
    });

    return () => { ctx.revert(); ro.disconnect(); sceneRef.current?.dispose(); };
  }, []);

  return (
    // 260vh: ~100vh scroll-in + 160vh hold deep inside roots
    <section
      ref={sectionRef}
      style={{ height: "260vh" }}
      className="relative"
      aria-label="Medyon Methode – Baumwurzeln"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#030b04" }}
      >
        {/* ambient colour glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:
            "radial-gradient(ellipse at 30% 65%, rgba(0,194,203,0.05) 0%, transparent 48%), " +
            "radial-gradient(ellipse at 70% 35%, rgba(230,0,126,0.05) 0%, transparent 48%)",
        }} />

        {/* ── title top "Medyon" ── */}
        <h2
          ref={titleTopRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            top: "clamp(1.8rem, 9%, 5rem)",
            fontSize: "clamp(2.8rem, 9.5vw, 8rem)",
            fontWeight: 900,
            color: "#f0f4f8",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Medyon
        </h2>

        {/* ── main card (16:9, larger on desktop) ── */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            width: "min(1060px, 96vw)",
            aspectRatio: "16 / 9",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.07)",
            zIndex: 5,
          }}
        >
          {/* Three.js canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* top CI accent */}
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #00c2cb, #e6007e)" }} />
          {/* bottom CI accent */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #e6007e, #00c2cb)" }} />

          {/* ── HUD: step labels (bottom-right) ── */}
          <div
            className="absolute bottom-0 right-0 z-10 pointer-events-none flex flex-col items-end gap-1.5 sm:gap-2"
            style={{
              padding: "clamp(0.75rem, 2vw, 1.5rem)",
              background: "linear-gradient(to top left, rgba(3,11,4,0.92) 0%, transparent 100%)",
            }}
          >
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-2 sm:gap-3">
                <span style={{
                  fontSize: "clamp(0.45rem, 1vw, 0.58rem)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: i < 2 ? "#00c2cb" : "#e6007e",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{
                  width: "clamp(16px, 2vw, 28px)",
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${i < 2 ? "#00c2cb" : "#e6007e"}55)`,
                }} />
                <span style={{
                  fontSize: "clamp(0.7rem, 1.6vw, 1rem)",
                  fontWeight: 800,
                  color: "#f0f4f8ee",
                  letterSpacing: "-0.01em",
                }}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* ── HUD: corner label (top-left) ── */}
          <div
            className="absolute top-3 left-3 sm:top-4 sm:left-5 z-10 pointer-events-none"
            style={{
              fontSize: "clamp(0.42rem, 0.9vw, 0.55rem)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(0,194,203,0.55)",
              textTransform: "uppercase",
            }}
          >
            Medyon · Methode
          </div>
        </div>

        {/* ── title bottom "Methode" (gradient) ── */}
        <h2
          ref={titleBottomRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            bottom: "clamp(1.8rem, 9%, 5rem)",
            fontSize: "clamp(2.8rem, 9.5vw, 8rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e6007e 0%, #00c2cb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Methode
        </h2>
      </div>
    </section>
  );
}
