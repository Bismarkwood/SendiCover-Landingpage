import '../../styles/TestimonialSection.css';

const testimonials = [
  {
    name: 'David Kim',
    title: 'Software Engineer',
    rating: 5,
    quote: '"Super simple to use. I love that I can see exactly what my family will receive. No hidden fees."',
    route: 'US → Kenya',
    color: '#1e3a8a',
  },
  {
    name: 'Priya Rao',
    title: 'Architect',
    rating: 5,
    quote: '"Fast, reliable, and secure. Customer support was helpful when I had a question. Highly recommend!"',
    route: 'Canada → India',
    color: '#0369a1',
  },
  {
    name: 'Sarah Jenkins',
    title: 'Freelance Designer',
    rating: 4,
    quote: '"Honestly the best app I\'ve used. Money arrives instantly and the rates are better than my bank."',
    route: 'UK → Ghana',
    color: '#065f46',
  },
  {
    name: 'Amy Lee',
    title: 'Marketing Manager',
    rating: 5,
    quote: '"Payments are always on time. The app gives me total peace of mind."',
    route: 'US → Nigeria',
    color: '#7c3aed',
  },
  {
    name: 'Michael T.',
    title: 'Business Consultant',
    rating: 5,
    quote: '"The speed is incredible. I sent money to Lagos and it was there before I could even text my mom."',
    route: 'UK → Nigeria',
    color: '#b45309',
  },
  {
    name: 'Elena Garcia',
    title: 'Digital Nomad',
    rating: 5,
    quote: '"I\'ve tried Wise, Remitly, all of them. Sendi is by far the cleanest experience. I love the design."',
    route: 'Spain → Colombia',
    color: '#be185d',
  },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="ts-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
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
          {t.name.charAt(0)}
        </div>
        <div className="ts-author">
          <span className="ts-name">{t.name}</span>
          <span className="ts-role">{t.title}</span>
        </div>
        <StarRating rating={t.rating} />
      </div>
      <p className="ts-quote">{t.quote}</p>
      <span className="ts-route">{t.route}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
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
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
