import aboutImg from '../../assets/About Sendi.png';
import '../../styles/AboutSection.css';

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* Background decorations */}
      <div className="about-bg-glow" />

      <div className="about-container">

        {/* Left: Content */}
        <div className="about-content">
          <span className="about-label">✦ About Us</span>
          <h2 className="about-heading">What is Sendi?</h2>
          <p className="about-text">
            Sendi is a cross-border family protection service for people in the diaspora who want to
            arrange funeral, life, health, or critical illness cover for parents, spouses, children,
            siblings, and other loved ones back home in Africa.
          </p>

        </div>

        {/* Right: Image */}
        <div className="about-image-col">
          <img src={aboutImg} alt="Diaspora family protection" className="about-image" />
        </div>

      </div>
    </section>
  );
}
