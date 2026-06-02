import { createInterview } from '@/app/actions/interview'

export default function SetupInterviewPage() {
  return (
    <main className="container animate-fade-in" style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Configure Interview</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', textAlign: 'center' }}>
          Tell us about the role you are applying for so the AI can tailor the questions.
        </p>

        <form action={createInterview} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Target Role</label>
            <input 
              type="text" 
              name="role" 
              placeholder="e.g. Frontend Engineer, Product Manager" 
              required
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Experience Level</label>
            <select name="level" required style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(26, 29, 39, 1)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', appearance: 'none' }}>
              <option value="Intern">Intern / Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Staff">Staff / Principal</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Primary Tech Stack / Domain</label>
            <input 
              type="text" 
              name="techStack" 
              placeholder="e.g. React, Node.js, AWS or Agile, JIRA" 
              required
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none' }} 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '1.25rem', marginTop: '1rem', fontSize: '1.1rem' }}>
            Initialize AI Interviewer
          </button>
        </form>
      </div>
      
    </main>
  );
}
