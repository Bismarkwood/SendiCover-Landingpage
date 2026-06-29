import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import '../../styles/GlobeSection.css';

/* ── Country Data ── */
const COUNTRIES = [
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', lat: 7.9465, lng: -1.0232, available: true },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', lat: 9.0820, lng: 8.6753, available: true },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪', lat: -0.0236, lng: 37.9062, available: true },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', lat: -30.5595, lng: 22.9375, available: false },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼', lat: -1.9403, lng: 29.8739, available: false },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬', lat: 1.3733, lng: 32.2903, available: false },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿', lat: -6.3690, lng: 34.8888, available: false },
  { name: 'Senegal', code: 'SN', flag: '🇸🇳', lat: 14.4974, lng: -14.4524, available: false },
  { name: 'Ethiopia', code: 'ET', flag: '🇪🇹', lat: 9.1450, lng: 40.4897, available: false },
  { name: 'Cameroon', code: 'CM', flag: '🇨🇲', lat: 7.3697, lng: 12.3547, available: false },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', lat: 26.8206, lng: 30.8025, available: false },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦', lat: 31.7917, lng: -7.0926, available: false },
];

/* Convert lat/lng to 3D position */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/* ── Globe Mesh ── */
function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main globe */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1a2a6c"
          emissive="#0a1440"
          emissiveIntensity={0.3}
          specular="#4a6cf7"
          shininess={20}
          transparent
          opacity={0.92}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Country markers */}
      {COUNTRIES.map((country) => {
        const pos = latLngToVector3(country.lat, country.lng, 2.1);
        return (
          <group key={country.code} position={pos}>
            <Html
              center
              distanceFactor={6}
              style={{ pointerEvents: 'none' }}
            >
              <div className={`globe-flag-marker ${country.available ? 'globe-flag-marker--live' : ''}`}>
                <span className="globe-flag-emoji">{country.flag}</span>
              </div>
            </Html>
            {/* Dot on globe surface */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={country.available ? '#22c55e' : '#60a5fa'} />
            </mesh>
          </group>
        );
      })}

      {/* Connection arcs from Ghana */}
      <ArcLines />
    </group>
  );
}

/* ── Arc Lines from Ghana ── */
function ArcLines() {
  const ghanaPos = latLngToVector3(7.9465, -1.0232, 2);

  const arcs = useMemo(() => {
    return COUNTRIES.filter(c => c.code !== 'GH').map((country) => {
      const endPos = latLngToVector3(country.lat, country.lng, 2);
      const midPoint = new THREE.Vector3()
        .addVectors(ghanaPos, endPos)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.8);

      const curve = new THREE.QuadraticBezierCurve3(ghanaPos, midPoint, endPos);
      const points = curve.getPoints(32);
      return points.map(p => [p.x, p.y, p.z] as [number, number, number]);
    });
  }, [ghanaPos]);

  return (
    <>
      {arcs.map((points, i) => (
        <Line key={i} points={points} color="#60a5fa" lineWidth={0.5} transparent opacity={0.25} />
      ))}
    </>
  );
}

/* ── Floating Labels ── */
function FloatingLabels() {
  return (
    <div className="globe-floating-labels">
      <span className="globe-label" style={{ top: '15%', left: '5%' }}>Coverage Network</span>
      <span className="globe-label" style={{ top: '75%', right: '8%' }}>Family Protection</span>
      <span className="globe-label" style={{ bottom: '10%', left: '10%' }}>Cross-Border</span>
    </div>
  );
}

/* ── Main Section ── */
export function GlobeSection() {
  return (
    <section className="globe-section" id="countries">
      <div className="globe-container">

        {/* Left: Text */}
        <div className="globe-text">
          <span className="globe-eyebrow">COVERAGE NETWORK</span>
          <h2 className="globe-heading">Countries We Cover</h2>
          <p className="globe-desc">
            Sendi supports family protection across key African markets. Check availability for
            the country where your loved one lives.
          </p>

          <div className="globe-country-list">
            {COUNTRIES.map(c => (
              <div key={c.code} className={`globe-country-chip ${c.available ? 'globe-country-chip--live' : ''}`}>
                <span className="globe-chip-flag">{c.flag}</span>
                <span className="globe-chip-name">{c.name}</span>
                {c.available && <span className="globe-chip-badge">Live</span>}
              </div>
            ))}
          </div>

          <a href="#quote" className="globe-cta">Check Availability</a>
        </div>

        {/* Right: Globe */}
        <div className="globe-canvas-wrap">
          <FloatingLabels />
          <Suspense fallback={<div className="globe-fallback">Loading globe...</div>}>
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              style={{ width: '100%', height: '100%' }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 3, 5]} intensity={0.8} />
              <pointLight position={[-5, -3, -5]} intensity={0.3} color="#60a5fa" />
              <GlobeMesh />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                minPolarAngle={Math.PI * 0.3}
                maxPolarAngle={Math.PI * 0.7}
              />
            </Canvas>
          </Suspense>
        </div>

      </div>
    </section>
  );
}
