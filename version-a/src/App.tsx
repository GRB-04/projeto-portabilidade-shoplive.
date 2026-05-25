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

// Version label banner — helps identify which version is running
function VersionBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 px-4 py-1.5"
         style={{ background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)' }}>
      <span className="text-xs font-black text-white tracking-wide">
        ⚠️ VERSÃO QUEBRADA
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
        { user: 'UserMobile', avatar: '📱', message: 'Ué, cadê o botão de comprar no meu celular? Sumiu!' },
        { user: 'Bia_S', avatar: '🙋‍♀️', message: 'Alguém mais com a tela cortada no iPhone?' },
        { user: 'Thiago_Dev', avatar: '👨‍💻', message: 'Esse site não é responsivo? Tá impossível de navegar no celular' },
        { user: 'ShopBot', avatar: '🤖', message: '⚠️ Se encontrar problemas no layout mobile, tente acessar pelo desktop.' },
        { user: 'GamerX', avatar: '🎮', message: 'Não consigo adicionar nada no carrinho pelo celular, o botão ficou off-screen' },
        { user: 'Luiza_G', avatar: '💁‍♀️', message: 'O chat tá cortando na metade da minha tela kkkk' },
        { user: 'Carlos_V', avatar: '🤔', message: 'Como faz pra pagar? O modal de checkout abre gigante e não dá pra clicar em prosseguir' },
        { user: 'Mari_Tech', avatar: '👩‍💻', message: 'Gente, a barra de navegação tá cobrindo metade do player em mobile' },
        { user: 'Lucas_M', avatar: '😎', message: 'Tive que abrir o notebook correndo pra conseguir comprar, celular quebrou tudo' },
        { user: 'Ana_K', avatar: '🤷‍♀️', message: 'A live tá travando porque o player de vídeo ficou gigante e estourou a tela' }
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
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <VersionBanner />
      {/* Offset for version banner + navbar */}
      <div style={{ paddingTop: '36px' }}>
        <Navbar onCartClick={() => {}} />
        <div style={{ paddingTop: '70px' }}>
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
