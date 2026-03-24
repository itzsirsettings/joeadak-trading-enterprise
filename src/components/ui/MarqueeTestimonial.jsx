import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { Marquee } from '@/components/ui/Marquee'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Card, CardContent } from '@/components/ui/Card'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { BouncyCard } from '@/components/ui/BouncyCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    name: 'Alhaji Azeez',
    role: 'Community Leader',
    quote: 'JOEADAK TRADING ENTERPRISE transformed our community program with professionalism and excellence.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Mrs. Folake Adeyemi',
    role: 'Business Owner',
    quote: 'Their administrative support helped streamline our operations significantly. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Dr. Emmanuel Okonkwo',
    role: 'NGO Director',
    quote: 'The project coordination was exceptional. They delivered beyond our expectations on time.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Chief Mrs. Adenike Bello',
    role: 'Organization Chairman',
    quote: 'Professional, reliable, and results-oriented. JOEADAK is our go-to for all consulting needs.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Mr. Tunde Bakare',
    role: 'Event Coordinator',
    quote: 'Our event was perfectly organized thanks to their expertise. Every detail was handled with care.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
]

function TestimonialCard({ testimonial }) {
  return (
    <BouncyCard className="min-h-[12rem] w-[14rem] mx-2 list-none" springConfig={{ stiffness: 200, damping: 20 }}>
      <div className="relative h-full bg-iceBlue/30 p-2">
        <GlowingEffect
          spread={20}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
          borderWidth={1}
        />
        <Card className="relative h-full border-0 shadow-none bg-transparent">
          <CardContent className="p-3">
            <motion.div
              className="flex items-center gap-2 mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-8 w-8 border-2 border-gold/30">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-deepBlue text-xs">{testimonial.name}</p>
                <p className="text-gold text-[10px]">{testimonial.role}</p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-0.5 mb-1"
              initial="hidden"
              whileHover="visible"
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-2 h-2 text-gold fill-gold" />
                </motion.div>
              ))}
            </motion.div>
            <blockquote className="text-gray-600 text-[10px] leading-relaxed line-clamp-3">
              "{testimonial.quote}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </BouncyCard>
  )
}

const MarqueeTestimonial = ({ title = "What Our Clients Say" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-12 lg:py-16 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sapphire/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container-custom relative z-10">
        <ScrollReveal animation="fadeDown">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 text-xs font-semibold mb-4">
              <i className="fas fa-comments"></i>
              Testimonials
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-deepBlue mb-4">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Hear from our satisfied clients about their experience working with JOEADAK TRADING ENTERPRISE.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.2}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative flex h-[300px] w-full flex-row items-center justify-center overflow-hidden [perspective:1000px]">
              <motion.div
                className="flex flex-row items-center gap-2"
                initial={false}
                animate={{
                  transform: 'translateX(-40px) translateY(0px) translateZ(-40px) rotateX(10deg) rotateY(-5deg) rotateZ(5deg)',
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Marquee vertical pauseOnHover repeat={3} className="[--duration:30s]">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                  ))}
                </Marquee>
                <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:35s]">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={`reverse-${testimonial.name}`} testimonial={testimonial} />
                  ))}
                </Marquee>
                <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={`third-${testimonial.name}`} testimonial={testimonial} />
                  ))}
                </Marquee>
                <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:25s]">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={`fourth-${testimonial.name}`} testimonial={testimonial} />
                  ))}
                </Marquee>
                
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white"></div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white"></div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.4}>
          <div className="text-center mt-8">
            <motion.a
              href="/testimonials"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:text-yellow-400 transition-colors text-sm"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>View All Testimonials</span>
              <motion.i
                className="fas fa-arrow-right text-xs"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default MarqueeTestimonial
