import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Torus,
  Octahedron,
  Stars,
  Environment,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = window.scrollY * 0.0015;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 + s;
    ref.current.rotation.x = s * 0.6;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.1}>
      <Icosahedron ref={ref} args={[1.4, 8]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0a1024"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.08}
          metalness={0.95}
          distort={0.38}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  );
}

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.25;
      ref.current.rotation.x = Math.PI / 2.4;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.6, 0.015, 16, 120]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
    </mesh>
  );
}

function Shard({
  position,
  color,
  geo,
}: {
  position: [number, number, number];
  color: string;
  geo: "torus" | "octa" | "ico";
}) {
  const props = {
    transparent: true,
    opacity: 0.92,
    roughness: 0.08,
    metalness: 0.85,
    emissive: color,
    emissiveIntensity: 0.45,
    color,
  };
  return (
    <Float speed={2} rotationIntensity={1.4} floatIntensity={1.6}>
      {geo === "torus" && (
        <Torus args={[0.4, 0.15, 16, 40]} position={position}>
          <meshStandardMaterial {...props} />
        </Torus>
      )}
      {geo === "octa" && (
        <Octahedron args={[0.42]} position={position}>
          <meshStandardMaterial {...props} flatShading />
        </Octahedron>
      )}
      {geo === "ico" && (
        <Icosahedron args={[0.36, 0]} position={position}>
          <meshStandardMaterial {...props} flatShading />
        </Icosahedron>
      )}
    </Float>
  );
}

function FloatingDust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7dd3fc" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame((state) => {
    const t = window.scrollY * 0.0022;
    state.camera.position.z = 6 - Math.min(t, 2.4);
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.5 + Math.min(t, 2) * 0.3,
      0.05
    );
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.5,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const mobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, mobile ? 1.3 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2.2} color="#22d3ee" />
        <pointLight position={[-5, -3, 2]} intensity={2.2} color="#a855f7" />
        <pointLight position={[0, 4, -4]} intensity={1.4} color="#3b82f6" />
        <CoreSphere />
        <GlowRing />
        <FloatingDust count={mobile ? 60 : 160} />
        {!mobile && (
          <>
            <Shard position={[-2.6, 1.2, -1]} color="#22d3ee" geo="torus" />
            <Shard position={[2.7, -0.8, -0.5]} color="#a855f7" geo="octa" />
            <Shard position={[2.2, 1.6, -1.5]} color="#3b82f6" geo="ico" />
            <Shard position={[-2.3, -1.4, -1]} color="#5eead4" geo="octa" />
          </>
        )}
        <Stars
          radius={40}
          depth={40}
          count={mobile ? 800 : 2800}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Environment preset="night" />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
