import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { RevealSection } from '../components/common/RevealSection'
import { HeroSection } from '../components/sections/HeroSection'
import { CheckBarSection } from '../components/sections/CheckBarSection'
import { AboutSection } from '../components/sections/AboutSection'
import { CoverShowcase } from '../components/sections/CoverShowcase'
import { ImpactSection } from '../components/sections/ImpactSection'
import { ProblemSection } from '../components/sections/ProblemSection'
import { ProductSection } from '../components/sections/ProductSection'
import { HowItWorksSection } from '../components/sections/HowItWorksSection'
import { QuoteSection } from '../components/sections/QuoteSection'
import { WhySendiSection } from '../components/sections/WhySendiSection'
import { FAQSection } from '../components/sections/FAQSection'
import { CTABannerSection } from '../components/sections/CTABannerSection'
import { TestimonialSection } from '../components/sections/TestimonialSection'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <CheckBarSection />

        <RevealSection>
          <AboutSection />
        </RevealSection>

        <RevealSection>
          <ProblemSection />
        </RevealSection>

        <RevealSection>
          <CoverShowcase />
        </RevealSection>

        <RevealSection>
          <ImpactSection />
        </RevealSection>

        <RevealSection>
          <ProductSection />
        </RevealSection>

        <RevealSection direction="scale">
          <QuoteSection />
        </RevealSection>

        <RevealSection>
          <WhySendiSection />
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
    </>
  )
}
