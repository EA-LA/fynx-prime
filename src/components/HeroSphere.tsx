import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Flowing market surface — abstract financial data waves ─── */
function MarketSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useMemo(() => {
    const handler = (e: TouchEvent) => {
      if (e.touches[0]) onPointerMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    };
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", handler);
    };
  }, [onPointerMove]);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vPos;
      varying float vElevation;

      void main() {
        vec3 p = position;

        // Multi-layered market waves
        float wave1 = sin(p.x * 1.2 + uTime * 0.12 + uMouse.x * 0.5) * 0.35;
        float wave2 = sin(p.x * 2.8 - uTime * 0.08 + p.z * 0.6) * 0.15;
        float wave3 = cos(p.z * 1.5 + uTime * 0.06 + uMouse.y * 0.4) * 0.2;
        float wave4 = sin((p.x + p.z) * 0.8 + uTime * 0.1) * 0.1;
        
        // Sharp price-action ridges
        float ridge = sin(p.x * 4.0 + uTime * 0.15) * 0.08 * smoothstep(0.0, 3.0, abs(p.x));
        
        p.y += wave1 + wave2 + wave3 + wave4 + ridge;
        
        vElevation = p.y;
        vPos = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vPos;
      varying float vElevation;

      void main() {
        // Grid lines — institutional data grid
        float gridX = abs(fract(vPos.x * 0.5 + uTime * 0.005 + uMouse.x * 0.05) - 0.5);
        float gridZ = abs(fract(vPos.z * 0.5 + uTime * 0.003) - 0.5);
        float lineX = 1.0 - smoothstep(0.0, 0.03, gridX);
        float lineZ = 1.0 - smoothstep(0.0, 0.03, gridZ);
        float grid = max(lineX, lineZ);

        // Elevation-based coloring — peaks are brighter (profit), valleys darker
        float elevNorm = smoothstep(-0.5, 0.7, vElevation);
        
        vec3 valleyColor = vec3(0.04, 0.04, 0.05);
        vec3 midColor = vec3(0.08, 0.08, 0.10);
        vec3 peakColor = vec3(0.18, 0.18, 0.22);
        
        vec3 surfaceColor = mix(valleyColor, midColor, smoothstep(-0.3, 0.1, vElevation));
        surfaceColor = mix(surfaceColor, peakColor, smoothstep(0.1, 0.5, vElevation));
        
        // Grid line color — silver on peaks, dark graphite in valleys
        vec3 gridColor = mix(vec3(0.12, 0.12, 0.14), vec3(0.35, 0.35, 0.40), elevNorm);
        
        vec3 color = mix(surfaceColor, gridColor, grid * 0.7);
        
        // Subtle edge flow lines (horizontal capital flow)
        float flow = sin(vPos.x * 3.0 + vPos.z * 0.5 + uTime * 0.08) * 0.5 + 0.5;
        float flowLine = smoothstep(0.97, 1.0, flow);
        color += vec3(0.2, 0.2, 0.24) * flowLine * 0.3;
        
        // Distance fade
        float dist = length(vPos.xz) / 8.0;
        float fade = 1.0 - smoothstep(0.3, 1.0, dist);
        
        gl_FragColor = vec4(color, fade * 0.85);
      }
    `,
    transparent: true,
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    const t = state.clock.getElapsedTime();
    matRef.current.uniforms.uTime.value = t;
    matRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.current.x, mouse.current.y), 0.04
    );
  });

  const geo = useMemo(() => new THREE.PlaneGeometry(16, 10, 200, 120), []);

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI * 0.38, 0, 0]} position={[0, -0.5, 0]}>
      <shaderMaterial ref={matRef} attach="material" args={[shader]} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ─── Floating data particles — capital flow dots ─── */
function FlowParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 2.5 - 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#55555a" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ─── Exported component ─── */
export default function HeroSphere() {
  return (
    <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.5, 5.5], fov: 50, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <MarketSurface />
        <FlowParticles />
      </Canvas>
    </div>
  );
}
