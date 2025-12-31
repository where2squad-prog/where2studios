import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Hero } from './components/Hero'
import { FeaturedWins } from './components/FeaturedWins'
import { Services } from './components/Services'
import { Awards } from './components/Awards'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import Work from './pages/Work'

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <Hero />
        <FeaturedWins />
        <Services />
        <Awards />
        <Team />
        <Contact />
      </main>
      <Footer />
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
