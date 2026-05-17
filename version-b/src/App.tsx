/**
 * VERSION B — APP ROOT (FIXED RESPONSIVE)
 *
 * This is the fully responsive version demonstrating correct mobile adaptation.
 * Used for SOFTWARE PORTABILITY TESTING — Docker classroom demonstration.
 *
 * All portability issues from Version A have been resolved:
 * ✓ No horizontal scroll on any device
 * ✓ Proper mobile navigation
 * ✓ Fluid video and product layouts
 * ✓ Chat widget properly anchored
 * ✓ Checkout modal fits all screens
 */

import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LiveSection from './components/LiveSection';
import ProductGrid from './components/ProductGrid';
import ChatWidget from './components/ChatWidget';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products } from './data/products';
import type { Product } from './data/products';

// Version label banner
function VersionBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 px-4 py-1.5"
         style={{ background: 'linear-gradient(90deg, #16a34a, #22c55e)' }}>
      <span className="text-xs font-black text-white tracking-wide">
        ✅ VERSÃO B — RESPONSIVO CORRIGIDO (Demo de Teste de Portabilidade)
      </span>
      <span className="text-xs text-white/70 hidden sm:inline">
        Redimensione para qualquer tela — o layout se adapta corretamente
      </span>
    </div>
  );
}

export default function App() {
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    // [PORTABILITY FIX] w-full overflow-x-hidden — never shows horizontal scroll
    <div className="w-full overflow-x-hidden" style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <VersionBanner />
      {/* Offset for version banner (24px) + navbar (64px on mobile, 70px on sm+) */}
      <div className="pt-6">
        <Navbar onCartClick={() => {}} />
        <div className="pt-16 sm:pt-[70px]">
          <main>
            <HeroSection />
            <LiveSection />
            <ProductGrid products={products} onBuyNow={(p) => setCheckoutProduct(p)} />
          </main>
          <Footer />
        </div>
      </div>

      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(o => !o)} />

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </div>
  );
}
