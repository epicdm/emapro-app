'use client';
import { useState, useEffect } from 'react';
import OTPInput from '@/components/ui/OTPInput';
import { apiFetch, saveSession, formatDID } from '@/lib/api';

export default function VerifyStep({ phone, onSuccess, onBack }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [resendLeft, setResendLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendLeft <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setResendLeft(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendLeft]);

  // Web OTP — Android auto-read
  useEffect(() => {
    if (typeof window === 'undefined' || !('OTPCredential' in window)) return;
    const ac = new AbortController();
    setAutoDetecting(true);
    navigator.credentials.get({ otp: { transport: ['sms'] }, signal: ac.signal })
      .then(otp => { if (otp?.code) setCode(otp.code); })
      .catch(() => {})
      .finally(() => setAutoDetecting(false));
    return () => ac.abort();
  }, []);

  useEffect(() => {
    if (code.replace(/\D/g, '').length === 6) verify(code);
  }, [code]);

  const verify = async (otp) => {
    setError('');
    setLoading(true);
    try {
      const res = await apiFetch('/v1/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phone, code: otp }),
      });
      const json = await res.json();
      if (res.ok) {
        saveSession(json.data.access_token, json.data.user?.full_name || '', json.data.sip_credentials);
        onSuccess(json.data.sip_credentials);
      } else {
        setError(json.message || 'Invalid code. Try again.');
        setCode('');
      }
    } catch {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setCanResend(false); setResendLeft(60); setError('');
    await apiFetch('/v1/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone_number: phone }) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Verify Phone</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', gap: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🔐</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>Code sent to</div>
          <div style={{ fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-teal)' }}>{formatDID(phone)}</div>
        </div>

        <OTPInput value={code} onChange={setCode} />

        {autoDetecting && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent-teal)' }}>
            <span className="spinner" style={{ borderTopColor: 'var(--accent-teal)' }} />
            Waiting for SMS...
          </div>
        )}

        {error && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', color: 'var(--accent-coral)', fontSize: 13, textAlign: 'center' }}>{error}</div>}

        <button onClick={() => verify(code)} disabled={loading || code.replace(/\D/g,'').length !== 6} style={{
          width: '100%', maxWidth: 320, padding: '15px', borderRadius: 14,
          background: code.replace(/\D/g,'').length === 6 && !loading ? 'linear-gradient(135deg, var(--accent-green), var(--accent-teal))' : 'var(--border)',
          color: code.replace(/\D/g,'').length === 6 && !loading ? '#0a1628' : 'var(--text-muted)',
          fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {loading ? <><span className="spinner" /> Verifying...</> : 'Verify'}
        </button>

        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {canResend
            ? <button onClick={resend} style={{ color: 'var(--accent-teal)', fontWeight: 600, fontSize: 13 }}>Resend Code</button>
            : <>Resend in {resendLeft}s</>
          }
        </div>
      </div>
    </div>
  );
}
