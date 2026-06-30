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
        <div className="quote-pill">CHECK COVERAGE</div>

        {/* Heading */}
        <h2 className="quote-heading">
          Check what protection is available for your family's country.
        </h2>

        {/* Sub content */}
        <p className="quote-subtext">
          Sendi is made for diaspora families supporting loved ones in African countries. Availability can vary by country and cover type, so checking is the best first step.
        </p>

        {/* Investment Calculator replacing the image card */}
        <InvestmentCalculator />

      </div>
    </section>
  );
}
