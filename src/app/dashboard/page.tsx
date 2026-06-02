import Link from 'next/link';

export default function DashboardPage() {
  // Hardcoded placeholder data until the database connection works
  const pastInterviews = [
    { id: '1', role: 'Frontend Developer', status: 'completed', score: 85, date: '2026-06-01' },
    { id: '2', role: 'Full Stack Engineer', status: 'completed', score: 92, date: '2026-05-28' },
    { id: '3', role: 'Product Manager', status: 'pending', score: null, date: '2026-05-25' },
  ];

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Your <span className="gradient-text">Dashboard</span></h1>
        <Link href="/interview/new">
          <button className="btn btn-primary">Start New Interview</button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {pastInterviews.map((interview) => (
          <div key={interview.id} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{interview.role}</h3>
              {interview.status === 'completed' ? (
                <span style={{ background: 'rgba(0, 184, 148, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>Completed</span>
              ) : (
                <span style={{ background: 'rgba(214, 48, 49, 0.1)', color: 'var(--danger)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>Pending</span>
              )}
            </div>
            
            <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Date: {interview.date}
            </div>

            {interview.status === 'completed' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>AI Score</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{interview.score}/100</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${interview.score}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                </div>
              </div>
            )}

            <button className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem' }} disabled={interview.status !== 'completed'}>
              {interview.status === 'completed' ? 'View Feedback' : 'Resume Interview'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
