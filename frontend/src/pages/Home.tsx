import CTASection from '../components/sections/CTASection'
import FounderSection from '../components/sections/FounderSection'
import Hero from '../components/sections/Hero'
import HowItWorks from '../components/sections/HowItWorks'
import ProblemSection from '../components/sections/ProblemSection'
import SolutionSection from '../components/sections/SolutionSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FounderSection />
      <CTASection />
    </>
  )
}
