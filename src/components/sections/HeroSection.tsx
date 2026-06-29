import heroBg from '../../assets/hero-section-bg.png'
import '../../styles/HeroSection.css'

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      {/* Full-bleed background image — shield glow is part of the photo */}
      <img
        src={heroBg}
        alt=""
        className="hero-bg-image hero-animate-bg"
        aria-hidden="true"
        loading="eager"
      />

      {/* Dark gradient overlay — lighter since image is already bright */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero Content — centered */}
      <div className="hero-content">
        <h1 className="hero-heading hero-animate-heading">
          Protection for your family back home,<br />
          arranged from abroad.
        </h1>

        <p className="hero-subtext hero-animate-text">
          Sendi helps people living abroad check availability and arrange funeral cover, life cover,
          health cover, and critical illness protection for loved ones across Africa.
        </p>

        {/* CTA Button */}
        <div className="hero-badges hero-animate-badges">
          <a href="#quote" className="hero-cta-btn">
            Check Availability
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Floating product cards bar */}
      <div className="hero-floating-bar">
        <div className="hero-floating-bar-inner">
          <span className="hero-float-scroll">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14"/><polyline points="19 12 12 19 5 12"/>
            </svg>
            Scroll
          </span>
          <div className="hero-float-cards">
          <a href="#products" className="hero-float-card">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              <path d="M12 12s-1.5-2-3-2-2 1.5-2 3c0 2.5 3 4.5 5 6 2-1.5 5-3.5 5-6 0-1.5-.5-3-2-3-1.5 0-3 2-3 2z"/>
            </svg>
            Farewell Cover
          </a>
          <a href="#products" className="hero-float-card">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            Life Insurance
          </a>
          <a href="#products" className="hero-float-card">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8v8"/><path d="M8 12h8"/>
            </svg>
            Critical Illness
          </a>
        </div>
        </div>
      </div>
    </section>
  )
}
