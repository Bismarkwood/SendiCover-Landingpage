import { useState, useEffect, useRef, useCallback } from 'react';
import waitlistImg from '../assets/waitlist.png';
import waitlistLogo from '../assets/logo.jpg';
import '../styles/WaitlistPage.css';

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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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
    <div className="wlp-country-root" ref={ref}>
      <button
        type="button"
        className={`wlp-country-trigger ${error ? 'wlp-country-trigger--error' : ''} ${open ? 'wlp-country-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? 'wlp-country-value' : 'wlp-country-placeholder'}>
          {value || placeholder}
        </span>
        <svg className={`wlp-country-chevron ${open ? 'wlp-country-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="wlp-country-menu">
          <input
            ref={inputRef}
            type="text"
            className="wlp-country-search"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ul className="wlp-country-list">
            {filtered.length > 0 ? filtered.map(c => (
              <li
                key={c}
                className={`wlp-country-option ${c === value ? 'wlp-country-option--active' : ''}`}
                onClick={() => { onChange(c); setOpen(false); setSearch(''); }}
              >
                {c}
              </li>
            )) : (
              <li className="wlp-country-empty">No countries found</li>
            )}
          </ul>
        </div>
      )}
      {error && <span className="wlp-error">{error}</span>}
    </div>
  );
}

/* ── Main Waitlist Page ── */
export function WaitlistPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', phone: '', email: '', userCountry: '', protectCountry: '',
    protectionTypes: [], referralSource: '', referralOther: '', emailConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState(false);

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
    if (!formData.emailConsent) e.emailConsent = 'Please confirm that we can keep you updated.';

    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('submitting');
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

  const ghanaNote = formData.protectCountry === 'Ghana';

  return (
    <div className="wlp-page">
      <div className="wlp-container">

        {/* Left: Image */}
        <div className="wlp-image-col">
          <img src={waitlistImg} alt="Join the waitlist" className="wlp-image" />
        </div>

        {/* Right: Form */}
        <div className="wlp-form-col">

          {status === 'success' ? (
            <div className="wlp-success">
              <div className="wlp-success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="wlp-success-heading">You're on the list.</h2>
              <p className="wlp-success-text">
                Thank you. You'll be one of the first to know when Sendi Protect reaches the
                country you care about.
              </p>
              <a href="/" className="wlp-success-btn">Back to Home</a>
              <button className="wlp-success-link" onClick={resetForm}>
                Join another person to the waitlist
              </button>
            </div>
          ) : (
            <>
              {/* Logo */}
              <div className="wlp-logo">
                <img src={waitlistLogo} alt="Sendi" className="wlp-logo-img" />
              </div>

              <h1 className="wlp-heading">We're not in your country yet. But we're on our way.</h1>
              <p className="wlp-subtext">
                Sendi Protect is live for Ghana, with more countries coming soon. Join the waitlist
                and we'll let you know the moment we can protect your loved ones where they are.
              </p>

              <form className="wlp-form" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="wlp-field">
                  <label className="wlp-label">Your name <span className="wlp-req">*</span></label>
                  <input type="text" placeholder="Enter your full name" value={formData.fullName}
                    onChange={e => set('fullName', e.target.value)}
                    className={`wlp-input ${errors.fullName ? 'wlp-input--error' : ''}`} />
                  {errors.fullName && <span className="wlp-error">{errors.fullName}</span>}
                </div>

                {/* Phone */}
                <div className="wlp-field">
                  <label className="wlp-label">Phone number <span className="wlp-req">*</span></label>
                  <input type="tel" placeholder="Enter your phone number" value={formData.phone}
                    onChange={e => set('phone', e.target.value)}
                    className={`wlp-input ${errors.phone ? 'wlp-input--error' : ''}`} />
                  {errors.phone && <span className="wlp-error">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="wlp-field">
                  <label className="wlp-label">Email address <span className="wlp-req">*</span></label>
                  <input type="email" placeholder="you@example.com" value={formData.email}
                    onChange={e => set('email', e.target.value)}
                    className={`wlp-input ${errors.email ? 'wlp-input--error' : ''}`} />
                  {errors.email && <span className="wlp-error">{errors.email}</span>}
                </div>

                {/* User Country */}
                <div className="wlp-field">
                  <label className="wlp-label">Where do you live? <span className="wlp-req">*</span></label>
                  <CountryDropdown value={formData.userCountry} onChange={v => set('userCountry', v)}
                    placeholder="Select your country" error={errors.userCountry} />
                </div>

                {/* Protect Country */}
                <div className="wlp-field">
                  <label className="wlp-label">Where does the person you want to protect live? <span className="wlp-req">*</span></label>
                  <CountryDropdown value={formData.protectCountry} onChange={v => set('protectCountry', v)}
                    placeholder="Select country" error={errors.protectCountry} />
                  {ghanaNote && (
                    <div className="wlp-ghana-note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      <span>Good news — Sendi Protect is already live for Ghana!</span>
                    </div>
                  )}
                </div>

                {/* Protection Types */}
                <div className="wlp-field">
                  <label className="wlp-label">What would you like to protect them with? <span className="wlp-req">*</span></label>
                  <div className="wlp-chips">
                    {PROTECTION_OPTIONS.map(opt => (
                      <button key={opt} type="button"
                        className={`wlp-chip ${formData.protectionTypes.includes(opt) ? 'wlp-chip--active' : ''}`}
                        onClick={() => toggleProtection(opt)}>
                        {formData.protectionTypes.includes(opt) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.protectionTypes && <span className="wlp-error">{errors.protectionTypes}</span>}
                </div>

                {/* Referral */}
                <div className="wlp-field">
                  <label className="wlp-label">How did you hear about us? <span className="wlp-optional">optional</span></label>
                  <select value={formData.referralSource} onChange={e => set('referralSource', e.target.value)}
                    className={`wlp-select ${formData.referralSource === '' ? 'wlp-select--placeholder' : ''}`}>
                    <option value="" disabled>Select an option</option>
                    {REFERRAL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {formData.referralSource === 'Other' && (
                    <input type="text" placeholder="Please tell us how you heard about us"
                      value={formData.referralOther} onChange={e => set('referralOther', e.target.value)}
                      className="wlp-input" style={{ marginTop: 8 }} />
                  )}
                </div>

                {/* Consent */}
                <label className="wlp-checkbox">
                  <input type="checkbox" checked={formData.emailConsent}
                    onChange={e => set('emailConsent', e.target.checked)} className="wlp-checkbox-input" />
                  <span className="wlp-checkbox-custom">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="wlp-checkbox-label">
                    Keep me updated by email about Sendi Protect and when it becomes available in my country
                  </span>
                </label>
                {errors.emailConsent && <span className="wlp-error">{errors.emailConsent}</span>}

                {/* Submit */}
                <button type="submit" className="wlp-submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <><span className="wlp-spinner" /> Joining waitlist...</>
                  ) : 'Join the Waitlist'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
