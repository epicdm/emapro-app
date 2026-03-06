'use client';

export default function StepIndicator({ current, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '10px 0 6px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 20 : 6,
          height: 6,
          borderRadius: 3,
          background: i === current ? 'var(--accent-teal)' : i < current ? 'rgba(78,205,196,0.4)' : 'var(--border)',
          transition: 'all 0.3s',
        }} />
      ))}
    </div>
  );
}
