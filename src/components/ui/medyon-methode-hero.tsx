"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

const CARD_START_SCALE_DESKTOP = 0.70;
const CARD_START_SCALE_MOBILE = 0.92;
const IMMERSE_OVERFILL = 1.02;

type RootColor = "teal" | "mag";
type RootBranch = { curve: THREE.CatmullRomCurve3; radius: number; color: RootColor; children: RootBranch[] };
type Packet = { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; t: number; speed: number };

// ─── recursive root generator ─────────────────────────────────────────────────
function growRoot(start: THREE.Vector3, dir: THREE.Vector3, radius: number, depth: number, color: RootColor): RootBranch {
  const segLen = Math.max(0.7, 4.2 - depth * 0.85) + Math.random() * 1.8;
  const pts: THREE.Vector3[] = [start.clone()];
  const curr = start.clone();
  for (let i = 0; i < 8; i++) {
    const w = new THREE.Vector3((Math.random() - 0.5) * 0.5, -0.08 - Math.random() * 0.16, (Math.random() - 0.5) * 0.5);
    curr.add(dir.clone().add(w).normalize().multiplyScalar(segLen / 8));
    pts.push(curr.clone());
  }
  const branch: RootBranch = { curve: new THREE.CatmullRomCurve3(pts), radius, color, children: [] };
  if (depth < 3) {
    const splits = depth === 0 ? 3 : (depth === 1 ? 2 : (Math.random() > 0.35 ? 2 : 1));
    const end = pts[pts.length - 1];
    for (let i = 0; i < splits; i++) {
      const angle = (i / splits) * Math.PI * 2 + Math.random() * 0.9;
      const spread = 0.38 + depth * 0.1;
      const nd = new THREE.Vector3(dir.x + Math.cos(angle) * spread, dir.y - 0.26 - Math.random() * 0.2, dir.z + Math.sin(angle) * spread).normalize();
      branch.children.push(growRoot(end.clone(), nd, radius * 0.63, depth + 1, Math.random() > 0.48 ? "teal" : "mag"));
    }
  }
  return branch;
}

