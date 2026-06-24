import { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WaitlistModal } from './components/common/WaitlistModal'
import { RevealSection } from './components/common/RevealSection'
import { HeroSection } from './components/sections/HeroSection'
import { TrustSection } from './components/sections/TrustSection'
import { ProblemSection } from './components/sections/ProblemSection'
import { ProductSection } from './components/sections/ProductSection'
import { FeaturesSection } from './components/sections/FeaturesSection'
import { HowItWorksSection } from './components/sections/HowItWorksSection'
import { QuoteSection } from './components/sections/QuoteSection'
import { FAQSection } from './components/sections/FAQSection'
import { CTABannerSection } from './components/sections/CTABannerSection'
import { TestimonialSection } from './components/sections/TestimonialSection'
import './styles/App.css'

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <main>
        <HeroSection />

        <RevealSection>
          <TrustSection />
        </RevealSection>

        <RevealSection>
          <ProblemSection />
        </RevealSection>

        <RevealSection>
          <ProductSection />
        </RevealSection>

        <RevealSection>
          <FeaturesSection />
        </RevealSection>

        <RevealSection direction="scale">
          <QuoteSection />
        </RevealSection>

        <RevealSection>
          <TestimonialSection />
        </RevealSection>

        <RevealSection>
          <HowItWorksSection />
        </RevealSection>

        <RevealSection>
          <FAQSection />
        </RevealSection>

        <RevealSection direction="scale">
          <CTABannerSection />
        </RevealSection>
      </main>
      <RevealSection>
        <Footer />
      </RevealSection>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  )
}

export default App
