import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAQuoteBg from '../../assets/Get a Quote Bg.png';
import '../../styles/CheckBarSection.css';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Brazil','Cameroon','Canada','China','Colombia','DR Congo','Egypt',
  'Ethiopia','France','Germany','Ghana','India','Indonesia','Ireland','Italy',
  'Japan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Pakistan','Philippines','Poland','Portugal','Rwanda','Saudi Arabia',
  'Senegal','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland',
  'Tanzania','Thailand','Turkey','UAE','Uganda','United Kingdom','United States','Vietnam','Zambia','Zimbabwe',
];

const SUPPORT_OPTIONS = [
  'Funeral cover',
  'Life cover',
  'Health cover',
  'Critical illness',
  'Not sure yet',
];

function InlineDropdown({ value, onChange, options, placeholder, searchable = false }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string; searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && searchable && inputRef.current) inputRef.current.focus();
  }, [open, searchable]);

  return (
    <div className="cb-dropdown" ref={ref}>
      <button type="button" className={`cb-trigger ${open ? 'cb-trigger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span className={value ? 'cb-val' : 'cb-ph'}>{value || placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="cb-menu">
          {searchable && (
            <li className="cb-search-wrap">
              <input ref={inputRef} type="text" className="cb-search-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
            </li>
          )}
          {filtered.length > 0 ? filtered.map(opt => (
            <li key={opt} className={`cb-opt ${opt === value ? 'cb-opt--active' : ''}`} onClick={() => { onChange(opt); setOpen(false); setSearch(''); }}>{opt}</li>
          )) : <li className="cb-opt cb-opt--empty">No results</li>}
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

      <a href="/waitlist" className="cb-heading">Join Waitlist</a>

      <div className="cb-container">
        {/* Inline form */}
        <div className="cb-form">
          <div className="cb-field">
            <label className="cb-label">Where do you live?</label>
            <InlineDropdown value={userCountry} onChange={setUserCountry} options={COUNTRIES} placeholder="Select your country" searchable />
          </div>
          <div className="cb-field">
            <label className="cb-label">Where does your loved one live?</label>
            <InlineDropdown value={lovedCountry} onChange={setLovedCountry} options={COUNTRIES} placeholder="Select your country" searchable />
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
