import { useState } from 'react';
import problemImg1 from '../../assets/problem-1.png';
import lifeImg from '../../assets/life insurance image.png';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/CoverShowcase.css';

interface Slide {
  id: string;
  label: string;
  heading: string;
  items: string[];
  theme: 'problem' | 'solution';
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 'without',
    label: 'Without Sendi',
    heading: 'Reactive support',
    items: [
      'Urgent requests',
      'Unclear costs',
      'Emotional pressure',
      'Last-minute transfers',
    ],
    theme: 'problem',
    image: problemImg1,
  },
  {
    id: 'with',
    label: 'With Sendi',
    heading: 'Proactive protection',
    items: [
      'Planned cover',
      'Clear payments',
      'Reminders and updates',
      'One place to manage everything',
    ],
    theme: 'solution',
    image: lifeImg,
  },
];

export function CoverShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SLIDES[activeIdx];

  const prev = () => setActiveIdx(i => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setActiveIdx(i => (i === SLIDES.length - 1 ? 0 : i + 1));

  return (
    <section className="cs-section" id="cover-options">
      {/* Background image */}
      <img src={getAQuoteBg} alt="" className="cs-bg" aria-hidden="true" />
      <div className="cs-bg-overlay" />

      <div className="cs-container">

        {/* Left: Image */}
        <div className="cs-image-col">
          <div className="cs-image-wrap">
            <img key={active.id} src={active.image} alt={active.heading} className="cs-image" />
          </div>
        </div>

        {/* Divider line */}
        <div className="cs-divider" />

        {/* Right: Content */}
        <div className="cs-content">
          <span className={`cs-label cs-label--${active.theme}`}>{active.label}</span>
          <h2 className="cs-heading">{active.heading}</h2>

          <div className="cs-list">
            {active.items.map((item, i) => (
              <div key={i} className="cs-list-item">
                <span className={`cs-list-icon cs-list-icon--${active.theme}`}>
                  {active.theme === 'problem' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </span>
                <span className="cs-list-text">{item}</span>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="cs-nav">
            <button className="cs-nav-btn" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <button className="cs-nav-btn cs-nav-btn--active" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
