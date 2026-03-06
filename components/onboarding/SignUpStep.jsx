'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

const inputStyle = {
  width: '100%', padding: '14px 16px', borderRadius: 12,
  border: '1.5px solid var(--border)', background: 'rgba(255,255,255,0.04)',
  color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-body)',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
};

export default function SignUpStep({ onVerify, onBack }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const focus = e => e.target.style.borderColor = 'var(--accent-teal)';
  const blur = e => e.target.style.borderColor = 'var(--border)';

  const submit = async () => {
    setError('');
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 7) return setError('Enter a valid phone number');
    if (!name.trim() || name.trim().length < 2) return setError('Enter your name');
    const full = clean.startsWith('1767') ? clean : clean.startsWith('767') ? '1' + clean : '1767' + clean;
    setLoading(true);
    try {
      const res = await apiFetch('/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          phone_number: '+' + full,
          full_name: name.trim(),
          ...(email && { email }),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        onVerify('+' + full);
      } else {
        const msg = json.errors?.[0]?.msg || json.message || 'Something went wrong';
        setError(msg);
      }
    } catch {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', padding: '0 0 32px' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Create Account</div>
      </div>

      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Meet your BFF</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Your personal AI — always on, always on your side</div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Your Name</div>
          <input type="text" placeholder="What should your agent call you?"
            value={name} onChange={e => setName(e.target.value)}
            onFocus={focus} onBlur={blur} style={inputStyle} />
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Phone Number</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ ...inputStyle, width: 70, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-secondary)' }}>
              DM +1
            </div>
            <input type="tel" inputMode="numeric" placeholder="767 000 0000"
              value={phone} onChange={e => setPhone(e.target.value)}
              onFocus={focus} onBlur={blur} style={{ ...inputStyle, flex: 1 }} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Email <span style={{ opacity: 0.5 }}>(optional)</span></div>
          <input type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onFocus={focus} onBlur={blur} style={inputStyle} />
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', color: 'var(--accent-coral)', fontSize: 13 }}>
            {error}
          </div>
        )}

        <button onClick={submit} disabled={loading} style={{
          width: '100%', padding: '15px', borderRadius: 14, border: 'none',
          background: loading ? 'var(--border)' : 'linear-gradient(135deg, var(--accent-green), var(--accent-teal))',
          color: loading ? 'var(--text-muted)' : '#0a1628',
          fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.2s', marginTop: 8, cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Sending code...' : 'Get My Agent →'}
        </button>
      </div>
    </div>
  );
}
