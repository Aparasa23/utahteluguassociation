'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { QrCode, Sparkles, ShieldCheck } from 'lucide-react';

interface FloatingTicket3DProps {
  visible: boolean;
  attendeeName: string;
  isVerifiedMember: boolean;
  membershipNumber: string;
  selectedEventsCount: number;
  totalPrice: number;
}

export function FloatingTicket3D({
  visible,
  attendeeName,
  isVerifiedMember,
  membershipNumber,
  selectedEventsCount,
  totalPrice,
}: FloatingTicket3DProps) {
  if (!visible) return null;

  const cardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cardRef.current) {
      // Subtle mouse reactive tilt
      const targetRotX = (state.mouse.y * Math.PI) / 8;
      const targetRotY = (state.mouse.x * Math.PI) / 8;
      cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetRotX, 0.05);
      cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={cardRef} position={[0, 0, 0]}>
        {/* Physical 3D Card Base Geometry */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[3.2, 4.8, 0.1]} />
          <meshStandardMaterial
            color="#18181b"
            roughness={0.2}
            metalness={0.8}
            emissive="#1c1917"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Golden Foil Perimeter Bezel */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[3.25, 4.85, 0.08]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.1}
            metalness={0.95}
            emissive="#b45309"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>

        {/* Lanyard Top Ring */}
        <mesh position={[0, 2.55, 0]}>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Spatially Docked Live Holographic Pass Overlay */}
        <Html position={[0, 0, 0.06]} center transform distanceFactor={4.5} className="select-none pointer-events-none">
          <div className="w-[320px] p-6 rounded-2xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] font-sans">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-xs">
                  UTA
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-white">
                    UTAH TELUGU ASSOC.
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">
                    SANKRANTHI 2027
                  </div>
                </div>
              </div>
              {isVerifiedMember ? (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase bg-emerald-500 text-black shadow">
                  ★ VIP MEMBER
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300">
                  GUEST PASS
                </span>
              )}
            </div>

            {/* Attendee Name */}
            <div className="my-5 text-center space-y-0.5">
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                AUTHENTICATED REGISTRANT
              </div>
              <div className="text-xl font-black font-display text-white tracking-tight truncate">
                {attendeeName || 'Your Name Here'}
              </div>
              <div className="text-xs font-mono text-amber-400">
                {isVerifiedMember ? membershipNumber || 'UTA-MEMBER' : 'COMMUNITY TIER'}
              </div>
            </div>

            {/* Event Count & Verification Badge */}
            <div className="py-2.5 border-y border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Access Granted:</span>
              <span className="text-amber-400 font-bold">{selectedEventsCount} Weekend Events</span>
            </div>

            {/* QR Code & Total */}
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">Total Due</span>
                <span className="text-lg font-mono font-black text-amber-400">
                  ${totalPrice.toFixed(2)} USD
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white shadow-md">
                <QrCode className="w-10 h-10 text-black" />
              </div>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}
