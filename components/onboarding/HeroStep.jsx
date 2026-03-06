'use client';

const PLANS = [
  { name: 'Island Starter', price: '$25', period: '/mo', mins: '100 min local + 50 intl', color: '#4ECDC4', popular: false },
  { name: 'Island Plus', price: '$45', period: '/mo', mins: '300 min local + 150 intl', color: '#45E89B', popular: true },
  { name: 'Island Unlimited', price: '$75', period: '/mo', mins: 'Unlimited local + 500 intl', color: '#FFB347', popular: false },
  { name: 'Pay-As-You-Go', price: 'Free', period: '', mins: 'No monthly fee — top up anytime', color: '#FF6B6B', popular: false },
];

export default function HeroStep({ onStart }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <div style={{ padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(69,232,155,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌴</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 10 }}>
          EPIC<span style={{ color: 'var(--accent-green)' }}> Mobile</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', maxWidth: 280, margin: '0 auto' }}>
          Your Caribbean connection — calls, airtime & wallet in one app
        </p>
      </div>

      {/* Plans */}
      <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12, textAlign: 'center' }}>Choose a Plan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PLANS.map((p) => (
            <div key={p.name} onClick={onStart} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              border: p.popular ? `1.5px solid ${p.color}40` : '1px solid var(--border)',
              background: p.popular ? `${p.color}08` : 'var(--glass)',
              cursor: 'pointer', position: 'relative',
            }}>
              {p.popular && <div style={{ position: 'absolute', top: -1, right: 14, background: p.color, color: '#0a1628', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: '0 0 6px 6px', letterSpacing: 0.5 }}>POPULAR</div>}
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0, boxShadow: `0 0 8px ${p.color}60` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.mins}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'var(--font-display)', color: p.color }}>{p.price}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 16px 32px' }}>
        <button onClick={onStart} style={{
          width: '100%', padding: '16px', borderRadius: 14,
          background: 'linear-gradient(135deg, var(--accent-green), var(--accent-teal))',
          color: '#0a1628', fontSize: 16, fontWeight: 800,
          fontFamily: 'var(--font-display)', letterSpacing: 0.3,
        }}>
          Get Started →
        </button>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
          No credit card required to start
        </div>
      </div>
    </div>
  );
}
