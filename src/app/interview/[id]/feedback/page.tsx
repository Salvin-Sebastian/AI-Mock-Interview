import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FeedbackLoader from '@/components/FeedbackLoader';
import { TrendingUp, Target, TerminalSquare } from 'lucide-react';

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const interview = await prisma.interview.findUnique({
    where: { id },
    include: { feedback: true }
  });

  if (!interview) {
    notFound();
  }

  if (!interview.feedback) {
    return (
      <main className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
        <FeedbackLoader />
      </main>
    );
  }

  const { feedback } = interview;
  const strengths = JSON.parse(feedback.strengths);
  const weaknesses = JSON.parse(feedback.weaknesses);
  const practiceExercises = JSON.parse(feedback.practiceExercises);

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '900px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Interview <span className="gradient-text">Feedback</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>{interview.role} ({interview.level}) - {interview.techStack}</p>
        </div>
        <Link href="/dashboard">
          <button className="btn btn-secondary">Back to Dashboard</button>
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--accent), #38bdf8)' }}></div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>Overall Score</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feedback.overallFeedback}</p>
        </div>
        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * feedback.score) / 100} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, textShadow: '0 0 20px var(--accent-glow)' }}>{feedback.score}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/ 100</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--success)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(18,18,26,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: 'rgba(16,185,129,0.2)', padding: '8px', borderRadius: '8px', display: 'flex' }}><TrendingUp size={20} /></span> Strengths
          </h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {strengths.map((s: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{s}</li>
            ))}
          </ul>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--danger)', background: 'linear-gradient(180deg, rgba(239,68,68,0.05) 0%, rgba(18,18,26,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: 'rgba(239,68,68,0.2)', padding: '8px', borderRadius: '8px', display: 'flex' }}><Target size={20} /></span> Areas to Improve
          </h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {weaknesses.map((w: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: 'rgba(176,132,255,0.2)', padding: '8px', borderRadius: '8px', display: 'flex' }}><TerminalSquare size={20} /></span> Suggested Practice Exercises
        </h3>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {practiceExercises.map((e: string, i: number) => (
            <li key={i} style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{e}</li>
          ))}
        </ul>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
          </div>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '1rem', fontFamily: 'var(--font-mono)' }}>interview-transcript.log</h3>
        </div>
        <div style={{ background: '#050505', padding: '2rem', maxHeight: '400px', overflowY: 'auto' }}>
          <p style={{ color: '#a1a1aa', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {feedback.transcript}
          </p>
        </div>
      </div>

    </main>
  );
}
