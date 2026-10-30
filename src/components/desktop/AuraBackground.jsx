import React, { useEffect, useRef } from 'react';
import { COUNT, portraitData, logoData, decode } from './auraBackgroundData';
import './AuraBackground.css';

// Pre-decode coordinates from embedded base64 data once
const A = decode(portraitData);
const B = decode(logoData);

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function AuraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let D = 1;
    let points = [];
    const start = performance.now();
    const pointer = { x: -1000, y: -1000, active: false };
    let animId = null;

    function resize() {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      D = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * D);
      canvas.height = Math.round(H * D);
      ctx.setTransform(D, 0, 0, D, 0, 0);
      points = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        seed: Math.random() * Math.PI * 2,
        delay: Math.random() * 0.24
      }));
    }

    function draw(now) {
      const t = (now - start) / 1000;
      const cycle = 11.5;
      const phase = t % cycle;
      const toLogo = phase < 5.3;
      const local = toLogo ? phase / 5.3 : (phase - 5.3) / 6.2;
      const raw = ease(Math.min(1, local));

      ctx.clearRect(0, 0, W, H);
      const size = Math.min(W, H) * 0.82;
      const yShift = H * 0.04; // Subtle 4% upward shift for balanced desktop composition
      const ox = (W - size) / 2;
      const oy = (H - size) / 2 - yShift;
      const morph = raw;

      for (let i = 0; i < COUNT; i++) {
        const a = toLogo ? A[i] : B[i];
        const b = toLogo ? B[i] : A[i];
        const p = points[i];
        if (!p) continue;

        let k = Math.max(0, Math.min(1, (morph - p.delay * 0.45) / (1 - p.delay * 0.45)));
        k = ease(k);
        const ax = ox + a[0] * size;
        const ay = oy + a[1] * size;
        const bx = ox + b[0] * size;
        const by = oy + b[1] * size;
        const scatter = Math.sin(k * Math.PI);
        let x = ax + (bx - ax) * k + Math.sin(t * 1.7 + p.seed) * scatter * size * 0.045;
        let y = ay + (by - ay) * k + Math.cos(t * 1.45 + p.seed * 1.2) * scatter * size * 0.045;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const reach = Math.min(W, H) * 0.14;
          if (dist < reach && dist > 0.1) {
            const f = (1 - dist / reach) * Math.min(W, H) * 0.035;
            x += (dx / dist) * f;
            y += (dy / dist) * f;
          }
        }

        const hue = toLogo ? 275 - 45 * k : 230 + 45 * k;
        const portraitVisible = toLogo ? k < 0.42 : k >= 0.58;
        const r =
          (portraitVisible ? 1.05 : 0.65) +
          (Math.sin(i * 12.989 + t * 2 + p.seed) + 1) * (portraitVisible ? 0.52 : 0.48);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},100%,${62 + Math.sin(i * 0.07 + t) * 7}%,${
          0.72 + (i % 7) * 0.035
        })`;
        ctx.fill();
      }

      // Subtle central glow from original animation (shifted with composition)
      const g = ctx.createRadialGradient(W / 2, H * 0.48 - yShift, 0, W / 2, H * 0.48 - yShift, size * 0.48);
      g.addColorStop(0, 'rgba(84,65,255,.045)');
      g.addColorStop(1, 'rgba(2,3,9,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    }

    // Capture cursor movement anywhere on the desktop to interact without blocking clicks
    const handlePointerMove = (e) => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', resize);

    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="aura-bg-root">
      <canvas ref={canvasRef} id="c" className="aura-bg-canvas" />
    </div>
  );
}
