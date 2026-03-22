import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion, useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

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
    quote: 'Their administrative support helped streamline our operations significantly. The team is professional, responsive, and truly understands business needs. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Emmanuel Okonkwo',
    role: 'NGO Director',
    quote: 'The project coordination was exceptional. They delivered beyond our expectations on time and within budget. A truly professional team to work with.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 4,
    name: 'Chief Mrs. Adenike Bello',
    role: 'Organization Chairman',
    quote: 'Professional, reliable, and results-oriented. JOEADAK is our go-to partner for all consulting needs. They consistently deliver quality work.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mr. Tunde Bakare',
    role: 'Event Coordinator',
    quote: 'Our event was perfectly organized thanks to their expertise. Every detail was handled with care and precision. Will definitely work with them again!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
]

const TestimonialCard = ({ testimonial }) => (
  <div className="min-h-[20rem] list-none">
    <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-secondary/20"
            />
            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-secondary rounded-full flex items-center justify-center">
              <Quote className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-primary text-lg">{testimonial.name}</h4>
            <p className="text-secondary text-sm font-medium">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-secondary fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-600 italic leading-relaxed text-sm">
          "{testimonial.quote}"
        </blockquote>
      </div>
    </div>
  </div>
)

const TestimonialCarousel = ({ title = "What Our Clients Say" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fas fa-comments"></i>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from our satisfied clients about their experience working with JOEADAK TRADING ENTERPRISE.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center items-center gap-4">
            <button className="testimonial-prev w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="testimonial-pagination flex gap-2"></div>
            <button className="testimonial-next w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a 
            href="/testimonials" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
          >
            <span>View All Testimonials</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
