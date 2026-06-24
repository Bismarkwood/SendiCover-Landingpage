import { useState, useRef, useEffect } from 'react';
import '../../styles/InvestmentCalculator.css';

/* ── Types & Data ── */
type CategoryKey = 'category-1' | 'category-2' | 'category-3';

interface Product {
  id: string;
  label: string;
  category: CategoryKey;
  categoryLabel: string;
}

const PRODUCTS: Product[] = [
  { id: 'farewell-dignity', label: 'Dignity Farewell Plan', category: 'category-1', categoryLabel: 'Farewell Cover' },
  { id: 'farewell-premier', label: 'Ultimate Premier Farewell Plan', category: 'category-1', categoryLabel: 'Farewell Cover' },
  { id: 'life-standard', label: 'Standard Life Plan', category: 'category-2', categoryLabel: 'Life Insurance' },
  { id: 'life-premium', label: 'Premium Life Plan', category: 'category-2', categoryLabel: 'Life Insurance' },
  { id: 'critical-essential', label: 'Essential Critical Illness Plan', category: 'category-3', categoryLabel: 'Critical Illness' },
  { id: 'critical-comprehensive', label: 'Comprehensive Critical Illness Plan', category: 'category-3', categoryLabel: 'Critical Illness' },
];

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia',
  'Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria',
  'Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad',
  'Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic',
  'DR Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador',
  'Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon',
  'Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
  'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
  'Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
  'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius',
  'Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
  'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea',
  'North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay',
  'Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis',
  'Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan',
  'Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste',
  'Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine',
  'United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City',
  'Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

/* Category 1: fixed annual premium based on age */
function getCategory1Premium(age: number): number {
  if (age < 25) return 120;
  if (age < 35) return 180;
  if (age < 45) return 280;
  if (age < 55) return 420;
  return 600;
}

/* Category 2 & 3: premium is percentage of sum assured, adjusted by age */
function getCategoryPremium(sumAssured: number, age: number): number {
  let rate = 0.025; // base 2.5%
  if (age >= 35) rate = 0.032;
  if (age >= 45) rate = 0.042;
  if (age >= 55) rate = 0.055;
  return sumAssured * rate;
}

