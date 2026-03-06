'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupStep({ sipCreds }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const deepLink = sipCreds
    ? `csc:${sipCreds.sip_username}:${sipCreds.sip_password}@EPIC.VOICE.LITE`
    : '';

  useEffect(() => {
    if (!deepLink) return;
    import('qrcode').then(QRCode => {
      QRCode.toDataURL(deepLink, { width: 200, margin: 1, color: { dark: '#e8f4fd', light: '#0f1f3d' } })
        .then(url => setQrDataUrl(url));
    });
  }, [deepLink]);

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Set Up Your Phone</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Connect your EPIC number to a softphone app</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* QR / Tap to configure */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Scan on desktop or tap link on mobile</div>
          {qrDataUrl
            ? <img src={qrDataUrl} alt="SIP QR" style={{ width: 160, height: 160, borderRadius: 12 }} />
            : <div style={{ width: 160, height: 160, borderRadius: 12, background: 'var(--border)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 12 }}>Generating...</div>
          }
          <a href={deepLink} style={{ display: 'block', marginTop: 12, padding: '10px', borderRadius: 10, background: 'rgba(69,232,155,0.08)', border: '1px solid rgba(69,232,155,0.15)', color: 'var(--accent-green)', fontSize: 13, fontWeight: 600 }}>
            📱 Tap to Configure
          </a>
        </div>

        {/* Credentials */}
        {sipCreds && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Manual Config</div>
            {[
              { label: 'Server', value: sipCreds.sip_server || 'voice00.epic.dm' },
              { label: 'Username', value: sipCreds.sip_username },
              { label: 'Password', value: sipCreds.sip_password },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>{r.value}</span>
              </div>
            ))}
            <button onClick={() => copy(sipCreds.sip_password)} style={{ width: '100%', marginTop: 12, padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 12 }}>
              {copied ? '✓ Copied!' : 'Copy Password'}
            </button>
          </div>
        )}

        <a href="https://apps.apple.com/app/cloud-softphone/id569050545" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--glass)' }}>
          <div style={{ fontSize: 24 }}>📲</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Download Cloud Softphone</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Free app — iOS & Android</div>
          </div>
        </a>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        <button onClick={() => router.push('/dashboard')} style={{
          width: '100%', padding: '15px', borderRadius: 14,
          background: 'linear-gradient(135deg, var(--accent-green), var(--accent-teal))',
          color: '#0a1628', fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)',
        }}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
