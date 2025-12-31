import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Awards } from './components/Awards'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <Hero />
        <Services />
        <Awards />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}