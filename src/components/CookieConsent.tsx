'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = 'cookie-consent'
const PREFERENCES_KEY = 'cookie-preferences'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(CONSENT_KEY)
    if (!hasConsented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, 'true')
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false }
    setPreferences(necessaryOnly)
    saveConsent(necessaryOnly)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't toggle necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[130] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="m3-elevated-card bg-m3-surface border border-m3-outline/20 p-4 sm:p-6 shadow-2xl">
              <AnimatePresence mode="wait">
                {!showSettings ? (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-m3-primary/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-5 h-5 text-m3-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-m3-on-surface text-sm sm:text-base">
                          We value your privacy
                        </h3>
                        <p className="text-m3-on-surface/70 text-xs sm:text-sm mt-1 leading-relaxed">
                          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                          By clicking "Accept All", you consent to our use of cookies. 
                          <Link to="/privacy" className="text-m3-primary hover:underline ml-1">
                            Learn more
                          </Link>
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="m3-filled-button text-sm py-2.5 px-5 order-1 sm:order-2"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={handleAcceptNecessary}
                        className="m3-outlined-button text-sm py-2.5 px-5 order-2 sm:order-1"
                      >
                        Necessary Only
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="m3-text-button text-m3-on-surface/70 text-sm py-2.5 flex items-center justify-center gap-1.5 order-3"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Settings Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-m3-on-surface">Cookie Settings</h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="p-1.5 hover:bg-m3-surface-variant rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-m3-on-surface/70" />
                      </button>
                    </div>

                    {/* Cookie Options */}
                    <div className="space-y-3 mb-5">
                      {/* Necessary */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50">
                        <div>
                          <p className="font-medium text-m3-on-surface text-sm">Necessary</p>
                          <p className="text-m3-on-surface/60 text-xs">Required for the website to function</p>
                        </div>
                        <div className="w-11 h-6 rounded-full bg-m3-primary/30 flex items-center px-0.5 cursor-not-allowed">
                          <div className="w-5 h-5 rounded-full bg-m3-primary shadow-sm ml-auto" />
                        </div>
                      </div>

                      {/* Analytics */}
                      <button
                        onClick={() => togglePreference('analytics')}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50 hover:bg-m3-surface-variant transition-colors text-left"
                      >
                        <div>
                          <p className="font-medium text-m3-on-surface text-sm">Analytics</p>
                          <p className="text-m3-on-surface/60 text-xs">Help us understand how visitors use our site</p>
                        </div>
                        <div className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                          preferences.analytics ? 'bg-m3-primary/30' : 'bg-m3-outline/30'
                        }`}>
                          <div className={`w-5 h-5 rounded-full shadow-sm transition-all ${
                            preferences.analytics ? 'bg-m3-primary ml-auto' : 'bg-m3-surface-variant'
                          }`} />
                        </div>
                      </button>

                      {/* Marketing */}
                      <button
                        onClick={() => togglePreference('marketing')}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50 hover:bg-m3-surface-variant transition-colors text-left"
                      >
                        <div>
                          <p className="font-medium text-m3-on-surface text-sm">Marketing</p>
                          <p className="text-m3-on-surface/60 text-xs">Personalized ads and content</p>
                        </div>
                        <div className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                          preferences.marketing ? 'bg-m3-primary/30' : 'bg-m3-outline/30'
                        }`}>
                          <div className={`w-5 h-5 rounded-full shadow-sm transition-all ${
                            preferences.marketing ? 'bg-m3-primary ml-auto' : 'bg-m3-surface-variant'
                          }`} />
                        </div>
                      </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="m3-outlined-button text-sm py-2.5 px-5 flex-1"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="m3-filled-button text-sm py-2.5 px-5 flex-1"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Utility to get cookie preferences (for use in analytics/marketing scripts)
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(PREFERENCES_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// Utility to check if a specific cookie type is allowed
export function isCookieAllowed(type: keyof CookiePreferences): boolean {
  const prefs = getCookiePreferences()
  return prefs ? prefs[type] : false
}
