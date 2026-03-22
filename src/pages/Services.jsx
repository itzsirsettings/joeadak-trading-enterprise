import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { client } from '../lib/sanityClient'

const Services = () => {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const query = `*[_type == "service"] | order(order asc) {
          _id,
          title,
          description,
          icon,
          features
        }`
        const data = await client.fetch(query)
        
        // Map Sanity data to expected props, applying fallbacks if editors forget fields
        const mappedData = data.map((doc, idx) => ({
          id: doc._id || idx,
          title: doc.title,
          description: doc.description,
          icon: doc.icon || 'fa-briefcase',
          features: doc.features || [],
        }))

        setServices(mappedData)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <Helmet>
        <title>Our Services – JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="Comprehensive professional services: administrative support, project coordination, community engagement, event planning, consultancy, and business assistance." />
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Our Professional Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet your unique needs and help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[40vh]">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-tools text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">Service descriptions are currently being updated.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-secondary/20 group flex flex-col"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                    <i className={`fas ${service.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-dark/70 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="space-y-2 mt-auto">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-dark/60">
                        <i className="fas fa-check text-secondary text-xs"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Don't see exactly what you need? We offer tailored solutions to meet your specific requirements. Let's discuss how we can help.
            </p>
            <Link to="/contact" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3">
              <span>Contact Us Today!</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services
