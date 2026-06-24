import { useState, useEffect, useRef, useCallback } from 'react';
import waitlistImg from '../../assets/waitlist.png';
import waitlistLogo from '../../assets/logo.jpg';
import '../../styles/WaitlistModal.css';

/* ── Constants ── */
const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Brazil','Cameroon','Canada','China','Colombia','DR Congo','Egypt',
  'Ethiopia','France','Germany','Ghana','India','Indonesia','Ireland','Italy',
  'Japan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand',
  'Nigeria','Pakistan','Philippines','Poland','Portugal','Rwanda','Saudi Arabia',
  'Senegal','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland',
  'Tanzania','Thailand','Turkey','UAE','Uganda','United Kingdom','United States','Vietnam','Zambia','Zimbabwe',
];

const PROTECTION_OPTIONS = [
  'Life cover',
  'Health cover',
  'Funeral cover',
  'Critical illness cover',
  'Not sure yet',
];

const REFERRAL_OPTIONS = [
  'Social media',
  'Friend or family',
  'Search',
  'News or article',
  'Other',
];

/* ── Types ── */
interface FormData {
  fullName: string;
  phone: string;
  email: string;
  userCountry: string;
  protectCountry: string;
  protectionTypes: string[];
  referralSource: string;
  referralOther: string;
  emailConsent: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'duplicate';

/* ── Props ── */
interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Searchable Country Dropdown ── */
function CountryDropdown({
  value, onChange, placeholder, error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COUNTRIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
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
    <div className="wl-country-root" ref={ref}>
      <button
        type="button"
        className={`wl-country-trigger ${error ? 'wl-country-trigger--error' : ''} ${open ? 'wl-country-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? 'wl-country-value' : 'wl-country-placeholder'}>
          {value || placeholder}
        </span>
        <svg className={`wl-country-chevron ${open ? 'wl-country-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="wl-country-menu">
          <input
            ref={inputRef}
            type="text"
            className="wl-country-search"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ul className="wl-country-list">
            {filtered.length > 0 ? filtered.map(c => (
              <li
                key={c}
                className={`wl-country-option ${c === value ? 'wl-country-option--active' : ''}`}
                onClick={() => { onChange(c); setOpen(false); setSearch(''); }}
              >
                {c}
                {c === value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </li>
            )) : (
              <li className="wl-country-empty">No countries found</li>
            )}
          </ul>
        </div>
      )}
      {error && <span className="wl-error">{error}</span>}
    </div>
  );
}

/* ── Main Modal Component ── */
export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    userCountry: '',
    protectCountry: '',
    protectionTypes: [],
    referralSource: '',
    referralOther: '',
    emailConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  };

