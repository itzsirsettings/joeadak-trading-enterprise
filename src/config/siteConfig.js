/**
 * Centralized site configuration.
 * All business data lives here so every component stays consistent.
 */

export const SITE = {
  name: 'JOEADAK TRADING ENTERPRISE',
  tagline: 'Professional Freelance & Consulting Services',
  founder: 'Akinwunmi Joseph',
  founderTitle: 'Founder / Lead Consultant',
  email: 'joeadaktradingenterprise@gmail.com',
  phone: '+234 706 193 4478',
  phoneRaw: '+2347061934478',
  whatsappLink: 'https://wa.me/2347061934478',
  address: {
    street: 'No 21, Sebiotimo Street',
    area: 'Mangoro, Agege',
    city: 'Lagos',
    state: 'Lagos State',
  },
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
  },
}

export const STATS = {
  yearsExperience: { value: 8, suffix: '+', label: 'Years of Experience' },
  clientRating: { value: 4.9, suffix: '/5', label: 'Client Rating', isDecimal: true },
  clientsServed: { value: 100, suffix: '+', label: 'Clients Served' },
  projectsCompleted: { value: 500, suffix: '+', label: 'Projects Completed' },
}

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/2347061934478',
  facebook: 'https://www.facebook.com/joeadaktradingenterprise',
  instagram: 'https://www.instagram.com/joeadaktradingenterprise',
  linkedin: 'https://www.linkedin.com/company/joeadak-trading-enterprise',
  twitter: 'https://x.com/joeadaktrading',
}

export const EMAILJS = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
}

export const SERVICES_LIST = [
  'Administrative Support',
  'Project Coordination',
  'Community Engagement',
  'Event Planning',
  'Consultancy',
  'Other',
]
