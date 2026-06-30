import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/CheckBarSection.css';

const COUNTRIES = [
  'Ghana','Nigeria','Kenya','Cameroon','DR Congo','Egypt','Ethiopia',
  'Morocco','Rwanda','Senegal','South Africa','Tanzania','Uganda','Zambia','Zimbabwe',
];

const SUPPORT_OPTIONS = [
  'Funeral cover',
  'Life cover',
  'Health cover',
  'Critical illness',
  'Not sure yet',
];

function InlineDropdown({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="cb-dropdown" ref={ref}>
      <button type="button" className={`cb-trigger ${open ? 'cb-trigger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span className={value ? 'cb-val' : 'cb-ph'}>{value || placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="cb-menu">
          {options.map(opt => (
            <li key={opt} className={`cb-opt ${opt === value ? 'cb-opt--active' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CheckBarSection() {
  const [userCountry, setUserCountry] = useState('');
  const [lovedCountry, setLovedCountry] = useState('');
  const [support, setSupport] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Navigate to waitlist with pre-filled data
    navigate('/waitlist');
  };

  return (
    <section className="cb-section">
      <img src={getAQuoteBg} alt="" className="cb-bg" aria-hidden="true" />
      <div className="cb-overlay" />

      <div className="cb-container">
        {/* Left: Waitlist prompt */}
        <div className="cb-prompt">
          <div className="cb-prompt-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </div>
          <div className="cb-prompt-text">
            <strong>Not ready to check yet?</strong>
            <span>Join the Sendi waitlist and we'll keep you updated about protection options for your family's country.</span>
          </div>
        </div>

        {/* Right: Inline form */}
        <div className="cb-form">
          <div className="cb-field">
            <label className="cb-label">Where do you live?</label>
            <InlineDropdown value={userCountry} onChange={setUserCountry} options={COUNTRIES} placeholder="Select your country" />
          </div>
          <div className="cb-field">
            <label className="cb-label">Where does your loved one live?</label>
            <InlineDropdown value={lovedCountry} onChange={setLovedCountry} options={COUNTRIES} placeholder="Select your country" />
          </div>
          <div className="cb-field">
            <label className="cb-label">What support are you interested in?</label>
            <InlineDropdown value={support} onChange={setSupport} options={SUPPORT_OPTIONS} placeholder="Select cover type" />
          </div>
          <div className="cb-field">
            <label className="cb-label">Email address</label>
            <input type="email" className="cb-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="cb-btn" onClick={handleSubmit}>Join Waitlist</button>
        </div>
      </div>

      <p className="cb-note">🔒 Your information is safe and will only be used to keep you updated about Sendi.</p>
    </section>
  );
}
