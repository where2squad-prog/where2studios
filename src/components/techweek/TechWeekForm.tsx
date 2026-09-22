'use client'

import { BookingFlow } from '@/components/booking/BookingFlow'
import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'

interface TechWeekFormProps {
  /** Package picked on the page, carried onto the booking. */
  preselected: string
  onPreselect: (value: string) => void
}

/** Tech Week booking: the site-wide booking flow with the week already picked. */
export function TechWeekForm({ preselected }: TechWeekFormProps) {
  const phase = useTechWeekPhase()
  const weekAhead = phase.kind !== 'la-week' && phase.kind !== 'wrapped'
  return (
    <BookingFlow
      key={`${weekAhead}-${preselected || 'none'}`}
      variant="inline"
      prefill={{
        conference: weekAhead ? 'SF Tech Week 2026' : undefined,
        need: preselected || undefined,
        source: 'sf-tech-week',
      }}
    />
  )
}
