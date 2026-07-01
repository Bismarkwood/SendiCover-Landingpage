import { useState, useEffect, useRef, useCallback } from 'react';
import waitlistImg from '../assets/waitlist.png';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import '../styles/WaitlistPage.css';

/* ── Constants ── */
const USER_COUNTRIES = [
  'Australia', 'Canada', 'France', 'Germany', 'Ireland', 'Italy',
  'Netherlands', 'Portugal', 'Spain', 'Sweden', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Other',
];

const PROTECT_COUNTRIES = [
  'Algeria', 'China', 'DR Congo', 'Egypt', 'Ethiopia', 'Ghana', 'India',
  'Kenya', 'Morocco', 'Nigeria', 'Pakistan', 'Philippines', 'Senegal', 'Other',
];

const PROTECTION_OPTIONS = [
  'Health Cover',
  'Life and Funeral Cover',
  'Accident and Critical Illness Cover',
  'Property and Home Cover',
];

/* ── Types ── */
interface FormData {
  fullName: string;
  phone: string;
  email: string;
  userCountry: string;
  userCountryOther: string;
  protectCountry: string;
  protectCountryOther: string;
  protectionTypes: string[];
  emailConsent: boolean;
}

interface FormErrors { [key: string]: string | undefined; }
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ── Simple Dropdown ── */
function SelectDropdown({
  value, onChange, options, placeholder, error,
}: {
  value: string; onChange: (v: string) => void; options: string[];
  placeholder: string; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="wlp-country-root" ref={ref}>
      <button type="button"
        className={`wlp-country-trigger ${error ? 'wlp-country-trigger--error' : ''} ${open ? 'wlp-country-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}>
        <span className={value ? 'wlp-country-value' : 'wlp-country-placeholder'}>{value || placeholder}</span>
        <svg className={`wlp-country-chevron ${open ? 'wlp-country-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="wlp-country-menu">
          <ul className="wlp-country-list">
            {options.map(c => (
              <li key={c} className={`wlp-country-option ${c === value ? 'wlp-country-option--active' : ''}`}
                onClick={() => { onChange(c); setOpen(false); }}>{c}</li>
            ))}
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
    fullName: '', phone: '', email: '',
    userCountry: '', userCountryOther: '',
    protectCountry: '', protectCountryOther: '',
    protectionTypes: [], emailConsent: false,
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d\s-]{7,}$/;
    if (!formData.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) e.phone = 'Please enter your phone number.';
    else if (!phoneRegex.test(formData.phone.trim())) e.phone = 'Please include a country code (e.g. +44).';
    if (!formData.email.trim()) e.email = 'Please enter your email address.';
    else if (!emailRegex.test(formData.email.trim())) e.email = 'Please enter a valid email address.';
    if (!formData.userCountry) e.userCountry = 'Please select the country you live in.';
    if (formData.userCountry === 'Other' && !formData.userCountryOther.trim()) e.userCountryOther = 'Please enter your country.';
    if (!formData.protectCountry) e.protectCountry = 'Please select where the person you want to protect lives.';
    if (formData.protectCountry === 'Other' && !formData.protectCountryOther.trim()) e.protectCountryOther = 'Please enter the country.';
    if (formData.protectionTypes.length === 0) e.protectionTypes = 'Please select at least one option.';
    if (!formData.emailConsent) e.emailConsent = 'Please accept the consent to continue.';
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
    setFormData({ fullName: '', phone: '', email: '', userCountry: '', userCountryOther: '', protectCountry: '', protectCountryOther: '', protectionTypes: [], emailConsent: false });
    setErrors({});
    setStatus('idle');
    setTouched(false);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="wlp-hero">
        <img src={waitlistImg} alt="" className="wlp-hero-bg" aria-hidden="true" />
        <div className="wlp-hero-overlay" />
        <div className="wlp-hero-content">
          <span className="wlp-hero-pill">JOIN THE WAITLIST</span>
          <h1 className="wlp-hero-heading">We are launching Sendi Cova soon.</h1>
          <p className="wlp-hero-text">
            Sendi Cova is growing fast. Join the thousands of families waiting to protect their loved
            ones across borders. Fill the form below to request early access when we launch.
          </p>
        </div>
      </section>

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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h2 className="wlp-success-heading">You're on the list.</h2>
                <p className="wlp-success-text">
                  Thank you. You'll be one of the first to know when Sendi Cova launches in your region.
                </p>
                <a href="/" className="wlp-success-btn">Back to Home</a>
                <button className="wlp-success-link" onClick={resetForm}>Register another person</button>
              </div>
            ) : (
              <>
                <h1 className="wlp-heading">We're not live yet, but we are on our way.</h1>

                <form className="wlp-form" onSubmit={handleSubmit} noValidate>

                  {/* Row 1: Name + Email */}
                  <div className="wlp-fields-row">
                    <div className="wlp-field">
                      <label className="wlp-label">Your name <span className="wlp-req">*</span></label>
                      <input type="text" placeholder="Enter your full name" value={formData.fullName}
                        onChange={e => set('fullName', e.target.value)}
                        className={`wlp-input ${errors.fullName ? 'wlp-input--error' : ''}`} />
                      {errors.fullName && <span className="wlp-error">{errors.fullName}</span>}
                    </div>
                    <div className="wlp-field">
                      <label className="wlp-label">Email address <span className="wlp-req">*</span></label>
                      <input type="email" placeholder="you@example.com" value={formData.email}
                        onChange={e => set('email', e.target.value)}
                        className={`wlp-input ${errors.email ? 'wlp-input--error' : ''}`} />
                      {errors.email && <span className="wlp-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="wlp-field">
                    <label className="wlp-label">Phone number <span className="wlp-req">*</span></label>
                    <input type="tel" placeholder="+44 7700 000000" value={formData.phone}
                      onChange={e => set('phone', e.target.value)}
                      className={`wlp-input ${errors.phone ? 'wlp-input--error' : ''}`} />
                    <span className="wlp-helper">Include your country code, e.g. +44, +1, +61</span>
                    {errors.phone && <span className="wlp-error">{errors.phone}</span>}
                  </div>

                  {/* Row 2: Countries */}
                  <div className="wlp-fields-row">
                    <div className="wlp-field">
                      <label className="wlp-label">Where do you live? <span className="wlp-req">*</span></label>
                      <SelectDropdown value={formData.userCountry} onChange={v => set('userCountry', v)}
                        options={USER_COUNTRIES} placeholder="Select your country" error={errors.userCountry} />
                      {formData.userCountry === 'Other' && (
                        <input type="text" placeholder="Enter your country" value={formData.userCountryOther}
                          onChange={e => set('userCountryOther', e.target.value)}
                          className={`wlp-input wlp-input--other ${errors.userCountryOther ? 'wlp-input--error' : ''}`} />
                      )}
                      {errors.userCountryOther && <span className="wlp-error">{errors.userCountryOther}</span>}
                    </div>
                    <div className="wlp-field">
                      <label className="wlp-label">Where does the person you want to protect live? <span className="wlp-req">*</span></label>
                      <SelectDropdown value={formData.protectCountry} onChange={v => set('protectCountry', v)}
                        options={PROTECT_COUNTRIES} placeholder="Select country" error={errors.protectCountry} />
                      {formData.protectCountry === 'Other' && (
                        <input type="text" placeholder="Enter the country" value={formData.protectCountryOther}
                          onChange={e => set('protectCountryOther', e.target.value)}
                          className={`wlp-input wlp-input--other ${errors.protectCountryOther ? 'wlp-input--error' : ''}`} />
                      )}
                      {errors.protectCountryOther && <span className="wlp-error">{errors.protectCountryOther}</span>}
                    </div>
                  </div>

                  {/* Protection Types */}
                  <div className="wlp-field">
                    <label className="wlp-label">What would you like to protect them with? <span className="wlp-req">*</span> <span className="wlp-optional">Select all that may apply</span></label>
                    <div className="wlp-chips">
                      {PROTECTION_OPTIONS.map(opt => (
                        <button key={opt} type="button"
                          className={`wlp-chip ${formData.protectionTypes.includes(opt) ? 'wlp-chip--active' : ''}`}
                          onClick={() => toggleProtection(opt)}>
                          {formData.protectionTypes.includes(opt) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          )}
                          {opt}
                        </button>
                      ))}
                    </div>
                    {errors.protectionTypes && <span className="wlp-error">{errors.protectionTypes}</span>}
                  </div>

                  {/* Consent */}
                  <label className="wlp-checkbox">
                    <input type="checkbox" checked={formData.emailConsent}
                      onChange={e => set('emailConsent', e.target.checked)} className="wlp-checkbox-input" />
                    <span className="wlp-checkbox-custom">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="wlp-checkbox-label">
                      By submitting this form, you agree that Sendi may store the information you provide and use it to contact you about early access, product updates, and our launch. We take your privacy seriously: we will never sell, rent, or share your personal data with third parties for their own marketing. You can unsubscribe or request that we delete your data by sending an email to <a href="mailto:compliance@mysendi.com" className="wlp-link">compliance@mysendi.com</a> anytime.
                    </span>
                  </label>
                  {errors.emailConsent && <span className="wlp-error">{errors.emailConsent}</span>}

                  {/* Submit */}
                  <button type="submit" className="wlp-submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <><span className="wlp-spinner" /> Submitting...</>
                    ) : 'Request Early Access'}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
