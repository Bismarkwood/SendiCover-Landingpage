import heroBg from '../../assets/Hero section Bg.png'
import '../../styles/HeroSection.css'

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      {/* Full-bleed background image — shield glow is part of the photo */}
      <img
        src={heroBg}
        alt=""
        className="hero-bg-image"
        aria-hidden="true"
        loading="eager"
      />

      {/* Dark gradient overlay — lighter since image is already bright */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero Content — centered */}
      <div className="hero-content">
        <h1 className="hero-heading">
          Protect the people you love,<br />
          wherever they are.
        </h1>

        <p className="hero-subtext">
          With Protect, you can look after the people who matter most, with life, health and funeral cover that
          reaches loved ones across borders, no matter how far away they are. Simple to set up. Affordable
          premiums. Paid directly from your phone
        </p>

        {/* App Store Badges */}
        <div className="hero-badges">
          {/* Apple App Store */}
          <a
            href="#app-store"
            className="hero-badge-btn"
            aria-label="Download on the App Store"
          >
            <svg
              className="hero-badge-icon"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="hero-badge-text">
              <span className="hero-badge-label">Download on the</span>
              <span className="hero-badge-store">App Store</span>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="#google-play"
            className="hero-badge-btn"
            aria-label="Get it on Google Play"
          >
            <svg
              className="hero-badge-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3.18 23.76c.3.17.64.24.99.2l12.82-11.75L13.43 8.8 3.18 23.76z" fill="#EA4335" />
              <path d="M20.54 10.6l-3.12-1.79-3.99 3.66 3.99 3.66 3.15-1.81c.9-.52.9-1.78-.03-2.72z" fill="#FBBC04" />
              <path d="M3.18.24c-.6.34-.97.97-.97 1.76v20c0 .79.37 1.42.97 1.76l.12.07 11.2-11.2v-.26L3.3.17l-.12.07z" fill="#4285F4" />
              <path d="M3.3 23.83l.12.07 11.2-11.2v-.26L3.3.17.97.24l.12 23.35z" fill="#34A853" />
            </svg>
            <div className="hero-badge-text">
              <span className="hero-badge-label">GET IT ON</span>
              <span className="hero-badge-store">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
