import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FeedbackLoader from '@/components/FeedbackLoader';

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

      <div className="glass-panel" style={{ padding: '3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '3rem' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overall Score</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feedback.overallFeedback}</p>
        </div>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '4px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{feedback.score}</span>
          <span style={{ color: 'var(--text-secondary)' }}>/ 100</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--success)' }}>Strengths 💪</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {strengths.map((s: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)' }}>{s}</li>
            ))}
          </ul>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--danger)' }}>Areas to Improve 🎯</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {weaknesses.map((w: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)' }}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Suggested Practice Exercises 💻</h3>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {practiceExercises.map((e: string, i: number) => (
            <li key={i} style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{e}</li>
          ))}
        </ul>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Raw Transcript 📝</h3>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', maxHeight: '300px', overflowY: 'auto' }}>
          <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            {feedback.transcript}
          </p>
        </div>
      </div>

    </main>
  );
}
