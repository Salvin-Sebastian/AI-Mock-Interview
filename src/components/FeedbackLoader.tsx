'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackLoader() {
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '2rem' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent)', animation: 'spin 1s linear infinite' }} className="spinner"></div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Analyzing Interview</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Our AI is reviewing your responses. This usually takes 1-2 minutes.</p>
      </div>
    </div>
  );
}
