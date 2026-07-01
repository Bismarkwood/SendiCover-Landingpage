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
              <a href="/waitlist" className="cam-waitlist-btn">Join Waitlist</a>
            ) : (
              <a href="/waitlist" className="cam-waitlist-btn">Join Waitlist</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
