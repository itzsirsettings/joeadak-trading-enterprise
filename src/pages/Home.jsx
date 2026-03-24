import React from 'react'
import { Helmet } from 'react-helmet-async'
import { LandingAccordionItem } from '../components/ui/InteractiveImageAccordion'
import StatsSection from '../components/sections/StatsSection'
import AboutPreview from '../components/sections/AboutPreview'
import ServicesSection from '../components/sections/ServicesSection'
import ProjectsPreview from '../components/sections/ProjectsPreview'
import MarqueeTestimonial from '../components/ui/MarqueeTestimonial'
import CTABanner from '../components/sections/CTABanner'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>JOEADAK TRADING ENTERPRISE – Professional Freelance & Consulting Services</title>
        <meta name="description" content="Delivering reliable freelance, business support, consulting, and community services. Flexible solutions for businesses, organizations, and communities in Lagos, Nigeria." />
      </Helmet>
      <LandingAccordionItem />
      <StatsSection />
      <AboutPreview />
      <ServicesSection />
      <ProjectsPreview />
      <MarqueeTestimonial />
      <CTABanner />
    </>
  )
}

export default Home
