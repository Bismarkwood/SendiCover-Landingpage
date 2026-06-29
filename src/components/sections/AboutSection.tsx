import problemImg1 from '../../assets/problem-1.png';
import '../../styles/AboutSection.css';

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Left: Content */}
        <div className="about-content">
          <span className="about-label">✦ About Us</span>

          <h2 className="about-heading">
            What is Sendi?
          </h2>

          <p className="about-text">
            Sendi is a cross-border family protection service for people in the diaspora who want to
            arrange funeral, life, health, or critical illness cover for parents, spouses, children,
            siblings, and other loved ones back home in Africa.
          </p>

          <a href="#products" className="about-btn">
            Explore Cover Options
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>

        {/* Right: Image */}
        <div className="about-image-col">
          <img src={problemImg1} alt="Families protected across borders" className="about-image" loading="lazy" />
        </div>

      </div>
    </section>
  );
}
