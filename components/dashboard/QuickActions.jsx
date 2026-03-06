'use client';

export default function QuickActions({ currency, onXCD, onAI }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: currency === 'USD' ? '1fr 1fr' : '1fr', gap: 8 }}>
      {currency === 'USD' && (
        <button onClick={onXCD} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(69,232,155,0.2)', background: 'rgba(69,232,155,0.05)', cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(69,232,155,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>🇩🇲</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-green)' }}>Unlock XCD</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Local rates</div>
          </div>
        </button>
      )}
      <button onClick={onAI} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255,179,71,0.2)', background: 'rgba(255,179,71,0.05)', cursor: 'pointer' }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,179,71,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>✦</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>EPIC AI</div>
          <div style={{ fontSize: 10, color: 'var(--accent-gold)' }}>Ask anything</div>
        </div>
      </button>
    </div>
  );
}
