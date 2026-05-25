/**
 * VERSION A — BROKEN NAVBAR
 *
 * [PORTABILITY ISSUES INTENTIONALLY INTRODUCED]:
 * 1. Fixed pixel width (min-w-[1200px]) — overflows on mobile screens
 * 2. All nav items in a single horizontal row — no hamburger menu
 * 3. Logo uses an oversized fixed font size that never shrinks
 * 4. No mobile breakpoints — will break on any screen < 1200px
 *
 * WHY THIS MATTERS: In live commerce, users browse on phones during
 * commutes or while watching the stream. A broken navbar means they
 * cannot navigate between categories, killing conversion rates.
 */

import { useState } from 'react';

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  // [PORTABILITY ISSUE] cartCount state exists but button overflows on mobile
  const [cartCount] = useState(3);
  // Textos em português

  return (
    // [PORTABILITY ISSUE] min-w-[1200px] forces a fixed width, causing horizontal scroll on mobile
    <nav className="fixed left-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10" lang="pt-BR"
         style={{ top: '24px', minWidth: '1200px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '70px' }}>

        {/* Logo — [PORTABILITY ISSUE] Fixed font-size px, never scales */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)',
            borderRadius: '8px',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 900
          }}>S</div>
          {/* [PORTABILITY ISSUE] font-size: 28px never shrinks on smaller screens */}
          <span style={{ fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
            Shop<span style={{ color: '#ff2d2d' }}>Live</span>
          </span>
        </div>

        {/* Nav links — [PORTABILITY ISSUE] All inline, no wrapping, overflows on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
          {['Ao Vivo', 'Eletrônicos', 'Moda', 'Casa & Decoração', 'Ofertas Relâmpago', 'Novidades', 'Marcas'].map(item => (
            <a key={item} href="#" style={{ color: '#d1d1d1', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
               onMouseOver={e => (e.currentTarget.style.color = '#fff')}
               onMouseOut={e => (e.currentTarget.style.color = '#d1d1d1')}>
              {item}
            </a>
          ))}
        </div>

        {/* Right actions — [PORTABILITY ISSUE] Fixed layout, button partially off-screen on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: '22px', cursor: 'pointer' }}>🔔</span>
            <span style={{
              position: 'absolute', top: '-6px', right: '-6px',
              background: '#ff2d2d', borderRadius: '50%',
              width: '16px', height: '16px',
              fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700
            }}>5</span>
          </div>
          <button
            onClick={onCartClick}
            style={{
              position: 'relative', background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)',
              border: 'none', borderRadius: '10px', color: 'white',
              padding: '10px 20px', cursor: 'pointer', fontWeight: 700,
              fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px',
              /* [PORTABILITY ISSUE] No max-width constraint — partially hidden on small screens */
              whiteSpace: 'nowrap'
            }}>
            🛒 Carrinho ({cartCount})
          </button>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', cursor: 'pointer'
          }}>👤</div>
        </div>
      </div>
    </nav>
  );
}
