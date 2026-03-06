const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api01.epic.dm';

export async function apiFetch(path, opts = {}) {
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('epic_jwt') : null;
  const res = await fetch(BASE + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: 'Bearer ' + jwt } : {}),
      ...(opts.headers || {}),
    },
  });
  return res;
}

export function saveSession(jwt, name, sip) {
  localStorage.setItem('epic_jwt', jwt);
  localStorage.setItem('epic_user', name || '');
  if (sip) localStorage.setItem('epic_sip', JSON.stringify(sip));
}

export function clearSession() {
  localStorage.removeItem('epic_jwt');
  localStorage.removeItem('epic_user');
  localStorage.removeItem('epic_sip');
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const jwt = localStorage.getItem('epic_jwt');
  if (!jwt) return null;
  return {
    jwt,
    name: localStorage.getItem('epic_user') || 'there',
    sip: JSON.parse(localStorage.getItem('epic_sip') || 'null'),
  };
}

export function formatDID(num) {
  if (!num) return '';
  const d = String(num).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) return `+1 (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return num;
}
