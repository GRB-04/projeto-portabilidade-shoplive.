/**
 * VERSION A — BROKEN CHAT WIDGET
 * [PORTABILITY ISSUES]:
 * 1. right: -20px — partially off-screen on mobile
 * 2. Fixed width: 340px — overflows on screens < 360px
 * 3. Fixed height: 480px — no viewport-aware constraints
 * 4. z-index works but position causes clipping on small screens
 *
 * WHY THIS MATTERS: Live chat is central to live commerce engagement.
 * If the chat widget is clipped or hidden, viewer interaction drops,
 * which reduces the social proof that drives impulse purchases.
 */

import { useState, useEffect, useRef } from 'react';
import { chatMessages } from '../data/products';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const [messages, setMessages] = useState(chatMessages);
  const [inputVal, setInputVal] = useState('');
  const [viewers] = useState(24831);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const auto = setInterval(() => {
      const bots = [
        { user: 'ShopBot', avatar: '🤖', message: '⚡ Oferta relâmpago do Notebook Neo terminando em 2 minutos!' },
        { user: 'Fan123', avatar: '🙋', message: 'Acabei de comprar o MacBook!!' },
        { user: 'Viewer99', avatar: '👀', message: 'Tem frete grátis pros produtos da Apple?' },
        { user: 'Caio_S', avatar: '🔥', message: 'Achei que ia acabar o estoque, consegui o meu!' },
        { user: 'Mari_Lima', avatar: '😍', message: 'Notebook Neo é perfeito para edição de vídeo' },
        { user: 'ShopBot', avatar: '🤖', message: '🛒 Restam apenas 15 unidades do iPad Air!' },
        { user: 'João_P', avatar: '🤔', message: 'Parcela em 12x sem juros?' },
        { user: 'Luiza_G', avatar: '💳', message: 'Cartão de crédito aprovou na hora!' },
        { user: 'Gamer_Z', avatar: '🎮', message: 'Roda jogos pesados no Neo?' },
        { user: 'ShopBot', avatar: '🤖', message: '✨ Aproveitem os cupons exclusivos da live!' },
        { user: 'Thiago_BR', avatar: '🇧🇷', message: 'Chega em SP capital em quantos dias?' },
        { user: 'Vivi_Tech', avatar: '👩‍💻', message: 'Gente, a tela desse MacBook é absurda de linda ao vivo' },
        { user: 'Bia_Apple', avatar: '🍎', message: 'Comprei o iPhone 15 Pro, tô chorando de alegria!!' },
        { user: 'Lucas_M', avatar: '😎', message: 'O desconto no Apple Watch tá insano, nunca vi isso' },
        { user: 'Cris_77', avatar: '😱', message: 'Meu Deus, o site vai cair de tanta gente comprando' },
        { user: 'ShopBot', avatar: '🤖', message: '🎁 Quem comprar agora ganha uma capa protetora de brinde!' },
        { user: 'Rafa_Dev', avatar: '💻', message: 'O chip M3 do Neo compila código muito rápido?' },
        { user: 'LiveHost', avatar: '🎙️', message: 'Sim Rafa! É um monstro para programação.' },
        { user: 'Dani_K', avatar: '✨', message: 'Estou apaixonada na cor Prata do notebook' },
        { user: 'Matias_V', avatar: '🏃', message: 'Correndo pegar o cartão da minha mãe kkkkk' },
        { user: 'Juliana_F', avatar: '🥺', message: 'Poxa, perdi o cupom de 50%?' },
        { user: 'ShopBot', avatar: '🤖', message: '🚨 Últimos 5 cupons de R$500 OFF disponíveis! Código: NEO500' },
        { user: 'Carlos_DJ', avatar: '🎧', message: 'Esse Mac aguenta o Logic Pro com 100 trilhas fácil' },
        { user: 'Paula_B', avatar: '💸', message: 'Adeus limite do Nubank 🥲' },
        { user: 'Nando_X', avatar: '🚀', message: 'Já garanti o setup completo, venha ni mim Apple' },
      ];
      const msg = bots[Math.floor(Math.random() * bots.length)];
      setMessages(prev => [...prev.slice(-40), { id: Date.now(), ...msg, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
    return () => clearInterval(auto);
  }, []);

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), user: 'You', avatar: '😊', message: inputVal.trim(), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    setInputVal('');
  };

  return (
    // [PORTABILITY ISSUE] right: -20px — widget is partially clipped off-screen on mobile
    <div style={{ position: 'fixed', bottom: '24px', right: '-20px', zIndex: 1000 }}>
      {isOpen ? (
        // [PORTABILITY ISSUE] Fixed 340px wide chat panel
        <div style={{
          width: '340px',
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '480px', /* [PORTABILITY ISSUE] fixed height, ignores small screens */
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          animation: 'slideIn 0.3s ease-out',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '20px 20px 0 0', background: 'rgba(255,45,45,0.08)' }}>
            <div className="live-dot" style={{ background: '#ff2d2d', borderRadius: '50%', width: '10px', height: '10px' }} />
            <span style={{ fontWeight: 700, color: 'white', fontSize: '15px' }}>Chat ao Vivo</span>
            <span style={{ fontSize: '12px', color: '#888', marginLeft: 'auto' }}>{viewers.toLocaleString('pt-BR')} assistindo</span>
            <button onClick={onToggle} style={{ background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m) => (
              <div key={m.id} className="chat-msg" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: m.user === 'You' ? '#22c55e' : '#ff6b35' }}>{m.user} </span>
                  <span style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.4 }}>{m.message}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Entre na conversa..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none' }}
            />
            <button onClick={sendMessage} className="btn-live" style={{ border: 'none', borderRadius: '10px', color: 'white', padding: '10px 14px', cursor: 'pointer', fontWeight: 700, fontSize: '16px' }}>↑</button>
          </div>
        </div>
      ) : (
        // Toggle button — [PORTABILITY ISSUE] also partially off-screen due to right: -20px
        <button onClick={onToggle} className="btn-live" style={{
          border: 'none', borderRadius: '50%', width: '60px', height: '60px',
          cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(255,45,45,0.4)'
        }}>💬</button>
      )}
    </div>
  );
}
