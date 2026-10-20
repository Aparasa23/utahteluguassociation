'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress?: number;
  focusedPortal?: 'member' | 'guest' | 'volunteer' | null;
  currentScene?: number;
}

export function CameraController({
  scrollProgress = 0,
  focusedPortal,
  currentScene = 1,
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let targetPos = new THREE.Vector3(0, 1.0, 8.0);
    let targetLook = new THREE.Vector3(0, 0, 0);

    // If portal is focused by user click
    if (focusedPortal === 'member') {
      targetPos.set(-2.5, 0.2, 4.2);
      targetLook.set(-2.8, 0, 0);
    } else if (focusedPortal === 'guest') {
      targetPos.set(0, 0.4, 4.0);
      targetLook.set(0, 0.2, 0);
    } else if (focusedPortal === 'volunteer') {
      targetPos.set(2.5, 0.2, 4.2);
      targetLook.set(2.8, 0, 0);
    } else {
      // Smooth stage-based spatial coordinates
      switch (currentScene) {
        case 1:
          // Category selection & Arrival Gateway
          targetPos.set(0, 0.8, 7.5);
          targetLook.set(0, 0, 0);
          break;
        case 2:
          // Identity & Member Verification (Warm amber lamps)
          targetPos.set(-1.4, 0.3, 5.4);
          targetLook.set(-0.4, 0, 0);
          break;
        case 3:
          // Event Selection Matrix
          targetPos.set(1.4, 0.2, 5.2);
          targetLook.set(0.4, 0, 0);
          break;
        case 4:
          // Event Specifics & Team Rosters
          targetPos.set(0, -0.1, 4.8);
          targetLook.set(0, 0, 0);
          break;
        case 5:
          // Review & Pass Minting (Approaching 3D pass)
          targetPos.set(0, 0.4, 4.2);
          targetLook.set(0, 0, 0);
          break;
        case 6:
        case 7:
          // Finale: Confirmed VIP Holographic Pass
          targetPos.set(0, 0.2, 3.8);
          targetLook.set(0, 0, 0);
          break;
        default:
          targetPos.set(0, 1.0, 8.0);
          targetLook.set(0, 0, 0);
      }
    }

    // Smooth lerping for cinematic fluid camera motion
    camera.position.lerp(targetPos, 0.06);
    currentLookAt.current.lerp(targetLook, 0.06);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
