import ukGhanaImg from '../../assets/UK to Ghana family protection.png';
import ukNigeriaImg from '../../assets/UK to Nigeria family cover.png';
import usAfricaImg from '../../assets/US to Africa health cover.png';
import canadaKenyaImg from '../../assets/Canada to Kenya protection.png';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/HowItWorksSection.css';

const CARDS = [
  {
    id: 1,
    title: 'UK to Ghana family protection',
    description: 'Check cover for parents and loved ones in Ghana.',
    image: ukGhanaImg,
  },
  {
    id: 2,
    title: 'UK to Nigeria family cover',
    description: 'Explore protection options for family in Nigeria.',
    image: ukNigeriaImg,
  },
  {
    id: 3,
    title: 'US to Africa health cover',
    description: 'Support parents and loved ones with planned health protection.',
    image: usAfricaImg,
  },
  {
    id: 4,
    title: 'Canada to Kenya protection',
    description: 'Arrange family protection for loved ones from abroad.',
    image: canadaKenyaImg,
  },
];

export function HowItWorksSection() {
  return (
    <section className="hiw-section" id="how-it-works">
      {/* Background */}
      <img src={getAQuoteBg} alt="" className="hiw-bg" aria-hidden="true" />
      <div className="hiw-bg-overlay" />

      <div className="hiw-container">
        {/* Header */}
        <div className="hiw-header">
          <span className="hiw-pill">Popular searches</span>
          <h2 className="hiw-heading">Protection for the family corridors people search for most.</h2>
          <p className="hiw-subtext">
            Sendi is designed for people abroad looking for funeral cover, health cover, life cover,
            and critical illness protection for family in African countries.
          </p>
        </div>

        {/* Cards grid */}
        <div className="hiw-cards">
          {CARDS.map((card) => (
            <a href="#quote" key={card.id} className="hiw-card">
              <img src={card.image} alt={card.title} className="hiw-card-img" />
              <div className="hiw-card-overlay" />
              <div className="hiw-card-content">
                <h3 className="hiw-card-title">{card.title}</h3>
                <p className="hiw-card-desc">{card.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
