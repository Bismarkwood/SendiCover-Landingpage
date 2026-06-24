import { useState, useRef, useEffect, useCallback } from 'react';
import '../../styles/InvestmentCalculator.css';

/* ── Types ── */
type FreqKey = 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'weekly' | 'daily';

const FREQ_OPTIONS: { value: FreqKey; label: string; sub: string }[] = [
  { value: 'annually',      label: 'Annually',      sub: '1× per year' },
  { value: 'semi-annually', label: 'Semi-annually',  sub: '2× per year' },
  { value: 'quarterly',     label: 'Quarterly',      sub: '4× per year' },
  { value: 'monthly',       label: 'Monthly',        sub: '12× per year' },
  { value: 'weekly',        label: 'Weekly',         sub: '52× per year' },
  { value: 'daily',         label: 'Daily',          sub: '365× per year' },
];

const FREQ_MAP: Record<FreqKey, number> = {
  annually: 1, 'semi-annually': 2, quarterly: 4, monthly: 12, weekly: 52, daily: 365,
};

function formatGHC(value: number): string {
  return 'GHC ' + value.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Count-up hook (smooth animated number) ── */
function useCountUp(target: number, active: boolean, duration = 700): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) { setDisplay(0); fromRef.current = 0; return; }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return active ? display : 0;
}

