import { useState, useRef, useEffect } from 'react';
import '../../styles/CheckAvailabilityModal.css';

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

const AFRICAN_COUNTRIES = [
  'Ghana', 'Nigeria', 'Kenya', 'Cameroon', 'DR Congo', 'Egypt', 'Ethiopia',
  'Morocco', 'Rwanda', 'Senegal', 'South Africa', 'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe',
];

const SUPPORT_OPTIONS = [
  'Funeral cover for a parent or loved one',
  'Life insurance for my family',
  'Health cover for someone back home',
  'Critical illness protection',
  'Not sure yet — just checking',
];

const AVAILABLE_COUNTRIES = ['Ghana', 'Nigeria', 'Kenya'];

/* ── Dropdown ── */
function ModalDropdown({
  value, onChange, options, placeholder, error, searchable = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

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
    <div className="cam-dropdown" ref={ref}>
      <button type="button" className={`cam-trigger ${error ? 'cam-trigger--error' : ''} ${open ? 'cam-trigger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span className={value ? 'cam-value' : 'cam-placeholder'}>{value || placeholder}</span>
        <svg className={`cam-chevron ${open ? 'cam-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="cam-menu">
          {searchable && <input ref={inputRef} type="text" className="cam-search" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />}
          <ul className="cam-list">
            {filtered.length > 0 ? filtered.map(opt => (
              <li key={opt} className={`cam-option ${opt === value ? 'cam-option--active' : ''}`} onClick={() => { onChange(opt); setOpen(false); setSearch(''); }}>{opt}</li>
            )) : <li className="cam-option cam-option--empty">No results</li>}
          </ul>
        </div>
      )}
      {error && <span className="cam-error">{error}</span>}
    </div>
  );
}

/* ── Main Modal ── */
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckAvailabilityModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ userCountry: '', lovedOneCountry: '', supportNeed: '' });
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});
  const [showResult, setShowResult] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  };

  const set = (field: string, value: string) => {
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

  if (!isOpen) return null;

  const isAvailable = AVAILABLE_COUNTRIES.includes(form.lovedOneCountry);

  return (
    <div className="cam-overlay" onClick={handleBackdrop}>
      <div className="cam-modal" ref={modalRef}>
        <button className="cam-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="cam-heading">Check cover availability</h2>
        <p className="cam-subtext">See what protection options may be available for your loved one.</p>

        <div className="cam-fields">
          <div className="cam-row">
            <div className="cam-field">
              <label className="cam-label">Where do you live?</label>
              <ModalDropdown value={form.userCountry} onChange={v => set('userCountry', v)} options={ALL_COUNTRIES} placeholder="Select your country" error={errors.userCountry} searchable />
            </div>
            <div className="cam-field">
              <label className="cam-label">Where does your loved one live?</label>
              <ModalDropdown value={form.lovedOneCountry} onChange={v => set('lovedOneCountry', v)} options={AFRICAN_COUNTRIES} placeholder="Select African country" error={errors.lovedOneCountry} />
            </div>
          </div>
          <div className="cam-field">
            <label className="cam-label">What support do you need?</label>
            <ModalDropdown value={form.supportNeed} onChange={v => set('supportNeed', v)} options={SUPPORT_OPTIONS} placeholder="Select an option" error={errors.supportNeed} />
          </div>
        </div>

        <button className="cam-btn" onClick={handleCheck}>Check Availability</button>

        {showResult && (
          <div className={`cam-result ${isAvailable ? 'cam-result--success' : 'cam-result--pending'}`}>
            <div className="cam-result-icon">
              {isAvailable ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              )}
            </div>
            <div className="cam-result-text">
              <strong>{isAvailable ? `Cover is available in ${form.lovedOneCountry}!` : `Not available in ${form.lovedOneCountry} yet.`}</strong>
              <span>{isAvailable ? 'Download the Sendi app to get started.' : 'Join the waitlist and we\'ll notify you when available.'}</span>
            </div>
            {isAvailable ? (
              <div className="cam-app-buttons">
                <a href="#" className="cam-store-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
                <a href="#" className="cam-store-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3.61 1.81L13.42 12 3.61 22.19c-.39-.35-.61-.87-.61-1.44V3.25c0-.57.22-1.09.61-1.44z" fill="#4285F4"/><path d="M16.89 8.53L5.06.5C4.56.22 4 .17 3.51.36l9.91 11.64 3.47-3.47z" fill="#EA4335"/><path d="M3.51 23.64c.49.19 1.05.14 1.55-.14l11.83-8.03-3.47-3.47-9.91 11.64z" fill="#34A853"/><path d="M20.16 10.35l-3.27-1.82-3.47 3.47 3.47 3.47 3.27-1.82c.88-.49.88-1.82 0-3.3z" fill="#FBBC05"/></svg>
                  Google Play
                </a>
              </div>
            ) : (
              <a href="/waitlist" className="cam-waitlist-btn">Join Waitlist</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
