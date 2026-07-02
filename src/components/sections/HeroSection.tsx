import heroSectionImg from '../../assets/Hero section.png'
import '../../styles/HeroSection.css'

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      {/* Background decorations */}
      <div className="hero-bg-glow hero-bg-glow--1" />
      <div className="hero-bg-glow hero-bg-glow--2" />
      <div className="hero-bg-grid" />
      <div className="hero-bg-circle hero-bg-circle--1" />
      <div className="hero-bg-circle hero-bg-circle--2" />
      <div className="hero-bg-circle hero-bg-circle--3" />

      <div className="hero-container">

        {/* Left: Content */}
        <div className="hero-left">
          <span className="hero-pill hero-anim hero-anim--1">
            <span className="hero-pill-dot" />
            Diaspora family protection across the world
          </span>

          <h1 className="hero-heading hero-anim hero-anim--2">
            Protection for your loved ones, <span className="hero-heading-blue">peace of mind abroad.</span>
          </h1>

          <p className="hero-subtext hero-anim hero-anim--3">
            Sendi helps people living abroad check availability and arrange funeral cover, life cover,
            health cover, and critical illness protection for loved ones across Africa.
          </p>

          {/* Cover type chips */}
          <div className="hero-chips hero-anim hero-anim--4">
            <span className="hero-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Life Cover
            </span>
            <span className="hero-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Health Cover
            </span>
            <span className="hero-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Funeral Cover
            </span>
            <span className="hero-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              Critical Illness
            </span>
          </div>

          {/* CTA */}
          <a href="/waitlist" className="hero-cta-btn hero-anim hero-anim--4">
            Join Waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Right: Image */}
        <div className="hero-right">
          <div className="hero-image-area hero-anim hero-anim--img">
            {/* Shield outline */}
            <svg className="hero-shield-outline" viewBox="0 0 200 240" fill="none">
              <path d="M100 10 L180 50 V140 C180 180 140 210 100 230 C60 210 20 180 20 140 V50 Z" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" className="hero-shield-path"/>
            </svg>

            {/* Image card */}
            <div className="hero-image-card">
              <img src={heroSectionImg} alt="Family protection" className="hero-card-img" />
            </div>

            {/* Location cards */}
            <div className="hero-badge hero-badge--london">
              <span className="hero-badge-flag">🇬🇧</span>
              <div className="hero-badge-text">
                <span className="hero-badge-label">You live in</span>
                <span className="hero-badge-city">London</span>
              </div>
            </div>

            <div className="hero-badge hero-badge--africa">
              <span className="hero-badge-flag">🌍</span>
              <div className="hero-badge-text">
                <span className="hero-badge-label">Your family is in</span>
                <span className="hero-badge-city">Africa</span>
              </div>
            </div>

            {/* Cover available */}
            <div className="hero-status-card hero-anim hero-anim--5">
              <span className="hero-status-dot" />
              Cover available
            </div>

            {/* Dotted route */}
            <svg className="hero-route" width="200" height="120" viewBox="0 0 200 120" fill="none">
              <path d="M20 100 C 50 20, 150 20, 180 100" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.2" className="hero-route-path"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
