import { useState } from 'react';
import heroBg from '../../assets/hero-section-bg.png';
import lifeImg from '../../assets/life insurance image.png';
import criticalImg from '../../assets/Critical Illness.png';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/CoverShowcase.css';

interface CoverItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

const COVERS: CoverItem[] = [
  {
    id: 'farewell',
    label: 'Farewell Cover',
    title: 'Funeral support when your family needs it most.',
    description: 'Protect your loved ones from funeral costs with fully arranged funeral services and a cash payout for extra expenses. Affordable premiums, immediate cover for accidental death.',
    image: heroBg,
  },
  {
    id: 'life',
    label: 'Life Insurance',
    title: 'Secure your family\'s financial future, from anywhere.',
    description: 'Ensure your loved ones are financially protected even when you are no longer around. Life insurance designed for peace of mind with flexible payout options.',
    image: lifeImg,
  },
  {
    id: 'critical',
    label: 'Critical Illness',
    title: 'Focus on recovery, not the cost of treatment.',
    description: 'Get a lump-sum cash payout if a loved one is diagnosed with a covered critical illness, so they can afford the best care without financial stress.',
    image: criticalImg,
  },
];

export function CoverShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = COVERS[activeIdx];

  const prev = () => setActiveIdx(i => (i === 0 ? COVERS.length - 1 : i - 1));
  const next = () => setActiveIdx(i => (i === COVERS.length - 1 ? 0 : i + 1));

  return (
    <section className="cs-section" id="cover-options">
      {/* Background image */}
      <img src={getAQuoteBg} alt="" className="cs-bg" aria-hidden="true" />
      <div className="cs-bg-overlay" />

      <div className="cs-container">

        {/* Left: Image */}
        <div className="cs-image-col">
          <div className="cs-image-wrap">
            <img key={active.id} src={active.image} alt={active.label} className="cs-image" />
            <div className="cs-image-label">{active.label}</div>
          </div>
        </div>

        {/* Divider line */}
        <div className="cs-divider" />

        {/* Right: Content */}
        <div className="cs-content">
          <span className="cs-label">COVER OPTIONS</span>
          <h2 className="cs-heading">{active.title}</h2>
          <p className="cs-text">{active.description}</p>

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
