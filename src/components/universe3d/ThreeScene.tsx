'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { DestinationId, FestivalTheme } from './UniverseCanvas';

interface ThreeSceneProps {
  activeDestination: DestinationId;
  onSelectDestination: (id: DestinationId) => void;
  seasonalTheme: FestivalTheme;
  isRotating: boolean;
}

// 1. Rotating Sacred Muggulu / Mandala Core (Lusion Style Iridescent Glass/Gold)
function SacredMandalaCore({ theme }: { theme: FestivalTheme }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  const themeColors = useMemo(() => {
    switch (theme) {
      case 'SANKRANTHI':
        return { primary: '#f59e0b', secondary: '#e11d48', emissive: '#d97706' };
      case 'UGADI':
        return { primary: '#10b981', secondary: '#84cc16', emissive: '#059669' };
      case 'BATHUKAMMA':
        return { primary: '#f43f5e', secondary: '#ec4899', emissive: '#be185d' };
      case 'DIWALI':
      default:
        return { primary: '#f59e0b', secondary: '#fbbf24', emissive: '#b45309' };
    }
  }, [theme]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.15;
      ringRef1.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.2;
      ringRef2.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Iridescent Gemstone / Energy Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <MeshDistortMaterial
          color={themeColors.primary}
          emissive={themeColors.emissive}
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          distort={0.25}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer Sacred Rangoli Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color={themeColors.primary}
          emissive={themeColors.primary}
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.025, 16, 100]} />
        <meshStandardMaterial
          color={themeColors.secondary}
          emissive={themeColors.secondary}
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

// 2. Interactive Destination Pavilion Node
function DestinationNode({
  id,
  title,
  telugu,
  accentColor,
  angle,
  radius,
  isActive,
  onSelect,
}: {
  id: DestinationId;
  title: string;
  telugu: string;
  accentColor: string;
  angle: number;
  radius: number;
  isActive: boolean;
  onSelect: (id: DestinationId) => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle organic floating bob
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + angle) * 0.2;
    }
  });

  const scale = isActive ? 1.4 : hovered ? 1.25 : 1.0;

  return (
    <group position={[x, 0, z]} ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          scale={scale}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshPhysicalMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isActive ? 1.2 : hovered ? 0.8 : 0.35}
            roughness={0.2}
            metalness={0.7}
            clearcoat={0.9}
            transmission={0.4}
            thickness={0.5}
          />
        </mesh>

        {/* Orbiting Halo Ring for Active Node */}
        {isActive && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.75, 0.82, 32]} />
            <meshBasicMaterial color={accentColor} side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        )}

        {/* 3D Label */}
        <Text
          position={[0, 0.95, 0]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#040714"
        >
          {title}
        </Text>
      </Float>
    </group>
  );
}

// 3. Seasonal Kites for Sankranthi (Dynamic 3D Geometry)
function SankranthiKites() {
  const kiteGroup = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (kiteGroup.current) {
      kiteGroup.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const kites = useMemo(
    () => [
      { pos: [4.5, 2.2, 1.5], color: '#f59e0b', rot: 0.2 },
      { pos: [-4.2, 3.0, -2.0], color: '#e11d48', rot: -0.3 },
      { pos: [2.0, 3.8, -4.5], color: '#38bdf8', rot: 0.4 },
      { pos: [-3.5, 1.8, 4.0], color: '#10b981', rot: -0.15 },
    ],
    []
  );

  return (
    <group ref={kiteGroup}>
      {kites.map((k, idx) => (
        <group key={idx} position={k.pos as [number, number, number]} rotation={[0.4, k.rot, -0.2]}>
          {/* Diamond Kite Body */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial color={k.color} side={THREE.DoubleSide} roughness={0.3} metalness={0.4} />
          </mesh>
          {/* Spar / Cross Frame */}
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 1.25, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Small tail marker */}
          <mesh position={[0, -0.65, 0]}>
            <coneGeometry args={[0.15, 0.35, 3]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 4. Cosmic Embers / Particle Field
function CosmicParticles({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#f59e0b'),
      new THREE.Color('#e11d48'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#60a5fa'),
      new THREE.Color('#34d399'),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a cylinder/sphere around the arena
      const r = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 5. Camera Mouse Parallax Rig (Signature Active Theory / Lusion touch)
function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Smooth lerp camera rotation to subtly tilt with pointer movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.5 + pointer.y * 0.8, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ThreeScene({
  activeDestination,
  onSelectDestination,
  seasonalTheme,
  isRotating,
}: ThreeSceneProps) {
  const destinationList = useMemo(
    () => [
      { id: 'PAVILION' as DestinationId, title: 'Cultural Pavilion', telugu: 'సాంస్కృతిక వేదిక', accentColor: '#f59e0b', angle: 0 },
      { id: 'ARENA' as DestinationId, title: 'Community Arena', telugu: 'క్రీడా ప్రాంగణం', accentColor: '#10b981', angle: (Math.PI * 2) / 6 },
      { id: 'MEMBERSHIP' as DestinationId, title: 'Membership Center', telugu: 'సభ్యత్వ కేంద్రం', accentColor: '#38bdf8', angle: (Math.PI * 4) / 6 },
      { id: 'GALLERY' as DestinationId, title: 'Community Gallery', telugu: 'స్మృతి మంజరి', accentColor: '#e11d48', angle: (Math.PI * 6) / 6 },
      { id: 'SPONSORS' as DestinationId, title: 'Sponsor Gallery', telugu: 'పోషకుల శ్రేణి', accentColor: '#fbbf24', angle: (Math.PI * 8) / 6 },
      { id: 'VOLUNTEER' as DestinationId, title: 'Leadership Hub', telugu: 'సేవా నేతృత్వం', accentColor: '#a855f7', angle: (Math.PI * 10) / 6 },
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 4, 9.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="w-full h-full"
    >
      <color attach="background" args={['#040714']} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#fff1db" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#e11d48" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#f59e0b" distance={8} />

      {/* Camera Parallax Controller */}
      <CameraRig />

      {/* Central Living Mandala */}
      <SacredMandalaCore theme={seasonalTheme} />

      {/* Interactive Destination Nodes */}
      {destinationList.map((node) => (
        <DestinationNode
          key={node.id}
          id={node.id}
          title={node.title}
          telugu={node.telugu}
          accentColor={node.accentColor}
          angle={node.angle}
          radius={4.8}
          isActive={activeDestination === node.id}
          onSelect={onSelectDestination}
        />
      ))}

      {/* Seasonal Atmosphere */}
      {seasonalTheme === 'SANKRANTHI' && <SankranthiKites />}

      {/* Cosmic Fireflies & Embers */}
      <CosmicParticles count={1400} />

      {/* Subtle manual orbit controls (disabled pan to preserve framing) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 4}
        autoRotate={isRotating}
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
