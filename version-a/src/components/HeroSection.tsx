/**
 * VERSION A — BROKEN HERO SECTION
 *
 * [PORTABILITY ISSUES INTENTIONALLY INTRODUCED]:
 * 1. Title uses fixed font-size: 96px — overflows on any screen < 700px
 * 2. Container has a fixed width: 1400px — wider than most mobile screens
 * 3. Subtitle uses fixed 22px — doesn't scale down for small viewports
 * 4. CTA buttons in a row that overflows on narrow screens
 * 5. Live viewer count badge overflows off the right edge on mobile
 *
 * WHY THIS MATTERS: The hero section is the first thing a user sees.
 * If it breaks on mobile, the bounce rate skyrockets.
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
    // [PORTABILITY ISSUE] Fixed width + overflow visible = horizontal scroll on mobile
    <section style={{ width: '1400px', paddingTop: '24px', paddingBottom: '80px', overflow: 'visible' }}
             className="relative">

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/hero_banner.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.25, zIndex: 0
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 60px' }}>
        {/* LIVE badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div className="live-dot" style={{
            background: '#ff2d2d', borderRadius: '50%', width: '12px', height: '12px'
          }} />
          <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>AO VIVO AGORA</span>
          {/* [PORTABILITY ISSUE] Viewer badge overflows right on narrow screens */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px', padding: '4px 14px', fontSize: '13px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '6px' }}>
            👁 {viewers.toLocaleString('pt-BR')} assistindo
          </div>
        </div>

        {/* [PORTABILITY ISSUE] font-size: 96px — NEVER responsive, overflows mobile */}
        <h1 style={{
          fontSize: '96px',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-3px',
          marginBottom: '24px',
          color: 'white',
          whiteSpace: 'nowrap', /* Extra overflow trigger */
        }}>
          Black Friday <br />
          <span className="gradient-text">Ofertas. AO VIVO.</span>
        </h1>

        {/* [PORTABILITY ISSUE] Fixed 22px subtitle */}
        <p style={{ fontSize: '22px', color: '#aaaaaa', marginBottom: '40px', maxWidth: '700px', lineHeight: 1.6 }}>
          Ofertas exclusivas transmitidas ao vivo. Compre antes do timer zerar — preços caem a cada 60 segundos.
        </p>

        {/* Countdown timer */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>OFERTA TERMINA EM</span>
          {[{ label: 'HRS', val: timeLeft.h }, { label: 'MIN', val: timeLeft.m }, { label: 'SEG', val: timeLeft.s }].map(({ label, val }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '12px 20px', textAlign: 'center', minWidth: '70px'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1 }}>{pad(val)}</div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* [PORTABILITY ISSUE] CTA buttons in flex row, no wrapping — overflows on mobile */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)',
            border: 'none', borderRadius: '12px', color: 'white',
            padding: '16px 40px', cursor: 'pointer', fontWeight: 700,
            fontSize: '17px', display: 'flex', alignItems: 'center', gap: '10px',
            whiteSpace: 'nowrap'
          }}>
            ▶ Assistir ao Vivo
          </button>
          <button style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px', color: 'white',
            padding: '16px 40px', cursor: 'pointer', fontWeight: 600,
            fontSize: '17px', whiteSpace: 'nowrap'
          }}>
            Ver Todas as Ofertas →
          </button>
          {/* [PORTABILITY ISSUE] Third button causes overflow on narrow screens */}
          <button style={{
            background: 'transparent', border: '1px solid rgba(255,107,53,0.4)',
            borderRadius: '12px', color: '#ff6b35',
            padding: '16px 40px', cursor: 'pointer', fontWeight: 600,
            fontSize: '17px', whiteSpace: 'nowrap'
          }}>
            🔔 Criar Alerta
          </button>
        </div>
      </div>
    </section>
  );
}
