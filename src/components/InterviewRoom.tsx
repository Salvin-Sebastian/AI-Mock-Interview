'use client';

import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, Phone, PhoneOff, Loader2 } from 'lucide-react';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'dummy_key');

export default function InterviewRoom() {
  const [callStatus, setCallStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'user' | 'ai' | null>(null);

  useEffect(() => {
    vapi.on('call-start', () => setCallStatus('active'));
    vapi.on('call-end', () => setCallStatus('idle'));
    
    // Listen for volume level to detect speaking
    vapi.on('volume-level', (volume) => {
      if (volume > 0.1) {
        setActiveSpeaker('user');
      } else {
        setActiveSpeaker(null);
      }
    });

    // In a real scenario you can track AI speaking state through Vapi events
    // For now we'll simulate it based on user silence occasionally
    
    return () => {
      vapi.removeAllListeners();
      if (callStatus === 'active') {
        vapi.stop();
      }
    };
  }, [callStatus]);

  const startCall = async () => {
    setCallStatus('loading');
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'dummy_assistant_id';
    try {
      await vapi.start(assistantId);
    } catch (err) {
      console.error('Failed to start call', err);
      alert('Failed to connect to Vapi. Please check your keys and Assistant ID.');
      setCallStatus('idle');
    }
  };

  const endCall = () => {
    vapi.stop();
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
  };

  return (
    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Live Interview Session</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {callStatus === 'idle' ? 'Ready to begin your interview.' : 'Interview in progress.'}
        </p>
      </div>

      {/* Visualizer Circle */}
      <div style={{ 
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', 
        margin: '0 auto 4rem',
        background: callStatus === 'active' ? 'rgba(108, 92, 231, 0.1)' : 'rgba(255,255,255,0.05)',
        border: `2px solid ${callStatus === 'active' ? 'var(--accent)' : 'var(--glass-border)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: callStatus === 'active' && activeSpeaker ? '0 0 40px var(--accent-glow)' : 'none'
      }}>
        <div style={{ fontSize: '4rem' }}>
          {callStatus === 'active' ? '🎙️' : '👤'}
        </div>
        
        {/* Pulse animation when active */}
        {callStatus === 'active' && (
          <div style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            border: '2px solid var(--accent-glow)',
            animation: 'pulse 2s infinite',
            opacity: activeSpeaker ? 1 : 0.2
          }}></div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {callStatus === 'idle' ? (
          <button className="btn btn-primary" onClick={startCall} style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}>
            <Phone size={24} style={{ marginRight: '10px' }} /> Start Interview
          </button>
        ) : callStatus === 'loading' ? (
          <button className="btn btn-secondary" disabled style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}>
            <Loader2 size={24} className="animate-spin" style={{ marginRight: '10px' }} /> Connecting...
          </button>
        ) : (
          <>
            <button 
              className="btn btn-secondary" 
              onClick={toggleMute} 
              style={{ padding: '1rem', borderRadius: '50%', width: '60px', height: '60px', background: isMuted ? 'rgba(214, 48, 49, 0.2)' : 'transparent' }}
            >
              {isMuted ? <MicOff size={24} color="var(--danger)" /> : <Mic size={24} />}
            </button>
            <button 
              className="btn" 
              onClick={endCall} 
              style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px', background: 'var(--danger)', color: 'white' }}
            >
              <PhoneOff size={24} style={{ marginRight: '10px' }} /> End Interview
            </button>
          </>
        )}
      </div>

    </div>
  );
}
