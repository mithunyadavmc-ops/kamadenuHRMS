import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Float, Line, OrbitControls, Sparkles, Stars, RoundedBox } from '@react-three/drei';

const networkNodes: [number, number, number][] = [
  [-4.4, 2.6, -1.4],
  [-2.2, 3.2, -0.8],
  [0.9, 2.8, -1.8],
  [3.4, 1.9, -1.0],
  [-3.6, -0.8, -2.0],
  [-0.7, -2.3, -1.5],
  [2.8, -1.4, -1.9],
  [4.0, 0.6, -1.2]
];

function GlassCube({ position, scale = 1, color = '#60A5FA' }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.34;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.08}
          metalness={0.1}
          transmission={0.92}
          thickness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.08}
          ior={1.4}
          transparent
          opacity={0.65}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.14;
    meshRef.current.rotation.z += delta * 0.18;
    meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.5 + position[2]) * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#93C5FD"
          roughness={0.04}
          metalness={0}
          transmission={1}
          thickness={1.3}
          transparent
          opacity={0.5}
          ior={1.45}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function RotatingRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={0.8} rotationIntensity={1.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1.35, 0.08, 24, 128]} />
        <meshStandardMaterial color="#3B82F6" emissive="#60A5FA" emissiveIntensity={1.6} transparent opacity={0.72} />
      </mesh>
    </Float>
  );
}

function SecurityShield({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.45);
    shape.lineTo(0.95, 1.1);
    shape.lineTo(1.05, 0.15);
    shape.quadraticCurveTo(0.55, -1.05, 0, -1.55);
    shape.quadraticCurveTo(-0.55, -1.05, -1.05, 0.15);
    shape.lineTo(-0.95, 1.1);
    shape.lineTo(0, 1.45);
    return shape;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.32;
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <extrudeGeometry args={[shieldShape, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 8 }]} />
        <meshPhysicalMaterial
          color="#0EA5E9"
          roughness={0.12}
          metalness={0.08}
          transmission={0.7}
          thickness={0.8}
          transparent
          opacity={0.88}
          emissive="#2563EB"
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  );
}

function BriefcaseMark({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = 0.1 + Math.sin(Date.now() * 0.0002) * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.7}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh castShadow receiveShadow>
          <RoundedBox args={[1.8, 1.1, 0.5]} radius={0.16} smoothness={6}>
            <meshPhysicalMaterial color="#1D4ED8" roughness={0.16} metalness={0.12} transmission={0.35} transparent opacity={0.92} emissive="#2563EB" emissiveIntensity={0.2} />
          </RoundedBox>
        </mesh>
        <mesh position={[0, 0.76, 0]}>
          <torusGeometry args={[0.34, 0.08, 12, 24]} />
          <meshStandardMaterial color="#93C5FD" emissive="#60A5FA" emissiveIntensity={1.1} />
        </mesh>
      </group>
    </Float>
  );
}

function NetworkField() {
  const links = useMemo(() => [
    [networkNodes[0], networkNodes[1]],
    [networkNodes[1], networkNodes[2]],
    [networkNodes[2], networkNodes[3]],
    [networkNodes[4], networkNodes[5]],
    [networkNodes[5], networkNodes[6]],
    [networkNodes[6], networkNodes[7]],
    [networkNodes[1], networkNodes[5]],
    [networkNodes[2], networkNodes[6]],
  ], []);

  return (
    <group>
      {links.map((pair, index) => (
        <Line
          key={`${index}`}
          points={pair as [number, number, number][]}
          color="#60A5FA"
          lineWidth={1}
          transparent
          opacity={0.22}
          dashed={false}
        />
      ))}
      {networkNodes.map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#BFDBFE" />
        </mesh>
      ))}
    </group>
  );
}

export const Login3DScene: React.FC = () => {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 12], fov: 40 }}
    >
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 12, 28]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 6, 8]} intensity={2.2} color="#93C5FD" />
      <pointLight position={[-5, -2, 6]} intensity={18} color="#2563EB" />
      <pointLight position={[3, -3, 2]} intensity={10} color="#38BDF8" />
      <spotLight position={[0, 8, 8]} angle={0.4} penumbra={1} intensity={22} color="#FFFFFF" />

      <Stars radius={80} depth={36} count={2400} factor={4} fade speed={0.4} />
      <Sparkles count={120} scale={18} size={4} speed={0.2} color="#60A5FA" opacity={0.75} />
      <NetworkField />

      <GlassCube position={[-4.7, 2.2, -1.2]} scale={1.2} />
      <GlassCube position={[3.8, 2.8, -2.1]} scale={0.9} color="#93C5FD" />
      <GlassCube position={[-3.1, -2.8, -1.8]} scale={0.8} color="#38BDF8" />
      <GlassSphere position={[0.2, 2.3, -1]} scale={1.05} />
      <GlassSphere position={[4.6, -1.7, -2.2]} scale={0.7} />
      <RotatingRing position={[-1.2, 1.1, -1.3]} scale={1.25} />
      <RotatingRing position={[2.8, -1.2, -1.8]} scale={0.8} />
      <SecurityShield position={[0.5, -0.2, -0.5]} scale={1.15} />
      <BriefcaseMark position={[-2.2, 0.2, -0.7]} scale={0.75} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.2} luminanceThreshold={0.12} luminanceSmoothing={0.2} mipmapBlur />
        <DepthOfField focusDistance={0.02} focalLength={0.04} bokehScale={2.4} height={480} />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 2.45}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
};

export default Login3DScene;