function formatGHC(value: number): string {
  return 'GHC ' + value.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Searchable Country Dropdown ── */
function SearchableDropdown({
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
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div className="fd-root" ref={ref}>
      <button
        type="button"
        className={`fd-trigger ${error ? 'fd-trigger--error' : ''} ${open ? 'fd-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? 'fd-selected-text' : 'fd-placeholder'}>
          {value || placeholder}
        </span>
        <svg className={`fd-chevron ${open ? 'fd-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="fd-menu fd-menu--searchable">
          <input
            ref={inputRef}
            type="text"
            className="fd-search"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ul className="fd-list" role="listbox">
            {filtered.length > 0 ? filtered.map(opt => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={`fd-option ${value === opt ? 'fd-option--active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); setSearch(''); }}
              >
                {opt}
                {value === opt && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </li>
            )) : (
              <li className="fd-option fd-option--empty">No countries found</li>
            )}
          </ul>
        </div>
      )}
      {error && <span className="ic-error">{error}</span>}
    </div>
  );
}

/* ── Custom Dropdown ── */
function Dropdown({
  value, onChange, options, placeholder, error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fd-root" ref={ref}>
      <button
        type="button"
        className={`fd-trigger ${error ? 'fd-trigger--error' : ''} ${open ? 'fd-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? 'fd-selected-text' : 'fd-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className={`fd-chevron ${open ? 'fd-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul className="fd-menu" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`fd-option ${value === opt.value ? 'fd-option--active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
              {value === opt.value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="ic-error">{error}</span>}
    </div>
  );
}

/* ── Main Calculator ── */
interface FormState {
  email: string;
  product: string;
  country: string;
  age: string;
  sumAssured: string;
}

interface Errors { [k: string]: string | undefined }

const initialForm: FormState = {
  email: '', product: '', country: '', age: '', sumAssured: '50000',
};

export function InvestmentCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [premium, setPremium] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);

  const set = (name: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const selectedProduct = PRODUCTS.find(p => p.id === form.product);
  const isCategory1 = selectedProduct?.category === 'category-1';
  const needsSlider = selectedProduct && !isCategory1;

  const sumAssuredNum = parseFloat(form.sumAssured) || 50000;
  const sumAssuredPct = Math.min(100, Math.max(0, ((sumAssuredNum - 10000) / (500000 - 10000)) * 100));

  const validate = (): Errors => {
    const e: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!emailRegex.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.product) e.product = 'Please select a product.';
    if (!form.country) e.country = 'Please select a country.';
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 18 || Number(form.age) > 75)
      e.age = 'Age must be between 18 and 75.';
    return e;
  };

  const calculate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const age = parseInt(form.age);
    let result: number;

    if (isCategory1) {
      result = getCategory1Premium(age);
    } else {
      result = getCategoryPremium(sumAssuredNum, age);
    }

    setPremium(result);
    setCalculated(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setPremium(null);
    setCalculated(false);
  };

  return (
    <div className="ic-card">
      <div className="ic-body">

        {/* ── Left: Inputs ── */}
        <div className="ic-left">
          <div className="ic-panel-label">Quote Details</div>

          {/* Email */}
          <div className="ic-field">
            <label className="ic-label" htmlFor="ic-email">Email Address</label>
            <div className="ic-input-wrap">
              <span className="ic-prefix-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                id="ic-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                className={`ic-input ic-input--icon ${errors.email ? 'ic-input--error' : ''}`}
              />
            </div>
            {errors.email && <span className="ic-error">{errors.email}</span>}
          </div>

          {/* Product */}
          <div className="ic-field">
            <label className="ic-label">Product</label>
            <Dropdown
              value={form.product}
              onChange={v => set('product', v)}
              options={PRODUCTS.map(p => ({ value: p.id, label: `${p.label} (${p.categoryLabel})` }))}
              placeholder="Select a product"
              error={errors.product}
            />
          </div>

          {/* Country */}
          <div className="ic-field">
            <label className="ic-label">Where does the beneficiary live?</label>
            <SearchableDropdown
              value={form.country}
              onChange={v => set('country', v)}
              options={COUNTRIES}
              placeholder="Search and select country"
              error={errors.country}
            />
          </div>

          {/* Age */}
          <div className="ic-field">
            <label className="ic-label" htmlFor="ic-age">Person's Age</label>
            <input
              id="ic-age"
              type="number"
              min="18"
              max="75"
              placeholder="e.g. 35"
              value={form.age}
              onChange={e => set('age', e.target.value)}
              className={`ic-input ${errors.age ? 'ic-input--error' : ''}`}
            />
            {errors.age && <span className="ic-error">{errors.age}</span>}
          </div>

          {/* Sum Assured Slider (Category 2 & 3 only) */}
          {needsSlider && (
            <div className="ic-field ic-field--slide">
              <div className="sf-top">
                <label className="ic-label" htmlFor="ic-sum">Sum Assured</label>
                <div className="sf-value-pill">
                  <span className="sf-value-display">{formatGHC(sumAssuredNum)}</span>
                </div>
              </div>
              <div className="sf-track-wrap">
                <input
                  id="ic-sum"
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={sumAssuredNum}
                  onChange={e => set('sumAssured', e.target.value)}
                  className="sf-range"
                  style={{ '--pct': `${sumAssuredPct}%` } as React.CSSProperties}
                />
              </div>
              <div className="sf-labels">
                <span>GHC 10,000</span>
                <span>GHC 500,000</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Results ── */}
        <div className="ic-right">
          <div className="ic-results-header">
            <span className="ic-results-pill">Your Quote</span>
          </div>

          <div className={`ic-result-card ${calculated ? 'ic-result-card--active' : ''}`}>

            {/* Icon bubble */}
            <div className="ic-result-icon-bubble">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>

            {/* Title */}
            <span className="ic-result-title">Annual Premium</span>

            {/* Main value */}
            <span className={`ic-result-amount ${calculated ? 'ic-result-amount--glow' : ''}`}>
              {premium !== null ? formatGHC(premium) : 'GHC 0.00'}
            </span>

            {calculated && premium !== null ? (
              <>
                <div className="ic-result-divider" />

                {/* Metrics */}
                <div className="ic-metrics">
                  <div className="ic-metric-item">
                    <span className="ic-metric-label">
                      <span className="ic-metric-dot ic-metric-dot--blue" />
                      Product
                    </span>
                    <span className="ic-metric-value">{selectedProduct?.label}</span>
                  </div>
                  <div className="ic-metric-item">
                    <span className="ic-metric-label">
                      <span className="ic-metric-dot ic-metric-dot--grey" />
                      Beneficiary Location
                    </span>
                    <span className="ic-metric-value">{form.country}</span>
                  </div>
                  <div className="ic-metric-item">
                    <span className="ic-metric-label">
                      <span className="ic-metric-dot ic-metric-dot--grey" />
                      Age
                    </span>
                    <span className="ic-metric-value">{form.age} years</span>
                  </div>
                  {needsSlider && (
                    <div className="ic-metric-item">
                      <span className="ic-metric-label">
                        <span className="ic-metric-dot ic-metric-dot--blue" />
                        Sum Assured
                      </span>
                      <span className="ic-metric-value ic-metric-value--accent">{formatGHC(sumAssuredNum)}</span>
                    </div>
                  )}
                </div>

                {/* Monthly equivalent */}
                <div className="ic-monthly-note">
                  <span>≈ {formatGHC(premium / 12)} / month</span>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="ic-empty-state">
                <div className="ic-empty-illustration">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p className="ic-empty-message">
                  Fill in your details and click <strong>"Get My Quote"</strong> to see your
                  estimated annual premium.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="ic-actions">
            <button className="ic-btn-primary" onClick={calculate}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              Get My Quote
            </button>
            <button className="ic-btn-secondary" onClick={reset}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
