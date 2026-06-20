import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'

import { Where2BoysSheetProvider } from '@/contexts/Where2BoysSheetContext'
import { Where2BoysContactSheet } from '@/components/where2boys/Where2BoysContactSheet'

import { Where2BoysHero } from '@/components/where2boys/Where2BoysHero'
import { Where2BoysReach } from '@/components/where2boys/Where2BoysReach'
import { Where2BoysPillars } from '@/components/where2boys/Where2BoysPillars'
import { Where2BoysCollab } from '@/components/where2boys/Where2BoysCollab'
import { Where2BoysBridge } from '@/components/where2boys/Where2BoysBridge'

export default function Where2BoysPage() {
  return (
    <Where2BoysSheetProvider>
      <SEOHead
        title="Where2Boys. Bay Area food, spots, and culture."
        description="Let's work together. Event coverage, restaurant features, brand and creator partnerships. DM @where2boys or tell us where."
        url="https://where2studios.com/where2boys"
      />
      <main className="min-h-screen bg-m3-surface">
        <Where2BoysHero />
        <Where2BoysReach />
        <Where2BoysPillars />
        <Where2BoysCollab />
        <Where2BoysBridge />
        <Footer />
      </main>
      <Where2BoysContactSheet />
    </Where2BoysSheetProvider>
  )
}