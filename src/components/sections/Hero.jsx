import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MorphText } from '@/components/ui/MorphText'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { STATS } from '../../config/siteConfig'
import { useIsMobile } from '@/hooks/useIsMobile'
import AgentImage from '../../../images/agent.avif'

const SplitText = ({ text, className = "", delay = 0 }) => {
  const letters = text.split('')
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()
  
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const handleMouseMove = useCallback((e) => {
    try {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error('[Hero] handleMouseMove:', error)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const bounceVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  }

  const services = [
    {
      number: "01",
      title: "ADMINISTRATIVE SUPPORT",
      description: "Streamlining operations for efficiency and productivity with professional document management."
    },
    {
      number: "02", 
      title: "PROJECT COORDINATION",
      description: "Managing projects from inception to successful completion with timeline management."
    },
    {
      number: "03",
      title: "COMMUNITY ENGAGEMENT",
      description: "Fostering collaboration and meaningful communication with outreach programs."
    }
  ]

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={AgentImage} 
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1623]/90 via-[#0E1623]/70 to-[#0E1623]/50"></div>
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              <SplitText text="WE DELIVER PROFESSIONAL" delay={0} />
              <br />
              <span className="text-gold">
                <SplitText text="SOLUTIONS THAT WORK" delay={0.8} />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="max-w-2xl mb-12">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Freelance, Consulting & Business Support Services for Organizations and Communities across Nigeria
            </p>
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 mt-4 text-gold hover:text-white transition-colors group"
            >
              <span className="underline-link relative">What we do</span>
              <i className="fas fa-arrow-right text-sm transform group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-2 left-0 text-gold/30 text-6xl font-bold opacity-50">
                  {service.number}
                </div>
                <h3 className="text-white text-lg font-bold mb-2 relative z-10">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gold">{STATS.yearsExperience.value}{STATS.yearsExperience.suffix}</span>
              <span className="text-white/60 text-sm">Years<br/>Experience</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gold">{STATS.clientsServed.value}{STATS.clientsServed.suffix}</span>
              <span className="text-white/60 text-sm">Clients<br/>Served</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gold">{STATS.projectsCompleted.value}{STATS.projectsCompleted.suffix}</span>
              <span className="text-white/60 text-sm">Projects<br/>Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gold">{STATS.clientRating.value}{STATS.clientRating.suffix}</span>
              <span className="text-white/60 text-sm">Client<br/>Rating</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-12">
            <Link 
              to="/contact" 
              className="bg-gold text-[#0E1623] font-semibold px-8 py-3 transition-all duration-300 hover:bg-yellow-500 hover:shadow-gold"
            >
              Get Started
            </Link>
            <a 
              href="https://wa.me/2347061934478"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 transition-all duration-300 hover:border-gold hover:text-gold flex items-center gap-2"
            >
              <i className="fab fa-whatsapp"></i>
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={isMobile ? {} : bounceVariants}
        initial={isMobile ? "visible" : "hidden"}
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity }}
      >
        <a href="#about-preview" className="flex flex-col items-center text-white/40 hover:text-gold transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-widest mb-2 font-medium">Scroll</span>
          <div className="flex gap-1">
            <span className="w-1 h-3 bg-current"></span>
            <span className="w-1 h-3 bg-current"></span>
            <span className="w-1 h-3 bg-current"></span>
          </div>
        </a>
      </motion.div>
    </section>
  )
}

export default Hero
