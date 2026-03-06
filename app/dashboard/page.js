'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession, apiFetch, formatDID } from '@/lib/api';
import BalanceTile from '@/components/dashboard/BalanceTile';
import QuickActions from '@/components/dashboard/QuickActions';
import ServicesGrid from '@/components/dashboard/ServicesGrid';

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s?.jwt) { router.replace('/'); return; }
    setSession(s);

    apiFetch('/v1/users/profile')
      .then(r => r.json())
      .then(d => { if (d.data) setProfile(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const signOut = () => { clearSession(); router.replace('/'); };

  const onService = (id) => {
    if (id === 'calls') router.push('/dashboard/calls');
    if (id === 'wallet') router.push('/dashboard/funds');
    if (id === 'airtime') router.push('/dashboard/airtime');
    if (id === 'localnumber') router.push('/dashboard/local-number');
  };

  const name = profile?.full_name?.split(' ')[0] || session?.name?.split(' ')[0] || 'there';
  const balance = profile?.balance ?? 0;
  const currency = profile?.currency || 'USD';
  const callerID = session?.sip?.caller_id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Compact header */}
      <div style={{ padding: '12px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Hey, {name} 👋
          </div>
          {callerID && (
            <div style={{ fontSize: 11, color: 'var(--accent-green)', marginTop: 1 }}>
              📞 {formatDID(callerID)}
            </div>
          )}
        </div>
        <button onClick={signOut} style={{ fontSize: 11, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 8, padding: '5px 12px' }}>
          Sign out
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BalanceTile balance={balance} currency={currency} loading={loading} />
        <QuickActions
          currency={currency}
          onXCD={() => router.push('/dashboard/local-number')}
          onAI={() => router.push('/dashboard/ai')}
        />
        <ServicesGrid onService={onService} />
      </div>
    </div>
  );
}
