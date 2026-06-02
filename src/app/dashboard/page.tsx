import Link from 'next/link';
import { getCurrentUser } from '@/app/actions/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const pastInterviews = await prisma.interview.findMany({
    where: { userId: user.id },
    include: { feedback: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Your <span className="gradient-text">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name} {user.isGuest && '(Guest)'}</p>
        </div>
        <Link href="/interview/setup">
          <button className="btn btn-primary">Start New Interview</button>
        </Link>
      </div>

      {pastInterviews.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No interviews yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Ready to practice? Start your first mock interview now.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {pastInterviews.map((interview: any) => (
            <div key={interview.id} className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{interview.role}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{interview.level} | {interview.techStack}</p>
                </div>
                {interview.status === 'completed' ? (
                  <span style={{ background: 'rgba(0, 184, 148, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>Completed</span>
                ) : (
                  <span style={{ background: 'rgba(214, 48, 49, 0.1)', color: 'var(--danger)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>Pending</span>
                )}
              </div>
              
              <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Date: {interview.createdAt.toLocaleDateString()}
              </div>

              {interview.status === 'completed' && interview.feedback && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>AI Score</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{interview.feedback.score}/100</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${interview.feedback.score}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              )}

              {interview.status === 'completed' ? (
                <Link href={`/interview/${interview.id}/feedback`}>
                  <button className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem' }}>
                    View Feedback
                  </button>
                </Link>
              ) : (
                <Link href={`/interview/${interview.id}`}>
                  <button className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem' }}>
                    Resume Interview
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
