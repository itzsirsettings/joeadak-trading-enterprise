import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FooterPeople from '../../../images/footer-people.png'
import JoeadakLogo from '../../../images/Joeadak logo 2D.png'
import { SITE, SOCIAL_LINKS } from '../../config/siteConfig'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ]

  const services = [
    { name: 'Administrative & Business Support', path: '/services' },
    { name: 'Project & Program Coordination', path: '/services' },
    { name: 'Community Engagement', path: '/services' },
    { name: 'Event Planning & Coordination', path: '/services' },
    { name: 'Consultancy & Advisory Support', path: '/services' },
    { name: 'Operational & Business Assistance', path: '/services' },
  ]

  return (
    <footer className="bg-white relative overflow-hidden">

      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <img 
                src={JoeadakLogo} 
                alt="JOEADAK Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Delivering Professional Solutions with Excellence & Integrity. Flexible Freelance & Consulting Services for Businesses, Communities, and Organizations.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'fa-whatsapp', href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
                { icon: 'fa-facebook-f', href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { icon: 'fa-instagram', href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                { icon: 'fa-linkedin-in', href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center hover:bg-secondary transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <i className={`fab ${social.icon} text-white`} aria-hidden="true"></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6 text-primary flex items-center gap-2">
              <span className="w-1 h-6 bg-secondary rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-secondary transition-colors text-sm flex items-center gap-3 group"
                  >
                    <i className="fas fa-chevron-right text-xs text-secondary group-hover:text-secondary"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6 text-primary flex items-center gap-2">
              <span className="w-1 h-6 bg-secondary rounded-full"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-600 hover:text-secondary transition-colors text-sm flex items-center gap-3 group"
                  >
                    <i className="fas fa-check text-xs text-secondary group-hover:text-secondary"></i>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6 text-primary flex items-center gap-2">
              <span className="w-1 h-6 bg-secondary rounded-full"></span>
              Contact Info
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-secondary"></i>
                </div>
                <span className="text-gray-600 text-sm leading-relaxed">
                  {SITE.address.street},<br />{SITE.address.area}, {SITE.address.city}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-secondary"></i>
                </div>
                <a href={`tel:${SITE.phoneRaw}`} className="text-gray-600 text-sm hover:text-secondary transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-secondary"></i>
                </div>
                <a href={`mailto:${SITE.email}`} className="text-gray-600 text-sm hover:text-secondary transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 p-5 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-primary font-semibold text-sm mb-2">Business Hours</p>
              <p className="text-gray-600 text-xs">{SITE.hours.weekdays}</p>
              <p className="text-gray-600 text-xs">{SITE.hours.saturday}</p>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Copyright & Credits */}
      <div className="border-t border-gray-100 bg-white relative z-20">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} {SITE.name}. All rights reserved.</p>
          <p>
            Built by <span className="font-semibold text-primary">Merenity Technology</span>
          </p>
        </div>
      </div>

      <div className="w-full bg-white relative z-10 overflow-visible">
        {/* JOEADAK text above the image */}
        <div className="w-full flex justify-center bg-white pt-[15%]">
          <h1 
            className="text-[25vw] font-bold text-primary leading-none select-none whitespace-nowrap relative z-0"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            JOEADAK
          </h1>
        </div>
        <img 
          src={FooterPeople} 
          alt="JOEADAK Team" 
          className="w-full h-auto object-cover object-top relative z-10 -mt-[10%]"
        />
      </div>
    </footer>
  )
}

export default Footer
