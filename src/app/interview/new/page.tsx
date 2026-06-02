import InterviewRoom from '@/components/InterviewRoom';

export default function NewInterviewPage() {
  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Start Mock Interview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Make sure you are in a quiet environment and your microphone is allowed.</p>
      </div>
      
      <InterviewRoom 
        interviewId="demo"
        role="Software Engineer"
        level="Mid-Level"
        techStack="React, Next.js, TypeScript"
      />
      
    </main>
  );
}
