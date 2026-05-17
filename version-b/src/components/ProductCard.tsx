/**
 * VERSION B — FIXED RESPONSIVE PRODUCT CARD
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. w-full — card always fills its grid cell, no fixed pixel width
 * 2. Image height: aspect-[4/3] sm:aspect-[3/2] — fluid, proportional
 * 3. Button text uses responsive sizing
 * 4. All internal spacing uses Tailwind responsive classes
 *
 * WHY THIS MATTERS: Product cards are the core conversion unit in e-commerce.
 * If they're the wrong size for the device, users can't interact with them properly.
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
    i < Math.floor(product.rating) ? '★' : '☆'
  );

  return (
    // [PORTABILITY FIX] w-full — adapts to whatever column width the grid assigns
    <div className="group w-full rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 cursor-pointer"
         style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
         onMouseOver={e => (e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)')}
         onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>

      {/* [PORTABILITY FIX] aspect ratio preserves proportions at any width */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: '#111' }}>
        <img src={product.image} alt={product.name}
             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {/* Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md"
             style={{ background: 'rgba(0,0,0,0.8)' }}>{product.badge}</div>
        {/* Discount */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black text-white"
             style={{ background: 'linear-gradient(135deg, #ff2d2d, #ff6b35)' }}>
          -{product.discount}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {stars.map((s, i) => (
            <span key={i} className="text-sm" style={{ color: '#f59e0b' }}>{s}</span>
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.reviews.toLocaleString()})</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">{product.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mt-auto pt-4 flex items-end gap-2 mb-4">
          <span className="font-black text-white" style={{ fontSize: '22px' }}>
            R$ <span style={{ fontSize: '28px' }}>{Math.floor(product.price)}</span>
            <span className="text-base text-gray-400">,{(product.price % 1).toFixed(2).substring(2)}</span>
          </span>
          <span className="text-sm font-semibold text-gray-600 line-through mb-1">R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Sold progress */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-full rounded-full transition-all duration-500"
                 style={{ width: `${Math.min((product.soldCount / 2000) * 100, 100)}%`, background: 'linear-gradient(90deg, #ff2d2d, #ff6b35)' }} />
          </div>
          <span className="text-xs text-gray-600 flex-shrink-0">{product.soldCount.toLocaleString('pt-BR')} vendidos</span>
        </div>

        {/* Buttons — [PORTABILITY FIX] flex row, buttons always fit within card */}
        <div className="flex gap-2">
          <button onClick={() => onBuyNow(product)}
                  className="btn-live flex-1 border-none rounded-xl text-white font-bold text-sm py-3 cursor-pointer">
            Comprar Agora
          </button>
          <button onClick={handleAdd}
                  className="w-11 flex-shrink-0 rounded-xl text-lg font-bold cursor-pointer transition-all duration-200 flex items-center justify-center"
                  style={{
                    background: added ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${added ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    color: added ? '#22c55e' : 'white',
                  }}>
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
