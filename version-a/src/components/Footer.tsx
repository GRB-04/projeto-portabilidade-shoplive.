/**
 * VERSION A — FOOTER
 * [PORTABILITY ISSUE] Fixed 5-column grid with min-width — breaks on mobile.
 * Footer links become a jumbled mess on small screens.
 */

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 40px 40px' }}>
      {/* [PORTABILITY ISSUE] Fixed 5-column grid, no responsive collapse */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '40px', marginBottom: '48px', minWidth: '900px' }}>
        {/* Brand */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 900, color: 'white' }}>S</div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: 'white' }}>Shop<span style={{ color: '#ff2d2d' }}>Live</span></span>
          </div>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px' }}>
            The world's premier live commerce platform. Exclusive deals, live hosts, and real-time shopping — all in one stream.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {['𝕏', 'f', 'in', '▶', '📷'].map((icon, i) => (
              <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#888', cursor: 'pointer' }}>{icon}</div>
            ))}
          </div>
        </div>

        {[
          { title: 'Loja', links: ['Eletrônicos', 'Moda', 'Casa & Decoração', 'Beleza', 'Esportes'] },
          { title: 'Empresa', links: ['Sobre Nós', 'Carreiras', 'Imprensa', 'Blog', 'Parceiros'] },
          { title: 'Suporte', links: ['Central de Ajuda', 'Fale Conosco', 'Devoluções', 'Entrega', 'Privacidade'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '16px', letterSpacing: '0.5px' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map(link => (
                <li key={link}><a href="#" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: '#444', fontSize: '13px', margin: 0 }}>© 2026 ShopLive Inc. Todos os direitos reservados.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Termos', 'Privacidade', 'Cookies'].map(item => (
            <a key={item} href="#" style={{ color: '#444', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="live-dot" style={{ background: '#22c55e', borderRadius: '50%', width: '8px', height: '8px' }} />
          <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 600 }}>Todos os sistemas operacionais</span>
        </div>
      </div>
    </footer>
  );
}
