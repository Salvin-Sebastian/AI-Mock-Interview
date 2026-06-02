import InterviewRoom from '@/components/InterviewRoom';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ActiveInterviewPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const interview = await prisma.interview.findUnique({
    where: { id }
  });

  if (!interview) {
    notFound();
  }

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{interview.role} Interview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Level: {interview.level} | Stack: {interview.techStack}</p>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Make sure you are in a quiet environment.</p>
      </div>
      
      <InterviewRoom interviewId={id} role={interview.role} level={interview.level} techStack={interview.techStack} />
      
    </main>
  );
}
