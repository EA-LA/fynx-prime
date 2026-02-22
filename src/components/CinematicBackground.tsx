import { useEffect, useRef } from "react";

/**
 * Cinematic background layer — monochrome, ultra-subtle.
 * Renders behind all content via fixed positioning + z-index.
 */
export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Edge particles — only on periphery
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    const PARTICLE_COUNT = 28;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Place particles on edges only
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;
      switch (edge) {
        case 0: x = Math.random() * 0.15; y = Math.random(); break; // left
        case 1: x = 0.85 + Math.random() * 0.15; y = Math.random(); break; // right
        case 2: x = Math.random(); y = Math.random() * 0.12; break; // top
        default: x = Math.random(); y = 0.88 + Math.random() * 0.12; break; // bottom
      }
      particles.push({
        x, y,
        r: 0.4 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.00003,
        vy: (Math.random() - 0.5) * 0.00003,
        alpha: 0.06 + Math.random() * 0.12,
      });
    }

    // Abstract edge shapes
    const shapes: { x: number; y: number; size: number; rotation: number; rotSpeed: number; alpha: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;
      switch (edge) {
        case 0: x = Math.random() * 0.1; y = Math.random(); break;
        case 1: x = 0.9 + Math.random() * 0.1; y = Math.random(); break;
        case 2: x = Math.random(); y = Math.random() * 0.08; break;
        default: x = Math.random(); y = 0.92 + Math.random() * 0.08; break;
      }
      shapes.push({
        x, y,
        size: 30 + Math.random() * 60,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0002,
        alpha: 0.02 + Math.random() * 0.03,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 1;

      // — Moon / celestial body —
      // Slow orbital drift
      const moonX = W * 0.78 + Math.sin(t * 0.0003) * W * 0.04;
      const moonY = H * 0.18 + Math.cos(t * 0.00025) * H * 0.03;
      const moonR = Math.min(W, H) * 0.06;

      // Outer soft haze
      const haze = ctx.createRadialGradient(moonX, moonY, moonR * 0.3, moonX, moonY, moonR * 3.5);
      haze.addColorStop(0, "rgba(255,255,255,0.025)");
      haze.addColorStop(0.5, "rgba(255,255,255,0.008)");
      haze.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // Moon body
      const moonGrad = ctx.createRadialGradient(
        moonX - moonR * 0.3, moonY - moonR * 0.3, moonR * 0.1,
        moonX, moonY, moonR
      );
      moonGrad.addColorStop(0, "rgba(255,255,255,0.08)");
      moonGrad.addColorStop(0.6, "rgba(255,255,255,0.04)");
      moonGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Moon inner detail — crescent shadow
      ctx.beginPath();
      ctx.arc(moonX + moonR * 0.25, moonY - moonR * 0.1, moonR * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10,10,10,0.06)";
      ctx.fill();

      // — Ambient center light (very faint moving gradient) —
      const ambX = W * 0.5 + Math.sin(t * 0.0002) * W * 0.05;
      const ambY = H * 0.45 + Math.cos(t * 0.00015) * H * 0.03;
      const amb = ctx.createRadialGradient(ambX, ambY, 0, ambX, ambY, W * 0.4);
      amb.addColorStop(0, "rgba(255,255,255,0.012)");
      amb.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, W, H);

      // — Edge particles —
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Soft bounce
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      // — Abstract edge shapes (thin rotating lines/arcs) —
      for (const s of shapes) {
        s.rotation += s.rotSpeed;
        ctx.save();
        ctx.translate(s.x * W, s.y * H);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 0.7);
        ctx.stroke();
        ctx.restore();
      }

      // — Vignette —
      const vig = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
