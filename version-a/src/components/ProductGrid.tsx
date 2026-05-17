/**
 * VERSION A — BROKEN PRODUCT GRID
 * [PORTABILITY ISSUE] grid-cols-4 always — no responsive breakpoints.
 * Cards are 380px each + gap = ~1600px total. Causes massive horizontal scroll on mobile.
 */

import type { Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onBuyNow: (product: Product) => void;
}

export default function ProductGrid({ products, onBuyNow }: ProductGridProps) {
  return (
    <section style={{ padding: '60px 40px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div>
          <p style={{ color: '#ff6b35', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', marginBottom: '8px' }}>
            OFERTAS RELÂMPAGO
          </p>
          {/* [PORTABILITY ISSUE] Fixed large heading, no responsive scaling */}
          <h2 style={{ fontSize: '42px', fontWeight: 800, color: 'white', margin: 0, lineHeight: 1.1 }}>
            Ofertas da Noite 🔥
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: 'white', padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
            Todos os Produtos
          </button>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: 'white', padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
            Eletrônicos
          </button>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: 'white', padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
            Áudio
          </button>
        </div>
      </div>

      {/*
       * [PORTABILITY ISSUE] Always 4 columns with 380px wide cards.
       * Total width ≈ 4 × 380 + 3 × 24 = ~1592px.
       * On a 375px iPhone screen, this is 4× the screen width — causing severe horizontal scroll.
       * NO responsive classes (sm:, md:, lg:) are used here.
       */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 380px)', gap: '24px' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
        ))}
      </div>

      {/* Load more — [PORTABILITY ISSUE] Centered button with fixed width */}
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '12px', color: 'white', padding: '14px 48px',
          cursor: 'pointer', fontWeight: 600, fontSize: '16px',
          width: '300px' /* Fixed width — doesn't adapt */
        }}>
          Carregar Mais Produtos
        </button>
      </div>
    </section>
  );
}
