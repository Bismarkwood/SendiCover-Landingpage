import partnershipImg from '../../assets/Partnership Image.png';
import '../../styles/PartnershipSection.css';

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: '175+', label: 'customers worldwide' },
  { value: 'x%', label: 'of valid claims paid' },
  { value: 'x%', label: 'paid out in claims ([year])' },
  { value: '175+', label: 'years of trusted cover' },
];

export function PartnershipSection() {
  return (
    <section className="partnership-section">
      <div className="partnership-card">
        <div className="partnership-grid">

          {/* ── Left: Visual Card ── */}
          <div className="partnership-visual">
            <div className="partnership-image-wrap">
              <img src={partnershipImg} alt="Sendi and Prudential partnership" className="partnership-image" loading="lazy" />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="partnership-content">
            <span className="partnership-badge">PARTNERSHIP</span>

            <h2 className="partnership-heading">
              Backed by one of the world's most trusted insurers.
            </h2>

            <p className="partnership-text">
              Sendi is not the insurer, we are the technology platform that makes this solution
              possible. Every policy is underwritten and fully backed by Prudential, a global leader
              in life and health insurance with a presence across the globe. We make cover simple to
              access; Prudential carries the risk and pays every valid claim.
            </p>

            <p className="partnership-text">
              With over 175 years protecting families, Prudential has the scale, financial strength
              and claims expertise to stand behind your loved ones when it matters most.
            </p>

            {/* Stats */}
            <div className="partnership-stats">
              {STATS.map((stat, i) => (
                <div className="partnership-stat-card" key={i}>
                  <span className="partnership-stat-value">{stat.value}</span>
                  <span className="partnership-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
