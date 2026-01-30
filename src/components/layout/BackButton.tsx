'use client'

import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
  label?: string
  className?: string
}

export function BackButton({ label = 'Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className={`m3-text-button flex items-center gap-2 text-m3-on-dark/80 hover:text-m3-on-dark ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
