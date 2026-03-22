import React, { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { MorphText } from '@/components/ui/MorphText'
import { InfiniteGrid } from '@/components/ui/InfiniteGrid'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { STATS } from '../../config/siteConfig'



const Hero = () => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
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

  const morphWords = [
    "Solutions",
    "Excellence", 
    "Innovation",
    "Partnership"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Infinite Grid Background */}
      <InfiniteGrid
        showPattern={true}
        gridSize={40}
        speed={0.5}
        className="min-h-screen"
      />

      {/* Content Container */}
      <div className="container-custom relative z-20 pt-32 pb-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-[1.1]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            <motion.span 
              className="block mb-1"
              animate={floatAnimation}
            >
              Delivering Professional
            </motion.span>
            <motion.span 
              className="block text-secondary mb-1"
              animate={floatAnimation}
              transition={{ delay: 0.2 }}
            >
              <MorphText
                words={morphWords}
                textClassName="text-secondary"
                animationType="slideUp"
                interval={2500}
                disabled={false}
              />
            </motion.span>
            <motion.span 
              className="block"
              animate={floatAnimation}
              transition={{ delay: 0.4 }}
            >
              with Excellence
            </motion.span>
            <motion.span 
              className="block"
              animate={floatAnimation}
              transition={{ delay: 0.6 }}
            >
              & Integrity
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Flexible Freelance & Consulting Services for Businesses, 
            <br className="hidden sm:block" />
            Communities, and Organizations
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Button variant="moving" size="sm">
              <Link to="/contact" className="flex items-center gap-2">
                <span>Work With Us</span>
                <motion.i
                  className="fas fa-arrow-right text-xs"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </Button>
            
            <Button variant="moving" size="sm">
              <Link to="/contact" className="flex items-center gap-2">
                <i className="fas fa-file-invoice text-xs"></i>
                <span>Get a Quote</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <i className="fas fa-check text-secondary text-xs"></i>
                </motion.div>
                <span className="text-primary font-semibold text-sm">{STATS.yearsExperience.value}{STATS.yearsExperience.suffix} Years Experience</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeUp" delay={0.2}>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <i className="fas fa-check text-secondary text-xs"></i>
                </motion.div>
                <span className="text-primary font-semibold text-sm">{STATS.clientsServed.value}{STATS.clientsServed.suffix} Clients Served</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeUp" delay={0.3}>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <i className="fas fa-check text-secondary text-xs"></i>
                </motion.div>
                <span className="text-primary font-semibold text-sm">{STATS.clientRating.value}{STATS.clientRating.suffix} Rating</span>
              </div>
            </ScrollReveal>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={bounceVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity }}
      >
        <a href="#about-preview" className="flex flex-col items-center text-primary/60 hover:text-secondary transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-widest mb-1 font-medium">Scroll</span>
          <div className="w-4 h-6 border-2 border-current rounded-full flex justify-center pt-1">
            <motion.div
              className="w-1 h-1 bg-current rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}

export default Hero
