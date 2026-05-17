/**
 * VERSION B — FIXED RESPONSIVE LIVE SECTION
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. Video container uses aspect-video (16:9 ratio) + w-full — always fills its parent
 * 2. Layout switches from side-by-side to stacked on mobile (flex-col lg:flex-row)
 * 3. Chat panel is full-width on mobile, fixed sidebar on desktop
 * 4. Stats grid: grid-cols-2 sm:grid-cols-4 — adapts to screen size
 * 5. All padding and font sizes use responsive Tailwind utilities
 *
 * WHY THIS MATTERS: The live video player is the centrepiece of the experience.
 * Fluid video containers prevent letterboxing and overflow across devices.
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
    // [PORTABILITY FIX] w-full, responsive padding
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="live-dot w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-bold tracking-widest" style={{ color: '#ff6b6b' }}>TRANSMITINDO AO VIVO</span>
          </div>
          {/* [PORTABILITY FIX] Responsive heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            ShopLive Black Friday — Transmissão Principal
          </h2>
        </div>

        {/* [PORTABILITY FIX] flex-col on mobile → flex-row on large screens */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Video container — [PORTABILITY FIX] flex-1 + aspect-video = fluid 16:9 */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl overflow-hidden border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.08)' }}>
              {/* [PORTABILITY FIX] aspect-video makes height always = width × 9/16 */}
              <div className="relative aspect-video w-full overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                <video src="live_video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100" />
                {/* LIVE badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black text-white tracking-wider"
                       style={{ background: '#ff2d2d' }}>
                    <div className="live-dot w-1.5 h-1.5 rounded-full bg-white" /> AO VIVO
                  </div>
                  <div className="px-2.5 py-1 rounded-md text-xs text-white"
                       style={{ background: 'rgba(0,0,0,0.7)' }}>
                    👁 {viewerCount.toLocaleString('pt-BR')}
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs text-white z-20"
                     style={{ background: 'rgba(0,0,0,0.7)' }}>2:14:37</div>
              </div>

              {/* Controls bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <button className="text-white text-xl cursor-pointer bg-transparent border-none">⏸</button>
                <button className="text-white text-xl cursor-pointer bg-transparent border-none">🔊</button>
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-[65%] h-full rounded-full" style={{ background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)' }} />
                </div>
                <button onClick={handleLike} className="text-lg cursor-pointer bg-transparent border-none transition-colors duration-200"
                        style={{ color: likeAnimating ? '#ff6b35' : '#aaa' }}>
                  ❤️ {likes.toLocaleString('pt-BR')}
                </button>
              </div>
            </div>

            {/* [PORTABILITY FIX] Stats: 2 cols on mobile, 4 on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { icon: '👁', label: 'Assistindo Agora', val: viewerCount.toLocaleString('pt-BR') },
                { icon: '🛒', label: 'Pedidos', val: '4.821' },
                { icon: '💰', label: 'Receita', val: 'R$892K' },
                { icon: '⭐', label: 'Avaliação', val: '4.9/5' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-3 sm:p-4 text-center"
                     style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                  <div className="text-base sm:text-lg font-bold text-white">{stat.val}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat panel — [PORTABILITY FIX] full-width on mobile, fixed 300px on lg+ */}
          <div className="w-full lg:w-[300px] lg:flex-shrink-0 rounded-2xl border flex flex-col"
               style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.08)', height: '420px', minHeight: '300px' }}>
            <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span>💬</span>
              <span className="font-bold text-white text-sm">Chat ao Vivo</span>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,45,45,0.15)', color: '#ff6b6b' }}>
                {viewerCount.toLocaleString('pt-BR')} online
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
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
                <div key={i} className="chat-msg flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                       style={{ background: 'rgba(255,255,255,0.08)' }}>{m.emoji}</div>
                  <div>
                    <span className="text-xs font-bold" style={{ color: '#ff6b35' }}>{m.user} </span>
                    <span className="text-xs text-gray-400">{m.msg}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <input placeholder="Diga algo..." className="flex-1 rounded-lg px-3 py-2 text-sm text-white outline-none"
                     style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
              <button className="btn-live border-none rounded-lg text-white px-3 py-2 cursor-pointer font-bold text-base">↑</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
