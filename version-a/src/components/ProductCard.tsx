/**
 * VERSION A — BROKEN PRODUCT CARD
 * [PORTABILITY ISSUE] Fixed width: 380px card — overflows on mobile, grid doesn't adapt.
 * In live commerce, product cards drive impulse purchases. If they don't fit the screen,
 * users cannot see the product image, price, or buy button — killing conversions.
 */

import { useState } from 'react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? '★' : (i < product.rating ? '½' : '☆')
  );

  return (
    // [PORTABILITY ISSUE] Fixed width of 380px — does NOT adapt to container
    <div style={{
      width: '380px',
      background: '#1a1a1a',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'pointer',
      flexShrink: 0, /* Prevents shrinking — reinforces overflow */
    }}
    onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,107,53,0.4)'; }}
    onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>

      {/* Image container — [PORTABILITY ISSUE] fixed height 260px */}
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#111' }}>
        <img src={product.image} alt={product.name}
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Badge */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: 'rgba(0,0,0,0.85)', borderRadius: '20px',
          padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: 'white',
          backdropFilter: 'blur(10px)'
        }}>{product.badge}</div>
        {/* Discount tag */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)',
          borderRadius: '20px', padding: '4px 12px',
          fontSize: '12px', fontWeight: 800, color: 'white'
        }}>-{product.discount}%</div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          {stars.map((s, i) => (
            <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>{s}</span>
          ))}
          <span style={{ fontSize: '13px', color: '#666', marginLeft: '4px' }}>({product.reviews.toLocaleString()})</span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', margin: '0 0 8px 0', lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 16px 0', lineHeight: 1.5 }}>{product.description}</p>

        {/* Price */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontWeight: 900, color: 'white', fontSize: '22px' }}>
            R$ <span style={{ fontSize: '28px' }}>{Math.floor(product.price)}</span>
            <span style={{ fontSize: '16px', color: '#888' }}>,{(product.price % 1).toFixed(2).substring(2)}</span>
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#666', textDecoration: 'line-through', marginBottom: '4px' }}>R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Sold count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
            <div style={{ width: `${Math.min((product.soldCount / 2000) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)', borderRadius: '2px' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#666' }}>{product.soldCount.toLocaleString('pt-BR')} vendidos</span>
        </div>

        {/* Buttons — [PORTABILITY ISSUE] side by side, no wrap on mobile */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onBuyNow(product)}
            className="btn-live"
            style={{ flex: 1, border: 'none', borderRadius: '10px', color: 'white', padding: '13px 0', cursor: 'pointer', fontWeight: 700, fontSize: '15px' }}>
            Comprar Agora
          </button>
          <button
            onClick={handleAdd}
            style={{
              width: '46px', flexShrink: 0,
              background: added ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${added ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '10px', color: added ? '#22c55e' : 'white',
              cursor: 'pointer', fontSize: '18px', transition: 'all 0.2s'
            }}>
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
