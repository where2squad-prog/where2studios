'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { isTechWeekCampaignLive } from '@/lib/techWeek'

const STORAGE_KEY = 'w2s-techweek-bar-dismissed'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setDismissed(true)
    } catch {
      // sessionStorage can be blocked, the bar just stays visible
    }
  }, [])

  if (dismissed || !isTechWeekCampaignLive()) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative bg-m3-primary text-m3-on-primary">
      <div className="max-w-7xl mx-auto flex items-center gap-2 px-3 sm:px-6 py-2 pr-10">
        <Link
          to="/sf-tech-week"
          className="flex items-center gap-1.5 min-w-0 text-[11px] sm:text-sm font-semibold leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary rounded"
        >
          <span className="min-w-0">
            SF Tech Week, Oct 5 to 11. Next morning recaps. Book your date
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss Tech Week notice"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-m3-on-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
