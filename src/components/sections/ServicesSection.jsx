import React from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, CalendarCheck, Settings, Lightbulb, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[ServicesSection] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[ServicesSection] ${context}:`, error, data)
  }
}

const services = [
  {
    id: 1,
    title: 'Administrative & Business Support',
    description: 'Streamlining operations for efficiency and productivity with professional document management and scheduling solutions.',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Project & Program Coordination',
    description: 'Managing projects from inception to successful completion with timeline management and resource planning.',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Community & Stakeholder Engagement',
    description: 'Fostering collaboration and meaningful communication with outreach programs and relationship building.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Event Planning & Coordination',
    description: 'Organizing seamless programs and memorable events with attention to every detail.',
    icon: CalendarCheck,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Consultancy & Advisory Support',
    description: 'Expert advice for business optimization and growth with strategic planning and market analysis.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    title: 'Operational & Business Assistance',
    description: 'Customized solutions tailored for business growth with workflow optimization and quality control.',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60',
  },
]

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon

  return (
    <StaggerItem animation="scaleUp">
      <Link to="/services">
        <Card 
          variant="lifted" 
          className="group min-h-[14rem] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-300 overflow-hidden"
        >
          <CardContent className="flex flex-col h-full justify-between gap-3 p-0">
            <div className="relative flex flex-1 flex-col gap-3 p-4">
              <motion.div
                className="w-fit rounded-lg bg-secondary/10 p-2 group-hover:bg-secondary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-4 w-4 text-secondary" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-primary leading-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden">
              <motion.img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 right-2">
                <motion.div
                  className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <i className="fas fa-arrow-right text-white text-xs"></i>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </StaggerItem>
  )
}

const ServicesSection = () => {
  const ref = useRef(null)

  return (
    <section className="py-12 lg:py-16 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <ScrollReveal animation="fadeDown">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              <i className="fas fa-cogs"></i>
              What We Offer
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4">
              Our Professional <span className="text-secondary">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Comprehensive solutions tailored to meet your unique needs, helping you achieve your goals efficiently and effectively.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </ul>
        </StaggerContainer>

        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="text-center mt-10">
            <Button variant="moving" size="sm">
              <Link to="/services" className="flex items-center gap-2">
                <span>Explore All Services</span>
                <motion.i
                  className="fas fa-arrow-right text-xs"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ServicesSection
