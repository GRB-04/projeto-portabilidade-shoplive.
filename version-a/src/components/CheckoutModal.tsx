/**
 * VERSION A — BROKEN CHECKOUT MODAL
 * [PORTABILITY ISSUES]:
 * 1. Modal panel has fixed width: 800px — overflows on any screen < 800px
 * 2. Two-column layout never collapses — breaks on tablets/mobile
 * 3. No max-height with scroll — modal taller than screen on small devices
 * 4. Overlay click area works but modal itself is off-screen
 *
 * WHY THIS MATTERS: Checkout is the final conversion step in live commerce.
 * A broken checkout modal on mobile means lost revenue. Studies show 60%+
 * of live shopping purchases are made on mobile devices.
 */

import { useState } from 'react';
import type { Product } from '../data/products';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') setStep('payment');
    else if (step === 'payment') setStep('success');
  };

  // Textos em português

  return (
    // Backdrop
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
      {/* [PORTABILITY ISSUE] Fixed 800px wide modal — overflows on screens < 800px */}
      <div onClick={e => e.stopPropagation()} style={{
        width: '800px',       /* BROKEN: never shrinks on small screens */
        background: '#141414',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        animation: 'slideIn 0.3s ease-out',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {step === 'success' ? (
          <div style={{ padding: '80px 60px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>🎉</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Pedido Confirmado!</h2>
            <p style={{ color: '#888', fontSize: '16px', marginBottom: '32px' }}>Seu {product.name} está a caminho. Previsão de entrega: 2 a 3 dias úteis.</p>
            <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
              <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '18px' }}>✓ Pagamento de R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} processado</p>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Pedido #SL-{Math.floor(Math.random() * 900000 + 100000)}</p>
            </div>
            <button onClick={onClose} className="btn-live" style={{ border: 'none', borderRadius: '12px', color: 'white', padding: '16px 48px', cursor: 'pointer', fontWeight: 700, fontSize: '16px' }}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          /* [PORTABILITY ISSUE] Two-column layout — never collapses on mobile */
          <div style={{ display: 'flex', minHeight: '500px' }}>
            {/* Left: Product summary */}
            <div style={{
              width: '320px',       /* Fixed column — no responsive collapse */
              flexShrink: 0,
              background: 'rgba(255,255,255,0.03)',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ff6b35', letterSpacing: '2px', marginBottom: '24px' }}>RESUMO DO PEDIDO</div>
              <div style={{ background: '#111', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px', margin: '0 0 8px 0' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '13px', margin: '0 0 24px 0', lineHeight: 1.5 }}>{product.description}</p>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#888', fontSize: '14px' }}>Subtotal</span>
                  <span style={{ color: 'white', fontSize: '14px' }}>R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#888', fontSize: '14px' }}>Frete</span>
                  <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: 700 }}>GRÁTIS</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>Total</span>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '22px' }}>R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ flex: 1, padding: '40px 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ color: 'white', fontWeight: 800, fontSize: '24px', margin: 0 }}>
                  {step === 'details' ? '📦 Dados de Entrega' : '💳 Pagamento'}
                </h2>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>✕</button>
              </div>

              {/* Step indicators */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                {['Entrega', 'Pagamento'].map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i === 0 && step === 'details' || i === 1 && step === 'payment' ? 'linear-gradient(135deg, #ff2d2d, #ff6b35)' : (i === 0 && step === 'payment' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'), border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'white' }}>
                      {i === 0 && step === 'payment' ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '13px', color: i === 0 && step === 'details' || i === 1 && step === 'payment' ? 'white' : '#666', fontWeight: 600 }}>{s}</span>
                    {i === 0 && <span style={{ color: '#333', fontSize: '16px' }}>→</span>}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {step === 'details' ? (
                  <>
                    {[{ label: 'Nome Completo', key: 'name', ph: 'João Silva', type: 'text' }, { label: 'E-mail', key: 'email', ph: 'joao@exemplo.com.br', type: 'email' }, { label: 'Endereço de Entrega', key: 'address', ph: 'Rua das Flores, 123, São Paulo, SP', type: 'text' }].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#888', marginBottom: '8px' }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} required
                          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#888', marginBottom: '8px' }}>Número do Cartão</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} required style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#888', marginBottom: '8px' }}>Validade</label>
                        <input type="text" placeholder="MM/AA" maxLength={5} required style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#888', marginBottom: '8px' }}>CVV</label>
                        <input type="text" placeholder="123" maxLength={3} required style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </>
                )}
                <button type="submit" className="btn-live" style={{ border: 'none', borderRadius: '12px', color: 'white', padding: '16px', cursor: 'pointer', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
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
