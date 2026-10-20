'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ReferenceCelestialCanvasProps {
  hoveredEventKey?: string | null;
}

interface PortalObj {
  key: string;
  mesh: THREE.Mesh;
  ring: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  color: number;
}

export function ReferenceCelestialCanvas({
  hoveredEventKey = null,
}: ReferenceCelestialCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<string | null>(null);

  // Keep latest hover state accessible in animation loop without tearing down WebGL context
  useEffect(() => {
    hoveredRef.current = hoveredEventKey;
  }, [hoveredEventKey]);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    // 1. Scene & Deep Midnight Petrol Fog Atmosphere (#071a20)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071a20, 0.022);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );
    camera.position.set(0, 1.2, 19);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    host.appendChild(renderer.domElement);

    // 4. Lighting System
    const hemiLight = new THREE.HemisphereLight(0xb9b0dc, 0x071a20, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.PointLight(0xffbb78, 90, 80);
    keyLight.position.set(-6, 9, 12);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x42759e, 100, 70);
    rimLight.position.set(10, 3, -15);
    scene.add(rimLight);

    const amberLight = new THREE.PointLight(0xf4bb59, 80, 60);
    amberLight.position.set(0, -2, -20);
    scene.add(amberLight);

    // 5. Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe5a747,
      metalness: 0.85,
      roughness: 0.22,
    });
    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0x8a633a,
      metalness: 0.8,
      roughness: 0.28,
    });
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xf5e8d5,
      metalness: 0.3,
      roughness: 0.35,
    });

    // 6. Sculptural Golden Concentric Toruses with Orbiting Octahedron Beads
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    for (let i = 0; i < 10; i++) {
      const z = 4 - i * 9;
      const r = 5.2 + Math.sin(i * 0.7) * 1.1;
      const tor = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.045, 10, 120),
        i % 2 === 0 ? goldMat : darkGoldMat
      );
      tor.position.set(0, 0, z);
      tor.rotation.x = Math.sin(i * 0.5) * 0.18;
      tor.rotation.y = Math.cos(i * 0.3) * 0.18;
      tor.rotation.z = i * 0.15;
      ringsGroup.add(tor);

      // 8 orbiting sacred octahedron beads per ring
      for (let j = 0; j < 8; j++) {
        const a = (j / 8) * Math.PI * 2 + i * 0.4;
        const bead = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.08 + (j % 3) * 0.03),
          i % 2 === 0 ? creamMat : goldMat
        );
        bead.position.set(
          Math.cos(a) * (r + 1.1),
          Math.sin(a) * (r + 1.1),
          z + (j % 3) * 0.3
        );
        ringsGroup.add(bead);
      }
    }

    // 7. Cultural Entrance Mandala at z = 1 (Rotating Petal Geometry)
    const mandala = new THREE.Group();
    mandala.position.set(0, 0, 1);
    scene.add(mandala);

    for (let i = 0; i < 20; i++) {
      const a = (i * Math.PI) / 10;
      const petal = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.085, 8, 40, Math.PI * 0.85),
        i % 2 === 0 ? goldMat : creamMat
      );
      petal.position.set(Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0);
      petal.rotation.z = a + Math.PI * 0.09;
      mandala.add(petal);
    }
    mandala.add(new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.035, 8, 90), goldMat));
    const mandalaCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.85, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0xd89f52,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1,
      })
    );
    mandala.add(mandalaCore);

    // 8. The 4 Floating Sacred Crystal Portals (Rangoli, Pickleball, Volleyball, Grand Festival)
    const portals: PortalObj[] = [];
    const portalConfigs = [
      { key: 'rangoli', x: -4.8, y: -0.2, z: -22, color: 0xf59e0b, label: 'Rangoli' },
      { key: 'pickleball', x: -1.6, y: 0.3, z: -21, color: 0x10b981, label: 'Pickleball' },
      { key: 'volleyball', x: 1.6, y: -0.3, z: -21, color: 0x0ea5e9, label: 'Volleyball' },
      { key: 'grand_festival', x: 4.8, y: 0.2, z: -22, color: 0xd946ef, label: 'Grand Utsavam' },
    ];

    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    portalConfigs.forEach((cfg, idx) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.22,
        metalness: 0.72,
        roughness: 0.16,
        clearcoat: 1,
        flatShading: true,
      });
      const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), mat);
      crystal.position.set(cfg.x, cfg.y, cfg.z);
      portalGroup.add(crystal);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.65, 0.03, 8, 90),
        goldMat
      );
      ring.position.set(cfg.x, cfg.y, cfg.z);
      ring.rotation.x = Math.PI * 0.25;
      portalGroup.add(ring);

      portals.push({
        key: cfg.key,
        mesh: crystal,
        ring,
        baseX: cfg.x,
        baseY: cfg.y,
        baseZ: cfg.z,
        phase: idx * 1.57,
        color: cfg.color,
      });
    });

    // 9. 850 Floating Golden Sacred Embers (Atmospheric Particle Parallax)
    const count = 850;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 48;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pts[i * 3 + 2] = 8 - Math.random() * 95;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const stars = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        color: 0xf4bb59,
        size: 0.065,
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true,
      })
    );
    scene.add(stars);

    // 10. Mouse Parallax & Scroll Listeners
    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let scrollProgress = 0;
    const handleScroll = () => {
      const max = (document.documentElement.scrollHeight || 2000) - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 11. Animation Tick Loop
    const clock = new THREE.Clock();
    let animId: number;

    const tick = () => {
      const t = clock.getElapsedTime();

      // Entrance Mandala rotation & gentle pitch sway
      mandala.rotation.z = t * 0.05;
      mandala.rotation.y = Math.sin(t * 0.18) * 0.12;

      // Concentric Rings tunnel drift
      ringsGroup.rotation.z = t * 0.015 + scrollProgress * 0.4;

      // Sacred Embers drift
      stars.rotation.y = t * 0.002;

      // 4 Floating Sacred Crystals (Independent sinusoidal bobbing + active card hover)
      const currentHovered = hoveredRef.current;
      portals.forEach((p) => {
        const isHovered = currentHovered === p.key;

        // Organic floating wave (asynchronous phase per crystal)
        p.mesh.position.y = p.baseY + Math.sin(t * 1.1 + p.phase) * 0.28;
        p.ring.position.y = p.mesh.position.y;

        // Continuous 3D tumbling
        p.mesh.rotation.x = t * 0.25 + p.phase;
        p.mesh.rotation.y = t * 0.38 + p.phase;
        p.ring.rotation.z = t * (isHovered ? 1.2 : 0.3) + p.phase;

        // Smooth hover scale interpolation
        const targetScale = isHovered ? 1.35 : 1.0;
        p.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        p.ring.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Radiant glow pulse on hover
        const mat = p.mesh.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          isHovered ? 0.75 : 0.22,
          0.1
        );
      });

      // Smooth camera interpolation (scroll dolly + subtle mouse parallax sway)
      const targetZ = 19 - scrollProgress * 22;
      const targetX = pointer.x * 1.4;
      const targetY = 1.2 - scrollProgress * 2.5 + pointer.y * 0.7;

      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, -scrollProgress * 2, camera.position.z - 14);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };
    tick();

    // 12. Resize Listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    };
    window.addEventListener('resize', handleResize);

    // 13. Teardown
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle Depth Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020e13]/10 via-[#020e13]/30 to-[#020e13]/85 pointer-events-none" />
    </div>
  );
}
