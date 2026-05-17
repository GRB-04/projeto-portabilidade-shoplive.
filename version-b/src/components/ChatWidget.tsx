/**
 * VERSION B — FIXED RESPONSIVE CHAT WIDGET
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. right-4 bottom-4 — always 16px from screen edge on all devices
 * 2. w-80 max-w-[calc(100vw-2rem)] — caps at viewport width minus margins
 * 3. max-h-[60vh] — never taller than 60% of viewport height
 * 4. On mobile, the widget can be collapsed to just the FAB button
 *
 * WHY THIS MATTERS: A chat widget that clips off screen prevents user
 * interaction — a critical engagement feature in live commerce that
 * drives social proof and purchase decisions through peer influence.
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
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      setMessages(prev => [
        ...prev.slice(-40),
        { id: Date.now(), ...msg, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 600);
    return () => clearInterval(auto);
  }, []);

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), user: 'You', avatar: '😊', message: inputVal.trim(), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputVal('');
  };

  return (
    // [PORTABILITY FIX] right-4 bottom-4 — always properly anchored to screen corner
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        // [PORTABILITY FIX] w-80 capped at viewport width minus padding
        <div className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden flex flex-col animate-slide-in"
             style={{
               background: '#141414',
               border: '1px solid rgba(255,255,255,0.12)',
               boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
               // [PORTABILITY FIX] max-height tied to viewport — never taller than screen
               maxHeight: 'min(480px, 60vh)',
             }}>
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3.5 border-b flex-shrink-0"
               style={{ background: 'rgba(255,45,45,0.07)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="live-dot w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <span className="font-bold text-white text-sm">Chat ao Vivo</span>
            <span className="text-xs text-gray-500 ml-auto">{viewers.toLocaleString('pt-BR')} assistindo</span>
            <button onClick={onToggle}
                    className="text-gray-600 hover:text-gray-400 text-lg leading-none bg-transparent border-none cursor-pointer ml-1">✕</button>
          </div>

          {/* Messages — [PORTABILITY FIX] flex-1 with overflow-y-auto adapts to available height */}
          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-2.5 min-h-0">
            {messages.map((m) => (
              <div key={m.id} className="chat-msg flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                     style={{ background: 'rgba(255,255,255,0.08)' }}>{m.avatar}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold" style={{ color: m.user === 'You' ? '#22c55e' : '#ff6b35' }}>{m.user} </span>
                  {/* [PORTABILITY FIX] break-words prevents long messages from overflowing */}
                  <span className="text-xs text-gray-400 break-words">{m.message}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Entre na conversa..."
              className="flex-1 min-w-0 rounded-xl px-3 py-2.5 text-white text-xs outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button onClick={sendMessage}
                    className="btn-live flex-shrink-0 border-none rounded-xl text-white px-3 py-2.5 cursor-pointer font-bold text-base">↑</button>
          </div>
        </div>
      ) : (
        // FAB toggle button — [PORTABILITY FIX] properly positioned, no overflow
        <button onClick={onToggle}
                className="btn-live border-none rounded-full w-14 h-14 cursor-pointer text-2xl flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 8px 32px rgba(255,45,45,0.4)' }}>
          💬
        </button>
      )}
    </div>
  );
}
