/**
 * VERSION B — FIXED RESPONSIVE PRODUCT GRID
 *
 * [PORTABILITY FIXES APPLIED]:
 * 1. grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 — adapts to screen width
 * 2. Section header uses flex-col sm:flex-row — stacks on mobile
 * 3. Filter buttons wrap on mobile
 * 4. "Load More" button uses w-full sm:w-auto — full-width on mobile
 *
 * WHY THIS MATTERS: Responsive product grids are critical for mobile commerce.
 * Single-column on mobile → readable cards, easy tap targets, no overflow.
 */

import type { Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onBuyNow: (product: Product) => void;
}

export default function ProductGrid({ products, onBuyNow }: ProductGridProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-screen-2xl mx-auto">
        {/* [PORTABILITY FIX] Header stacks on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#ff6b35' }}>OFERTAS RELÂMPAGO</p>
            {/* [PORTABILITY FIX] Responsive heading sizes */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              Ofertas da Noite 🔥
            </h2>
          </div>
          {/* [PORTABILITY FIX] Filter buttons wrap on small screens */}
          <div className="flex flex-wrap gap-2">
            {['Todos os Produtos', 'Eletrônicos', 'Áudio'].map(label => (
              <button key={label}
                      className="text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-150 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/*
         * [PORTABILITY FIX] Fully responsive grid:
         * - Mobile (< 640px):    1 column — full-width cards, easy to tap
         * - Tablet (640-1023px): 2 columns — balanced layout
         * - Desktop (1024px+):   3 columns
         * - Wide (1280px+):      4 columns
         *
         * This is the correct approach for live commerce product listings.
         * Each card uses w-full and fills its grid cell perfectly.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
          ))}
        </div>

        {/* [PORTABILITY FIX] Load more — w-full on mobile, auto-width on sm+ */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <button className="w-full sm:w-auto text-white font-semibold text-base px-8 py-3.5 rounded-xl cursor-pointer transition-colors duration-150"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
            Carregar Mais Produtos
          </button>
        </div>
      </div>
    </section>
  );
}
