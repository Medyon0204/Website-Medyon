"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

const CARD_START_SCALE_DESKTOP = 0.65;
const CARD_START_SCALE_MOBILE = 0.88;
const IMMERSE_OVERFILL = 1.03;

const STEPS = [
  { num: "01", label: "Analyse", teal: true },
  { num: "02", label: "Strategie", teal: true },
  { num: "03", label: "Umsetzung", teal: false },
  { num: "04", label: "Optimierung", teal: false },
];

// ─── constants ────────────────────────────────────────────────────────────────
const RACK_D = 1.3;   // depth in X (into wall)
const RACK_H = 7.5;   // height in Y
const RACK_W = 2.6;   // width in Z (along corridor)
const ROW_STEP = 3.8; // spacing between rack rows in Z
const ROW_COUNT = 14;
const RACK_X = 9.5;   // distance from center to rack face (corridor half-width)

// ─── scene builder ────────────────────────────────────────────────────────────
type Packet = { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; t: number; speed: number };

function buildScene(canvas: HTMLCanvasElement, W: number, H: number) {
  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x010812);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010812, 0.015);

  const camera = new THREE.PerspectiveCamera(64, W / H, 0.1, 220);
  camera.position.set(0, 5, 30);
  camera.lookAt(0, 4.5, 0);

  // ── floor ──────────────────────────────────────────────────────────────────
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a1422,
    metalness: 0.65,
    roughness: 0.3,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 140), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.01, -35);
  scene.add(floor);

  const grid = new THREE.GridHelper(140, 90, 0x00c2cb, 0x091a28);
  grid.position.set(0, -2, -35);
  scene.add(grid);

  // ── ceiling ────────────────────────────────────────────────────────────────
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0x060d18, roughness: 0.9, metalness: 0.2 });
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(40, 140), ceilMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, 9.5, -35);
  scene.add(ceil);

  // LED strip lights along ceiling centre
  const ledStripMat = new THREE.MeshStandardMaterial({
    color: 0xddeeff,
    emissive: 0xddeeff,
    emissiveIntensity: 2.5,
  });
  for (let i = 0; i < 14; i++) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 5), ledStripMat);
    strip.position.set(0, 9.4, -i * 9);
    scene.add(strip);
  }

  // Spotlights from ceiling every 9 units
  for (let i = 0; i < 14; i++) {
    const spot = new THREE.SpotLight(0xbbd4ff, 2.5, 22, Math.PI * 0.16, 0.55, 1.4);
    spot.position.set(0, 9.2, -i * 9);
    spot.target.position.set(0, 0, -i * 9);
    scene.add(spot, spot.target);
  }

  // ── cable trays (overhead) ─────────────────────────────────────────────────
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x182535, metalness: 0.75, roughness: 0.4 });
  const trayLen = 120;
  for (const tx of [-5.5, 5.5]) {
    const tray = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, trayLen), trayMat);
    tray.position.set(tx, 8.9, -trayLen / 2 + 10);
    scene.add(tray);
    const trayEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 0.2, trayLen)),
      new THREE.LineBasicMaterial({ color: 0x2a4060, transparent: true, opacity: 0.5 })
    );
    trayEdge.position.copy(tray.position);
    scene.add(trayEdge);
  }

  // ── materials shared across racks ──────────────────────────────────────────
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f1820, metalness: 0.9, roughness: 0.18 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x0e1928, metalness: 0.5, roughness: 0.55 });

  // ── rack builder ───────────────────────────────────────────────────────────
  // Rack faces the CORRIDOR (inner side in X).
  // Left rack (cx<0): face on +x side.  Right rack (cx>0): face on -x side.
  function addRack(cx: number, cz: number) {
    const g = new THREE.Group();
    const isLeft = cx < 0;
    const sign = isLeft ? 1 : -1; // +1 = face toward +x (corridor centre)
    const faceX = sign * (RACK_D / 2); // inner face X in local coords

    // outer frame
    g.add(Object.assign(
      new THREE.Mesh(new THREE.BoxGeometry(RACK_D, RACK_H, RACK_W), frameMat),
      {}
    ));
    // frame edges
    const fe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(RACK_D, RACK_H, RACK_W)),
      new THREE.LineBasicMaterial({ color: 0x1c3454, transparent: true, opacity: 0.55 })
    );
    g.add(fe);

    // 1U server panels stacked in Y
    const U_H = 0.44;
    const U_COUNT = 15;
    const LED_COLORS = [0x00dd44, 0x00aaff, 0x00c2cb, 0xffaa00, 0xff4400, 0xe6007e];

    for (let u = 0; u < U_COUNT; u++) {
      const y = -RACK_H / 2 + U_H * u + U_H / 2;

      // bezel panel (sits proud of the frame face)
      const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, U_H - 0.07, RACK_W - 0.22),
        panelMat
      );
      bezel.position.set(faceX + sign * 0.01, y, 0);
      g.add(bezel);

      // horizontal slot divider
      const slotDiv = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.012, RACK_W - 0.28),
        new THREE.MeshStandardMaterial({ color: 0x040810 })
      );
      slotDiv.position.set(faceX + sign * 0.02, y + U_H / 2 - 0.03, 0);
      g.add(slotDiv);

      // status LEDs (1–2 per unit)
      const active = Math.random() > 0.08;
      const color = LED_COLORS[Math.floor(Math.random() * LED_COLORS.length)];
      const led1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.03, 0.04),
        new THREE.MeshStandardMaterial({
          color: active ? color : 0x040810,
          emissive: active ? color : 0x000000,
          emissiveIntensity: active ? 7 : 0,
        })
      );
      led1.position.set(faceX + sign * 0.055, y, RACK_W / 2 - 0.22);
      g.add(led1);

      if (Math.random() > 0.45 && active) {
        const led2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.032, 0.024, 0.032),
          new THREE.MeshStandardMaterial({
            color: 0x00dd88,
            emissive: 0x00dd88,
            emissiveIntensity: 8,
          })
        );
        led2.position.set(faceX + sign * 0.055, y, RACK_W / 2 - 0.36);
        g.add(led2);
      }
    }

    // cable management bar on top
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(RACK_D + 0.05, 0.3, RACK_W + 0.1), trayMat);
    topBar.position.set(0, RACK_H / 2 + 0.15, 0);
    g.add(topBar);

    // vertical cable bundle from top bar to ceiling tray (thin cylinder)
    const bundleLen = 9.5 - (RACK_H / 2 + 0.3 + (-2 + RACK_H));
    if (bundleLen > 0.2) {
      const bundle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, bundleLen, 5),
        new THREE.MeshStandardMaterial({ color: 0x0e1c2e, roughness: 0.8 })
      );
      bundle.position.set(0, RACK_H / 2 + 0.3 + bundleLen / 2, 0);
      g.add(bundle);
    }

    g.position.set(cx, -2 + RACK_H / 2, cz);
    scene.add(g);
  }

  for (let i = 0; i < ROW_COUNT; i++) {
    const z = -i * ROW_STEP;
    addRack(-RACK_X, z);
    addRack(RACK_X, z);
  }

  // ── circuit traces on floor ────────────────────────────────────────────────
  const traceMat = new THREE.LineBasicMaterial({ color: 0x00c2cb, transparent: true, opacity: 0.2 });
  const magTraceMat = new THREE.LineBasicMaterial({ color: 0xe6007e, transparent: true, opacity: 0.12 });

  function addTrace(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }

  for (let i = 0; i < 60; i++) {
    const z = -(Math.random() * ROW_COUNT * ROW_STEP + 2);
    const y = -1.96;
    const x0 = -RACK_X + 0.8 + Math.random() * 1.5;
    const x1 = RACK_X - 0.8 - Math.random() * 1.5;
    const midX = x0 + (x1 - x0) * (0.3 + Math.random() * 0.4);
    const jog = (Math.random() - 0.5) * 3;
    const mat = Math.random() > 0.75 ? magTraceMat : traceMat;
    addTrace([
      new THREE.Vector3(x0, y, z),
      new THREE.Vector3(midX, y, z),
      new THREE.Vector3(midX, y, z + jog),
      new THREE.Vector3(x1, y, z + jog),
    ], mat);
  }
  for (let i = 0; i < 22; i++) {
    const x = -RACK_X + 1 + Math.random() * (2 * RACK_X - 2);
    addTrace([
      new THREE.Vector3(x, -1.96, 5),
      new THREE.Vector3(x, -1.96, -(ROW_COUNT * ROW_STEP + 8)),
    ], traceMat);
  }

  // ── data packets ──────────────────────────────────────────────────────────
  const packets: Packet[] = [];
  const pGeoSm = new THREE.SphereGeometry(0.05, 5, 4);
  const pGeoMd = new THREE.SphereGeometry(0.075, 6, 5);

  function floorCurve(): THREE.CatmullRomCurve3 {
    const pts: THREE.Vector3[] = [];
    let x = (Math.random() - 0.5) * (2 * RACK_X - 3);
    let z = Math.random() * 4;
    for (let s = 0; s < 10; s++) {
      pts.push(new THREE.Vector3(x, -1.82 + Math.random() * 0.1, z));
      if (Math.random() > 0.45) x = THREE.MathUtils.clamp(x + (Math.random() - 0.5) * 5, -(RACK_X - 1.5), RACK_X - 1.5);
      else z -= 3 + Math.random() * 7;
    }
    return new THREE.CatmullRomCurve3(pts);
  }

  function ceilCurve(tx: number): THREE.CatmullRomCurve3 {
    const z0 = Math.random() * 5;
    const z1 = z0 - (20 + Math.random() * 40);
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(tx + (Math.random() - 0.5) * 1, 8.85, z0),
      new THREE.Vector3(tx + (Math.random() - 0.5) * 0.6, 8.85, (z0 + z1) / 2),
      new THREE.Vector3(tx + (Math.random() - 0.5) * 1, 8.85, z1),
    ]);
  }

  // floor packets (teal + magenta mix)
  for (let i = 0; i < 50; i++) {
    const isMag = Math.random() > 0.68;
    const mesh = new THREE.Mesh(
      Math.random() > 0.5 ? pGeoSm : pGeoMd,
      new THREE.MeshStandardMaterial({
        color: isMag ? 0xe6007e : 0x00c2cb,
        emissive: isMag ? 0xe6007e : 0x00c2cb,
        emissiveIntensity: 7,
        transparent: true,
        opacity: 0.9,
      })
    );
    scene.add(mesh);
    packets.push({ mesh, curve: floorCurve(), t: Math.random(), speed: 0.0025 + Math.random() * 0.005 });
  }

  // overhead fiber packets
  for (let i = 0; i < 24; i++) {
    const tx = Math.random() > 0.5 ? -5.5 : 5.5;
    const mesh = new THREE.Mesh(
      pGeoSm,
      new THREE.MeshStandardMaterial({
        color: 0x00c2cb,
        emissive: 0x00c2cb,
        emissiveIntensity: 9,
        transparent: true,
        opacity: 0.88,
      })
    );
    scene.add(mesh);
    packets.push({ mesh, curve: ceilCurve(tx), t: Math.random(), speed: 0.003 + Math.random() * 0.008 });
  }

  // ── lighting ──────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x050c18, 1.4));

  const tealAccent = new THREE.PointLight(0x00c2cb, 2, 22);
  tealAccent.position.set(-RACK_X + 1, 3, 0);
  scene.add(tealAccent);

  const magAccent = new THREE.PointLight(0xe6007e, 1.5, 20);
  magAccent.position.set(RACK_X - 1, 3, -28);
  scene.add(magAccent);

  const deepTeal = new THREE.PointLight(0x00c2cb, 1.8, 30);
  deepTeal.position.set(0, 4, -50);
  scene.add(deepTeal);

  const camFill = new THREE.PointLight(0x7799cc, 1.8, 16);
  scene.add(camFill);

  // ── camera path (entrance → deep corridor) ────────────────────────────────
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 5, 30),
    new THREE.Vector3(0, 5, 22),
    new THREE.Vector3(0, 4.5, 13),
    new THREE.Vector3(0, 4.5, 4),
    new THREE.Vector3(0, 4.5, -5),
    new THREE.Vector3(0, 4.5, -16),
    new THREE.Vector3(0, 4.5, -28),
  ]);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 4.5, 8),
    new THREE.Vector3(0, 4.5, 0),
    new THREE.Vector3(0, 4.5, -8),
    new THREE.Vector3(0, 4.5, -16),
    new THREE.Vector3(0, 4.5, -24),
    new THREE.Vector3(0, 4.5, -34),
    new THREE.Vector3(0, 4.5, -46),
  ]);

  // ── animation ─────────────────────────────────────────────────────────────
  let scrollP = 0;
  let time = 0;
  let rafId = 0;
  const cPos = new THREE.Vector3();
  const cLook = new THREE.Vector3();

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.009;

    for (const p of packets) {
      p.t += p.speed;
      if (p.t >= 1) {
        p.t = 0;
        const isOverhead = p.mesh.position.y > 5;
        p.curve = isOverhead ? ceilCurve(Math.random() > 0.5 ? -5.5 : 5.5) : floorCurve();
      }
      p.mesh.position.copy(p.curve.getPoint(p.t));
      p.mesh.scale.setScalar(1 + 0.32 * Math.sin(time * 8 + p.t * 28));
    }

    const t = Math.min(Math.max(scrollP, 0), 1);
    camPath.getPoint(t, cPos);
    lookPath.getPoint(t, cLook);
    camera.position.lerp(cPos, 0.05);
    camera.lookAt(cLook);
    camFill.position.copy(camera.position);
    camFill.position.y -= 1.2;

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof buildScene> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initScene = () => {
      if (sceneRef.current) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      sceneRef.current = buildScene(canvas, w, h);
    };

    const ro = new ResizeObserver(() => {
      if (!sceneRef.current) initScene();
      else sceneRef.current.resize(canvas.offsetWidth, canvas.offsetHeight);
    });
    ro.observe(canvas);
    initScene();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return () => { ro.disconnect(); sceneRef.current?.dispose(); };
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
            onUpdate: (self) => sceneRef.current?.setScrollProgress(self.progress),
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
        style={{ background: "#010812" }}
      >
        {/* ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 50%, rgba(0,194,203,0.06) 0%, transparent 48%), " +
              "radial-gradient(ellipse at 85% 50%, rgba(230,0,126,0.06) 0%, transparent 48%)",
          }}
        />

        {/* title top – "Medyon" */}
        <h2
          ref={titleTopRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            top: "clamp(2rem, 10%, 5.5rem)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            color: "#f0f4f8",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Medyon
        </h2>

        {/* card – 16:9 landscape */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            width: "min(920px, 94vw)",
            aspectRatio: "16 / 9",
            borderRadius: "1.25rem",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 5,
          }}
        >
          {/* Three.js canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* top accent line */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #00c2cb, #e6007e)" }}
          />
          {/* bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #e6007e, #00c2cb)" }}
          />

          {/* HUD – step labels bottom-right */}
          <div
            className="absolute bottom-0 right-0 z-10 pointer-events-none p-5 flex flex-col items-end gap-2"
            style={{ background: "linear-gradient(to top left, rgba(1,8,18,0.88), transparent)" }}
          >
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2.5">
                <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", color: step.teal ? "#00c2cb" : "#e6007e" }}>
                  {step.num}
                </span>
                <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${step.teal ? "#00c2cb" : "#e6007e"}66)` }} />
                <span style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)", fontWeight: 800, color: i < 2 ? "#f0f4f8" : "#f0f4f8dd", letterSpacing: "-0.01em" }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* HUD – corner label top-left */}
          <div
            className="absolute top-4 left-4 z-10 pointer-events-none"
            style={{
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(0,194,203,0.7)",
              textTransform: "uppercase",
            }}
          >
            Medyon · Rechenzentrum
          </div>
        </div>

        {/* title bottom – "Methode" gradient */}
        <h2
          ref={titleBottomRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            bottom: "clamp(2rem, 10%, 5.5rem)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
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
