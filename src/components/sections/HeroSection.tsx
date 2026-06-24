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
          Protect the people you love,<br />
          wherever they are.
        </h1>

        <p className="hero-subtext hero-animate-text">
          With Protect, you can look after the people who matter most, with life, health and funeral cover that
          reaches loved ones across borders, no matter how far away they are. Simple to set up. Affordable
          premiums. Paid directly from your phone
        </p>

        {/* App Store Badges */}
        <div className="hero-badges hero-animate-badges">
          {/* Apple App Store */}
          <a href="#" className="hero-store-btn" aria-label="Download on the App Store">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="hero-store-text">
              <span className="hero-store-small">Download on the</span>
              <span className="hero-store-name">App Store</span>
            </div>
          </a>

          {/* Google Play */}
          <a href="#" className="hero-store-btn" aria-label="Get it on Google Play">
            <svg width="20" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3.61 1.81L13.42 12 3.61 22.19c-.39-.35-.61-.87-.61-1.44V3.25c0-.57.22-1.09.61-1.44z" fill="#4285F4"/>
              <path d="M16.89 8.53L5.06.5C4.56.22 4 .17 3.51.36l9.91 11.64 3.47-3.47z" fill="#EA4335"/>
              <path d="M3.51 23.64c.49.19 1.05.14 1.55-.14l11.83-8.03-3.47-3.47-9.91 11.64z" fill="#34A853"/>
              <path d="M20.16 10.35l-3.27-1.82-3.47 3.47 3.47 3.47 3.27-1.82c.88-.49.88-1.82 0-3.3z" fill="#FBBC05"/>
            </svg>
            <div className="hero-store-text">
              <span className="hero-store-small">GET IT ON</span>
              <span className="hero-store-name">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
