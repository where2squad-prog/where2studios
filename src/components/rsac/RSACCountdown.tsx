'use client'

import { useConventionStatus } from '@/hooks/useConventionStatus'
import { RSAC, rsacCountdownLine } from '@/lib/rsaConference'

/**
 * Days until the next RSA Conference edition, driven by the shared
 * conventions phase engine so it rolls over on its own.
 */
export function RSACCountdown({ className = '' }: { className?: string }) {
  const { phase } = useConventionStatus(RSAC)
  const text = rsacCountdownLine(phase)
  if (!text) return null

  return (
    <p className={`font-fredoka font-semibold text-m3-primary ${className}`} aria-live="polite">
      {text}
    </p>
  )
}
