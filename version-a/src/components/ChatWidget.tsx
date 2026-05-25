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

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: any[];
  onSendMessage: (text: string) => void;
}

export default function ChatWidget({ isOpen, onToggle, messages, onSendMessage }: ChatWidgetProps) {
  const [inputVal, setInputVal] = useState('');
  const [viewers, setViewers] = useState(24831);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(v => Math.max(10, v - Math.floor(Math.random() * 120 + 30)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <div ref={chatScrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m) => (
              <div key={m.id} className="chat-msg" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: m.user === 'You' ? '#22c55e' : '#ff6b35' }}>{m.user} </span>
                  <span style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.4 }}>{m.message}</span>
                </div>
              </div>
            ))}
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
