import '../../styles/FeaturesSection.css';

const features = [
  {
    id: 'trusted',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Trusted Protection',
    description: 'Backed by Prudential Life Insurance',
  },
  {
    id: 'family',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Protect Your Loved Ones',
    description: 'Plans for you, your spouse, children and family',
  },
  {
    id: 'affordable',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M12 15h.01"/>
      </svg>
    ),
    title: 'Affordable Plans',
    description: 'Flexible premiums that fit your budget',
  },
  {
    id: 'peace',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    title: 'Peace of Mind',
    description: 'Simple, reliable and designed for you',
  },
];

export function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feat, idx) => (
          <>
            <div key={feat.id} className="feature-item">
              <div className="feature-icon-wrap">
                {feat.icon}
              </div>
              <div className="feature-text">
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.description}</p>
              </div>
            </div>
            {idx < features.length - 1 && (
              <div key={`divider-${idx}`} className="feature-divider" />
            )}
          </>
        ))}
      </div>
    </section>
  );
}
