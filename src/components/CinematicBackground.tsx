import { useEffect, useRef } from "react";

/**
 * Cinematic background — large moon on right, space dust, particles.
 * Monochrome, luxury-grade. Fixed behind all content.
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

    // Stars / dust particles
    const stars: { x: number; y: number; r: number; alpha: number; twinkleSpeed: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.3 + Math.random() * 1.2,
        alpha: 0.1 + Math.random() * 0.5,
        twinkleSpeed: 0.001 + Math.random() * 0.003,
      });
    }

    // Edge geometric shapes (subtle wireframe triangles/lines)
    const geoShapes: { x: number; y: number; size: number; rotation: number; rotSpeed: number; alpha: number; type: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;
      switch (edge) {
        case 0: x = Math.random() * 0.12; y = Math.random(); break;
        case 1: x = 0.88 + Math.random() * 0.12; y = Math.random(); break;
        case 2: x = Math.random(); y = Math.random() * 0.1; break;
        default: x = Math.random(); y = 0.9 + Math.random() * 0.1; break;
      }
      geoShapes.push({
        x, y,
        size: 20 + Math.random() * 50,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0003,
        alpha: 0.04 + Math.random() * 0.08,
        type: Math.floor(Math.random() * 3),
      });
    }

    // Moon craters for surface detail
    const craters: { ox: number; oy: number; r: number; depth: number }[] = [];
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 0.85;
      craters.push({
        ox: Math.cos(angle) * dist,
        oy: Math.sin(angle) * dist,
        r: 0.03 + Math.random() * 0.12,
        depth: 0.02 + Math.random() * 0.04,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 1;

      // === LARGE MOON — right side ===
      const moonCenterX = W * 0.75 + Math.sin(t * 0.00015) * W * 0.01;
      const moonCenterY = H * 0.38 + Math.cos(t * 0.00012) * H * 0.008;
      const moonRadius = Math.min(W, H) * 0.32;

      // Outer atmospheric glow (large, soft)
      const atmoGlow = ctx.createRadialGradient(moonCenterX, moonCenterY, moonRadius * 0.5, moonCenterX, moonCenterY, moonRadius * 2.5);
      atmoGlow.addColorStop(0, "rgba(255,255,255,0.04)");
      atmoGlow.addColorStop(0.3, "rgba(255,255,255,0.02)");
      atmoGlow.addColorStop(0.6, "rgba(255,255,255,0.005)");
      atmoGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = atmoGlow;
      ctx.fillRect(0, 0, W, H);

      // Moon body — main sphere with gradient lighting
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
      ctx.clip();

      // Base moon fill — gradient from lit side to dark
      const moonBase = ctx.createLinearGradient(
        moonCenterX - moonRadius, moonCenterY - moonRadius,
        moonCenterX + moonRadius * 0.8, moonCenterY + moonRadius
      );
      moonBase.addColorStop(0, "rgba(180,180,180,0.25)");
      moonBase.addColorStop(0.3, "rgba(140,140,140,0.2)");
      moonBase.addColorStop(0.6, "rgba(100,100,100,0.15)");
      moonBase.addColorStop(1, "rgba(40,40,40,0.08)");
      ctx.fillStyle = moonBase;
      ctx.fillRect(moonCenterX - moonRadius, moonCenterY - moonRadius, moonRadius * 2, moonRadius * 2);

      // Radial highlight on upper-left (light source)
      const highlight = ctx.createRadialGradient(
        moonCenterX - moonRadius * 0.35, moonCenterY - moonRadius * 0.3, moonRadius * 0.05,
        moonCenterX, moonCenterY, moonRadius
      );
      highlight.addColorStop(0, "rgba(255,255,255,0.18)");
      highlight.addColorStop(0.3, "rgba(255,255,255,0.08)");
      highlight.addColorStop(0.7, "rgba(255,255,255,0.02)");
      highlight.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Craters — subtle circular depressions
      for (const c of craters) {
        const cx = moonCenterX + c.ox * moonRadius;
        const cy = moonCenterY + c.oy * moonRadius;
        const cr = c.r * moonRadius;
        const craterGrad = ctx.createRadialGradient(cx - cr * 0.2, cy - cr * 0.2, cr * 0.1, cx, cy, cr);
        craterGrad.addColorStop(0, `rgba(0,0,0,${c.depth})`);
        craterGrad.addColorStop(0.6, `rgba(0,0,0,${c.depth * 0.5})`);
        craterGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = craterGrad;
        ctx.fill();
      }

      // Terminator shadow — crescent darkness on the right edge
      const shadowGrad = ctx.createLinearGradient(
        moonCenterX - moonRadius * 0.2, moonCenterY,
        moonCenterX + moonRadius, moonCenterY
      );
      shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(0.5, "rgba(0,0,0,0.1)");
      shadowGrad.addColorStop(0.8, "rgba(0,0,0,0.3)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(moonCenterX - moonRadius, moonCenterY - moonRadius, moonRadius * 2, moonRadius * 2);

      // Limb darkening
      const limb = ctx.createRadialGradient(moonCenterX, moonCenterY, moonRadius * 0.6, moonCenterX, moonCenterY, moonRadius);
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(0.8, "rgba(0,0,0,0.05)");
      limb.addColorStop(1, "rgba(0,0,0,0.2)");
      ctx.fillStyle = limb;
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Moon edge rim light (thin bright arc on left)
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, -Math.PI * 0.7, Math.PI * 0.5);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // === Stars / space dust ===
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed) * 0.3 + 0.7;
        const a = s.alpha * twinkle;
        // Skip stars behind the moon
        const dx = s.x - moonCenterX / W;
        const dy = s.y - moonCenterY / H;
        const distToMoon = Math.sqrt(dx * dx + dy * dy);
        if (distToMoon < (moonRadius / Math.min(W, H)) * 1.1) continue;

        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      // === Geometric wireframe shapes on edges ===
      for (const s of geoShapes) {
        s.rotation += s.rotSpeed;
        ctx.save();
        ctx.translate(s.x * W, s.y * H);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = 0.5;

        if (s.type === 0) {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.87, s.size * 0.5);
          ctx.lineTo(-s.size * 0.87, s.size * 0.5);
          ctx.closePath();
          ctx.stroke();
        } else if (s.type === 1) {
          // Arc
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 0.7);
          ctx.stroke();
        } else {
          // Connected lines
          ctx.beginPath();
          ctx.moveTo(-s.size, -s.size * 0.5);
          ctx.lineTo(0, s.size * 0.3);
          ctx.lineTo(s.size * 0.7, -s.size * 0.2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // === Ambient soft center glow ===
      const ambX = W * 0.4 + Math.sin(t * 0.0001) * W * 0.03;
      const ambY = H * 0.5 + Math.cos(t * 0.00008) * H * 0.02;
      const amb = ctx.createRadialGradient(ambX, ambY, 0, ambX, ambY, W * 0.35);
      amb.addColorStop(0, "rgba(255,255,255,0.008)");
      amb.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, W, H);

      // === Vignette ===
      const vig = ctx.createRadialGradient(W / 2, H / 2, W * 0.2, W / 2, H / 2, W * 0.8);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.5)");
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
