import { useState, useEffect } from 'react'

interface UseAnimatedCounterOptions {
  storageKey: string
  startValue: number
  endValue: number
  durationHours: number
  intervalMs: number
  suffix?: string
}

export function useAnimatedCounter({ 
  storageKey,
  startValue, 
  endValue, 
  durationHours,
  intervalMs,
  suffix = ''
}: UseAnimatedCounterOptions) {
  const [value, setValue] = useState(startValue)

  useEffect(() => {
    const totalDurationMs = durationHours * 60 * 60 * 1000
    const totalIncrement = endValue - startValue
    
    // Get stored progress from localStorage
    const stored = localStorage.getItem(storageKey)
    let startTime: number
    let currentValue: number

    if (stored) {
      const parsed = JSON.parse(stored)
      startTime = parsed.startTime
      const elapsed = Date.now() - startTime
      
      // Calculate where we should be based on elapsed time
      const progress = Math.min(elapsed / totalDurationMs, 1)
      currentValue = Math.floor(startValue + (totalIncrement * progress))
    } else {
      // First visit - start fresh
      startTime = Date.now()
      currentValue = startValue
      localStorage.setItem(storageKey, JSON.stringify({ startTime }))
    }

    setValue(currentValue)

    // If we've reached the end, no need to animate
    if (currentValue >= endValue) {
      setValue(endValue)
      return
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDurationMs, 1)
      const newValue = Math.floor(startValue + (totalIncrement * progress))
      
      setValue(newValue)
      
      // Stop when we reach the end
      if (newValue >= endValue) {
        clearInterval(interval)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }, [storageKey, startValue, endValue, durationHours, intervalMs])

  // Format the number with commas
  const formatted = value.toLocaleString() + suffix

  return formatted
}
