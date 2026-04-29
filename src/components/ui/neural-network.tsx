'use client';
import { useEffect, useRef } from 'react';

interface NetworkNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  vx: number;
  vy: number;
}

interface DataParticle {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const NODE_COUNT = 28;
    const maxDist = Math.min(width, height) * 0.42;

    const nodes: NetworkNode[] = Array.from({ length: NODE_COUNT }, () => ({
      x: 10 + Math.random() * (width - 20),
      y: 10 + Math.random() * (height - 20),
      radius: 2 + Math.random() * 3,
      pulsePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const particles: DataParticle[] = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        fromIdx: Math.floor(Math.random() * NODE_COUNT),
        toIdx: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.006,
      });
    }

    let t = 0;

    function animate() {
      t += 0.012;
      ctx!.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.28;
            ctx!.strokeStyle = `rgba(0, 194, 203, ${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        const pulse = 1 + 0.28 * Math.sin(t * 1.4 + node.pulsePhase);
        const r = node.radius * pulse;

        const grd = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        grd.addColorStop(0, 'rgba(0, 194, 203, 0.35)');
        grd.addColorStop(1, 'rgba(0, 194, 203, 0)');
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(0, 194, 203, ${0.7 + 0.3 * Math.sin(t + node.pulsePhase)})`;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Data particles (magenta)
      for (const p of particles) {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.fromIdx = Math.floor(Math.random() * NODE_COUNT);
          p.toIdx = Math.floor(Math.random() * NODE_COUNT);
        }

        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        if (!from || !to || from === to) continue;

        const dx = from.x - to.x;
        const dy = from.y - to.y;
        if (Math.sqrt(dx * dx + dy * dy) >= maxDist) continue;

        const x = from.x + (to.x - from.x) * p.progress;
        const y = from.y + (to.y - from.y) * p.progress;

        const pg = ctx!.createRadialGradient(x, y, 0, x, y, 7);
        pg.addColorStop(0, 'rgba(230, 0, 126, 0.85)');
        pg.addColorStop(1, 'rgba(230, 0, 126, 0)');
        ctx!.fillStyle = pg;
        ctx!.beginPath();
        ctx!.arc(x, y, 7, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = '#ffffff';
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
}
