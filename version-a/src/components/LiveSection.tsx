/**
 * VERSION A — BROKEN LIVE SECTION
 * [PORTABILITY ISSUES]: Fixed 1250px layout, fixed iframe dims, no fluid video.
 */

import { useState, useEffect } from 'react';

export default function LiveSection() {
  const [viewerCount, setViewerCount] = useState(24831);
  const [likes, setLikes] = useState(18492);
  const [likeAnimating, setLikeAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(v => v + Math.floor(Math.random() * 15 - 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(l => l + 1);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 300);
  };

  return (
    <section style={{ padding: '60px 40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div className="live-dot" style={{ background: '#ff2d2d', borderRadius: '50%', width: '10px', height: '10px' }} />
          <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>TRANSMITINDO AO VIVO</span>
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: 0 }}>
          ShopLive Black Friday — Transmissão Principal
        </h2>
      </div>

      {/* [PORTABILITY ISSUE] Fixed 1250px total layout */}
      <div style={{ display: 'flex', gap: '24px', width: '1250px' }}>

        {/* [PORTABILITY ISSUE] Fixed 900px video container */}
        <div style={{ width: '900px', flexShrink: 0 }}>
          <div style={{ background: '#141414', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
            {/* [PORTABILITY ISSUE] Hardcoded width/height on video player */}
            <div style={{ width: '850px', height: '480px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <video src="live_video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <div style={{ background: '#ff2d2d', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 800, color: 'white', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div className="live-dot" style={{ background: 'white', borderRadius: '50%', width: '6px', height: '6px' }} /> AO VIVO
                </div>
                <div style={{ background: 'rgba(0,0,0,0.7)', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', color: 'white' }}>
                  👁 {viewerCount.toLocaleString('pt-BR')}
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer' }}>⏸</button>
              <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer' }}>🔊</button>
              <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)', borderRadius: '2px' }} />
              </div>
              <button onClick={handleLike} style={{ background: 'none', border: 'none', color: likeAnimating ? '#ff6b35' : '#aaa', fontSize: '20px', cursor: 'pointer', transition: 'color 0.2s' }}>
                🧑 {likes.toLocaleString('pt-BR')}
              </button>
            </div>
          </div>

          {/* Stats row — [PORTABILITY ISSUE] fixed flex row, no wrap */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            {[
              { icon: '👁', label: 'Assistindo Agora', val: viewerCount.toLocaleString('pt-BR') },
              { icon: '🛒', label: 'Pedidos', val: '4.821' },
              { icon: '💰', label: 'Receita', val: 'R$892K' },
              { icon: '⭐', label: 'Avaliação', val: '4.9/5' },
            ].map(stat => (
              <div key={stat.label} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{stat.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>{stat.val}</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* [PORTABILITY ISSUE] Fixed 300px chat panel */}
        <div style={{ width: '300px', flexShrink: 0, background: '#141414', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', height: '560px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💬</span>
            <span style={{ fontWeight: 700, color: 'white', fontSize: '15px' }}>Chat ao Vivo</span>
            <span style={{ marginLeft: 'auto', background: 'rgba(255,45,45,0.15)', color: '#ff6b6b', borderRadius: '20px', padding: '2px 10px', fontSize: '12px', fontWeight: 600 }}>{viewerCount.toLocaleString('pt-BR')} online</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { user: 'Alex_M', msg: 'Cara, esse Notebook Neo tá com desconto absurdo!! 🔥', emoji: '🧑' },
                { user: 'Sarah_K', msg: 'O chip do MacBook vale cada centavo 😍', emoji: '👩' },
                { user: 'TechGuru', msg: 'O Apple Watch novo monitora o sono?', emoji: '🧑‍💻' },
                { user: 'Mike_R', msg: 'SIM — e sincroniza perfeito com o Neo!', emoji: '👨' },
                { user: 'LiveHost', msg: 'Integração incrível com o ecossistema da Apple 🎙️', emoji: '🎙️' },
                { user: 'Priya_D', msg: 'Vou levar o iPad e o Neo, carteira chorando 😂', emoji: '👩‍🦱' },
                { user: 'Bruno_99', msg: 'Boletei o Mac! Não aguentei hahaha', emoji: '😎' },
                { user: 'Ana_Silva', msg: 'A bateria do Neo dura o dia todo?', emoji: '🙋‍♀️' },
                { user: 'TechGuru', msg: 'Dura umas 18 horas tranquilo, Ana.', emoji: '🧑‍💻' },
                { user: 'Carlos_V', msg: 'A tela Liquid Retina é um absurdo de linda', emoji: '🤩' },
                { user: 'Julia_M', msg: 'Já garanti meu presente adiantado 🎁', emoji: '👩' },
                { user: 'Bia_Apple', msg: 'Esse preço não volta nunca mais!', emoji: '😱' },
              ].map((m, i) => (
              <div key={i} className="chat-msg" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{m.emoji}</div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b35' }}>{m.user} </span>
                  <span style={{ fontSize: '13px', color: '#ccc' }}>{m.msg}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
            <input placeholder="Diga algo..." style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '13px', outline: 'none' }} />
            <button style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)', border: 'none', borderRadius: '8px', color: 'white', padding: '8px 14px', cursor: 'pointer', fontWeight: 700 }}>↑</button>
          </div>
        </div>
      </div>
    </section>
  );
}
