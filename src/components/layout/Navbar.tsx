'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/where2studios-logo.png';
import { useBookingSheet } from '@/contexts/BookingSheetContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/startups', label: 'Our Work' },
  { href: '/who-we-are', label: 'Who We Are' },
];

const serviceLinks = [
  { href: '/services/strategy', label: 'Brand and Growth Strategy' },
  { href: '/services/production', label: 'High Impact Media Production' },
  { href: '/services/marketing', label: 'Full Service Marketing Execution' },
];

interface NavbarProps {
  variant?: 'light' | 'dark';
}

export function Navbar({ variant = 'dark' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openSheet } = useBookingSheet();

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-m3-on-surface' : 'text-m3-on-dark';
  const bgColor = isLight ? 'bg-m3-surface' : 'bg-m3-surface-dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div
          className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled
              ? `py-2 ${bgColor}/95 backdrop-blur-xl border-b ${
                  isLight ? 'border-m3-outline' : 'border-m3-on-dark/10'
                }`
              : `py-3 lg:py-4 ${
                  isLight
                    ? 'bg-transparent'
                    : 'bg-gradient-to-b from-m3-surface-dark/70 via-m3-surface-dark/40 to-transparent'
                }`
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link to="/" className="flex items-center cursor-pointer">
              <motion.img
                animate={{ scale: isScrolled ? 0.75 : 1 }}
                transition={{ duration: 0.3 }}
                src={logo}
                alt="Where2Studios"
                className={`w-auto drop-shadow-2xl origin-left transition-all duration-300 ${
                  isScrolled ? 'h-12 sm:h-14 lg:h-18' : 'h-14 sm:h-18 lg:h-24'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`m3-text-button transition-colors ${
                    isLight
                      ? 'text-m3-on-surface/80 hover:text-m3-on-surface'
                      : 'text-m3-on-dark/80 hover:text-m3-on-dark'
                  } ${
                    location.pathname === link.href
                      ? isLight
                        ? 'text-m3-on-surface'
                        : 'text-m3-on-dark'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative group">
                <Link
                  to="/services"
                  className={`m3-text-button transition-colors ${
                    isLight
                      ? 'text-m3-on-surface/80 hover:text-m3-on-surface'
                      : 'text-m3-on-dark/80 hover:text-m3-on-dark'
                  } ${
                    location.pathname.startsWith('/services')
                      ? isLight
                        ? 'text-m3-on-surface'
                        : 'text-m3-on-dark'
                      : ''
                  }`}
                >
                  Services
                </Link>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="m3-elevated-card p-2 min-w-[180px]">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-m3-on-surface hover:bg-m3-surface-variant rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={openSheet} className="ml-2 m3-filled-button text-sm">
                Book a Strategy Call
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={openSheet} className="m3-filled-button text-xs px-4 py-2">
                Book a Strategy Call
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full ${textColor} hover:bg-m3-on-dark/10 transition-colors`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-m3-surface-dark/60 backdrop-blur-sm z-[115]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-72 bg-m3-surface-dark/95 backdrop-blur-xl border-l border-m3-on-dark/10 z-[120]"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-m3-on-dark hover:bg-m3-on-dark/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col px-6 gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="px-4 py-3 text-m3-on-dark hover:bg-m3-on-dark/10 rounded-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-m3-on-dark/10 my-2" />
                  <span className="px-4 py-2 text-m3-on-dark/50 text-xs uppercase tracking-wide">
                    Services
                  </span>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="px-4 py-2 text-m3-on-dark/80 hover:bg-m3-on-dark/10 rounded-lg text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-6">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      openSheet()
                    }}
                    className="m3-filled-button w-full text-center block"
                  >
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
