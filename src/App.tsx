import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { TrustSection } from './components/sections/TrustSection'
import './styles/App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
      </main>
    </>
  )
}

export default App
