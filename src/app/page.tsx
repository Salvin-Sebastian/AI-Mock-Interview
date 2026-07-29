import Image from "next/image";
import Link from "next/link";
import { Mic, BrainCircuit, BarChart } from "lucide-react";

export default function Home() {
  return (
    <main className="container animate-fade-in" style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>

      <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'float 6s ease-in-out infinite' }}>
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(176, 132, 255, 0.15);
            border-color: var(--accent-glow);
          }
        `}</style>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(176, 132, 255, 0.1)', borderRadius: '50px', color: 'var(--accent)', fontWeight: 600, marginBottom: '2rem', border: '1px solid var(--accent-glow)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 0 20px var(--accent-glow)' }}>
          Next-Gen AI Mock Interview Platform
        </div>

        <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          Master Your Next Interview with <br />
          <span className="gradient-text">Conversational AI</span>
        </h1>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '700px' }}>
          Practice real-time, voice-based interviews with an AI that dynamically adapts to your responses. Get actionable feedback and land your dream job with confidence.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
          <Link href="/login">
            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              Start Interview Training
            </button>
          </Link>
          <Link href="/login">
            <button className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              View Dashboard
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>

        <div className="glass-panel feature-card" style={{ padding: '2.5rem', textAlign: 'left', transition: 'all 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(176, 132, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)', border: '1px solid var(--accent-glow)' }}><Mic size={28} /></div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Real-time Voice</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Experience the pressure of a real interview. Speak naturally, and our AI will listen, analyze, and respond in milliseconds using Vapi.</p>
        </div>

        <div className="glass-panel feature-card" style={{ padding: '2.5rem', textAlign: 'left', transition: 'all 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.4)' }}><BrainCircuit size={28} /></div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Dynamic Questions</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>No scripted pathways. Powered by OpenAI, the interviewer dynamically adapts its questions based on your resume and previous answers.</p>
        </div>

        <div className="glass-panel feature-card" style={{ padding: '2.5rem', textAlign: 'left', transition: 'all 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.4)' }}><BarChart size={28} /></div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Actionable Feedback</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Get a detailed breakdown of your performance, including tone analysis, technical accuracy, and actionable tips for improvement.</p>
        </div>

      </div>
    </main>
  );
}
