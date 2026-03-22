import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserCheck, TrendingUp, RefreshCw, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { BouncyCard } from '@/components/ui/BouncyCard'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import JoeadakLogo from '../../../images/Joeadak logo 2D.png'
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
            <BouncyCard className="min-h-[20rem] list-none">
              <div className="relative h-full rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={50}
                  inactiveZone={0.01}
                  borderWidth={1.5}
                />
                <motion.div
                  className="relative flex h-full flex-col justify-center items-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-blue-800 p-8"
                  animate={{
                    background: [
                      'linear-gradient(135deg, #0D3B66 0%, #1a4d80 50%, #0D3B66 100%)',
                      'linear-gradient(135deg, #1a4d80 0%, #0D3B66 50%, #1a4d80 100%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary/50 mb-4"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img 
                      src={EngineerImage}
                      alt="Engineer - Founder"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-white text-xl font-bold mb-1">Akinwunmi Joseph</h3>
                  <p className="text-secondary text-sm mb-2">Founder & CEO</p>
                  <p className="text-white/70 text-xs text-center">JOEADAK Trading Enterprise</p>
                  
                  <motion.div
                    className="absolute -bottom-3 -right-3 w-20 h-20 bg-secondary rounded-lg flex items-center justify-center shadow-xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <p className="text-white text-2xl font-bold">8+</p>
                      <p className="text-white/80 text-xs">Years</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </BouncyCard>

            <div className="absolute -top-3 -left-3 w-16 h-16 bg-secondary/10 rounded-lg -z-10"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-primary/10 rounded-lg -z-10"></div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.2}>
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <i className="fas fa-info-circle"></i>
              About Us
            </span>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight">
              Professional Solutions for <span className="text-secondary">Growth</span> & <span className="text-secondary">Success</span>
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              <strong className="text-primary">JOEADAK TRADING ENTERPRISE</strong>, led by <strong>Akinwunmi Joseph</strong>, delivers professional freelance and consulting solutions to help businesses, organizations, and communities thrive.
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
                        <div className="relative h-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                          <GlowingEffect
                            spread={30}
                            glow={true}
                            disabled={false}
                            proximity={50}
                            inactiveZone={0.01}
                            borderWidth={1}
                          />
                          <div className="relative flex items-center gap-3 bg-white rounded-lg">
                            <motion.div
                              className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="w-4 h-4 text-secondary" />
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

            <Button variant="moving" size="sm">
              <Link to="/about" className="flex items-center gap-2">
                <span>Learn More About Us</span>
                <motion.i
                  className="fas fa-arrow-right text-xs"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
