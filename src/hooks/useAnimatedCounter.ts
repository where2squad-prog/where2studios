import { useState, useEffect, useRef } from 'react'

interface UseAnimatedCounterOptions {
  baseValue: number
  maxIncrement: number
  intervalMs: number
  suffix?: string
}

export function useAnimatedCounter({ 
  baseValue, 
  maxIncrement, 
  intervalMs,
  suffix = ''
}: UseAnimatedCounterOptions) {
  const [value, setValue] = useState(baseValue)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setValue(prev => {
        // Small, subtle increment for natural trickle effect
        const increment = 1
        const newValue = prev + increment
        if (newValue > baseValue + maxIncrement) {
          return baseValue
        }
        return newValue
      })
    }, intervalMs)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [baseValue, maxIncrement, intervalMs])

  // Format the number with commas
  const formatted = value.toLocaleString() + suffix

  return formatted
}
