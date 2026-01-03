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
  const directionRef = useRef<1 | -1>(1) // 1 = going up, -1 = going down

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const newValue = prev + directionRef.current
        
        // Reverse direction at boundaries
        if (newValue >= baseValue + maxIncrement) {
          directionRef.current = -1
          return prev - 1
        }
        if (newValue <= baseValue) {
          directionRef.current = 1
          return prev + 1
        }
        
        return newValue
      })
    }, intervalMs)

    return () => clearInterval(interval)
  }, [baseValue, maxIncrement, intervalMs])

  // Format the number with commas
  const formatted = value.toLocaleString() + suffix

  return formatted
}
