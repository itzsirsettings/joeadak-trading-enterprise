import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Star, Handshake, CheckCircle } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { BouncyCard } from '@/components/ui/BouncyCard'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { STATS } from '../../config/siteConfig'
import GoogleReviewsWidget from '@/components/ui/GoogleReviewsWidget'

const stats = [
  {
    id: 1,
    value: STATS.yearsExperience.value,
    suffix: STATS.yearsExperience.suffix,
    label: STATS.yearsExperience.label,
    icon: Clock,
    description: 'Serving clients with excellence',
  },
  {
    id: 2,
    value: STATS.clientRating.value,
    suffix: STATS.clientRating.suffix,
    label: STATS.clientRating.label,
    icon: Star,
    isDecimal: STATS.clientRating.isDecimal,
    description: 'Based on client feedback',
  },
  {
    id: 3,
    value: STATS.clientsServed.value,
    suffix: STATS.clientsServed.suffix,
    label: STATS.clientsServed.label,
    icon: Handshake,
    description: 'Across Nigeria',
  },
  {
    id: 4,
    value: STATS.projectsCompleted.value,
    suffix: STATS.projectsCompleted.suffix,
    label: STATS.projectsCompleted.label,
    icon: CheckCircle,
    description: 'Successful deliveries',
  },
]

const StatItem = ({ stat, isInView, index }) => {
  const [count, setCount] = useState(0)
  const Icon = stat.icon

  useEffect(() => {
    if (!isInView) return

    try {
      let start = 0
      const end = stat.value
      const duration = 2500
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 16)

      return () => clearInterval(timer)
    } catch (error) {
      if (import.meta.env.DEV) console.error('[StatsSection] countAnimation:', error)
    }
  }, [isInView, stat.value])

  const displayValue = stat.isDecimal ? count.toFixed(1) : Math.floor(count)

  return (
    <StaggerItem animation="scaleUp">
      <BouncyCard className="min-h-[14rem] list-none">
        <div className="relative h-full bg-white p-3 shadow-sm">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-iceBlue/20 p-6">
              <div className="relative z-10">
              <motion.div
                className="w-10 h-10 bg-gold/20 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-5 h-5 text-gold" />
              </motion.div>
              
              <div className="flex items-baseline gap-1 mb-1">
                <motion.span
                  className="text-3xl md:text-4xl font-bold text-deepBlue"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {displayValue}
                </motion.span>
                <span className="text-xl font-bold text-sapphire">
                  {stat.suffix}
                </span>
              </div>
              
              <p className="text-gray-800 font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.description}</p>
            </div>
          </div>
        </div>
      </BouncyCard>
    </StaggerItem>
  )
}

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-12 lg:py-16 bg-iceBlue/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <ScrollReveal animation="fadeDown">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 text-xs font-semibold mb-4">
              <i className="fas fa-trophy"></i>
              Our Track Record
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-deepBlue mb-4">
              Numbers That Speak<br />for Themselves
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Trusted by businesses, organizations, and communities across Nigeria
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1}>
          <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <StatItem key={stat.id} stat={stat} isInView={isInView} index={index} />
            ))}
          </ul>
        </StaggerContainer>

        <GoogleReviewsWidget />

        <ScrollReveal animation="fadeUp" delay={0.4}>
          <div className="text-center mt-10">
            <motion.div
              className="inline-flex items-center gap-3 bg-white border border-iceBlue px-6 py-3 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="fas fa-quote-left text-gold text-sm"></i>
              <p className="text-gray-700 text-xs italic max-w-xl">
                "Our success is measured by the growth and satisfaction of the organizations and communities we serve."
              </p>
            </motion.div>
            <p className="text-gold font-semibold mt-3 text-sm">— Akinwunmi Joseph, Founder</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default StatsSection
