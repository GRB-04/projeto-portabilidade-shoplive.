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

import { useState, useEffect, useRef } from 'react';

interface LiveSectionProps {
  messages: any[];
  onSendMessage: (text: string) => void;
}

export default function LiveSection({ messages, onSendMessage }: LiveSectionProps) {
  const [viewerCount, setViewerCount] = useState(24831);
  const [likes, setLikes] = useState(18492);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(v => v + Math.floor(Math.random() * 15 - 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    let gestureActive = false;

    const unmuteOnGesture = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button') && (target.textContent === '🔇' || target.textContent === '🔊')) {
        cleanupGestureListeners();
        return;
      }

      const v = videoRef.current;
      if (v) {
        v.muted = false;
        setIsMuted(false);
        v.play().catch(e => console.log("Play on gesture failed:", e));
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('click', unmuteOnGesture);
      window.removeEventListener('touchstart', unmuteOnGesture);
    };

    if (video) {
      video.muted = false;
      setIsMuted(false);

      if (isPlaying) {
        video.play().catch(err => {
          console.log("Autoplay unmuted blocked, falling back to muted autoplay + gesture listener:", err);
          video.muted = true;
          setIsMuted(true);
          video.play().catch(err2 => {
            console.log("Autoplay completely blocked:", err2);
          });

          window.addEventListener('click', unmuteOnGesture);
          window.addEventListener('touchstart', unmuteOnGesture);
          gestureActive = true;
        });
      }
    }

    return () => {
      if (gestureActive) {
        cleanupGestureListeners();
      }
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play().catch(err => console.log(err));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleLike = () => {
    setLikes(l => l + 1);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 300);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    onSendMessage(inputVal.trim());
    setInputVal('');
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

        {/* [PORTABILITY FIX] grid columns and rows on large screens to align video and chat side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] lg:grid-rows-[auto_auto] gap-6 items-stretch">

          {/* Video container — [PORTABILITY FIX] fluid 16:9 aspect ratio */}
          <div className="min-w-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
            <div className="rounded-2xl overflow-hidden border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.08)' }}>
              {/* [PORTABILITY FIX] aspect-video makes height always = width × 9/16 */}
              <div className="relative aspect-video w-full overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                <video ref={videoRef} src="live_video.mp4" autoPlay loop muted={isMuted} playsInline className="w-full h-full object-cover opacity-100" />
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
                <button onClick={togglePlay} className="text-white text-xl cursor-pointer bg-transparent border-none">
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={toggleMute} className="text-white text-xl cursor-pointer bg-transparent border-none">
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-[65%] h-full rounded-full" style={{ background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)' }} />
                </div>
                <button onClick={handleLike} className="text-lg cursor-pointer bg-transparent border-none transition-colors duration-200"
                        style={{ color: likeAnimating ? '#ff6b35' : '#aaa' }}>
                  ❤️ {likes.toLocaleString('pt-BR')}
                </button>
              </div>
            </div>
          </div>

          {/* [PORTABILITY FIX] Stats: 2 cols on mobile, 4 on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 lg:mt-0 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
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

          {/* Chat panel — [PORTABILITY FIX] full-width on mobile, matches video height on lg+ */}
          <div className="relative w-full lg:w-[300px] lg:flex-shrink-0 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 h-[480px] lg:h-full">
            <div className="absolute inset-0 rounded-2xl border flex flex-col min-h-0"
                 style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span>💬</span>
              <span className="font-bold text-white text-sm">Chat ao Vivo</span>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,45,45,0.15)', color: '#ff6b6b' }}>
                {viewerCount.toLocaleString('pt-BR')} online
              </span>
            </div>
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
              {messages.map((m) => (
                <div key={m.id} className="chat-msg flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                       style={{ background: 'rgba(255,255,255,0.08)' }}>{m.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold" style={{ color: m.user === 'You' ? '#22c55e' : '#ff6b35' }}>{m.user} </span>
                    <span className="text-xs text-gray-400 break-words">{m.message}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Diga algo..."
                className="flex-1 rounded-lg px-3 py-2 text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,256,0.06)', border: '1px solid rgba(255,255,256,0.12)' }}
              />
              <button onClick={handleSend} className="btn-live border-none rounded-lg text-white px-3 py-2 cursor-pointer font-bold text-base">↑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
