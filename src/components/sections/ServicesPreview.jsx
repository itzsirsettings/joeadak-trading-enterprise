import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 1,
    title: 'Administrative & Business Support',
    description: 'Streamlining operations for efficiency and productivity.',
    icon: 'fa-briefcase',
    features: ['Document Management', 'Data Entry', 'Scheduling'],
  },
  {
    id: 2,
    title: 'Project & Program Coordination',
    description: 'Managing projects from inception to successful completion.',
    icon: 'fa-tasks',
    features: ['Timeline Management', 'Resource Planning', 'Risk Assessment'],
  },
  {
    id: 3,
    title: 'Community & Stakeholder Engagement',
    description: 'Fostering collaboration and meaningful communication.',
    icon: 'fa-users',
    features: ['Outreach Programs', 'Relationship Building', 'Feedback Systems'],
  },
  {
    id: 4,
    title: 'Event Planning & Coordination',
    description: 'Organizing seamless programs and memorable events.',
    icon: 'fa-calendar-check',
    features: ['Venue Selection', 'Logistics Management', 'Guest Coordination'],
  },
  {
    id: 5,
    title: 'Consultancy & Advisory Support',
    description: 'Expert advice for business optimization and growth.',
    icon: 'fa-lightbulb',
    features: ['Strategic Planning', 'Process Improvement', 'Market Analysis'],
  },
  {
    id: 6,
    title: 'Operational & Business Assistance',
    description: 'Customized solutions tailored for business growth.',
    icon: 'fa-cogs',
    features: ['Workflow Optimization', 'Vendor Management', 'Quality Control'],
  },
]

const ServicesPreview = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 lg:py-28 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fas fa-cogs"></i>
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
            Our Professional <span className="text-secondary">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive solutions tailored to meet your unique needs, helping you achieve your goals efficiently and effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-secondary/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-500 group-hover:scale-110 transition-transform">
                <i className={`fas ${service.icon} text-2xl text-white`}></i>
              </div>
              
              <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-5">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Learn More
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link 
            to="/services" 
            className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-800 hover:shadow-lg"
          >
            <span>Explore All Services</span>
            <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesPreview
