'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ShieldCheck, UserCheck, HeartHandshake } from 'lucide-react';

interface Portals3DProps {
  selectedPortal: 'member' | 'guest' | 'volunteer' | null;
  onSelectPortal: (portal: 'member' | 'guest' | 'volunteer') => void;
  visible: boolean;
}

export function Portals3D({
  selectedPortal,
  onSelectPortal,
  visible,
}: Portals3DProps) {
  if (!visible) return null;

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. MEMBER PORTAL (Left: x = -3.2) */}
      <SinglePortal
        position={[-3.2, 0, 0]}
        type="member"
        title="UTA Member"
        teluguTitle="సభ్యులు"
        desc="Free Passes & VIP Entry"
        color="#f59e0b"
        emissiveColor="#b45309"
        isSelected={selectedPortal === 'member'}
        onSelect={() => onSelectPortal('member')}
      />

      {/* 2. NON-MEMBER GUEST PORTAL (Center: x = 0) */}
      <SinglePortal
        position={[0, 0.4, 0]}
        type="guest"
        title="Community Guest"
        teluguTitle="అతిథులు"
        desc="General Admission & Sports"
        color="#f43f5e"
        emissiveColor="#9f1239"
        isSelected={selectedPortal === 'guest'}
        onSelect={() => onSelectPortal('guest')}
      />

      {/* 3. VOLUNTEER PORTAL (Right: x = 3.2) */}
      <SinglePortal
        position={[3.2, 0, 0]}
        type="volunteer"
        title="Festival Volunteer"
        teluguTitle="స్వచ్ఛంద సేవకులు"
        desc="Join Event Operations"
        color="#0ea5e9"
        emissiveColor="#0369a1"
        isSelected={selectedPortal === 'volunteer'}
        onSelect={() => onSelectPortal('volunteer')}
      />
    </group>
  );
}

interface SinglePortalProps {
  position: [number, number, number];
  type: 'member' | 'guest' | 'volunteer';
  title: string;
  teluguTitle: string;
  desc: string;
  color: string;
  emissiveColor: string;
  isSelected: boolean;
  onSelect: () => void;
}

function SinglePortal({
  position,
  type,
  title,
  teluguTitle,
  desc,
  color,
  emissiveColor,
  isSelected,
  onSelect,
}: SinglePortalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.6);
      meshRef.current.rotation.x += delta * 0.3;
      const targetScale = isSelected ? 1.3 : hovered ? 1.18 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
      ringRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Outer Glow Halo Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={hovered || isSelected ? 2.5 : 0.8}
            roughness={0.2}
            metalness={0.9}
            wireframe
          />
        </mesh>

        {/* Central Geometric Crystal Portal */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {type === 'member' && <octahedronGeometry args={[0.9, 0]} />}
          {type === 'guest' && <dodecahedronGeometry args={[0.85, 0]} />}
          {type === 'volunteer' && <icosahedronGeometry args={[0.85, 0]} />}

          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={hovered || isSelected ? 1.8 : 0.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Core Floating Point Light for Spatial Illuminance */}
        <pointLight
          color={color}
          intensity={hovered || isSelected ? 5 : 2}
          distance={4}
        />

        {/* Spatially Aligned HTML Label Card */}
        <Html position={[0, -1.8, 0]} center distanceFactor={10} className="pointer-events-none select-none">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`pointer-events-auto cursor-pointer p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 text-center w-52 shadow-2xl ${
              isSelected
                ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 scale-105'
                : hovered
                ? 'bg-black/80 border-white/40 scale-105'
                : 'bg-black/60 border-white/10'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {type === 'member' && <ShieldCheck className="w-4 h-4 text-amber-400" />}
              {type === 'guest' && <UserCheck className="w-4 h-4 text-rose-400" />}
              {type === 'volunteer' && <HeartHandshake className="w-4 h-4 text-sky-400" />}
              <span className="text-[10px] font-mono tracking-widest uppercase text-white font-bold">
                {title}
              </span>
            </div>
            <div className="text-sm font-telugu font-bold text-amber-200">
              {teluguTitle}
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 leading-snug">
              {desc}
            </p>
            <div className="mt-2.5 pt-2 border-t border-white/10">
              <span
                className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                  isSelected
                    ? 'bg-amber-400 text-black font-black'
                    : 'bg-white/10 text-zinc-300'
                }`}
              >
                {isSelected ? '✓ SELECTED' : 'CLICK TO ENTER'}
              </span>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}
