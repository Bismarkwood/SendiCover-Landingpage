import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import { InvestmentCalculator } from './InvestmentCalculator';
import '../../styles/QuoteSection.css';

export function QuoteSection() {
  return (
    <section className="quote-section" id="quote">
      {/* Background image overlay */}
      <img src={getAQuoteBg} alt="" className="quote-bg-img" aria-hidden="true" />

      <div className="quote-container">

        {/* Pill */}
        <div className="quote-pill">GET A QUOTE</div>

        {/* Heading */}
        <h2 className="quote-heading">
          Get a personalised quote in seconds.
        </h2>

        {/* Trust badges */}
        <div className="quote-badges">
          <span className="quote-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            Plans designed to fit every budget
          </span>
          <span className="quote-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            No hidden fee
          </span>
          <span className="quote-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Cancel anytime
          </span>
        </div>

        {/* Investment Calculator replacing the image card */}
        <InvestmentCalculator />

      </div>
    </section>
  );
}