// ─── scene builder ────────────────────────────────────────────────────────────
function buildTreeScene(canvas: HTMLCanvasElement, W: number, H: number) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x7ec8e3);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0x7ec8e3, 0.007);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 220);
  camera.position.set(0, 9, 32);
  camera.lookAt(0, 6, 0);

  // ── sky dome ────────────────────────────────────────────────────────────────
  const skyMat = new THREE.MeshBasicMaterial({ color: 0x7ec8e3, side: THREE.BackSide });
  scene.add(Object.assign(new THREE.Mesh(new THREE.SphereGeometry(200, 16, 10), skyMat)));

  // sky horizon gradient (darker blue at top, lighter near ground)
  const horizonMat = new THREE.MeshBasicMaterial({ color: 0xb0dff0, side: THREE.BackSide, transparent: true, opacity: 0.4 });
  const horizon = new THREE.Mesh(new THREE.CylinderGeometry(195, 195, 40, 24, 1, true), horizonMat);
  horizon.position.y = -15;
  scene.add(horizon);

  // ── ground / meadow ─────────────────────────────────────────────────────────
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4a9120, roughness: 0.92, metalness: 0 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(80, 48), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  scene.add(ground);

  // dark grass patches for depth
  const patchColors = [0x3d7a18, 0x5aaa28, 0x336b14];
  for (let i = 0; i < 14; i++) {
    const pm = new THREE.MeshStandardMaterial({ color: patchColors[i % 3], roughness: 1 });
    const patch = new THREE.Mesh(new THREE.CircleGeometry(1.5 + Math.random() * 4, 10), pm);
    patch.rotation.x = -Math.PI / 2;
    const ang = Math.random() * Math.PI * 2;
    const dist = 6 + Math.random() * 30;
    patch.position.set(Math.cos(ang) * dist, 0.01, Math.sin(ang) * dist);
    scene.add(patch);
  }

  // ── cherry tree GLB (Draco-compressed, 17 MB) ───────────────────────────────
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    "/models/cherry_tree_draco.glb",
    (gltf) => {
      const model = gltf.scene;

      // auto-scale: fit tree to 18 scene units tall
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const scale = 18 / Math.max(size.y, 0.1);
      model.scale.setScalar(scale);

      // place base of tree exactly at y = 0, centered horizontally
      const box2 = new THREE.Box3().setFromObject(model);
      model.position.y = -box2.min.y;
      const center = box2.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.z -= center.z;

      scene.add(model);
    },
    undefined,
    (err) => console.warn("cherry_tree_draco.glb:", err)
  );

  // ── underground root system ──────────────────────────────────────────────────
  const matTeal = new THREE.MeshStandardMaterial({
    color: 0x0c1e10, roughness: 0.87, metalness: 0.05,
    emissive: new THREE.Color(0x00c2cb), emissiveIntensity: 0.25,
  });
  const matMag = new THREE.MeshStandardMaterial({
    color: 0x1c0a10, roughness: 0.87, metalness: 0.05,
    emissive: new THREE.Color(0xe6007e), emissiveIntensity: 0.2,
  });

  const allCurves: { curve: THREE.CatmullRomCurve3; color: RootColor }[] = [];
  function renderRoot(b: RootBranch) {
    const segs = b.radius > 0.32 ? 20 : (b.radius > 0.14 ? 14 : 9);
    const rSegs = b.radius > 0.32 ? 8 : (b.radius > 0.14 ? 6 : 5);
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(b.curve, segs, b.radius, rSegs, false), b.color === "teal" ? matTeal : matMag));
    allCurves.push({ curve: b.curve, color: b.color });
    for (const child of b.children) renderRoot(child);
  }

  for (let i = 0; i < 7; i++) {
    const ang = (i / 7) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(ang) * 0.72, -0.55, Math.sin(ang) * 0.72).normalize();
    renderRoot(growRoot(new THREE.Vector3(Math.cos(ang) * 0.5, -0.6, Math.sin(ang) * 0.5), dir, 0.5, 0, i % 2 === 0 ? "teal" : "mag"));
  }

  // ── data packets ─────────────────────────────────────────────────────────────
  const packets: Packet[] = [];
  const pSm = new THREE.SphereGeometry(0.055, 6, 5);
  const pMd = new THREE.SphereGeometry(0.09, 7, 6);

  for (const { curve, color } of allCurves) {
    const count = Math.random() > 0.45 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const isMag = color === "mag" || Math.random() > 0.65;
      const mesh = new THREE.Mesh(
        Math.random() > 0.55 ? pSm : pMd,
        new THREE.MeshStandardMaterial({ color: isMag ? 0xe6007e : 0x00c2cb, emissive: isMag ? 0xe6007e : 0x00c2cb, emissiveIntensity: 9, transparent: true, opacity: 0.94 })
      );
      scene.add(mesh);
      packets.push({ mesh, curve, t: Math.random(), speed: 0.002 + Math.random() * 0.007 });
    }
  }

  // ── lighting ─────────────────────────────────────────────────────────────────
  // Strong sunlight (main key)
  const sun = new THREE.DirectionalLight(0xfff5c8, 3.8);
  sun.position.set(12, 30, 18);
  scene.add(sun);

  // Sky ambient (fills shadows with soft blue)
  scene.add(new THREE.AmbientLight(0x90c4e8, 2.8));

  // Warm fill from below (ground bounce)
  const groundBounce = new THREE.HemisphereLight(0x90c4e8, 0x5a9020, 1.2);
  scene.add(groundBounce);

  // Underground CI glow
  const tealGlow = new THREE.PointLight(0x00c2cb, 5, 24);
  tealGlow.position.set(-5, -7, 4);
  scene.add(tealGlow);

  const magGlow = new THREE.PointLight(0xe6007e, 4, 20);
  magGlow.position.set(6, -10, -5);
  scene.add(magGlow);

  const deepGlow = new THREE.PointLight(0x00c2cb, 3, 30);
  deepGlow.position.set(0, -16, 0);
  scene.add(deepGlow);

  const camFill = new THREE.PointLight(0xaaccdd, 1.2, 14);
  scene.add(camFill);

  // ── camera path ──────────────────────────────────────────────────────────────
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 9, 32),   // exterior: full tree visible
    new THREE.Vector3(0, 7, 22),
    new THREE.Vector3(0, 5, 13),
    new THREE.Vector3(0, 3, 6),
    new THREE.Vector3(0, 1, 2),
    new THREE.Vector3(0, -1, 1),
    new THREE.Vector3(1, -5, 2),
    new THREE.Vector3(2.5, -10, 3.5),
    new THREE.Vector3(2, -15, 2),
  ]);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 7, 8),
    new THREE.Vector3(0, 5, 2),
    new THREE.Vector3(0, 3, -4),
    new THREE.Vector3(0, 1, -8),
    new THREE.Vector3(0, -1, -10),
    new THREE.Vector3(0, -4, -9),
    new THREE.Vector3(-1, -8, -5),
    new THREE.Vector3(-2, -13, -2),
    new THREE.Vector3(-1, -19, 0),
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
      p.mesh.scale.setScalar(1 + 0.36 * Math.sin(time * 7 + p.t * 22));
    }

    const sp = Math.min(Math.max(scrollP, 0), 1);
    camPath.getPoint(sp, cPos);
    lookPath.getPoint(sp, cLook);
    camera.position.lerp(cPos, 0.05);
    camera.lookAt(cLook);
    camFill.position.copy(camera.position);
    camFill.position.y -= 0.8;

    // Dynamic brightness: bright above ground → dark underground
    const above = THREE.MathUtils.clamp(camera.position.y / 10, 0, 1);
    renderer.toneMappingExposure = 0.68 + above * 0.72; // 0.68 deep underground → 1.4 above

    // Dynamic fog: sky blue (above) → dark earthy (underground)
    const below = THREE.MathUtils.clamp(-camera.position.y / 14, 0, 1);
    fog.density = 0.007 + below * 0.055;
    fog.color.setRGB(
      0.494 - below * 0.48,  // 0.494 (sky blue) → 0.015
      0.784 - below * 0.75,  // 0.784 → 0.03
      0.890 - below * 0.86,  // 0.890 → 0.03
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
    <section
      ref={sectionRef}
      style={{ height: "260vh" }}
      className="relative"
      aria-label="Medyon Methode – Baumwurzeln"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#010a1b" }}
      >
        {/* CI ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:
            "radial-gradient(ellipse at 30% 65%, rgba(0,194,203,0.06) 0%, transparent 48%), " +
            "radial-gradient(ellipse at 70% 35%, rgba(230,0,126,0.06) 0%, transparent 48%)",
        }} />

        {/* title top – "Medyon" */}
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

        {/* card */}
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
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* CI accent lines */}
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #00c2cb, #e6007e)" }} />
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "2px", background: "linear-gradient(90deg, #e6007e, #00c2cb)" }} />

          {/* HUD – step labels (bottom-right) */}
          <div
            className="absolute bottom-0 right-0 z-10 pointer-events-none flex flex-col items-end gap-1.5 sm:gap-2"
            style={{
              padding: "clamp(0.75rem, 2vw, 1.5rem)",
              background: "linear-gradient(to top left, rgba(1,10,27,0.88) 0%, transparent 100%)",
            }}
          >
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-2 sm:gap-3">
                <span style={{ fontSize: "clamp(0.45rem, 1vw, 0.58rem)", fontWeight: 700, letterSpacing: "0.14em", color: i < 2 ? "#00c2cb" : "#e6007e", fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ width: "clamp(14px, 2vw, 26px)", height: 1, background: `linear-gradient(90deg, transparent, ${i < 2 ? "#00c2cb" : "#e6007e"}55)` }} />
                <span style={{ fontSize: "clamp(0.7rem, 1.6vw, 1rem)", fontWeight: 800, color: "#f0f4f8ee", letterSpacing: "-0.01em" }}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* HUD – corner label */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-5 z-10 pointer-events-none"
            style={{ fontSize: "clamp(0.42rem, 0.9vw, 0.55rem)", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(0,194,203,0.55)", textTransform: "uppercase" }}>
            Medyon · Methode
          </div>
        </div>

        {/* title bottom – "Methode" gradient */}
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
