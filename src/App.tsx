import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Hero } from './components/Hero'
import { FeaturedWins } from './components/FeaturedWins'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionDivider } from './components/SectionDivider'
import { FloatingCTA } from './components/FloatingCTA'
import Work from './pages/Work'

function HomePage() {
  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <Hero />
        <SectionDivider from="surface-dark" to="surface-variant" />
        <FeaturedWins />
        <SectionDivider from="surface-variant" to="surface-dark" />
        <Services />
        <SectionDivider from="surface-dark" to="surface-variant" />
        <Contact />
        <SectionDivider from="surface-variant" to="background" />
        <Team />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  )
}
