import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import CTABanner from '../components/sections/CTABanner'
import EngineerImage from '../../images/Engineer.jpeg'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      <Helmet>
        <title>About Us – JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="Learn about JOEADAK TRADING ENTERPRISE, founded by Akinwunmi Joseph. Professional freelance and consulting solutions for businesses, organizations, and communities." />
      </Helmet>
      <section className="pt-32 pb-16 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              About JOEADAK TRADING ENTERPRISE
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Professional freelance and consulting solutions for businesses, organizations, and communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Company <span className="text-secondary">Overview</span>
              </h2>
              <p className="text-dark/80 text-lg leading-relaxed mb-6">
                Founded by <strong>Akinwunmi Joseph</strong>, JOEADAK TRADING ENTERPRISE provides reliable freelance, consulting, and business support services to help organizations and communities thrive.
              </p>
              <p className="text-dark/80 text-lg leading-relaxed">
                Our mission is to deliver quality, efficiency, and professionalism in every project we undertake. We believe in building lasting relationships with our clients through trust, transparency, and exceptional service delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 text-white">
                <div className="w-24 h-24 bg-secondary/20 rounded-full mx-auto flex items-center justify-center mb-6">
                  <i className="fas fa-building text-5xl text-secondary"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold text-center mb-4">Our Foundation</h3>
                <p className="text-center text-gray-200 leading-relaxed">
                  Built on principles of integrity, reliability, and excellence. We bring years of experience and a passion for helping clients achieve their goals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Mission & <span className="text-secondary">Vision</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-secondary"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-3xl text-secondary"></i>
              </div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-dark/80 leading-relaxed italic">
                "To provide professional solutions that empower businesses, organizations, and communities to achieve their objectives efficiently."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-primary"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-eye text-3xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-dark/80 leading-relaxed italic">
                "To be a trusted partner in freelance consulting and business services, known for integrity, reliability, and excellence."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Meet Our <span className="text-secondary">Founder</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary/50">
                  <img 
                    src={EngineerImage} 
                    alt="Akinwunmi Joseph - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-heading font-bold mb-2">Akinwunmi Joseph</h3>
                  <p className="text-secondary font-medium mb-4">Founder / Lead Consultant</p>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    Akinwunmi Joseph brings years of experience in business consulting, project coordination, and community engagement, delivering tailored solutions to meet client needs.
                  </p>
                  <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-200">
                    "Our success is measured by the growth and satisfaction of the organizations and communities we serve."
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Partner With Us to Take Your Business to the Next Level"
        subtitle="Ready to work with a team that puts your success first? Let's discuss how we can help."
        buttonText="Contact Us Today"
      />
    </>
  )
}

export default About
