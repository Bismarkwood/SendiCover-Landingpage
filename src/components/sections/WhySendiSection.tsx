import { useScrollReveal } from '../../hooks/useScrollReveal';
import '../../styles/WhySendiSection.css';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Built for people living abroad',
    description: 'Designed around how diaspora families support parents and loved ones back home.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: 'One place to manage everything',
    description: 'Payments, reminders, updates, and support through Sendi.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Clear cover options',
    description: 'Simple categories across funeral, life, health, and critical illness protection.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Not just emergency transfers',
    description: 'A more planned way to support your family before pressure hits.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Supportive customer experience',
    description: 'Plain English updates and help when your family needs guidance.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Made for modern diaspora families',
    description: 'Built for cross-border lives, family responsibility, and long-term care.',
  },
];

export function WhySendiSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="wss-section">
      {/* Top header area */}
      <div className="wss-top">
        <div className="wss-header">
          <span className="wss-label">WHY SENDI WORKS</span>
          <h2 className="wss-heading">
            Protection Isn't<br />
            The Future, It's<br />
            The Now.
          </h2>
        </div>
        <p className="wss-desc">
          Sendi makes it simple for people in the diaspora to arrange real, meaningful protection
          for their families back home — without complexity, delays, or confusion.
        </p>
      </div>

      {/* Features grid with dividers */}
      <div className={`wss-features ${isVisible ? 'wss-features--visible' : ''}`} ref={ref}>
        {FEATURES.map((feat, i) => (
          <div key={i} className="wss-feature" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="wss-feature-icon">{feat.icon}</div>
            <h3 className="wss-feature-title">{feat.title}</h3>
            <p className="wss-feature-desc">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
