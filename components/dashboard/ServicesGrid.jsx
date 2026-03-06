'use client';

const SERVICES = [
  { id: 'calls',       icon: '📞', label: 'Calls',   sub: 'VoIP',        live: true  },
  { id: 'wallet',      icon: '💳', label: 'Wallet',  sub: 'Top up',       live: true  },
  { id: 'airtime',     icon: '📱', label: 'Airtime', sub: 'Send credit',  live: true  },
  { id: 'localnumber', icon: '🇩🇲', label: 'Local #', sub: 'Unlock XCD',  live: true  },
  { id: 'sousou',      icon: '🤝', label: 'Sou Sou', sub: 'Coming soon',  live: false },
  { id: 'gifts',       icon: '🎁', label: 'Gifts',   sub: 'Coming soon',  live: false },
];

export default function ServicesGrid({ onService }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Services</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {SERVICES.map(s => (
          <button key={s.id} onClick={() => s.live && onService(s.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 8px',
            borderRadius: 14, border: '1px solid var(--border)', background: 'var(--glass)',
            cursor: s.live ? 'pointer' : 'default', opacity: s.live ? 1 : 0.5,
            transition: 'background 0.15s',
          }}>
            <span style={{ fontSize: 22, marginBottom: 6, filter: s.live ? 'none' : 'grayscale(0.5)' }}>{s.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{s.label}</span>
            <span style={{ fontSize: 9, color: s.id === 'localnumber' ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: 2 }}>{s.sub}</span>
            {!s.live && <span style={{ fontSize: 7, color: 'var(--accent-gold)', fontWeight: 700, marginTop: 3, letterSpacing: 0.5 }}>SOON</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
