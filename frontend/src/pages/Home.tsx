import Hero from '../components/sections/Hero'
import ProblemSolutionSection from '../components/sections/ProblemSection'
import HowItWorks from '../components/sections/HowItWorks'
import FounderSection from '../components/sections/FounderSection'
import CTASection from '../components/sections/CTASection'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolutionSection />
      <HowItWorks />
      <FounderSection />
      <CTASection />
      <ContactSection />
    </>
  )
}