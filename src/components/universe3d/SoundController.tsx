'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  const toggleSound = () => {
    if (isPlaying) {
      // Stop ambient sound
      try {
        oscNodesRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscNodesRef.current = [];
        setIsPlaying(false);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Start ambient tanpura/sitar harmonic drone using Web Audio API
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Indian classical Sa-Pa harmonic drone frequencies (C#3 / 138.59 Hz and G#3 / 207.65 Hz)
        const rootFreq = 138.59;
        const fifthFreq = 207.65;
        const octaveFreq = 277.18;

        const frequencies = [rootFreq, fifthFreq, octaveFreq, rootFreq * 0.5];

        const oscillators = frequencies.map((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO modulation for warm organic resonance
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();

          return osc;
        });

        oscNodesRef.current = oscillators;
        setIsPlaying(true);
      } catch (err) {
        console.warn('AudioContext not permitted yet:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      try {
        oscNodesRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
      } catch {}
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute ambient heritage drone' : 'Play ambient heritage drone (Sitar/Tanpura)'}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all border ${
        isPlaying
          ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-lg shadow-amber-500/20'
          : 'bg-slate-900/70 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800/80'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Heritage Drone (On)</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span>Audio (Opt-In)</span>
        </>
      )}
    </button>
  );
}
