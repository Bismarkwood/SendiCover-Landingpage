import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import earthTextureUrl from '../../assets/earth-texture.jpg';
import '../../styles/InvestmentCalculator.css';

/* ── Cover options with available countries ── */
interface CoverOption {
  id: string;
  label: string;
  countries: { name: string; flag: string }[];
}

const COVER_OPTIONS: CoverOption[] = [
  {
    id: 'funeral',
    label: 'Funeral cover for a parent or loved one',
    countries: [
      { name: 'Ghana', flag: 'gh' },
      { name: 'Nigeria', flag: 'ng' },
      { name: 'Kenya', flag: 'ke' },
    ],
  },
  {
    id: 'life',
    label: 'Life insurance for my family',
    countries: [
      { name: 'Ghana', flag: 'gh' },
      { name: 'Nigeria', flag: 'ng' },
    ],
  },
  {
    id: 'health',
    label: 'Health cover for someone back home',
    countries: [
      { name: 'Ghana', flag: 'gh' },
      { name: 'Kenya', flag: 'ke' },
    ],
  },
  {
    id: 'critical',
    label: 'Critical illness protection',
    countries: [
      { name: 'Ghana', flag: 'gh' },
      { name: 'Nigeria', flag: 'ng' },
      { name: 'Kenya', flag: 'ke' },
    ],
  },
  {
    id: 'not-sure',
    label: 'Not sure yet — just checking',
    countries: [
      { name: 'Ghana', flag: 'gh' },
      { name: 'Nigeria', flag: 'ng' },
      { name: 'Kenya', flag: 'ke' },
    ],
  },
];

/* ── 3D Globe ── */
function Globe3D({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_s, delta) => { if (meshRef.current) meshRef.current.rotation.y += delta * 0.15; });
  return (
    <group>
      <mesh ref={meshRef} rotation={[0.1, -0.5, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={1} metalness={0} />
      </mesh>
      <Sphere args={[2.08, 32, 32]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}

/* ── Dropdown ── */
function CoverDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = COVER_OPTIONS.find(o => o.id === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="ca-dropdown-root" ref={ref}>
      <button type="button" className={`ca-dropdown-trigger ${open ? 'ca-dropdown-trigger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span className={selected ? 'ca-dropdown-value' : 'ca-dropdown-placeholder'}>
          {selected ? selected.label : 'Select cover type'}
        </span>
        <svg className={`ca-dropdown-chevron ${open ? 'ca-dropdown-chevron--up' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="ca-dropdown-menu">
          <ul className="ca-dropdown-list">
            {COVER_OPTIONS.map(opt => (
              <li key={opt.id} className={`ca-dropdown-option ${opt.id === value ? 'ca-dropdown-option--active' : ''}`} onClick={() => { onChange(opt.id); setOpen(false); }}>
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export function InvestmentCalculator() {
  const [selected, setSelected] = useState('');
  const [globeTexture, setGlobeTexture] = useState<THREE.Texture | null>(null);
  const coverData = COVER_OPTIONS.find(o => o.id === selected);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(earthTextureUrl, (tex) => setGlobeTexture(tex));
  }, []);

  return (
    <div className="ca-card">
      <div className="ca-layout">

        {/* Left: Form */}
        <div className="ca-form-side">
          <h2 className="ca-heading">Plan your family's cover</h2>
          <p className="ca-subtext">
            Select the type of protection you're looking for and see where it's currently available.
          </p>

          <div className="ca-field">
            <label className="ca-label">What support do you need?</label>
            <CoverDropdown value={selected} onChange={setSelected} />
          </div>

          {/* Countries result */}
          {coverData && (
            <div className="ca-countries-result">
              <div className="ca-countries-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Available in {coverData.countries.length} {coverData.countries.length === 1 ? 'country' : 'countries'}</span>
              </div>
              <div className="ca-countries-chips">
                {coverData.countries.map((c, i) => (
                  <div key={c.name} className="ca-country-chip" style={{ animationDelay: `${i * 0.1}s` }}>
                    <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.name} className="ca-country-chip-flag" width="24" height="16" />
                    <span className="ca-country-chip-name">{c.name}</span>
                    <span className="ca-country-chip-status">Live</span>
                  </div>
                ))}
              </div>
              <a href="/waitlist" className="ca-result-cta">Sign Up to Waitlist</a>
            </div>
          )}
        </div>

        {/* Right: Globe */}
        <div className="ca-globe-side">
          <div className="ca-globe-wrap">
            {globeTexture ? (
              <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[3, 2, 5]} intensity={1.5} />
                <directionalLight position={[-3, 1, -2]} intensity={0.6} />
                <Globe3D texture={globeTexture} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} minPolarAngle={Math.PI * 0.3} maxPolarAngle={Math.PI * 0.7} />
              </Canvas>
            ) : (
              <div className="ca-globe-fallback">Loading...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
