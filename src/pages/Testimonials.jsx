import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import TestimonialCarousel from '../components/ui/TestimonialCarousel'

const testimonials = [
  {
    id: 1,
    name: 'Alhaji Azeez',
    role: 'Community Leader',
    quote: 'JOEADAK TRADING ENTERPRISE transformed our community program with professionalism and excellence. Their attention to detail and commitment to results exceeded our expectations.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mrs. Folake Adeyemi',
    role: 'Business Owner',
    quote: 'Their administrative support helped streamline our operations significantly. The team is reliable, efficient, and always willing to go the extra mile. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Emmanuel Okonkwo',
    role: 'NGO Director',
    quote: 'The project coordination was exceptional. They delivered beyond our expectations on time and within budget. A truly professional team that understands client needs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 4,
    name: 'Chief Mrs. Adenike Bello',
    role: 'Organization Chairman',
    quote: 'Professional, reliable, and results-oriented. JOEADAK is our go-to for all consulting needs. They have helped us achieve milestones we thought were impossible.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mr. Tunde Bakare',
    role: 'Event Coordinator',
    quote: 'Our event was perfectly organized thanks to their expertise. Every detail was handled with care and precision. I will definitely work with them again for future events.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
]

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Testimonials – JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="Hear from clients and organizations about their experience working with JOEADAK TRADING ENTERPRISE. Read reviews and success stories." />
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
              Client Feedback
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              What Our Clients Say
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Hear from clients and organizations about their experience working with JOEADAK TRADING ENTERPRISE.
            </p>
          </motion.div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                Become Our Next Success Story
              </h2>
              <p className="text-dark/70 max-w-2xl mx-auto">
                Ready to experience the JOEADAK difference? Let us help you achieve your goals with professional, reliable, and results-oriented services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <i className="fas fa-handshake text-2xl text-secondary"></i>
                </div>
                <h3 className="font-heading font-bold text-primary mb-2">Free Consultation</h3>
                <p className="text-dark/60 text-sm">Let's discuss your needs and explore solutions together.</p>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <i className="fas fa-clipboard-check text-2xl text-secondary"></i>
                </div>
                <h3 className="font-heading font-bold text-primary mb-2">Custom Solutions</h3>
                <p className="text-dark/60 text-sm">Tailored approaches to meet your unique requirements.</p>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <i className="fas fa-chart-line text-2xl text-secondary"></i>
                </div>
                <h3 className="font-heading font-bold text-primary mb-2">Measurable Results</h3>
                <p className="text-dark/60 text-sm">Track progress and see tangible outcomes from our work.</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/contact" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3">
                <span>Start Your Project</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