  const set = useCallback((field: keyof FormData, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched) setErrors(prev => ({ ...prev, [field]: undefined }));
  }, [touched]);

  const toggleProtection = (option: string) => {
    setFormData(prev => {
      const types = prev.protectionTypes.includes(option)
        ? prev.protectionTypes.filter(t => t !== option)
        : [...prev.protectionTypes, option];
      return { ...prev, protectionTypes: types };
    });
    if (touched) setErrors(prev => ({ ...prev, protectionTypes: undefined }));
  };

  // Validation
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d\s-]{7,}$/;

    if (!formData.fullName.trim()) e.fullName = 'Please enter your full name.';
    else if (!nameRegex.test(formData.fullName.trim())) e.fullName = 'Name must be at least 2 characters (letters only).';

    if (!formData.phone.trim()) e.phone = 'Please enter your phone number.';
    else if (!phoneRegex.test(formData.phone.trim())) e.phone = 'Please enter a valid phone number.';

    if (!formData.email.trim()) e.email = 'Please enter your email address.';
    else if (!emailRegex.test(formData.email.trim())) e.email = 'Please enter a valid email address.';

    if (!formData.userCountry) e.userCountry = 'Please select the country you live in.';
    if (!formData.protectCountry) e.protectCountry = 'Please select where the person you want to protect lives.';
    if (formData.protectionTypes.length === 0) e.protectionTypes = 'Please select at least one protection option.';
    if (!formData.emailConsent) e.emailConsent = 'Please confirm that we can keep you updated about Sendi Protect.';

    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('submitting');
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    setStatus('success');
  };

  const resetForm = () => {
    setFormData({
      fullName: '', phone: '', email: '', userCountry: '', protectCountry: '',
      protectionTypes: [], referralSource: '', referralOther: '', emailConsent: false,
    });
    setErrors({});
    setStatus('idle');
    setTouched(false);
  };

  if (!isOpen) return null;

  const ghanaNote = formData.protectCountry === 'Ghana';

  return (
    <div className="wl-overlay" onClick={handleBackdrop}>
      <div className="wl-modal" ref={modalRef} role="dialog" aria-modal="true">

        {/* Left: Image */}
        <div className="wl-modal-image">
          <img src={waitlistImg} alt="Join the waitlist" className="wl-modal-img" />
        </div>

        {/* Right: Content */}
        <div className="wl-modal-content">
          {/* Close */}
          <button className="wl-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {status === 'success' ? (
            /* ── Success State ── */
            <div className="wl-success">
              <div className="wl-success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="wl-success-heading">You're on the list.</h2>
              <p className="wl-success-text">
                Thank you. You'll be one of the first to know when Sendi Protect reaches the
                country you care about. In the meantime, you can already send money across borders with Sendi.
              </p>
              <a href="#" className="wl-success-btn">Explore Sendi</a>
              <button className="wl-success-link" onClick={resetForm}>
                Join another person to the waitlist
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Logo */}
              <div className="wl-logo">
                <img src={waitlistLogo} alt="Sendi" className="wl-logo-img" />
              </div>

              <h2 className="wl-heading">We're not in your country yet. But we're on our way.</h2>
              <p className="wl-subtext">
                Sendi Protect is live for Ghana, with more countries coming soon. Join the waitlist
                and we'll let you know the moment we can protect your loved ones where they are.
              </p>

              <form className="wl-form" onSubmit={handleSubmit} noValidate>

                {/* Full Name */}
                <div className="wl-field-group">
                  <label className="wl-label">Your name</label>
                  <div className={`wl-input-wrap ${errors.fullName ? 'wl-input-wrap--error' : ''}`}>
                    <span className="wl-field-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={e => set('fullName', e.target.value)}
                      className="wl-input"
                    />
                  </div>
                  {errors.fullName && <span className="wl-error">{errors.fullName}</span>}
                </div>

                {/* Phone */}
                <div className="wl-field-group">
                  <label className="wl-label">Phone number</label>
                  <div className={`wl-input-wrap ${errors.phone ? 'wl-input-wrap--error' : ''}`}>
                    <span className="wl-field-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={e => set('phone', e.target.value)}
                      className="wl-input"
                    />
                  </div>
                  {errors.phone && <span className="wl-error">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="wl-field-group">
                  <label className="wl-label">Your email address</label>
                  <div className={`wl-input-wrap ${errors.email ? 'wl-input-wrap--error' : ''}`}>
                    <span className="wl-field-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => set('email', e.target.value)}
                      className="wl-input"
                    />
                  </div>
                  {errors.email && <span className="wl-error">{errors.email}</span>}
                </div>

                {/* User Country */}
                <div className="wl-field-group">
                  <label className="wl-label">Where do you live?</label>
                  <CountryDropdown
                    value={formData.userCountry}
                    onChange={v => set('userCountry', v)}
                    placeholder="Select your country"
                    error={errors.userCountry}
                  />
                  <span className="wl-helper">The country you're based in.</span>
                </div>

                {/* Protect Country */}
                <div className="wl-field-group">
                  <label className="wl-label">Where does the person you want to protect live?</label>
                  <CountryDropdown
                    value={formData.protectCountry}
                    onChange={v => set('protectCountry', v)}
                    placeholder="Select country"
                    error={errors.protectCountry}
                  />
                  <span className="wl-helper">We'll prioritise the countries our waitlist wants most.</span>
                  {ghanaNote && (
                    <div className="wl-ghana-note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      <span>Good news — Sendi Protect is already live for Ghana. You can continue joining the waitlist or <a href="#">explore available protection options now</a>.</span>
                    </div>
                  )}
                </div>

                {/* Protection Types (Multi-select chips) */}
                <div className="wl-field-group">
                  <label className="wl-label">What would you like to protect them with?</label>
                  <div className="wl-chips">
                    {PROTECTION_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`wl-chip ${formData.protectionTypes.includes(opt) ? 'wl-chip--active' : ''}`}
                        onClick={() => toggleProtection(opt)}
                      >
                        {formData.protectionTypes.includes(opt) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.protectionTypes && <span className="wl-error">{errors.protectionTypes}</span>}
                </div>

                {/* Referral Source */}
                <div className="wl-field-group">
                  <label className="wl-label">How did you hear about us? <span className="wl-optional">optional</span></label>
                  <div className="wl-input-wrap">
                    <span className="wl-field-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <select
                      value={formData.referralSource}
                      onChange={e => set('referralSource', e.target.value)}
                      className={`wl-select ${formData.referralSource === '' ? 'wl-select--placeholder' : ''}`}
                    >
                      <option value="" disabled>Select an option</option>
                      {REFERRAL_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className="wl-field-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                  {formData.referralSource === 'Other' && (
                    <input
                      type="text"
                      placeholder="Please tell us how you heard about Sendi Protect"
                      value={formData.referralOther}
                      onChange={e => set('referralOther', e.target.value)}
                      className="wl-input wl-input--other"
                    />
                  )}
                </div>

                {/* Consent */}
                <label className={`wl-checkbox ${errors.emailConsent ? 'wl-checkbox--error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.emailConsent}
                    onChange={e => set('emailConsent', e.target.checked)}
                    className="wl-checkbox-input"
                  />
                  <span className="wl-checkbox-custom">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="wl-checkbox-label">
                    Keep me updated by email about Sendi Protect and when it becomes available in my country
                  </span>
                </label>
                {errors.emailConsent && <span className="wl-error">{errors.emailConsent}</span>}

                {/* Error state message */}
                {status === 'error' && (
                  <div className="wl-form-error">
                    Something went wrong. Please check your connection and try again.
                  </div>
                )}
                {status === 'duplicate' && (
                  <div className="wl-form-info">
                    You're already on the waitlist. We'll let you know when Sendi Protect becomes available for your selected country.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="wl-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="wl-spinner" />
                      Joining waitlist...
                    </>
                  ) : (
                    'Join the Waitlist'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
