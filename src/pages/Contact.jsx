import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'
import { SITE, SOCIAL_LINKS } from '../config/siteConfig'

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us – JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="Contact JOEADAK TRADING ENTERPRISE for professional freelance, consulting, and business solutions. Located in Mangoro, Agege, Lagos." />
      </Helmet>
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-blue-800 to-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium mb-6">
              <i className="fas fa-headset text-secondary"></i>
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Get in Touch <span className="text-secondary">With Us</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Contact JOEADAK TRADING ENTERPRISE for professional freelance, consulting, and business solutions. We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-info-circle text-secondary"></i>
                  </span>
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-xl text-secondary"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Our Address</h4>
                      <p className="text-gray-600 text-sm">{SITE.address.street},<br />{SITE.address.area}, {SITE.address.state}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-xl text-secondary"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Phone Number</h4>
                      <a href={`tel:${SITE.phoneRaw}`} className="text-gray-600 text-sm hover:text-secondary transition-colors">
                        {SITE.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-xl text-secondary"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Email Address</h4>
                      <a href={`mailto:${SITE.email}`} className="text-gray-600 text-sm hover:text-secondary transition-colors break-all">
                        {SITE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-xl text-secondary"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Working Hours</h4>
                      <p className="text-gray-600 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-heading font-bold text-white mb-4">Quick Response</h3>
                <p className="text-white/80 text-sm mb-6">Need immediate assistance? Reach out to us directly on WhatsApp.</p>
                <a
                  href="https://wa.me/2347061934478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: 'fa-facebook-f', bg: 'bg-blue-600', href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                    { icon: 'fa-instagram', bg: 'bg-gradient-to-br from-purple-500 to-pink-500', href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                    { icon: 'fa-linkedin-in', bg: 'bg-blue-700', href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                    { icon: 'fa-twitter', bg: 'bg-sky-500', href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.label}`}
                      className={`w-12 h-12 ${social.bg} text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform`}
                    >
                      <i className={`fab ${social.icon}`} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">Find Us</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: '400px' }}>
            <iframe
              title="JOEADAK TRADING ENTERPRISE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.32!3d6.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMangoro%2C%20Agege%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
