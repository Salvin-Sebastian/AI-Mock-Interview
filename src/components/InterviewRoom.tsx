'use client';

import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, Phone, PhoneOff, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'dummy_key');

interface Props {
  interviewId: string;
  role: string;
  level: string;
  techStack: string;
}

export default function InterviewRoom({ interviewId, role, level, techStack }: Props) {
  const [callStatus, setCallStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'user' | 'ai' | null>(null);
  const router = useRouter();
  const transcriptRef = useRef('');

  useEffect(() => {
    const onCallStart = () => setCallStatus('active');
    
    const onCallEnd = async () => {
      setCallStatus('idle');
      
      // Send the accumulated transcript to our backend API
      try {
        await fetch('/api/generate-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            interviewId, 
            transcript: transcriptRef.current || 'No transcript available.' 
          })
        });
      } catch (err) {
        console.error('Failed to generate feedback:', err);
      }

      // Redirect to feedback page when call ends
      router.push(`/interview/${interviewId}/feedback`);
    };
    
    const onVolumeLevel = (volume: number) => {
      setActiveSpeaker(volume > 0.1 ? 'user' : null);
    };
    
    const onError = (e: any) => {
      console.error('Vapi error:', e);
      setCallStatus('idle');
    };

    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const prefix = message.role === 'user' ? 'Candidate' : 'Interviewer';
        transcriptRef.current += `${prefix}: ${message.transcript}\n`;
      }
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('volume-level', onVolumeLevel);
    vapi.on('error', onError);
    vapi.on('message', onMessage);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('volume-level', onVolumeLevel);
      vapi.off('error', onError);
      vapi.off('message', onMessage);
      vapi.stop();
    };
  }, [interviewId, router]);

  const startCall = async () => {
    setCallStatus('loading');
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'dummy_assistant_id';
    try {
      // Pass dynamic overrides based on user setup
      const assistantOverrides = {
        name: "Expert Tech Interviewer",
        variableValues: {
          level,
          role,
          techStack,
          systemPrompt: `You are an expert technical interviewer. You are interviewing a candidate for a ${level} ${role} position. The primary tech stack is ${techStack}. 
        Keep your questions concise. Ask one question at a time. Evaluate their technical knowledge, problem-solving skills, and communication.`
        }
      };

      await vapi.start(assistantId, assistantOverrides);
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
    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
      
      <div style={{ marginBottom: '3rem', position: 'relative' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 800 }}>Live Session</h2>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: callStatus === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${callStatus === 'active' ? 'rgba(16, 185, 129, 0.4)' : 'var(--glass-border)'}`,
          padding: '6px 16px',
          borderRadius: '50px',
          color: callStatus === 'active' ? 'var(--success)' : 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.3s ease'
        }}>
          {callStatus === 'active' && (
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', animation: 'pulse-dot 2s infinite' }} />
          )}
          {callStatus === 'idle' ? 'Ready to begin.' : activeSpeaker === 'user' ? <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mic size={14} /> You are speaking...</span> : <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Loader2 size={14} className="animate-spin" /> AI Listening...</span>}
        </div>
      </div>

      <div style={{ 
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', 
        margin: '0 auto 4rem',
        background: callStatus === 'active' ? 'rgba(176, 132, 255, 0.1)' : 'rgba(255,255,255,0.02)',
        border: `2px solid ${callStatus === 'active' ? 'var(--accent)' : 'var(--glass-border)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: callStatus === 'active' && activeSpeaker ? '0 0 60px var(--accent-glow), inset 0 0 30px var(--accent-glow)' : 'none'
      }}>
        <div style={{ transition: 'transform 0.2s', transform: activeSpeaker ? 'scale(1.1)' : 'scale(1)' }}>
          {callStatus === 'active' ? <Mic size={64} color="var(--accent)" /> : <User size={64} color="var(--text-secondary)" />}
        </div>
        
        {callStatus === 'active' && (
          <>
            <div className="pulse-ring" style={{ animationDelay: '0s', opacity: activeSpeaker ? 0.8 : 0.2 }}></div>
            <div className="pulse-ring" style={{ animationDelay: '0.6s', opacity: activeSpeaker ? 0.6 : 0.1 }}></div>
            <div className="pulse-ring" style={{ animationDelay: '1.2s', opacity: activeSpeaker ? 0.4 : 0 }}></div>
          </>
        )}
      </div>

      <style jsx>{`
        .pulse-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid var(--accent-glow);
          animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pulse-dot {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>

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
