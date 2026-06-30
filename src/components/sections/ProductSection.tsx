import '../../styles/ProductSection.css';

const COVERS = [
  {
    id: 'health',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Health Cover',
    description: 'Pays for your family member\'s medical treatment and hospital care wherever they are.',
  },
  {
    id: 'life-funeral',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    title: 'Life And Funeral Cover',
    description: 'Provides a lump sum to your nominated family in Ghana on the passing of the insured relative, covering funeral costs and family support.',
  },
  {
    id: 'accident-illness',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v8"/><path d="M8 12h8"/>
      </svg>
    ),
    title: 'Accident And Illness Cover',
    description: 'Pays out if your loved one suffers a serious accident or is diagnosed with a critical illness.',
  },
  {
    id: 'property',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Property And Home Cover',
    description: 'Protects a house, building project, or assets against damage and loss.',
  },
];

export function ProductSection() {
  return (
    <section className="product-section" id="products">
      <div className="product-container">

        {/* Header */}
        <div className="product-header">
          <div className="product-pill">COVER OPTIONS</div>
          <h2 className="product-heading">Protection cover for the moments people worry about the most.</h2>
          <p className="product-subtext">
            Cova offers protection that matters to your loved ones across borders. Cover is underwritten by our insurance partners. Options and terms may vary by country.
          </p>
        </div>

        {/* Cover cards grid */}
        <div className="product-cards-grid">
          {COVERS.map((cover) => (
            <div key={cover.id} className="product-cover-card">
              <div className="product-cover-icon">{cover.icon}</div>
              <h3 className="product-cover-title">{cover.title}</h3>
              <p className="product-cover-desc">{cover.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
