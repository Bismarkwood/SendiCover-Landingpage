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
    </section>
  )
}
