import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  startDelay?: number
}

export function useCountUp({ end, duration = 2000, suffix = '', prefix = '', startDelay = 1500 }: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasAnimated) return

    // Start animation after a delay (to sync with page load animations)
    const timeout = setTimeout(() => {
      setHasAnimated(true)
      
      const startTime = performance.now()
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(easeOut * end)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }
      
      requestAnimationFrame(animate)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [end, duration, hasAnimated, startDelay])

  const formatted = prefix + count.toLocaleString() + suffix

  return { ref, formatted }
}
