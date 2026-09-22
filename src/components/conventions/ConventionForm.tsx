'use client'

import { BookingFlow } from '@/components/booking/BookingFlow'
import { deliverables } from '@/data/deliverables'

export const conventionNeedOptions = [
  ...deliverables.map((d) => d.title),
  'Sponsor coverage',
  'Not sure yet',
]

interface ConventionFormProps {
  slug: string
  conventionName: string
  year: number
  /** Deliverable picked on the page, carried onto the booking. */
  preselected: string
  onPreselect: (value: string) => void
}

/** Conference page booking: the site-wide booking flow with the conference already picked. */
export function ConventionForm({ slug, conventionName, year, preselected }: ConventionFormProps) {
  return (
    <BookingFlow
      key={`${slug}-${preselected || 'none'}`}
      variant="inline"
      prefill={{
        conference: `${conventionName} ${year}`,
        need: preselected || undefined,
        source: `convention:${slug}`,
      }}
    />
  )
}
