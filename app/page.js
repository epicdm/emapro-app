'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/api';
import HeroStep from '@/components/onboarding/HeroStep';
import SignUpStep from '@/components/onboarding/SignUpStep';
import VerifyStep from '@/components/onboarding/VerifyStep';
import SetupStep from '@/components/onboarding/SetupStep';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(null); // null = loading
  const [phone, setPhone] = useState('');
  const [sipCreds, setSipCreds] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session?.jwt) {
      router.replace('/dashboard');
    } else {
      setStep(0);
    }
  }, []);

  if (step === null) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
    </div>
  );

  if (step === 0) return <HeroStep onStart={() => setStep(1)} />;

  if (step === 1) return (
    <SignUpStep
      onBack={() => setStep(0)}
      onVerify={(ph) => { setPhone(ph); setStep(2); }}
    />
  );

  if (step === 2) return (
    <VerifyStep
      phone={phone}
      onBack={() => setStep(1)}
      onSuccess={(creds) => { setSipCreds(creds); setStep(3); }}
    />
  );

  if (step === 3) return <SetupStep sipCreds={sipCreds} />;

  return null;
}
