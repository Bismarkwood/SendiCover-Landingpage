import problemImg1 from '../../assets/problem-1.png';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/ProblemSection.css';

const REACTIVE = [
  'Urgent requests',
  'Unclear costs',
  'Emotional pressure',
  'Last-minute transfers',
];

const PROACTIVE = [
  'Planned cover',
  'Clear payments',
  'Reminders and updates',
  'One place to manage everything',
];

export function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      {/* Background */}
      <img src={getAQuoteBg} alt="" className="problem-bg" aria-hidden="true" />
      <div className="problem-bg-overlay" />

      <div className="problem-container">

        {/* Left: Image */}
        <div className="problem-image-col">
          <img src={problemImg1} alt="Family support" className="problem-image" />
        </div>

        {/* Right: Content */}
        <div className="problem-content">
          <span className="problem-pill">THE PROBLEM</span>
          <h2 className="problem-heading">
            When something happens back home, the call often comes to you.
          </h2>
          <p className="problem-description">
            A hospital bill. A funeral cost. A family emergency. For many diaspora families,
            support starts when the pressure is already high. Sendi helps you plan before that moment.
          </p>

          {/* Two comparison cards */}
          <div className="problem-cards">
            {/* Reactive */}
            <div className="problem-card problem-card--reactive">
              <div className="problem-card-header">
                <span className="problem-card-icon problem-card-icon--red">!</span>
                <span className="problem-card-title problem-card-title--red">Reactive support</span>
              </div>
              <ul className="problem-card-list">
                {REACTIVE.map((item, i) => (
                  <li key={i}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Proactive */}
            <div className="problem-card problem-card--proactive">
              <div className="problem-card-header">
                <span className="problem-card-icon problem-card-icon--blue">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <span className="problem-card-title problem-card-title--blue">Proactive protection</span>
              </div>
              <ul className="problem-card-list">
                {PROACTIVE.map((item, i) => (
                  <li key={i}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
