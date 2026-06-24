import ctaBannerImg from '../../assets/CTA BANNER.png';
import '../../styles/CTABannerSection.css';

export function CTABannerSection() {
  return (
    <section className="cta-banner-section" id="waitlist">
      {/* Background image */}
      <img src={ctaBannerImg} alt="" className="cta-banner-bg" aria-hidden="true" />
      <div className="cta-banner-overlay" />

      <div className="cta-banner-content">
        <h2 className="cta-banner-heading">Start protecting your family today</h2>
        <p className="cta-banner-text">
          It takes less than five minutes. No paperwork. No hassle. Just protection that reaches the
          people you love, wherever home is.
        </p>

        {/* App store buttons */}
        <div className="cta-banner-buttons">
          {/* Apple App Store */}
          <a href="#" className="cta-store-btn" aria-label="Download on the App Store">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="cta-store-text">
              <span className="cta-store-small">Download on the</span>
              <span className="cta-store-name">App Store</span>
            </div>
          </a>

          {/* Google Play */}
          <a href="#" className="cta-store-btn" aria-label="Get it on Google Play">
            <svg width="20" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3.61 1.81L13.42 12 3.61 22.19c-.39-.35-.61-.87-.61-1.44V3.25c0-.57.22-1.09.61-1.44z" fill="#4285F4"/>
              <path d="M16.89 8.53L5.06.5C4.56.22 4 .17 3.51.36l9.91 11.64 3.47-3.47z" fill="#EA4335"/>
              <path d="M3.51 23.64c.49.19 1.05.14 1.55-.14l11.83-8.03-3.47-3.47-9.91 11.64z" fill="#34A853"/>
              <path d="M20.16 10.35l-3.27-1.82-3.47 3.47 3.47 3.47 3.27-1.82c.88-.49.88-1.82 0-3.3z" fill="#FBBC05"/>
            </svg>
            <div className="cta-store-text">
              <span className="cta-store-small">GET IT ON</span>
              <span className="cta-store-name">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
