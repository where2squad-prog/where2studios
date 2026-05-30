'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/where2studios-logo.png';
import { useBookingSheet } from '@/contexts/BookingSheetContext';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/who-we-are', label: 'About' },
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

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
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

  // Close services dropdown on outside click / Escape
  useEffect(() => {
    if (!isServicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsServicesOpen(false);
        servicesTriggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isServicesOpen]);

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface-dark rounded-md';

  return (
    <>
      <motion.nav
        ref={navRef}
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
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                  className={`m3-text-button relative transition-colors ${
                    isLight
                      ? 'text-m3-on-surface/80 hover:text-m3-on-surface'
                      : 'text-m3-on-dark/80 hover:text-m3-on-dark'
                  } ${
                    location.pathname === link.href
                      ? isLight
                        ? 'text-m3-on-surface'
                        : 'text-m3-on-dark'
                      : ''
                  } ${focusRing}`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-m3-primary" />
                  )}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                ref={servicesRef}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  ref={servicesTriggerRef}
                  to="/services"
                  aria-current={location.pathname.startsWith('/services') ? 'page' : undefined}
                  aria-haspopup="menu"
                  aria-expanded={isServicesOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsServicesOpen(true);
                      requestAnimationFrame(() => {
                        const first = servicesRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]');
                        first?.focus();
                      });
                    }
                  }}
                  className={`m3-text-button relative transition-colors ${
                    isLight
                      ? 'text-m3-on-surface/80 hover:text-m3-on-surface'
                      : 'text-m3-on-dark/80 hover:text-m3-on-dark'
                  } ${
                    location.pathname.startsWith('/services')
                      ? isLight
                        ? 'text-m3-on-surface'
                        : 'text-m3-on-dark'
                      : ''
                  } ${focusRing}`}
                >
                  Services
                  {location.pathname.startsWith('/services') && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-m3-primary" />
                  )}
                </Link>
                <div
                  role="menu"
                  className={`absolute top-full left-0 pt-2 transition-all ${
                    isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <div className="m3-elevated-card p-2 min-w-[180px]">
                    {serviceLinks.map((link, i) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        role="menuitem"
                        tabIndex={isServicesOpen ? 0 : -1}
                        onKeyDown={(e) => {
                          const items = Array.from(
                            servicesRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []
                          );
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            items[(i + 1) % items.length]?.focus();
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            items[(i - 1 + items.length) % items.length]?.focus();
                          } else if (e.key === 'Escape') {
                            e.preventDefault();
                            setIsServicesOpen(false);
                            servicesTriggerRef.current?.focus();
                          }
                        }}
                        onClick={() => setIsServicesOpen(false)}
                        className={`block px-4 py-2 text-sm text-m3-on-surface hover:bg-m3-surface-variant rounded-lg transition-colors ${focusRing}`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={openSheet} className={`ml-2 m3-filled-button text-sm ${focusRing}`}>
                Book a Call
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={openSheet} className={`m3-filled-button text-xs px-4 py-2 ${focusRing}`}>
                Book a Call
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                className={`p-2 rounded-full ${textColor} hover:bg-m3-on-dark/10 transition-colors ${focusRing}`}
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
                    aria-label="Close menu"
                    className={`p-2 rounded-full text-m3-on-dark hover:bg-m3-on-dark/10 ${focusRing}`}
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
                    Book a Call
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
