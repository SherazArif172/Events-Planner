import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}