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

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: any[];
  onSendMessage: (text: string) => void;
}

export default function ChatWidget({ isOpen, onToggle, messages, onSendMessage }: ChatWidgetProps) {
  const [inputVal, setInputVal] = useState('');
  const [viewers] = useState(24831);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el && isOpen) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    onSendMessage(inputVal.trim());
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
               // [PORTABILITY FIX] height tied to viewport — stable size, never taller than screen
               height: 'min(480px, 60vh)',
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
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-2.5 min-h-0">
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
