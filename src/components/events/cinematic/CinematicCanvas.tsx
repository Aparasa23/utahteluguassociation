'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { EnvironmentScene } from './EnvironmentScene';
import { Portals3D } from './Portals3D';
import { FloatingTicket3D } from './FloatingTicket3D';

interface CinematicCanvasProps {
  scrollProgress: number; // 0 to 1
  currentScene: number; // 1 to 7
  selectedPortal: 'member' | 'guest' | 'volunteer' | null;
  onSelectPortal: (portal: 'member' | 'guest' | 'volunteer') => void;
  attendeeName: string;
  isVerifiedMember: boolean;
  membershipNumber: string;
  selectedEventsCount: number;
  totalPrice: number;
}

export function CinematicCanvas({
  scrollProgress,
  currentScene,
  selectedPortal,
  onSelectPortal,
  attendeeName,
  isVerifiedMember,
  membershipNumber,
  selectedEventsCount,
  totalPrice,
}: CinematicCanvasProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 1.2, 11], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Continuous Camera Path Controller */}
          <CameraController
            scrollProgress={scrollProgress}
            focusedPortal={currentScene === 1 ? selectedPortal : null}
            currentScene={currentScene}
          />

          {/* Telugu Festival 3D Atmosphere */}
          <EnvironmentScene />

          {/* Scene 2 & 3: 3D Portals */}
          <Portals3D
            visible={currentScene >= 2 && currentScene <= 4}
            selectedPortal={selectedPortal}
            onSelectPortal={onSelectPortal}
          />

          {/* Scene 6 & 7: 3D Holographic Floating Ticket */}
          <FloatingTicket3D
            visible={currentScene >= 6}
            attendeeName={attendeeName}
            isVerifiedMember={isVerifiedMember}
            membershipNumber={membershipNumber}
            selectedEventsCount={selectedEventsCount}
            totalPrice={totalPrice}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
