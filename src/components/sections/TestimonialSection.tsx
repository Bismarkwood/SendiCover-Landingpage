import '../../styles/TestimonialSection.css';

const testimonials = [
  {
    name: 'Mark Linberg',
    title: 'CEO of Artana',
    rating: 5,
    quote: '"Working with SendiPay has transformed the way we protect our family. Their reliable service has given us total peace of mind."',
    route: 'Canada → Ghana',
    avatar: 'ML',
    color: '#1e3a8a',
  },
  {
    name: 'Abena Mensah',
    title: 'Teacher, Accra',
    rating: 5,
    quote: '"I can now support my parents back home knowing there is a safety net. The funeral cover plan is incredibly affordable."',
    route: 'UK → Ghana',
    avatar: 'AM',
    color: '#0369a1',
  },
  {
    name: 'Kwame Osei',
    title: 'Software Engineer',
    rating: 5,
    quote: '"The critical illness cover gave my family security when we needed it most. Simple, fast and genuinely helpful."',
    route: 'USA → Ghana',
    avatar: 'KO',
    color: '#065f46',
  },
];

// Single row of 3 cards
const row1 = testimonials;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="ts-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < rating ? '#1e3a8a' : 'none'}
          stroke={i < rating ? '#1e3a8a' : '#cbd5e1'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="ts-card">
      <div className="ts-card-top">
        <div className="ts-avatar" style={{ background: t.color }}>
          {t.avatar}
        </div>
        <div className="ts-author">
          <span className="ts-name">{t.name}</span>
          <span className="ts-role">{t.title}</span>
        </div>
        <StarRating rating={t.rating} />
      </div>
      <p className="ts-quote">{t.quote}</p>
      <div className="ts-route">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
        {t.route}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  // Triplicate for truly seamless loop
  const track = [...items, ...items, ...items];
  return (
    <div className={`ts-marquee-wrap ${reverse ? 'ts-marquee-wrap--reverse' : ''}`}>
      <div className={`ts-track ${reverse ? 'ts-track--reverse' : 'ts-track--forward'}`}>
        {track.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialSection() {
  return (
    <section className="ts-section">
      <div className="ts-header">
        <div className="ts-pill">TESTIMONIALS</div>
        <h2 className="ts-heading">Built for families like yours</h2>
      </div>

      <div className="ts-rows">
        <MarqueeRow items={row1} />
      </div>
    </section>
  );
}
