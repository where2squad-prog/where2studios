import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function useCountUp({ end, duration = 2000, suffix = '', prefix = '' }: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
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
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  const formatted = prefix + count.toLocaleString() + suffix

  return { ref, formatted }
}
