import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageAccordion } from '@/components/ui/ImageAccordion'
import JoeadakLogo from '../../../images/Joeadak-logo-new.png'
import { serviceImages, projectImages } from '../../config/navbarImages'

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services', images: serviceImages },
  { name: 'Projects', path: '/projects', images: projectImages },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDropdownEnter = (name) => {
    setActiveDropdown(name)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const getDropdownImages = (name) => {
    const link = navLinks.find((l) => l.name === name)
    return link?.images || []
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={JoeadakLogo} 
              alt="JOEADAK Logo" 
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.images && handleDropdownEnter(link.name)}
                onMouseLeave={handleDropdownLeave}
              >
                {link.images ? (
                  <button
                    className={`flex items-center gap-1 font-medium transition-all duration-200 text-sm tracking-wide px-4 py-2 ${
                      activeDropdown === link.name 
                        ? 'text-gold' 
                        : scrolled ? 'text-deepBlue hover:text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    <span className="font-heading">{link.name}</span>
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${
                      activeDropdown === link.name ? 'rotate-180' : ''
                    }`}></i>
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-all duration-200 text-sm tracking-wide px-4 py-2 ${
                      location.pathname === link.path 
                        ? 'text-gold' 
                        : scrolled ? 'text-deepBlue hover:text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    <span className="font-heading">{link.name}</span>
                  </Link>
                )}

                <AnimatePresence>
                  {link.images && activeDropdown === link.name && (
                    <ImageAccordion items={getDropdownImages(link.name)} basePath={link.path} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://wa.me/2347061934478"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 font-medium transition-all duration-200 text-sm ${
                scrolled ? 'text-deepBlue hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              <i className="fab fa-whatsapp text-lg"></i>
              <span>Chat with us</span>
            </a>
            <Link
              to="/contact"
              className="bg-gold text-deepBlue font-semibold px-6 py-2.5 transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-sm">Get Started</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-deepBlue hover:bg-deepBlue/10' : 'text-white hover:bg-white/10'
            }`}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block font-medium py-3 px-4 transition-colors text-sm ${
                      location.pathname === link.path ? 'text-gold bg-gold/10' : 'text-deepBlue hover:text-gold hover:bg-gold/5'
                    }`}
                  >
                    <span className="font-heading">{link.name}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-200">
                <a
                  href="https://wa.me/2347061934478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-deepBlue flex items-center justify-center hover:bg-sapphire transition-colors shadow-md"
                >
                  <i className="fab fa-whatsapp text-white"></i>
                </a>
                <Link
                  to="/contact"
                  className="flex-1 bg-gold text-deepBlue font-semibold py-3 text-center transition-all duration-300 hover:bg-yellow-500"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
