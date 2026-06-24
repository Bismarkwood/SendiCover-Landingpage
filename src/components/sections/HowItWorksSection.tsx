import { useState } from 'react';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/HowItWorksSection.css';

/* ── Step data ── */
interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Choose your plan',
    description: 'Browse products and select the cover that fits your needs.',
  },
  {
    id: 2,
    title: 'Apply in minutes',
    description: 'Browse products and select the cover that fits your needs.',
  },
  {
    id: 3,
    title: 'Stay protected',
    description: 'Premiums are collected automatically. Your family is covered from day one.',
  },
];

/* ── Placeholder screens — replace with actual screenshots later ── */
const SCREENS: Record<number, string | null> = {
  1: null, // Replace with screenshot URL/import
  2: null,
  3: null,
};

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="hiw-section" id="how-it-works">
      {/* Background */}
      <img src={getAQuoteBg} alt="" className="hiw-bg-img" aria-hidden="true" />
      <div className="hiw-bg-overlay" />

      <div className="hiw-container">
        {/* Section header */}
        <div className="hiw-header">
          <span className="hiw-pill">HOW IT WORKS</span>
          <h2 className="hiw-heading">Cover in three simple steps.</h2>
        </div>

        {/* Two-column content */}
        <div className="hiw-content">

          {/* ── Left: iPhone Mockup ── */}
          <div className="hiw-phone-col">
            <div className="hiw-phone">
              <div className="hiw-phone-frame">
                {/* Notch */}
                <div className="hiw-phone-notch">
                  <div className="hiw-phone-notch-inner" />
                </div>

                {/* Status bar */}
                <div className="hiw-phone-status">
                  <span className="hiw-status-time">9:41</span>
                  <div className="hiw-status-icons">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 0 0-6 0zm-4-4l2 2a7.07 7.07 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="17" y="4" width="5" height="16" rx="1"/><rect x="11" y="8" width="4" height="12" rx="1"/><rect x="5" y="12" width="4" height="8" rx="1"/></svg>
                  </div>
                </div>

                {/* Screen content */}
                <div className="hiw-phone-screen">
                  {Object.entries(SCREENS).map(([key, src]) => (
                    <div
                      key={key}
                      className={`hiw-screen-slide ${Number(key) === activeStep ? 'hiw-screen-slide--active' : ''}`}
                    >
                      {src ? (
                        <img src={src} alt={`Step ${key} screen`} className="hiw-screen-img" />
                      ) : (
                        /* Placeholder screen design */
                        <div className="hiw-screen-placeholder">
                          <div className="hiw-sp-header">
                            <span className="hiw-sp-logo">Sendi❤</span>
                            <div className="hiw-sp-header-btns">
                              <span className="hiw-sp-btn-small">EN ▾</span>
                              <span className="hiw-sp-btn-small">Get Help</span>
                            </div>
                          </div>
                          <div className="hiw-sp-hero">
                            <span className="hiw-sp-hero-text">
                              {Number(key) === 1 && "Let's set up your Account"}
                              {Number(key) === 2 && "Enter your details"}
                              {Number(key) === 3 && "You're all set!"}
                            </span>
                          </div>
                          <div className="hiw-sp-card">
                            <div className="hiw-sp-field" />
                            <div className="hiw-sp-field" />
                            <div className="hiw-sp-field hiw-sp-field--short" />
                            <div className="hiw-sp-cta">Continue</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Home indicator */}
                <div className="hiw-phone-home-bar" />
              </div>
            </div>
          </div>

          {/* ── Divider line ── */}
          <div className="hiw-divider" />

          {/* ── Right: Steps ── */}
          <div className="hiw-steps-col">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`hiw-step-card ${activeStep === step.id ? 'hiw-step-card--active' : ''}`}
                onMouseEnter={() => setActiveStep(step.id)}
                onClick={() => setActiveStep(step.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveStep(step.id); }}
                aria-pressed={activeStep === step.id}
              >
                <div className="hiw-step-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <path d="M9 22v-4h6v4"/>
                    <path d="M8 6h.01M8 10h.01M8 14h.01M12 6h4M12 10h4M12 14h4"/>
                  </svg>
                </div>
                <div className="hiw-step-content">
                  <span className="hiw-step-number">Step 0{step.id}</span>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