/* ── Custom Dropdown ── */
function FreqDropdown({
  value, onChange, error,
}: {
  value: FreqKey | '';
  onChange: (v: FreqKey) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = FREQ_OPTIONS.find(o => o.value === value);

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
        {selected ? (
          <span className="fd-selected">
            <strong>{selected.label}</strong>
            <span className="fd-selected-sub">{selected.sub}</span>
          </span>
        ) : (
          <span className="fd-placeholder">Select frequency</span>
        )}
        <svg className={`fd-chevron ${open ? 'fd-chevron--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul className="fd-menu" role="listbox">
          {FREQ_OPTIONS.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`fd-option ${value === opt.value ? 'fd-option--active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              <span className="fd-option-text">
                <span className="fd-option-label">{opt.label}</span>
                <span className="fd-option-sub">{opt.sub}</span>
              </span>
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

/* ── Slider Input ── */
function SliderField({
  id, label, min, max, step, value, suffix, onChange,
}: {
  id: string; label: string; min: number; max: number; step: number;
  value: string; suffix: string; onChange: (v: string) => void;
}) {
  const num = parseFloat(value) || 0;
  const pct = Math.min(100, Math.max(0, ((num - min) / (max - min)) * 100));

  return (
    <div className="sf-field">
      <div className="sf-top">
        <label htmlFor={id} className="ic-label">{label}</label>
        <div className="sf-value-pill">
          <input
            id={`${id}-num`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="sf-number"
          />
          <span className="sf-suffix">{suffix.trim()}</span>
        </div>
      </div>
      <div className="sf-track-wrap">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={num}
          onChange={e => onChange(e.target.value)}
          className="sf-range"
          style={{ '--pct': `${pct}%` } as React.CSSProperties}
        />
      </div>
      <div className="sf-labels">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );
}

/* ── Main Calculator ── */
interface FormState {
  startingAmount: string;
  additionalContrib: string;
  contribPerYear: string;
  investmentLength: string;
  annualRate: string;
  compoundFreq: FreqKey | '';
}

interface Errors { [k: string]: string | undefined }
interface Results { finalValue: number; totalContributions: number; interestEarned: number }

const initialForm: FormState = {
  startingAmount: '', additionalContrib: '0',
  contribPerYear: '', investmentLength: '10',
  annualRate: '10', compoundFreq: '',
};
const initialResults: Results = { finalValue: 0, totalContributions: 0, interestEarned: 0 };

export function InvestmentCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [results, setResults] = useState<Results>(initialResults);
  const [calculated, setCalculated] = useState(false);

  const finalDisplay = useCountUp(results.finalValue, calculated);
  const contribDisplay = useCountUp(results.totalContributions, calculated);
  const interestDisplay = useCountUp(results.interestEarned, calculated);

  const set = (name: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = useCallback((): Errors => {
    const e: Errors = {};
    const start = parseFloat(form.startingAmount);
    const contrib = parseFloat(form.additionalContrib);
    const perYear = parseFloat(form.contribPerYear);
    const length = parseFloat(form.investmentLength);
    const rate = parseFloat(form.annualRate);
    if (!form.startingAmount) e.startingAmount = 'Starting amount is required.';
    else if (isNaN(start) || start <= 0) e.startingAmount = 'Must be greater than 0.';
    if (!isNaN(contrib) && contrib > 0 && (!form.contribPerYear || isNaN(perYear) || perYear <= 0))
      e.contribPerYear = 'Required when additional contribution > 0.';
    if (!form.investmentLength || isNaN(length) || length <= 0) e.investmentLength = 'Investment length required.';
    if (form.annualRate === '' || isNaN(rate) || rate < 0) e.annualRate = 'Rate cannot be negative.';
    if (!form.compoundFreq) e.compoundFreq = 'Please select a compounding frequency.';
    return e;
  }, [form]);

  const calculate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const P = parseFloat(form.startingAmount);
    const pmt = parseFloat(form.additionalContrib) || 0;
    const pmtPerYear = parseFloat(form.contribPerYear) || 0;
    const years = parseFloat(form.investmentLength);
    const annualRate = parseFloat(form.annualRate) / 100;
    const n = FREQ_MAP[form.compoundFreq as FreqKey];
    let finalValue: number;
    if (annualRate === 0) {
      finalValue = P + pmt * pmtPerYear * years;
    } else {
      const ratePerPeriod = annualRate / n;
      const grownPrincipal = P * Math.pow(1 + ratePerPeriod, n * years);
      let grownContributions = 0;
      if (pmt > 0 && pmtPerYear > 0) {
        const r = annualRate / pmtPerYear;
        grownContributions = pmt * ((Math.pow(1 + r, pmtPerYear * years) - 1) / r);
      }
      finalValue = grownPrincipal + grownContributions;
    }
    const totalContributions = P + pmt * pmtPerYear * years;
    setResults({ finalValue, totalContributions, interestEarned: finalValue - totalContributions });
    setCalculated(true);
  };

  const reset = () => { setForm(initialForm); setErrors({}); setResults(initialResults); setCalculated(false); };
  const showContribPerYear = parseFloat(form.additionalContrib) > 0;

  const contribPct = calculated && results.finalValue > 0
    ? Math.round((results.totalContributions / results.finalValue) * 100) : 0;
  const growthPct = calculated && results.finalValue > 0
    ? Math.round(Math.max(0, results.interestEarned / results.finalValue) * 100) : 0;

  return (
    <div className="ic-card">
      <div className="ic-body">

        {/* ── Left: Inputs ── */}
        <div className="ic-left">
          <div className="ic-panel-label">Investment Details</div>

          {/* Starting Amount */}
          <div className="ic-field">
            <label className="ic-label" htmlFor="startingAmount">Starting Amount</label>
            <div className="ic-input-wrap">
              <span className="ic-prefix">GHC</span>
              <input id="startingAmount" type="number" min="0" placeholder="1,000"
                value={form.startingAmount}
                onChange={e => set('startingAmount', e.target.value)}
                className={`ic-input ic-input--prefixed ${errors.startingAmount ? 'ic-input--error' : ''}`} />
            </div>
            {errors.startingAmount && <span className="ic-error">{errors.startingAmount}</span>}
          </div>

          {/* Additional Contribution */}
          <div className="ic-field">
            <label className="ic-label" htmlFor="additionalContrib">
              Additional Contribution <span className="ic-optional">optional</span>
            </label>
            <div className="ic-input-wrap">
              <span className="ic-prefix">GHC</span>
              <input id="additionalContrib" type="number" min="0" placeholder="100"
                value={form.additionalContrib}
                onChange={e => set('additionalContrib', e.target.value)}
                className="ic-input ic-input--prefixed" />
            </div>
          </div>

          {/* Contributions per year */}
          {showContribPerYear && (
            <div className="ic-field ic-field--slide">
              <label className="ic-label" htmlFor="contribPerYear">
                Contributions per Year <span className="ic-hint-inline">12 = monthly</span>
              </label>
              <input id="contribPerYear" type="number" min="1" placeholder="12"
                value={form.contribPerYear}
                onChange={e => set('contribPerYear', e.target.value)}
                className={`ic-input ${errors.contribPerYear ? 'ic-input--error' : ''}`} />
              {errors.contribPerYear && <span className="ic-error">{errors.contribPerYear}</span>}
            </div>
          )}

          {/* Sliders */}
          <SliderField
            id="investmentLength" label="Investment Length" min={1} max={50} step={1}
            value={form.investmentLength} suffix=" yrs"
            onChange={v => set('investmentLength', v)}
          />
          {errors.investmentLength && <span className="ic-error" style={{ marginTop: -8 }}>{errors.investmentLength}</span>}

          <SliderField
            id="annualRate" label="Annual Rate of Return" min={0} max={50} step={0.5}
            value={form.annualRate} suffix="%"
            onChange={v => set('annualRate', v)}
          />
          {errors.annualRate && <span className="ic-error" style={{ marginTop: -8 }}>{errors.annualRate}</span>}

          {/* Custom Dropdown */}
          <div className="ic-field">
            <label className="ic-label">Compounding Frequency</label>
            <FreqDropdown
              value={form.compoundFreq}
              onChange={v => set('compoundFreq', v)}
              error={errors.compoundFreq}
            />
          </div>
        </div>

        {/* ── Right: Results ── */}
        <div className="ic-right">
          <div className="ic-results-header">
            <span className="ic-results-pill">Estimated Growth</span>
          </div>

          <div className={`ic-result-card ${calculated ? 'ic-result-card--active' : ''}`}>

            {/* Icon bubble */}
            <div className="ic-result-icon-bubble">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>

            {/* Title */}
            <span className="ic-result-title">Estimated Investment Value</span>

            {/* Main value */}
            <span className={`ic-result-amount ${calculated ? 'ic-result-amount--glow' : ''}`}>
              {formatGHC(finalDisplay)}
            </span>

            {calculated ? (
              <>
                <div className="ic-result-divider" />

                {/* Metrics */}
                <div className="ic-metrics">
                  <div className="ic-metric-item">
                    <span className="ic-metric-label">
                      <span className="ic-metric-dot ic-metric-dot--grey" />
                      Total Contributions
                    </span>
                    <span className="ic-metric-value">{formatGHC(contribDisplay)}</span>
                  </div>
                  <div className="ic-metric-item">
                    <span className="ic-metric-label">
                      <span className="ic-metric-dot ic-metric-dot--blue" />
                      Interest Earned
                    </span>
                    <span className="ic-metric-value ic-metric-value--accent">{formatGHC(interestDisplay)}</span>
                  </div>
                </div>

                {/* Breakdown bar */}
                {results.finalValue > 0 && (
                  <div className="ic-breakdown">
                    <div className="ic-breakdown-bar">
                      <div className="ic-bar-seg ic-bar-seg--contrib" style={{ width: `${contribPct}%` }} />
                      <div className="ic-bar-seg ic-bar-seg--interest" style={{ width: `${growthPct}%` }} />
                    </div>
                    <div className="ic-breakdown-legend">
                      <span className="ic-legend-chip">
                        <span className="ic-legend-dot ic-legend-dot--grey" />
                        Contributions {contribPct}%
                      </span>
                      <span className="ic-legend-chip">
                        <span className="ic-legend-dot ic-legend-dot--blue" />
                        Growth {growthPct}%
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div className="ic-empty-state">
                <div className="ic-empty-illustration">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M7 14l3-3 3 3 5-6"/>
                    <path d="M18 8h3v3"/>
                  </svg>
                </div>
                <p className="ic-empty-message">
                  Fill in your investment details and click <strong>"Calculate Growth"</strong> to view your
                  projected investment value, total contributions, and interest earned.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="ic-actions">
            <button className="ic-btn-primary" onClick={calculate}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
              Calculate Growth
            </button>
            <button className="ic-btn-secondary" onClick={reset}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Reset Calculator
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
