'use client';
import { useRouter } from 'next/navigation';

export default function BalanceTile({ balance, currency, loading }) {
  const router = useRouter();
  const fmt = (n, cur) => (cur === 'XCD' ? 'EC$' : '$') + parseFloat(n || 0).toFixed(2) + ' ' + cur;

  return (
    <div
      onClick={() => router.push('/dashboard/funds')}
      style={{
        padding: '16px 18px', borderRadius: 16, cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(69,232,155,0.1), rgba(78,205,196,0.07))',
        border: '1px solid rgba(69,232,155,0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Wallet Balance</div>
          <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'var(--font-display)', color: '#45E89B', lineHeight: 1, textShadow: '0 0 20px rgba(69,232,155,0.35)' }}>
            {loading ? <span style={{ fontSize: 14, color: 'var(--text-muted)', animation: 'pulse 1.5s ease infinite' }}>Loading…</span> : fmt(balance, currency)}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 5 }}>
            {currency === 'XCD' ? '🇩🇲 Local XCD pricing' : '🌐 USD — register 1767 number to unlock XCD'}
          </div>
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(69,232,155,0.1)', border: '1px solid rgba(69,232,155,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          💳
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        {[{ label: 'Add Funds', icon: '↓' }, { label: 'Send', icon: '↑' }, { label: 'History', icon: '☰' }].map(a => (
          <div key={a.label} style={{ flex: 1, padding: '8px 4px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{a.icon}</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>{a.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
