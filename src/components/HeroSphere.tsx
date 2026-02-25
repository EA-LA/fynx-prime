import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Wireframe Sphere with mouse-reactive grid ─── */
function GridSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  // Attach global listener once
  useMemo(() => {
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", (e) => {
      if (e.touches[0]) {
        onPointerMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
      }
    });
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vDisplacement;

        // Simplex-style noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289((x * 34.0 + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
          vNormal = normal;
          
          // Mouse influence on displacement
          float mouseInfluence = length(uMouse) * 0.3;
          vec3 noisePos = position * 1.2 + vec3(uTime * 0.05);
          
          // Add mouse-reactive wobble
          noisePos.x += uMouse.x * 0.4;
          noisePos.y += uMouse.y * 0.4;
          
          float noise = snoise(noisePos) * (0.08 + mouseInfluence * 0.04);
          float noise2 = snoise(position * 2.5 + vec3(uTime * 0.08)) * 0.03;
          
          vDisplacement = noise + noise2;
          vec3 newPos = position + normal * vDisplacement;
          vPosition = newPos;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vDisplacement;

        void main() {
          // Fresnel edge glow
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
          
          // Base color — dark graphite with subtle silver highlights
          vec3 baseColor = vec3(0.06, 0.06, 0.07);
          vec3 highlightColor = vec3(0.35, 0.35, 0.38);
          vec3 edgeColor = vec3(0.5, 0.5, 0.55);
          
          // Lighting from upper-left
          vec3 lightDir = normalize(vec3(-0.5, 0.8, 0.6));
          float diffuse = max(dot(vNormal, lightDir), 0.0);
          float specular = pow(max(dot(reflect(-lightDir, vNormal), viewDir), 0.0), 64.0);
          
          // Grid lines on surface (latitude/longitude)
          float lat = abs(fract(vPosition.y * 4.0 + uTime * 0.01 + uMouse.y * 0.15) - 0.5) * 2.0;
          float lon = abs(fract(atan(vPosition.z, vPosition.x) * 2.546 + uTime * 0.008 + uMouse.x * 0.2) - 0.5) * 2.0;
          
          float gridLat = smoothstep(0.92, 0.96, lat);
          float gridLon = smoothstep(0.92, 0.96, lon);
          float grid = max(gridLat, gridLon) * (0.15 + fresnel * 0.25);
          
          // Compose
          vec3 color = baseColor;
          color += highlightColor * diffuse * 0.4;
          color += edgeColor * fresnel * 0.5;
          color += vec3(specular * 0.3);
          color += vec3(grid) * vec3(0.6, 0.6, 0.65);
          
          // Displacement coloring — subtle blue-silver on ridges
          color += vec3(0.15, 0.15, 0.2) * max(vDisplacement * 3.0, 0.0);
          
          // Atmosphere fade at edges
          float alpha = 0.85 + fresnel * 0.15;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      wireframe: false,
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    const t = state.clock.getElapsedTime();

    materialRef.current.uniforms.uTime.value = t;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.current.x, mouse.current.y),
      0.05
    );

    // Slow rotation
    meshRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.02) * 0.1 + mouse.current.y * 0.08;
  });

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.2, 64), []);

  return (
    <mesh ref={meshRef} geometry={geo}>
      <shaderMaterial ref={materialRef} attach="material" args={[shaderArgs]} />
    </mesh>
  );
}

/* ─── Orbital rings ─── */
function OrbitalRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = tilt;
    ref.current.rotation.y = t * speed;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.003, 16, 200]} />
      <meshBasicMaterial color="#444448" transparent opacity={0.25} />
    </mesh>
  );
}

/* ─── Dust particles ─── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, opacities } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const op = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      op[i] = 0.1 + Math.random() * 0.4;
    }
    return { positions: pos, opacities: op };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#666670" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Main exported component ─── */
export default function HeroSphere() {
  return (
    <div
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[-3, 5, 4]} intensity={0.3} color="#aaaaaf" />

        <GridSphere />

        <OrbitalRing radius={3.0} speed={0.02} tilt={0.3} />
        <OrbitalRing radius={3.5} speed={-0.015} tilt={-0.5} />
        <OrbitalRing radius={4.0} speed={0.01} tilt={0.8} />

        <DustParticles />
      </Canvas>
    </div>
  );
}
