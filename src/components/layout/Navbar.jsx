import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ImageAccordion } from '@/components/ui/ImageAccordion'
import JoeadakLogo from '../../../images/Joeadak logo 2D.png'
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

  const isHomePage = location.pathname === '/'
  const showGlassEffect = !isHomePage || scrolled

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showGlassEffect ? 'glass-navbar' : 'bg-transparent'
      } ${scrolled ? 'py-1' : 'py-2'}`}
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
                    className={`flex items-center gap-1 font-medium transition-all duration-200 text-xs tracking-wide px-3 py-1.5 rounded-lg ${
                      showGlassEffect ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    } ${!showGlassEffect && activeDropdown === link.name ? 'text-secondary' : showGlassEffect && activeDropdown === link.name ? 'text-secondary' : ''}`}
                  >
                    <span className="font-heading">{link.name}</span>
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${
                      activeDropdown === link.name ? 'rotate-180' : ''
                    }`}></i>
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-all duration-200 text-xs tracking-wide px-3 py-1.5 rounded-lg ${
                      showGlassEffect ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    } ${location.pathname === link.path ? 'text-secondary' : ''}`}
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

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://wa.me/2347061934478"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 shadow-md"
            >
              <i className="fab fa-whatsapp text-white text-xs"></i>
            </a>
            <Button variant="moving" size="sm">
              <Link to="/contact" className="flex items-center gap-2">
                <span>Work With Us</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden p-1.5 rounded-lg transition-colors ${
              showGlassEffect ? 'text-primary hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-sm`}></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden mt-1 shadow-lg ${
              showGlassEffect 
                ? 'bg-white/98 backdrop-blur-md border-t border-gray-200' 
                : 'bg-primary/95 backdrop-blur-md border-t border-white/20'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block font-medium py-2 px-3 rounded-lg transition-colors text-sm ${
                      showGlassEffect 
                        ? 'text-primary hover:bg-gray-100' 
                        : 'text-white hover:bg-white/10'
                    } ${location.pathname === link.path ? 'text-secondary' : ''}`}
                  >
                    <span className="font-heading">{link.name}</span>
                  </Link>
                ))}
              </div>
              <div className={`flex items-center gap-3 pt-4 mt-4 ${
                showGlassEffect ? 'border-t border-gray-200' : 'border-t border-white/20'
              }`}>
                <a
                  href="https://wa.me/2347061934478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                >
                  <i className="fab fa-whatsapp text-white text-sm"></i>
                </a>
                <div className="flex-1">
                  <Button variant="moving" size="sm">
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      Work With Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
