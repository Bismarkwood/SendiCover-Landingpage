import problemImg1 from '../../assets/problem-1.png';
import '../../styles/AboutSection.css';

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Built for diaspora families',
    desc: 'Arrange cover from abroad for loved ones back home.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Cover that feels planned',
    desc: 'Move from urgent support to structured protection.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: 'Simple to manage',
    desc: 'Check options, payments, and reminders in one place.',
  },
];

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* Background decorations */}
      <div className="about-bg-glow" />

      <div className="about-container">

        {/* Left: Content */}
        <div className="about-content">
          <span className="about-label">✦ About Us</span>
          <h2 className="about-heading">What is Sendi?</h2>
          <p className="about-text">
            Sendi is a cross-border family protection service for people in the diaspora who want to
            arrange funeral, life, health, or critical illness cover for parents, spouses, children,
            siblings, and other loved ones back home in Africa.
          </p>

          {/* Benefit cards */}
          <div className="about-benefits">
            {BENEFITS.map((b, i) => (
              <div key={i} className="about-benefit">
                <div className="about-benefit-icon">{b.icon}</div>
                <div className="about-benefit-text">
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Image */}
        <div className="about-image-col">
          <img src={problemImg1} alt="Diaspora family protection" className="about-image" />
        </div>

      </div>
    </section>
  );
}
