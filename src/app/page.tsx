import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container animate-fade-in" style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      
      <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(108, 92, 231, 0.1)', borderRadius: '50px', color: 'var(--accent)', fontWeight: 600, marginBottom: '2rem', border: '1px solid var(--accent-glow)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Next-Gen AI Mock Interview Platform
        </div>
        
        <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
          Master Your Next Interview with <br />
          <span className="gradient-text">Conversational AI</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '700px' }}>
          Practice real-time, voice-based interviews with an AI that dynamically adapts to your responses. Get actionable feedback and land your dream job with confidence.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
          <Link href="/login">
            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              Start Mock Interview
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
        
        <div className="glass-panel hover-lift" style={{ padding: '2.5rem', textAlign: 'left', transition: 'transform 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(108, 92, 231, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', border: '1px solid var(--accent-glow)' }}>🎙️</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Real-time Voice</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Experience the pressure of a real interview. Speak naturally, and our AI will listen, analyze, and respond in milliseconds using Vapi.</p>
        </div>

        <div className="glass-panel hover-lift" style={{ padding: '2.5rem', textAlign: 'left', transition: 'transform 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(0, 184, 148, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', border: '1px solid rgba(0, 184, 148, 0.4)' }}>🧠</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Dynamic Questions</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>No scripted pathways. Powered by OpenAI, the interviewer dynamically adapts its questions based on your resume and previous answers.</p>
        </div>

        <div className="glass-panel hover-lift" style={{ padding: '2.5rem', textAlign: 'left', transition: 'transform 0.3s ease' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(214, 48, 49, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', border: '1px solid rgba(214, 48, 49, 0.4)' }}>📊</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Actionable Feedback</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Get a detailed breakdown of your performance, including tone analysis, technical accuracy, and actionable tips for improvement.</p>
        </div>

      </div>
    </main>
  );
}
