/**
 * VERSION B — FIXED RESPONSIVE FOOTER
 * [PORTABILITY FIXES]: grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
 * No min-width. Bottom bar stacks on mobile.
 */

export default function Footer() {
  return (
    <footer className="border-t px-4 sm:px-6 lg:px-8 pt-14 pb-8" style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* [PORTABILITY FIX] Responsive grid: 1 col → 2 col → 5 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
                   style={{ background: 'linear-gradient(135deg,#ff2d2d,#ff6b35)' }}>S</div>
              <span className="text-xl font-black text-white">Shop<span style={{ color: '#ff2d2d' }}>Live</span></span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-5">
              The world's premier live commerce platform. Exclusive deals, live hosts, and real-time shopping — all in one stream.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'f', 'in', '▶', '📷'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-gray-500 cursor-pointer transition-colors hover:text-white"
                     style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{icon}</div>
              ))}
            </div>
          </div>

          {[
            { title: 'Loja', links: ['Eletrônicos', 'Moda', 'Casa & Decoração', 'Beleza', 'Esportes'] },
            { title: 'Empresa', links: ['Sobre Nós', 'Carreiras', 'Imprensa', 'Blog', 'Parceiros'] },
            { title: 'Suporte', links: ['Central de Ajuda', 'Fale Conosco', 'Devoluções', 'Entrega', 'Privacidade'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-gray-600 hover:text-gray-300 text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* [PORTABILITY FIX] Bottom bar: stacks on mobile, row on sm+ */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-gray-700 text-xs">© 2026 ShopLive Inc. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            {['Termos', 'Privacidade', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-gray-700 hover:text-gray-400 text-xs transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="live-dot w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-500">Todos os sistemas operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
