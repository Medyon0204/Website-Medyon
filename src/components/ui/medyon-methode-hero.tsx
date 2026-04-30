"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

const CARD_START_SCALE_DESKTOP = 0.6;
const CARD_START_SCALE_MOBILE = 0.82;
const IMMERSE_OVERFILL = 1.04;

const STEPS = [
  { num: "01", label: "Analyse", teal: true },
  { num: "02", label: "Strategie", teal: true },
  { num: "03", label: "Umsetzung", teal: false },
  { num: "04", label: "Optimierung", teal: false },
];

// ─── Three.js scene ────────────────────────────────────────────────────────────

type Packet = {
  mesh: THREE.Mesh;
  curve: THREE.CatmullRomCurve3;
  t: number;
  speed: number;
};

function createDataCenterScene(canvas: HTMLCanvasElement, W: number, H: number) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x010a1b);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010a1b, 0.028);

  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 160);
  camera.position.set(0, 10, 26);
  camera.lookAt(0, 2, 0);

  // Floor grid
  const grid = new THREE.GridHelper(120, 80, 0x00c2cb, 0x091525);
  grid.position.y = -2;
  scene.add(grid);

  // ─── Server racks ───────────────────────────────────────────────────────────
  const rackBodyMat = new THREE.MeshStandardMaterial({
    color: 0x0d1f36,
    metalness: 0.75,
    roughness: 0.35,
    envMapIntensity: 0.5,
  });

  function addRack(x: number, z: number) {
    const g = new THREE.Group();

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 5.5, 1.4), rackBodyMat);
    g.add(body);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 5.5, 1.4)),
      new THREE.LineBasicMaterial({ color: 0x00c2cb, transparent: true, opacity: 0.45 })
    );
    g.add(edges);

    // Slot lines (visual detail)
    for (let row = 0; row < 8; row++) {
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.06, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x050f1e, roughness: 1 })
      );
      slot.position.set(0, -2.2 + row * 0.55, 0.73);
      g.add(slot);
    }

    // LED indicators
    for (let row = 0; row < 7; row++) {
      const isMag = Math.random() > 0.6;
      const active = Math.random() > 0.2;
      const led = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.05, 0.06),
        new THREE.MeshStandardMaterial({
          color: active ? (isMag ? 0xe6007e : 0x00c2cb) : 0x0a1020,
          emissive: active ? (isMag ? 0xe6007e : 0x00c2cb) : 0x000000,
          emissiveIntensity: active ? 5 : 0,
        })
      );
      led.position.set(0.85, -2.0 + row * 0.52, 0.73);
      g.add(led);
    }

    g.position.set(x, 0.75, z);
    scene.add(g);
  }

  // Two rows of racks (corridor)
  for (let i = 0; i < 8; i++) {
    addRack(-6.5, -i * 8);
    addRack(6.5, -i * 8);
  }

  // Additional depth racks (background)
  for (let i = 0; i < 4; i++) {
    addRack(-6.5, -64 - i * 8);
    addRack(6.5, -64 - i * 8);
  }

  // ─── Circuit traces on floor ─────────────────────────────────────────────────
  const traceMat = new THREE.LineBasicMaterial({
    color: 0x00c2cb,
    transparent: true,
    opacity: 0.22,
  });

  function addTrace(pts: THREE.Vector3[]) {
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), traceMat));
  }

  // Horizontal connector traces
  for (let i = 0; i < 40; i++) {
    const z = -(Math.random() * 80 + 2);
    const y = -1.95;
    const x0 = -6.5 + Math.random() * 2;
    const x1 = 4.5 + Math.random() * 2;
    const midX = x0 + (x1 - x0) * (0.3 + Math.random() * 0.4);
    const jog = (Math.random() - 0.5) * 2.5;
    addTrace([
      new THREE.Vector3(x0, y, z),
      new THREE.Vector3(midX, y, z),
      new THREE.Vector3(midX, y, z + jog),
      new THREE.Vector3(x1, y, z + jog),
    ]);
  }

  // Depth (longitudinal) traces
  for (let i = 0; i < 18; i++) {
    const x = -7 + Math.random() * 14;
    addTrace([
      new THREE.Vector3(x, -1.95, 3),
      new THREE.Vector3(x, -1.95, -100),
    ]);
  }

  // Wall circuit traces (left wall)
  const wallTraceMat = new THREE.LineBasicMaterial({
    color: 0xe6007e,
    transparent: true,
    opacity: 0.15,
  });
  for (let i = 0; i < 12; i++) {
    const z = -(i * 7 + Math.random() * 3);
    const y = -2 + Math.random() * 4;
    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-7.5, y, z),
          new THREE.Vector3(-7.5, y, z - 2 - Math.random() * 3),
        ]),
        wallTraceMat
      )
    );
  }

  // ─── Data packets ────────────────────────────────────────────────────────────
  const packets: Packet[] = [];
  const pGeo = new THREE.SphereGeometry(0.055, 5, 5);

  function newCurve(fast = false): THREE.CatmullRomCurve3 {
    const pts: THREE.Vector3[] = [];
    let x = (Math.random() - 0.5) * 11;
    let z = fast ? -(Math.random() * 60) : Math.random() * 2;
    for (let s = 0; s < 9; s++) {
      pts.push(new THREE.Vector3(x, -1.8 + Math.random() * 0.15, z));
      if (Math.random() > 0.45) {
        x = THREE.MathUtils.clamp(x + (Math.random() - 0.5) * 5, -6.5, 6.5);
      } else {
        z -= 4 + Math.random() * 6;
      }
    }
    return new THREE.CatmullRomCurve3(pts);
  }

  for (let i = 0; i < 60; i++) {
    const isMag = Math.random() > 0.68;
    const mesh = new THREE.Mesh(
      pGeo,
      new THREE.MeshStandardMaterial({
        color: isMag ? 0xe6007e : 0x00c2cb,
        emissive: isMag ? 0xe6007e : 0x00c2cb,
        emissiveIntensity: 6,
        transparent: true,
        opacity: 0.9,
      })
    );
    scene.add(mesh);
    packets.push({
      mesh,
      curve: newCurve(true),
      t: Math.random(),
      speed: 0.0025 + Math.random() * 0.0055,
    });
  }

  // ─── Lighting ─────────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x030810, 1.2));

  const tealKey = new THREE.PointLight(0x00c2cb, 4, 30);
  tealKey.position.set(-4, 5, 8);
  scene.add(tealKey);

  const magKey = new THREE.PointLight(0xe6007e, 3, 25);
  magKey.position.set(5, 4, -25);
  scene.add(magKey);

  const deepLight = new THREE.PointLight(0x00c2cb, 2.5, 35);
  deepLight.position.set(0, 3, -50);
  scene.add(deepLight);

  // Camera-follow light (illuminates what camera sees)
  const camLight = new THREE.PointLight(0x8888bb, 2, 18);
  scene.add(camLight);

  // ─── Camera path ──────────────────────────────────────────────────────────────
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 10, 26),
    new THREE.Vector3(0, 7, 18),
    new THREE.Vector3(0, 5, 10),
    new THREE.Vector3(0, 3.5, 2),
    new THREE.Vector3(0, 2.5, -8),
    new THREE.Vector3(0, 2, -20),
    new THREE.Vector3(0, 1.8, -35),
  ]);

  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2, 5),
    new THREE.Vector3(0, 1, -2),
    new THREE.Vector3(0, 0.5, -10),
    new THREE.Vector3(0, 0, -18),
    new THREE.Vector3(0, -0.5, -28),
    new THREE.Vector3(0, -0.5, -38),
    new THREE.Vector3(0, -1, -50),
  ]);

  // ─── Animation loop ───────────────────────────────────────────────────────────
  let scrollProgress = 0;
  let time = 0;
  let animId = 0;

  const camTarget = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();

  function animate() {
    animId = requestAnimationFrame(animate);
    time += 0.01;

    // Move data packets
    for (const p of packets) {
      p.t += p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.curve = newCurve(true);
      }
      const pt = p.curve.getPoint(p.t);
      p.mesh.position.copy(pt);
      const s = 1 + 0.35 * Math.sin(time * 7 + p.t * 25);
      p.mesh.scale.setScalar(s);
    }

    // Camera follows scroll
    const clamped = Math.min(Math.max(scrollProgress, 0), 1);
    camPath.getPoint(clamped, camTarget);
    lookPath.getPoint(clamped, lookTarget);
    camera.position.lerp(camTarget, 0.055);
    camera.lookAt(lookTarget);

    // Cam light tracks camera
    camLight.position.copy(camera.position);
    camLight.position.y -= 1.5;

    renderer.render(scene, camera);
  }

  animate();

  return {
    setScrollProgress: (p: number) => {
      scrollProgress = p;
    },
    resize: (w: number, h: number) => {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose: () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    },
  };
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function MedyonMethodeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createDataCenterScene> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Three.js scene once the canvas has layout dimensions
    const initScene = () => {
      if (sceneRef.current) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      sceneRef.current = createDataCenterScene(canvas, w, h);
    };

    const ro = new ResizeObserver(() => {
      if (!sceneRef.current) {
        initScene();
      } else {
        sceneRef.current.resize(canvas.offsetWidth, canvas.offsetHeight);
      }
    });
    ro.observe(canvas);
    initScene();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return () => {
        ro.disconnect();
        sceneRef.current?.dispose();
      };
    }

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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onUpdate: (self) => {
              sceneRef.current?.setScrollProgress(self.progress);
            },
          },
        })
        .to(titleTop, { xPercent: -130, duration: 1 }, 0)
        .to(titleBottom, { xPercent: 130, duration: 1 }, 0)
        .to(card, { scale: IMMERSE_OVERFILL, duration: 1 }, 0)
        .to({}, { duration: 0.5 })
        .to(titleTop, { xPercent: 0, duration: 1 })
        .to(titleBottom, { xPercent: 0, duration: 1 }, "<")
        .to(card, { scale: startScale, duration: 1 }, "<");
    });

    return () => {
      ctx.revert();
      ro.disconnect();
      sceneRef.current?.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "420vh" }}
      className="relative"
      aria-label="Medyon Methode – Rechenzentrum"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#010a1b" }}
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 18% 50%, rgba(0,194,203,0.07) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 82% 50%, rgba(230,0,126,0.07) 0%, transparent 50%)",
          }}
        />

        {/* Title top – "Medyon" */}
        <h2
          ref={titleTopRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            top: "clamp(2.5rem, 14%, 7rem)",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            fontWeight: 900,
            color: "#f0f4f8",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Medyon
        </h2>

        {/* Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            width: "min(440px, 86vw)",
            aspectRatio: "9 / 16",
            borderRadius: "1.75rem",
            border: "1px solid rgba(255,255,255,0.09)",
            zIndex: 5,
          }}
        >
          {/* Three.js canvas fills card */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />

          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #00c2cb, #e6007e)" }}
          />

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #e6007e, #00c2cb)" }}
          />

          {/* Step labels HUD – bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none p-5 pb-6 flex flex-col gap-2.5"
            style={{ background: "linear-gradient(to top, rgba(1,10,27,0.92) 0%, transparent 100%)" }}
          >
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3">
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: step.teal ? "#00c2cb" : "#e6007e",
                    minWidth: "1.6rem",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {step.num}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: `linear-gradient(90deg, ${step.teal ? "#00c2cb" : "#e6007e"}50, transparent)`,
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(0.9rem, 3vw, 1.25rem)",
                    fontWeight: 800,
                    color: i < 2 ? "#f0f4f8" : "#f0f4f8ee",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Title bottom – "Methode" gradient */}
        <h2
          ref={titleBottomRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            bottom: "clamp(2.5rem, 14%, 7rem)",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
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
