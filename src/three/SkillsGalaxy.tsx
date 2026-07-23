import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Billboard, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind", "GSAP",
  "Three.js", "Framer", "Redux", "Git", "Figma", "Node", "CSS",
];

function Orbit({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Node({ label, pos }: { label: string; pos: [number, number, number] }) {
  return (
    <Billboard position={pos}>
      <mesh>
        <circleGeometry args={[0.62, 32]} />
        <meshBasicMaterial color="#0a0c14" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.6, 0.66, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>
      <Text fontSize={0.2} color="#e8ecf5" anchorX="center" anchorY="middle" maxWidth={1.1}>
        {label}
      </Text>
    </Billboard>
  );
}

function Galaxy({ mobile }: { mobile: boolean }) {
  const list = mobile ? SKILLS.slice(0, 8) : SKILLS;
  const nodes = useMemo(() => {
    const n = list.length;
    return list.map((label, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const r = 2.6;
      return {
        label,
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, [list]);

  return (
    <>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.4}>
        <Sphere args={[1.2, 48, 48]}>
          <MeshDistortMaterial
            color="#0b1226"
            emissive="#5b21b6"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>
      <Orbit>
        {nodes.map((nd) => (
          <Node key={nd.label} label={nd.label} pos={nd.pos} />
        ))}
      </Orbit>
    </>
  );
}

export default function SkillsGalaxy() {
  const mobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, mobile ? 1.3 : 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#22d3ee" />
        <pointLight position={[-5, -5, 0]} intensity={2} color="#a855f7" />
        <Galaxy mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
