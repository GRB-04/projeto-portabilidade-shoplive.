/**
 * VERSION A — APP ROOT (BROKEN MOBILE)
 *
 * This is the broken version intentionally demonstrating mobile responsiveness failures.
 * Used for SOFTWARE PORTABILITY TESTING in Docker classroom demonstration.
 *
 * Known issues (intentional):
 * - Horizontal scroll on mobile (< 768px)
 * - Oversized fixed-width components
 * - Chat widget partially off-screen
 * - Navbar breaks on narrow viewports
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

// Version label banner — helps identify which version is running
function VersionBanner() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)',
      zIndex: 9999, padding: '6px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
    }}>
      <span style={{ fontSize: '13px', fontWeight: 800, color: 'white', letterSpacing: '1px' }}>
        ⚠️ VERSÃO A — MOBILE QUEBRADO (Demo de Teste de Portabilidade)
      </span>
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
        Redimensione para mobile para ver os problemas de layout
      </span>
    </div>
  );
}

export default function App() {
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <VersionBanner />
      {/* Offset for version banner + navbar */}
      <div style={{ paddingTop: '36px' }}>
        <Navbar onCartClick={() => {}} />
        <div style={{ paddingTop: '70px' }}>
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
