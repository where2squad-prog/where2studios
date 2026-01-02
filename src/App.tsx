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
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <Hero />
        <SectionDivider from="near-black" to="background" />
        <FeaturedWins />
        <SectionDivider from="background" to="near-black" />
        <Services />
        <SectionDivider from="near-black" to="cream" />
        <Contact />
        <SectionDivider from="cream" to="background" />
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
