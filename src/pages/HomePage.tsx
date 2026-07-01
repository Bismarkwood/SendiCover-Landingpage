import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { RevealSection } from '../components/common/RevealSection'
import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { ImpactSection } from '../components/sections/ImpactSection'
import { ProblemSection } from '../components/sections/ProblemSection'
import { ProductSection } from '../components/sections/ProductSection'
import { HowItWorksSection } from '../components/sections/HowItWorksSection'
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

        <RevealSection>
          <AboutSection />
        </RevealSection>

        <RevealSection>
          <ProblemSection />
        </RevealSection>

        <RevealSection>
          <ImpactSection />
        </RevealSection>

        <RevealSection>
          <ProductSection />
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
