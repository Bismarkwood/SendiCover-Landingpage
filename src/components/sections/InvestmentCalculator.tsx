import { useState, useRef, useEffect } from 'react';
import '../../styles/InvestmentCalculator.css';

/* ── Data ── */
const ALL_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Brazil','Cameroon','Canada','China','Colombia','DR Congo','Egypt',
  'Ethiopia','France','Germany','Ghana','India','Indonesia','Ireland','Italy',
  'Japan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Pakistan','Philippines','Poland','Portugal','Rwanda','Saudi Arabia',
  'Senegal','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland',
  'Tanzania','Thailand','Turkey','UAE','Uganda','United Kingdom','United States','Vietnam','Zambia','Zimbabwe',
];

interface AfricanCountry {
  name: string;
  flag: string;
  available: boolean;
}

const AFRICAN_COUNTRIES: AfricanCountry[] = [
  { name: 'Ghana', flag: '🇬🇭', available: true },
  { name: 'Nigeria', flag: '🇳🇬', available: true },
  { name: 'Kenya', flag: '🇰🇪', available: true },
  { name: 'Cameroon', flag: '🇨🇲', available: false },
  { name: 'DR Congo', flag: '🇨🇩', available: false },
  { name: 'Egypt', flag: '🇪🇬', available: false },
  { name: 'Ethiopia', flag: '🇪🇹', available: false },
  { name: 'Morocco', flag: '🇲🇦', available: false },
  { name: 'Rwanda', flag: '🇷🇼', available: false },
  { name: 'Senegal', flag: '🇸🇳', available: false },
  { name: 'South Africa', flag: '🇿🇦', available: false },
  { name: 'Tanzania', flag: '🇹🇿', available: false },
  { name: 'Uganda', flag: '🇺🇬', available: false },
  { name: 'Zambia', flag: '🇿🇲', available: false },
  { name: 'Zimbabwe', flag: '🇿🇼', available: false },
];

const SUPPORT_OPTIONS = [
  'Funeral cover for a parent or loved one',
  'Life insurance for my family',
  'Health cover for someone back home',
  'Critical illness protection',
  'Not sure yet — just checking',
];

/* ── Searchable Dropdown ── */
function SelectDropdown({
  value, onChange, options, placeholder, error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div className="ca-dropdown-root" ref={ref}>
      <button
        type="button"
        className={`ca-dropdown-trigger ${error ? 'ca-dropdown-trigger--error' : ''} ${open ? 'ca-dropdown-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? 'ca-dropdown-value' : 'ca-dropdown-placeholder'}>
          {value || placeholder}
        </span>
        <svg className={`ca-dropdown-chevron ${open ? 'ca-dropdown-chevron--up' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="ca-dropdown-menu">
          {options.length > 8 && (
            <input
              ref={inputRef}
              type="text"
              className="ca-dropdown-search"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          )}
          <ul className="ca-dropdown-list">
            {filtered.length > 0 ? filtered.map(opt => (
              <li
                key={opt}
                className={`ca-dropdown-option ${opt === value ? 'ca-dropdown-option--active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); setSearch(''); }}
              >
                {opt}
                {opt === value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </li>
            )) : (
              <li className="ca-dropdown-option ca-dropdown-option--empty">No results found</li>
            )}
          </ul>
        </div>
      )}
      {error && <span className="ca-error">{error}</span>}
    </div>
  );
}

/* ── Main Component ── */
interface FormState {
  userCountry: string;
  lovedOneCountry: string;
  supportNeed: string;
}

export function InvestmentCalculator() {
  const [form, setForm] = useState<FormState>({ userCountry: '', lovedOneCountry: '', supportNeed: '' });
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});
  const [showResult, setShowResult] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setShowResult(false);
  };

  const validate = () => {
    const e: { [k: string]: string | undefined } = {};
    if (!form.userCountry) e.userCountry = 'Please select your country.';
    if (!form.lovedOneCountry) e.lovedOneCountry = 'Please select a country.';
    if (!form.supportNeed) e.supportNeed = 'Please select an option.';
    return e;
  };

  const handleCheck = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setShowResult(true);
  };

  const selectedCountry = AFRICAN_COUNTRIES.find(c => c.name === form.lovedOneCountry);
  const isAvailable = selectedCountry?.available ?? false;

  return (
    <div className="ca-card">
      <div className="ca-layout">

        {/* ── Left: Form ── */}
        <div className="ca-form-side">
          <h2 className="ca-heading">Check cover availability</h2>
          <p className="ca-subtext">
            See what family protection options may be available for your loved one. No payment required.
          </p>

          <div className="ca-fields">
            <div className="ca-fields-row">
              <div className="ca-field">
                <label className="ca-label">Where do you live?</label>
                <SelectDropdown
                  value={form.userCountry}
                  onChange={v => set('userCountry', v)}
                  options={ALL_COUNTRIES}
                  placeholder="Select your country"
                  error={errors.userCountry}
                />
              </div>
              <div className="ca-field">
                <label className="ca-label">Where does your loved one live?</label>
                <SelectDropdown
                  value={form.lovedOneCountry}
                  onChange={v => set('lovedOneCountry', v)}
                  options={AFRICAN_COUNTRIES.map(c => c.name)}
                  placeholder="Select African country"
                  error={errors.lovedOneCountry}
                />
              </div>
            </div>

            <div className="ca-field">
              <label className="ca-label">What support do you need?</label>
              <SelectDropdown
                value={form.supportNeed}
                onChange={v => set('supportNeed', v)}
                options={SUPPORT_OPTIONS}
                placeholder="Funeral cover for a parent or loved one"
                error={errors.supportNeed}
              />
            </div>
          </div>

          <button className="ca-btn" onClick={handleCheck}>
            Check Availability
          </button>

          <div className="ca-trust-badges">
            <span className="ca-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              No payment required
            </span>
            <span className="ca-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Takes less than 60 seconds
            </span>
            <span className="ca-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Built for people abroad
            </span>
          </div>

          {/* Result message (shows after check) */}
          {showResult && (
            <div className={`ca-result-inline ${isAvailable ? 'ca-result-inline--success' : 'ca-result-inline--pending'}`}>
              <div className="ca-result-inline-icon">
                {isAvailable ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                )}
              </div>
              <div className="ca-result-inline-text">
                <strong>
                  {isAvailable
                    ? `Cover is available in ${form.lovedOneCountry}!`
                    : `${form.lovedOneCountry} is coming soon.`}
                </strong>
                <span>
                  {isAvailable
                    ? 'You can proceed to arrange protection for your loved one.'
                    : 'Join the waitlist and we\'ll notify you when available.'}
                </span>
              </div>
              <a href="/waitlist" className="ca-result-inline-btn">
                {isAvailable ? 'Get Started' : 'Join Waitlist'}
              </a>
            </div>
          )}
        </div>

        {/* ── Right: Countries List ── */}
        <div className="ca-countries-side">
          <h3 className="ca-countries-title">Countries we cover</h3>
          <p className="ca-countries-subtitle">Available and coming soon</p>
          <div className="ca-countries-list">
            {AFRICAN_COUNTRIES.map((c, i) => (
              <div
                key={c.name}
                className={`ca-country-item ${c.available ? 'ca-country-item--available' : ''} ${form.lovedOneCountry === c.name ? 'ca-country-item--selected' : ''}`}
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => set('lovedOneCountry', c.name)}
              >
                <span className="ca-country-flag">{c.flag}</span>
                <span className="ca-country-name">{c.name}</span>
                <span className={`ca-country-status ${c.available ? '' : 'ca-country-status--coming'}`}>
                  {c.available ? 'Live' : 'Soon'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
