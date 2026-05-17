/**
 * VERSION B — FIXED RESPONSIVE CHECKOUT MODAL
 * [PORTABILITY FIXES]: max-w-2xl w-full, flex-col md:flex-row collapse,
 * max-h-[90vh] overflow scroll, mobile compact summary, w-full inputs.
 */

import { useState } from 'react';
import type { Product } from '../data/products';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') setStep('payment');
    else setStep('success');
  };

  return (
    <div onClick={onClose}
         className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      {/* [PORTABILITY FIX] max-w-2xl w-full — responsive, capped to viewport */}
      <div onClick={e => e.stopPropagation()}
           className="w-full max-w-2xl rounded-2xl overflow-hidden"
           style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', maxHeight: '90vh', overflowY: 'auto' }}>

        {step === 'success' ? (
          <div className="p-8 sm:p-14 text-center">
            <div className="text-6xl mb-5">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Pedido Confirmado!</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-7">Seu <strong className="text-white">{product.name}</strong> está a caminho em 2 a 3 dias úteis.</p>
            <div className="rounded-xl p-4 mb-7" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <p className="font-bold text-base" style={{ color: '#22c55e' }}>✓ Pagamento de R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} processado</p>
              <p className="text-gray-600 text-sm mt-1">Pedido #SL-{Math.floor(Math.random() * 900000 + 100000)}</p>
            </div>
            <button onClick={onClose} className="btn-live w-full sm:w-auto border-none rounded-xl text-white font-bold text-base px-10 py-4 cursor-pointer">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Product summary — hidden on mobile */}
            <div className="hidden md:flex flex-col w-64 flex-shrink-0 p-7 border-r" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#ff6b35' }}>RESUMO DO PEDIDO</p>
              <div className="rounded-xl overflow-hidden mb-4" style={{ background: '#111' }}>
                <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{product.name}</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-5">{product.description}</p>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-500">Subtotal</span><span className="text-white">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">Frete</span><span className="font-bold" style={{ color: '#22c55e' }}>GRÁTIS</span></div>
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <span className="text-white font-bold text-sm">Total</span>
                  <span className="text-white font-black text-lg">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Form — full width on mobile */}
            <div className="flex-1 p-5 sm:p-7">
              {/* Mobile compact summary */}
              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl md:hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{product.name}</p>
                  <p className="font-black text-base" style={{ color: '#ff6b35' }}>${product.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {step === 'details' ? '📦 Entrega' : '💳 Pagamento'}
                </h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-400 text-xl bg-transparent border-none cursor-pointer">✕</button>
              </div>

              <div className="flex items-center gap-2 mb-5">
                {['Entrega', 'Pagamento'].map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                         style={{ background: (i === 0 && step === 'details') || (i === 1 && step === 'payment') ? 'linear-gradient(135deg,#ff2d2d,#ff6b35)' : i === 0 && step === 'payment' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)' }}>
                      {i === 0 && step === 'payment' ? '✓' : i + 1}
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:block">{s}</span>
                    {i === 0 && <span className="text-gray-700 text-sm mx-1">→</span>}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {step === 'details' ? (
                  <>
                    {[{ label: 'Nome Completo', key: 'name', ph: 'João Silva', type: 'text' }, { label: 'E-mail', key: 'email', ph: 'joao@exemplo.com.br', type: 'email' }, { label: 'Endereço de Entrega', key: 'address', ph: 'Rua das Flores, 123, SP', type: 'text' }].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} required
                               className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Número do Cartão</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} required className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Validade</label>
                        <input type="text" placeholder="MM/AA" maxLength={5} required className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">CVV</label>
                        <input type="text" placeholder="123" maxLength={3} required className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </>
                )}
                <button type="submit" className="btn-live w-full border-none rounded-xl text-white font-bold text-base py-4 cursor-pointer mt-2">
                  {step === 'details' ? 'Continuar para Pagamento →' : `Pagar R$${product.price}`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
