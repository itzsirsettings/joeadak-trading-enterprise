import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserCheck, TrendingUp, RefreshCw, Heart } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { BouncyCard } from '@/components/ui/BouncyCard'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import EngineerImage from '../../../images/Engineer.jpeg'


const features = [
  { icon: UserCheck, text: 'Professional Team' },
  { icon: TrendingUp, text: 'Proven Results' },
  { icon: RefreshCw, text: 'Flexible Approach' },
  { icon: Heart, text: 'Client Focused' },
]

const AboutPreview = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about-preview" className="py-12 lg:py-16 bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal animation="fadeLeft">
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <img 
                src={EngineerImage}
                alt="Akinwunmi Joseph - Founder & CEO"
                className="w-full max-w-md mx-auto relative"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.2}>
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1 text-xs font-semibold mb-4">
              <i className="fas fa-info-circle"></i>
              About Us
            </span>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-deepBlue mb-4 leading-tight">
              Professional Solutions for <span className="text-gold">Growth</span> & <span className="text-gold">Success</span>
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              <strong className="text-deepBlue">JOEADAK TRADING ENTERPRISE</strong>, led by <strong>Akinwunmi Joseph</strong>, delivers professional freelance and consulting solutions to help businesses, organizations, and communities thrive.
            </p>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              We combine experience, flexibility, and reliability to ensure your goals are achieved. From administrative support to community engagement, we provide tailored solutions that drive results.
            </p>

            <StaggerContainer staggerDelay={0.1}>
              <ul className="grid grid-cols-2 gap-3 mb-6">
                {features.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <StaggerItem key={index} animation="scaleUp">
                      <BouncyCard className="min-h-[3rem] list-none">
                        <div className="relative h-full bg-white p-3 shadow-sm">
                          <GlowingEffect
                            spread={30}
                            glow={true}
                            disabled={false}
                            proximity={50}
                            inactiveZone={0.01}
                            borderWidth={1}
                          />
                          <div className="relative flex items-center gap-3 bg-white">
                            <motion.div
                              className="w-8 h-8 bg-gold/10 flex items-center justify-center flex-shrink-0"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="w-4 h-4 text-gold" />
                            </motion.div>
                            <span className="font-semibold text-gray-800 text-xs">{item.text}</span>
                          </div>
                        </div>
                      </BouncyCard>
                    </StaggerItem>
                  )
                })}
              </ul>
            </StaggerContainer>

            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 bg-gold text-deepBlue font-semibold px-6 py-3 transition-all duration-300 hover:bg-yellow-500 hover:shadow-gold"
            >
              <span>Learn More About Us</span>
              <motion.i
                className="fas fa-arrow-right text-sm"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
