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

import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LiveSection from './components/LiveSection';
import ProductGrid from './components/ProductGrid';
import ChatWidget from './components/ChatWidget';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products, chatMessages } from './data/products';
import type { Product } from './data/products';

// Version label banner
function VersionBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 px-4 py-1.5"
         style={{ background: 'linear-gradient(90deg, #16a34a, #22c55e)' }}>
      <span className="text-xs font-black text-white tracking-wide">
        ✅ VERSÃO FUNCIONANDO
      </span>
    </div>
  );
}

export default function App() {
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState(chatMessages);

  useEffect(() => {
    const auto = setInterval(() => {
      const bots = [
        { user: 'UserMobile', avatar: '📱', message: 'Comprei direto pelo celular, super rápido! ⚡' },
        { user: 'Bia_S', avatar: '🙋‍♀️', message: 'O layout mobile tá perfeito, lindão!' },
        { user: 'Thiago_Dev', avatar: '👨‍💻', message: 'Responsividade 10/10, muito fluido no iPhone.' },
        { user: 'ShopBot', avatar: '🤖', message: '🛒 Restam poucas unidades do MacBook Pro com 50% de desconto!' },
        { user: 'GamerX', avatar: '🎮', message: 'Botão de comprar na mão, adicionei no carrinho direto' },
        { user: 'Luiza_G', avatar: '💁‍♀️', message: 'O chat adaptou super bem no celular, dá pra assistir e interagir' },
        { user: 'Carlos_V', avatar: '🤔', message: 'Checkout via Pix em 2 clicks pelo celular. Aprovado!' },
        { user: 'Mari_Tech', avatar: '👩‍💻', message: 'Parabéns pros devs, o player de vídeo tá 100% responsivo' },
        { user: 'Lucas_M', avatar: '😎', message: 'Black Friday mais tranquila da vida, comprei deitado no sofá pelo celular' },
        { user: 'Ana_K', avatar: '🤷‍♀️', message: 'Modal de checkout abre perfeito na tela do celular, bem clean' }
      ];
      const msg = bots[Math.floor(Math.random() * bots.length)];
      setMessages(prev => [
        ...prev.slice(-40),
        { id: Date.now(), user: msg.user, avatar: msg.avatar, message: msg.message, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
    return () => clearInterval(auto);
  }, []);

  const handleSendMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), user: 'You', avatar: '😊', message: text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

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
            <LiveSection messages={messages} onSendMessage={handleSendMessage} />
            <ProductGrid products={products} onBuyNow={(p) => setCheckoutProduct(p)} />
          </main>
          <Footer />
        </div>
      </div>

      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(o => !o)} messages={messages} onSendMessage={handleSendMessage} />

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </div>
  );
}
