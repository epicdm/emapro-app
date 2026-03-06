'use client';
import { useRef } from 'react';

export default function OTPInput({ value, onChange }) {
  const refs = Array.from({ length: 6 }, () => useRef(null));
  const digits = value.padEnd(6, '').slice(0, 6).split('');

  const handle = (i, e) => {
    const v = e.target.value.replace(/\D/g, '').slice(-1);
    const next = digits.map((d, j) => j === i ? v : d).join('').slice(0, 6);
    onChange(next);
    if (v && i < 5) refs[i + 1].current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus();
      const next = digits.map((d, j) => j === i - 1 ? '' : d).join('');
      onChange(next);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) { onChange(pasted); refs[Math.min(pasted.length, 5)].current?.focus(); }
    e.preventDefault();
  };

  const box = {
    width: 44, height: 52, borderRadius: 12,
    border: '1.5px solid var(--border)',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--text-primary)',
    fontSize: 22, fontWeight: 700,
    fontFamily: 'var(--font-display)',
    textAlign: 'center', outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ display: 'flex', gap: 8 }} onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i} ref={refs[i]}
          type="text" inputMode="numeric"
          maxLength={1} value={d}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          onChange={e => handle(i, e)}
          onKeyDown={e => handleKey(i, e)}
          onFocus={e => e.target.style.borderColor = 'var(--accent-teal)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
          style={box}
        />
      ))}
    </div>
  );
}
