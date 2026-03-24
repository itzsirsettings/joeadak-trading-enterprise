import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const CarouselItem = ({ 
  item, 
  isActive, 
  index,
  totalItems 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`absolute inset-0 flex items-center justify-center ${
        !isActive ? 'pointer-events-none' : ''
      }`}
    >
      <div className="bg-white p-6 md:p-8 max-w-2xl mx-auto text-center">
        <Quote className="w-12 h-12 text-gold/30 mx-auto mb-4" />
        
        {item.rating && (
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          "{item.quote || item.description}"
        </p>
        
        {item.author && (
          <div className="flex items-center justify-center gap-4">
            {item.avatar && (
              <img 
                src={item.avatar} 
                alt={item.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
              />
            )}
            <div className="text-left">
              <p className="font-semibold text-deepBlue">{item.author}</p>
              {item.role && (
                <p className="text-gold text-sm">{item.role}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const CarouselControls = ({ 
  onPrev, 
  onNext, 
  currentIndex, 
  totalItems,
  hideArrows = false
}) => {
  if (hideArrows) return null
  
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg flex items-center justify-center text-deepBlue hover:bg-gold hover:text-deepBlue transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg flex items-center justify-center text-deepBlue hover:bg-gold hover:text-deepBlue transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  )
}

const CarouselIndicators = ({ 
  items, 
  currentIndex, 
  onSelect,
  variant = 'dots'
}) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`transition-all duration-300 ${
            variant === 'dots'
              ? `w-2 h-2 rounded-full ${
                  index === currentIndex 
                    ? 'bg-gold w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`
              : `px-3 py-1 text-xs rounded ${
                  index === currentIndex 
                    ? 'bg-gold text-deepBlue' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`
          }`}
          aria-label={`Go to slide ${index + 1}`}
        >
          {variant === 'numbers' ? index + 1 : ''}
        </button>
      ))}
    </div>
  )
}

const Carousel = ({ 
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  indicatorVariant = 'dots',
  hideArrows = false,
  variant = 'default',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, nextSlide])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <div className={`relative ${className}`}>
      <div className="relative min-h-[300px] md:min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <CarouselItem
            key={currentIndex}
            item={items[currentIndex]}
            isActive={true}
            index={currentIndex}
            totalItems={items.length}
          />
        </AnimatePresence>
      </div>

      {showControls && (
        <CarouselControls
          onPrev={prevSlide}
          onNext={nextSlide}
          currentIndex={currentIndex}
          totalItems={items.length}
          hideArrows={hideArrows}
        />
      )}

      {showIndicators && items.length > 1 && (
        <CarouselIndicators
          items={items}
          currentIndex={currentIndex}
          onSelect={goToSlide}
          variant={indicatorVariant}
        />
      )}
    </div>
  )
}

export { Carousel, CarouselItem, CarouselControls, CarouselIndicators }
export default Carousel
