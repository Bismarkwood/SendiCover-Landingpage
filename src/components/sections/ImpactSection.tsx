import problemImg2 from '../../assets/problem-2.png';
import '../../styles/ImpactSection.css';

const STATS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Check availability',
    text: 'Tell us where you live and where your loved one is based.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Choose the protection need',
    text: 'Funeral cover, life cover, health cover, or critical illness support.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Manage it through Sendi',
    text: 'Payments, reminders, updates, and support in one place.',
  },
];

export function ImpactSection() {
  return (
    <section className="impact-section">
      {/* Top content area */}
      <div className="impact-top">
        <div className="impact-header">
          <span className="impact-label">HOW SENDI HELPS</span>
          <h2 className="impact-heading">A simpler way to protect loved ones across borders.</h2>
        </div>
        <p className="impact-desc">
          Every policy is underwritten by Prudential, a global leader in life and health insurance.
          We handle the technology so your family gets protected — fast, simple, and reliable.
        </p>
      </div>

      {/* Stats row */}
      <div className="impact-stats">
        {STATS.map((stat, i) => (
          <div key={i} className="impact-stat">
            <span className="impact-stat-step">Step {i + 1}</span>
            <div className="impact-stat-icon">{stat.icon}</div>
            <h3 className="impact-stat-title">{stat.title}</h3>
            <p className="impact-stat-text">{stat.text}</p>
          </div>
        ))}
      </div>

      {/* Full-width image */}
      <div className="impact-image-wrap">
        <img src={problemImg2} alt="Sendi impact" className="impact-image" loading="lazy" />
      </div>
    </section>
  );
}
