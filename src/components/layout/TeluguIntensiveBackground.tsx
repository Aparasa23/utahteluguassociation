'use client';

import React, { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
  hue: number; // 35-48 warm gold/amber or 345-355 crimson
  alpha: number;
}

export default function TeluguIntensiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let rotationAngle = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize rising Bhogi / Deepam Embers (dark, moody, subtle)
    const emberCount = 55;
    const embers: Ember[] = [];

    const createEmber = (initialY?: number): Ember => {
      const isCrimson = Math.random() < 0.25;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 40,
        size: Math.random() * 1.8 + 0.6,
        speedY: -(Math.random() * 0.7 + 0.35),
        speedX: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: Math.random() * 260 + 180,
        hue: isCrimson ? 348 : Math.floor(Math.random() * 12 + 36), // 36-48 gold, 348 kumkuma
        alpha: Math.random() * 0.5 + 0.3,
      };
    };

    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber(Math.random() * height));
    }

    // Sacred Ashta-Dala Padmam (Eight-Petaled Telugu Muggulu Mandala)
    const drawTeluguMuggulu = (
      cx: number,
      cy: number,
      radius: number,
      angle: number,
      mouseInfluenceX: number,
      mouseInfluenceY: number
    ) => {
      ctx.save();
      ctx.translate(cx + mouseInfluenceX * 18, cy + mouseInfluenceY * 18);
      ctx.rotate(angle);

      // 1. Concentric Brahma Mudi / Kalachakra Rings
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(159, 18, 57, 0.1)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Interlocking 8-Petal Lotus Muggulu Curves (అష్టదళ పద్మ ముగ్గు)
      const petals = 8;
      for (let p = 0; p < petals; p++) {
        const petalAngle = (p * Math.PI * 2) / petals;
        ctx.save();
        ctx.rotate(petalAngle);

        // Petal contour
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.35, radius * 0.45, 0, radius * 0.85);
        ctx.quadraticCurveTo(-radius * 0.35, radius * 0.45, 0, 0);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.11)';
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Inner filament flourish
        ctx.beginPath();
        ctx.moveTo(0, radius * 0.2);
        ctx.lineTo(0, radius * 0.7);
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.08)';
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Traditional chukka (sacred dot) at petal crest
        ctx.beginPath();
        ctx.arc(0, radius * 0.95, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
        ctx.fill();

        ctx.restore();
      }

      // 3. Central Temple Bindu (బిందువు)
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // Traditional Pochampally / Gadwal Gopuram Step Motif along edges
    const drawHeritageBorders = () => {
      const stepWidth = 32;
      const countX = Math.ceil(width / stepWidth);

      ctx.save();
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.05)';
      ctx.lineWidth = 0.8;

      // Top decorative border
      ctx.beginPath();
      for (let i = 0; i <= countX; i++) {
        const x = i * stepWidth;
        ctx.moveTo(x, 0);
        ctx.lineTo(x + stepWidth / 2, 8);
        ctx.lineTo(x + stepWidth, 0);
      }
      ctx.stroke();

      // Bottom decorative border
      ctx.beginPath();
      for (let i = 0; i <= countX; i++) {
        const x = i * stepWidth;
        ctx.moveTo(x, height);
        ctx.lineTo(x + stepWidth / 2, height - 8);
        ctx.lineTo(x + stepWidth, height);
      }
      ctx.stroke();

      ctx.restore();
    };

    // Main intensive animation loop
    const render = () => {
      // Lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const normMouseX = (mouseX / width - 0.5) * 2;
      const normMouseY = (mouseY / height - 0.5) * 2;

      rotationAngle += 0.0006;

      // 1. Deep, Polished, Dark Temple Canvas (Not bright! Moody & rich)
      const baseGrad = ctx.createRadialGradient(
        width * 0.5 + normMouseX * 40,
        height * 0.35 + normMouseY * 40,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      baseGrad.addColorStop(0, '#070c1a'); // Dark Midnight Indigo
      baseGrad.addColorStop(0.45, '#040713'); // Deep Temple Bronze Obsidian
      baseGrad.addColorStop(0.85, '#020309'); // Velvet Black
      baseGrad.addColorStop(1, '#010206');

      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Heritage Gopuram Geometric Weave
      drawHeritageBorders();

      // 3. Central & Ambient Telugu Muggulu Formations
      // Primary Sacred Mandala (Centered in the upper hero cosmos)
      const primaryRadius = Math.min(width, height) * 0.38;
      drawTeluguMuggulu(
        width * 0.5,
        height * 0.42,
        primaryRadius,
        rotationAngle,
        normMouseX,
        normMouseY
      );

      // Secondary floating subtle mandala on top-right (counter-rotating)
      drawTeluguMuggulu(
        width * 0.88,
        height * 0.15,
        primaryRadius * 0.55,
        -rotationAngle * 0.8,
        normMouseX * 0.5,
        normMouseY * 0.5
      );

      // Tertiary subtle mandala on bottom-left
      drawTeluguMuggulu(
        width * 0.12,
        height * 0.82,
        primaryRadius * 0.6,
        rotationAngle * 0.7,
        normMouseX * 0.5,
        normMouseY * 0.5
      );

      // 4. Intensive Rising Bhogi & Deepam Embers
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(e.life * 0.04) * 0.4;
        e.life++;

        // Interactive mouse gentle breeze/repulsion
        const dx = e.x - mouseX;
        const dy = e.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 1) {
          const force = (1 - dist / 140) * 0.9;
          e.x += (dx / dist) * force;
          e.y += (dy / dist) * force;
        }

        // Fade in and out
        const progress = e.life / e.maxLife;
        const currentAlpha =
          progress < 0.2
            ? (progress / 0.2) * e.alpha
            : (1 - progress) * e.alpha;

        if (currentAlpha > 0) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${e.hue}, 85%, 60%, ${currentAlpha * 0.75})`;
          ctx.shadowColor = `hsla(${e.hue}, 90%, 55%, 0.4)`;
          ctx.shadowBlur = 4;
          ctx.fill();
        }

        // Reset ember when expired or floated off-screen
        if (e.y < -20 || e.life >= e.maxLife) {
          embers[i] = createEmber();
        }
      }

      ctx.shadowBlur = 0; // reset shadow

      // 5. Deep Cinematic Vignette (Preserves content contrast & prevents bright edges)
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.35,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.7, 'rgba(2, 4, 10, 0.45)');
      vignette.addColorStop(1, 'rgba(1, 2, 6, 0.88)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block"
      aria-hidden="true"
    />
  );
}
