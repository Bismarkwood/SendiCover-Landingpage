import '../../styles/TestimonialSection.css';

const testimonials = [
  {
    name: 'Abena Mensah',
    title: 'London, UK',
    rating: 5,
    quote: '"I worry about my mum every single day. I need something like this in my life."',
    route: 'UK → Ghana',
    color: '#1e3a8a',
  },
  {
    name: 'Chidi Okafor',
    title: 'Toronto, Canada',
    rating: 5,
    quote: '"My parents have no cover back home and I have been trying to fix that for years."',
    route: 'Canada → Nigeria',
    color: '#0369a1',
  },
  {
    name: 'Wanjiru Kamau',
    title: 'Paris, France',
    rating: 5,
    quote: '"I never thought a product like this would exist for people like us. I am signing up."',
    route: 'France → Kenya',
    color: '#065f46',
  },
  {
    name: 'Fatima Benali',
    title: 'Brussels, Belgium',
    rating: 5,
    quote: '"Living abroad does not mean you stop worrying about home. This is exactly what I need."',
    route: 'Belgium → Morocco',
    color: '#7c3aed',
  },
  {
    name: 'Kofi Darko',
    title: 'New York, USA',
    rating: 5,
    quote: '"I scrambled for funeral money last year. I cannot go through that again."',
    route: 'USA → Ghana',
    color: '#b45309',
  },
  {
    name: 'Aminata Diallo',
    title: 'Lyon, France',
    rating: 5,
    quote: '"I have been looking for something like this since I moved to France. Finally."',
    route: 'France → Senegal',
    color: '#be185d',
  },
  {
    name: 'Emeka Eze',
    title: 'Houston, USA',
    rating: 5,
    quote: '"I sent the waitlist link to my whole family group chat. We all need this."',
    route: 'USA → Nigeria',
    color: '#1e3a8a',
  },
  {
    name: 'Aïssatou Traoré',
    title: 'Montreal, Canada',
    rating: 5,
    quote: '"Managing cover for my family from abroad has always felt impossible. Not anymore."',
    route: 'Canada → Guinea',
    color: '#0369a1',
  },
  {
    name: 'Grace Achieng',
    title: 'Antwerp, Belgium',
    rating: 5,
    quote: '"Something went wrong back home last year and I was not prepared. This fixes that."',
    route: 'Belgium → Kenya',
    color: '#065f46',
  },
  {
    name: 'Youssef El Fassi',
    title: 'Washington DC, USA',
    rating: 5,
    quote: '"Long overdue. I am on the waitlist and I am not waiting long before signing up."',
    route: 'USA → Morocco',
    color: '#7c3aed',
  },
  {
    name: 'Ngozi Adeyemi',
    title: 'Manchester, UK',
    rating: 5,
    quote: '"The diaspora community has needed something like this for a very long time."',
    route: 'UK → Nigeria',
    color: '#b45309',
  },
  {
    name: 'Koffi Kouassi',
    title: 'Liège, Belgium',
    rating: 5,
    quote: '"I have been carrying this worry alone for years. Sendi Cova feels like a real answer."',
    route: 'Belgium → Ivory Coast',
    color: '#be185d',
  },
  {
    name: 'Amara Ndiaye',
    title: 'Vancouver, Canada',
    rating: 5,
    quote: '"Finally something built for people in my situation. I joined the waitlist immediately."',
    route: 'Canada → Senegal',
    color: '#1e3a8a',
  },
  {
    name: 'Wambui Njoroge',
    title: 'Marseille, France',
    rating: 5,
    quote: '"This speaks to a real problem. Every diaspora person I know will want this."',
    route: 'France → Kenya',
    color: '#0369a1',
  },
  {
    name: 'Tunde Bakare',
    title: 'Calgary, Canada',
    rating: 5,
    quote: '"I did not think this kind of product would come so soon. I am ready for it."',
    route: 'Canada → Nigeria',
    color: '#065f46',
  },
];

const row1 = testimonials.slice(0, 8);
const row2 = testimonials.slice(8, 15);

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
