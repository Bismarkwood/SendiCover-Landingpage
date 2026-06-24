import prudentialLogo from '../../assets/prudential-logo.webp';
import '../../styles/TrustSection.css';

const GhanaFlagCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="ghana-mask">
      <circle cx="12" cy="12" r="12" fill="white" />
    </mask>
    <g mask="url(#ghana-mask)">
      <rect width="24" height="8" fill="#CE1126" />
      <rect y="8" width="24" height="8" fill="#FCD116" />
      <rect y="16" width="24" height="8" fill="#006B3F" />
      <path d="M12 9l1 3h3l-2.5 1.5 1 3-2.5-2-2.5 2 1-3-2.5-1.5h3l1-3z" fill="#000000" />
    </g>
  </svg>
);

const NigeriaFlagCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="nigeria-mask">
      <circle cx="12" cy="12" r="12" fill="white" />
    </mask>
    <g mask="url(#nigeria-mask)">
      <rect width="8" height="24" fill="#008751" />
      <rect x="8" width="8" height="24" fill="#FFFFFF" />
      <rect x="16" width="8" height="24" fill="#008751" />
    </g>
  </svg>
);

export function TrustSection() {
  return (
    <section className="trust-section">
      <div className="trust-container">
        
        {/* Column 1 */}
        <div className="trust-column">
          <span className="trust-text">Insurance provided by</span>
          <img src={prudentialLogo} alt="Prudential" className="trust-logo" loading="lazy" />
        </div>

        <div className="trust-divider" />

        {/* Column 2 */}
        <div className="trust-column trust-center">
          <p className="trust-text">
            Trusted by families with loved<br />
            ones across borders.
          </p>
        </div>

        <div className="trust-divider" />

        {/* Column 3 */}
        <div className="trust-column">
          <span className="trust-text">Protect your loved ones living in</span>
          <div className="trust-flags">
            <div className="flag-box">
              <GhanaFlagCircle />
            </div>
            <div className="flag-box">
              <NigeriaFlagCircle />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
