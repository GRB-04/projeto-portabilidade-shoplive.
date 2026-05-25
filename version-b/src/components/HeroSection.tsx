/**
 * VERSION B — FIXED RESPONSIVE HERO SECTION
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. Title: text-4xl sm:text-6xl lg:text-8xl — scales gracefully across all screen sizes
 * 2. Container: w-full max-w-screen-2xl mx-auto — fluid, centered layout
 * 3. CTA buttons: flex-col sm:flex-row — stack on mobile, row on larger screens
 * 4. Countdown timer: responsive grid layout
 * 5. All padding uses responsive px-4 sm:px-6 lg:px-16
 *
 * WHY THIS MATTERS: On live commerce platforms, the hero section is often
 * the landing view for mobile users arriving via social media links.
 * A responsive hero ensures they immediately understand the value proposition.
 */

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [viewers, setViewers] = useState(24831);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 20 - 5));
    }, 3000);
    const timerInterval = setInterval(() => {
      setTimeLeft(t => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 2, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => { clearInterval(viewerInterval); clearInterval(timerInterval); };
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    // [PORTABILITY FIX] w-full — no fixed width, adapts to any screen
    <section className="relative w-full pt-6 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
           style={{ backgroundImage: 'url(/hero_banner.png)' }} />
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)' }} />

      {/* [PORTABILITY FIX] max-w-screen-2xl mx-auto with responsive horizontal padding */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* LIVE badge row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
               style={{ background: 'rgba(255,45,45,0.12)', borderColor: 'rgba(255,45,45,0.35)' }}>
            <div className="live-dot w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-bold tracking-widest" style={{ color: '#ff6b6b' }}>AO VIVO AGORA</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-gray-400"
               style={{ background: 'rgba(255,255,255,0.07)' }}>
            👁 {viewers.toLocaleString('pt-BR')} assistindo
          </div>
        </div>

        {/* [PORTABILITY FIX] Responsive heading: 4xl → 6xl → 8xl */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight text-white mb-6">
          Black Friday <br />
          <span className="gradient-text">Ofertas. AO VIVO.</span>
        </h1>

        {/* [PORTABILITY FIX] Responsive subtitle: text-base sm:text-lg lg:text-xl */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
          Ofertas exclusivas transmitidas ao vivo. Compre antes do timer zerar — preços caem a cada 60 segundos.
        </p>

        {/* Countdown — [PORTABILITY FIX] label on top, boxes in a non-wrapping row below for perfect mobile alignment */}
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-bold text-gray-500 tracking-widest">OFERTA TERMINA EM</span>
          <div className="flex items-center gap-2 sm:gap-3">
            {[{ label: 'HRS', val: timeLeft.h }, { label: 'MIN', val: timeLeft.m }, { label: 'SEG', val: timeLeft.s }].map(({ label, val }) => (
              <div key={label} className="rounded-xl text-center px-3 py-1.5 sm:px-5 sm:py-3 min-w-[55px] sm:min-w-[70px]"
                   style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-xl sm:text-3xl font-black text-white leading-none font-mono">{pad(val)}</div>
                <div className="text-[9px] sm:text-[10px] text-gray-600 mt-1 font-semibold tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* [PORTABILITY FIX] CTA buttons: flex-col on mobile → flex-row on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="btn-live border-none rounded-xl text-white font-bold text-base sm:text-lg px-6 py-4 sm:px-8 cursor-pointer flex items-center justify-center gap-2">
            ▶ Assistir ao Vivo
          </button>
          <button className="rounded-xl text-white font-semibold text-base sm:text-lg px-6 py-4 sm:px-8 cursor-pointer transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)' }}>
            Ver Todas as Ofertas →
          </button>
          <button className="rounded-xl font-semibold text-base sm:text-lg px-6 py-4 sm:px-8 cursor-pointer transition-colors sm:hidden lg:flex"
                  style={{ background: 'transparent', border: '1px solid rgba(255,107,53,0.4)', color: '#ff6b35' }}>
            🔔 Criar Alerta
          </button>
        </div>
      </div>
    </section>
  );
}
