'use client';

import React from 'react';

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 2.2 + (i % 7) * 3.9) % 96 + 2}%`,
  size: `${(i % 4) * 0.5 + 1.5}px`,
  duration: `${14 + (i % 8) * 3}s`,
  delay: `${(i % 10) * 1.2}s`,
  opacity: 0.12 + (i % 4) * 0.05,
}));

export const ThreeLogosView: React.FC = () => {
  return (
    <div className="min-h-svh max-h-svh h-svh bg-navy-800 text-gold-400 font-sans px-4 relative overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Dynamic Background Frame Overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mp-dm-frame.webp"
        alt="Background Frame"
        className="fixed inset-0 w-full h-full object-fill pointer-events-none z-0 opacity-90 transition-all duration-300"
      />

      {/* Floating Golden Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="golden-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* 3 Logos Stacked Vertically */}
      <main className="relative z-10 flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 my-auto py-6 animate-in fade-in zoom-in-95 duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mp-logo.png"
          alt="Muthupalasa Logo"
          className="h-[12vh] max-h-28 min-h-[60px] w-auto max-w-[80vw] object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dm.png"
          alt="D-Mart Logo"
          className="h-[12vh] max-h-28 min-h-[60px] w-auto max-w-[80vw] object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sc.png"
          alt="Star Club Logo"
          className="h-[12vh] max-h-28 min-h-[60px] w-auto max-w-[80vw] object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
        />
      </main>

      {/* Knight Emblem at Bottom of Screen */}
      <div
        className="fixed pointer-events-none z-[5] flex justify-center"
        style={{
          left: 'calc(50% - 15px)',
          bottom: '34px',
          transform: 'translateX(-50%) scale(1.8)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/knight-2.png"
          alt="Knight Emblem"
          className="w-36 sm:w-48 max-h-40 object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] opacity-80"
        />
      </div>
    </div>
  );
};
