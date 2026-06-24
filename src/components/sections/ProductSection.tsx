import { useState } from 'react';
import heroBg from '../../assets/hero-section-bg.png';
import lifeImg from '../../assets/life insurance image.png';
import '../../styles/ProductSection.css';

const products = [
  {
    id: "farewell",
    tabLabel: "Farewell Cover",
    tabIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        <path d="M12 12s-1.5-2-3-2-2 1.5-2 3c0 2.5 3 4.5 5 6 2-1.5 5-3.5 5-6 0-1.5-.5-3-2-3-1.5 0-3 2-3 2z"/>
      </svg>
    ),
    pill: "Farewell Cover",
    title: "Funeral support when your family needs it most.",
    description: "Protect your loved ones from funeral costs with fully arranged funeral services and a cash payout for extra expenses.",
    benefitRange: "GHS 20,000 - GHS 1,000,000",
    image: heroBg,
    plans: [
      {
        theme: "blue",
        title: "Dignity Farewell Plan",
        subtitle: "Protect your family from funeral costs and arrangements in Ghana when a loved one passes away",
        features: [
          "Cash payout for additional expenses",
          "Covers spouse, children, and extended family",
          "Premiums waived after policyholder death",
          "Policy remains active after missed payments",
          "Accidental death covered immediately"
        ]
      },
      {
        theme: "yellow",
        title: "Ultimate Premier Farewell Plan",
        subtitle: "Provide your family with a cash payout and ongoing support when a covered family member dies.",
        features: [
          "Lump-sum death benefit payout",
          "Cashback every three claim-free years",
          "Grocery and airtime support after loss",
          "Covers parents, spouse, and children",
          "Premiums waived after policyholder death",
          "Policy remains active after missed payments"
        ]
      }
    ]
  },
  {
    id: "life",
    tabLabel: "Life Insurance",
    tabIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    pill: "Life Insurance",
    title: "Secure your family's future today.",
    description: "Ensure your loved ones are financially protected even when you are no longer around. Life insurance designed for peace of mind.",
    benefitRange: "GHS 50,000 - GHS 5,000,000",
    image: lifeImg,
    plans: [
      {
        theme: "blue",
        title: "Standard Life Plan",
        subtitle: "Basic life coverage for you and your family.",
        features: [
          "Lump-sum death benefit",
          "Affordable monthly premiums",
          "Policy remains active after missed payments"
        ]
      },
      {
        theme: "yellow",
        title: "Premium Life Plan",
        subtitle: "Comprehensive coverage with added benefits.",
        features: [
          "Higher payout limits",
          "Cashback after 5 claim-free years",
          "Includes critical illness rider",
          "Covers extended family"
        ]
      }
    ]
  },
  {
    id: "critical",
    tabLabel: "Critical Illness",
    tabIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    pill: "Critical Illness",
    title: "Focus on recovery, not medical bills.",
    description: "Get a lump-sum cash payout if you are diagnosed with a covered critical illness, so you can afford the best care.",
    benefitRange: "GHS 10,000 - GHS 500,000",
    image: heroBg,
    plans: [
      {
        theme: "blue",
        title: "Essential Health Plan",
        subtitle: "Coverage for major critical illnesses.",
        features: [
          "Covers cancer, heart attack, and stroke",
          "Lump-sum payout upon diagnosis",
          "No hospital admission required for payout"
        ]
      },
      {
        theme: "yellow",
        title: "Comprehensive Health Plan",
        subtitle: "Extensive coverage for peace of mind.",
        features: [
          "Covers up to 15 critical illnesses",
          "Includes hospitalization allowance",
          "Free annual health checkup",
          "Premiums waived upon diagnosis"
        ]
      }
    ]
  }
];

export function ProductSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function goToTab(idx: number) {
    setActiveIdx(idx);
    setAnimKey(k => k + 1);
  }

  const activeProduct = products[activeIdx];

  return (
    <section className="product-section" id="products">
      <div className="product-container">

        {/* Header */}
        <div className="product-header">
          <div className="product-pill">PRODUCT CATEGORY</div>
          <h2 className="product-heading">Choose the Protection That Fits Your Life</h2>
          <p className="product-subtext">
            Simple insurance plans powered by Prudential Life Insurance Ghana, designed to protect your family, your health, and your future.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="product-tabs">
          {products.map((p, idx) => (
            <button
              key={p.id}
              className={`product-tab ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => goToTab(idx)}
            >
              <span className="tab-icon">{p.tabIcon}</span>
              {p.tabLabel}
            </button>
          ))}
        </div>

        {/* Animated Content Area */}
        <div key={animKey} className="product-content-wrapper">

          {/* Left: Image & Badge */}
          <div className="product-image-side">
            <img
              src={activeProduct.image}
              alt={activeProduct.title}
              className="product-main-img"
              loading="lazy"
            />
            {activeProduct.id !== 'life' && activeProduct.id !== 'critical' && (
              <div className="product-benefit-badge">
                <div className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                    <path d="M12 12h.01"/>
                    <path d="M17 12h.01"/>
                    <path d="M7 12h.01"/>
                  </svg>
                </div>
                <div className="benefit-text">
                  <span className="benefit-label">Benefit Range</span>
                  <span className="benefit-value">{activeProduct.benefitRange}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Details & Plans */}
          <div className="product-details-side">
            <div className="product-detail-header">
              <div className="product-detail-pill">{activeProduct.pill}</div>
              <h3 className="product-detail-title">{activeProduct.title}</h3>
              <p className="product-detail-desc">{activeProduct.description}</p>
            </div>

            <div className="product-plans-grid">
              {activeProduct.plans.map((plan, i) => (
                <div key={i} className={`product-plan-card theme-${plan.theme}`}>
                  <div className="plan-card-header">
                    <div className="plan-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <div className="plan-header-text">
                      <h4>{plan.title}</h4>
                      <p>{plan.subtitle}</p>
                    </div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feat, j) => (
                      <li key={j}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feat-bullet">
                          <polyline points="9 11 12 14 22 4"/>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dashes */}
        <div className="product-progress">
          <div className="progress-dashes">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`progress-dash ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => goToTab(idx)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
