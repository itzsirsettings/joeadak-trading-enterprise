import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { EMAILJS, SERVICES_LIST } from '../config/siteConfig'

const ContactForm = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.sendForm(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formRef.current,
        EMAILJS.publicKey
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Your Email *</label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50"
              placeholder="+234 706 193 4478"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-service" className="block text-sm font-semibold text-gray-700 mb-2">Service Needed</label>
          <div className="relative">
            <i className="fas fa-cog absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50 appearance-none cursor-pointer"
            >
              <option value="">Select a service</option>
              {SERVICES_LIST.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
        <div className="relative">
          <i className="fas fa-comment-alt absolute left-4 top-4 text-gray-400" aria-hidden="true"></i>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full pl-12 pr-4 py-4 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none bg-gray-50`}
            placeholder="Tell us about your project or inquiry..."
          ></textarea>
        </div>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i className="fas fa-check-circle text-xl text-green-600"></i>
          </div>
          <span className="font-medium">Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-circle text-xl text-red-600"></i>
          </div>
          <span className="font-medium">Sorry, something went wrong. Please try again or contact us directly via WhatsApp.</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group inline-flex items-center justify-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <i className="fas fa-paper-plane transition-transform group-hover:translate-x-1"></i>
          </>
        )}
      </button>
    </form>
  )
}

export default ContactForm
