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

        <a href="/waitlist" className="cta-banner-btn">Join Waitlist</a>
      </div>
    </section>
  );
}
