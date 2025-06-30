// Página principal del sitio: landing page con todas las secciones

import Header from "@/components/Header"
import HeroSection from "@/components/landing/HeroSection"
import ProblemSolution from "@/components/landing/ProblemSolution"
import Benefits from "@/components/landing/Benefits"
import HowItWorks from "@/components/landing/HowItWorks"
import Mission from "@/components/landing/Mission"
import PreviewApp from "@/components/landing/PreviewApp"
import Footer from "@/components/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <ProblemSolution />
        <Benefits />
        <HowItWorks />
        <Mission />
        <PreviewApp />
      </main>
      <Footer />
    </div>
  )
}