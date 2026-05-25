/**
 * VERSION B — FIXED RESPONSIVE NAVBAR
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. Hamburger menu on mobile (md:hidden / hidden md:flex)
 * 2. Logo scales with text utilities, not fixed px
 * 3. Mobile drawer slides in with animation
 * 4. All items use proper Tailwind responsive breakpoints
 * 5. max-w-screen-2xl centers content on wide displays
 *
 * WHY THIS MATTERS: A consistent, accessible navbar on all devices
 * keeps users in the shopping flow — essential for live commerce retention.
 */

import { useState } from 'react';

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(3);

  const navLinks = ['Ao Vivo', 'Eletrônicos', 'Moda', 'Casa', 'Ofertas'];

  return (
    // [PORTABILITY FIX] w-full — always fills screen, no fixed pixel width
    <nav className="fixed top-6 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">

          {/* Logo — [PORTABILITY FIX] text-xl sm:text-2xl scales with viewport */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base"
                 style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)' }}>S</div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Shop<span style={{ color: '#ff2d2d' }}>Live</span>
            </span>
          </div>

          {/* Desktop links — [PORTABILITY FIX] hidden on mobile, shown md+ */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(item => (
              <a key={item} href="#"
                 className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-150">
                {item}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notification — hidden on smallest screens */}
            <div className="relative hidden sm:block">
              <span className="text-xl cursor-pointer">🔔</span>
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 rounded-full w-4 h-4 text-[10px] flex items-center justify-center text-white font-bold">5</span>
            </div>

            {/* Cart button — [PORTABILITY FIX] responsive padding */}
            <button onClick={onCartClick}
                    className="flex items-center gap-2 text-white font-bold text-sm rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-150"
                    style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)', boxShadow: '0 0 16px rgba(255,45,45,0.35)' }}>
              🛒 <span className="hidden sm:inline">Carrinho</span> ({cartCount})
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-base cursor-pointer flex-shrink-0"
                 style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>👤</div>

            {/* Hamburger — [PORTABILITY FIX] visible on mobile only */}
            <button onClick={() => setMobileOpen(o => !o)}
                    className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Abrir menu">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* [PORTABILITY FIX] Mobile drawer — only shown when hamburger is open */}
      {mobileOpen && (
        <div className="mobile-drawer md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
          <div className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(item => (
              <a key={item} href="#"
                 onClick={() => setMobileOpen(false)}
                 className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl text-base font-medium transition-colors">
                {item}
              </a>
            ))}
            <div className="border-t border-white/10 mt-2 pt-3 flex items-center gap-3 px-4">
              <span className="text-lg">🔔</span>
              <span className="text-sm text-gray-400">5 notificações</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
