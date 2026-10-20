'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EnvironmentScene() {
  const deepamLightRef = useRef<THREE.PointLight>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Floating Marigold & Harvest Gold Embers
  const [particleGeo, particleMat] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color('#f59e0b'); // amber
    const c2 = new THREE.Color('#f43f5e'); // rose
    const c3 = new THREE.Color('#fbbf24'); // gold

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const chosenColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Flickering festive deepam lamp intensity
    if (deepamLightRef.current) {
      deepamLightRef.current.intensity = 2.5 + Math.sin(time * 6) * 0.4 + Math.cos(time * 11) * 0.2;
    }

    // Slow organic upward drift for festive embers
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.015;
        if (positions[i] > 10) {
          positions[i] = -10;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group>
      {/* Ambient warm temple illumination */}
      <ambientLight intensity={0.5} color="#fffbeb" />

      {/* Main directional golden sun ray */}
      <directionalLight
        position={[8, 12, 10]}
        intensity={1.8}
        color="#fbbf24"
        castShadow
      />

      {/* Rim cool light from opposite direction */}
      <directionalLight
        position={[-8, -5, -6]}
        intensity={0.6}
        color="#38bdf8"
      />

      {/* Deepam Core Point Light */}
      <pointLight
        ref={deepamLightRef}
        position={[0, -2, 2]}
        color="#f97316"
        distance={15}
        decay={2}
      />

      {/* Floating festive particles */}
      <points ref={particlesRef} geometry={particleGeo} material={particleMat} />

      {/* Subtle 3D Festive Stage Floor / Rangoli Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <ringGeometry args={[2, 12, 64]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.9}
          metalness={0.1}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}
