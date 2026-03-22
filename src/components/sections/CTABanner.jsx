import React from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CallToAction } from '@/components/ui/CallToAction'



const CTABanner = ({ 
  title = "Ready to Take Your Business to the Next Level?",
  subtitle = "Partner with JOEADAK TRADING ENTERPRISE for professional solutions that drive results.",
  buttonText = "Contact Us Today",
  buttonLink = "/contact"
}) => {

  return (
    <section className="py-12 lg:py-16 bg-gray-50 relative overflow-hidden">
      <ScrollReveal animation="fadeUp">
        <div className="container-custom relative z-10">
          <CallToAction 
            title={title}
            subtitle={subtitle}
            buttonText={buttonText}
            buttonLink={buttonLink}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}

export default CTABanner
