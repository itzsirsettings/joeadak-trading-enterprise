import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const animationVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 }
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 }
  },
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
}

const AnimatedSection = ({
  children,
  animation = 'fadeUp',
  duration = 0.6,
  delay = 0,
  distance = 30,
  once = true,
  className = '',
  as = 'div'
}) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once
  })

  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  const combinedRef = (node) => {
    ref.current = node
    if (inViewRef) {
      if (typeof inViewRef === 'function') {
        inViewRef(node)
      }
    }
  }

  const variant = animationVariants[animation] || animationVariants.fadeUp

  const motionProps = {
    initial: variant.initial,
    animate: isInView ? variant.animate : variant.initial,
    transition: {
      duration: duration,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }

  const Component = motion[as] || motion.div

  return (
    <Component
      ref={combinedRef}
      className={className}
      {...motionProps}
    >
      {children}
    </Component>
  )
}

const AnimatedHeading = ({
  children,
  animation = 'fadeUp',
  className = '',
  as = 'h2'
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const variant = animationVariants[animation] || animationVariants.fadeUp

  return (
    <motion.h2
      ref={ref}
      initial={variant.initial}
      animate={inView ? variant.animate : variant.initial}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      as={as}
    >
      {children}
    </motion.h2>
  )
}

const AnimatedText = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = ''
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const variant = animationVariants[animation] || animationVariants.fadeUp

  return (
    <motion.p
      ref={ref}
      initial={variant.initial}
      animate={inView ? variant.animate : variant.initial}
      transition={{ duration: 0.6, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.p>
  )
}

const AnimatedCard = ({
  children,
  index = 0,
  staggerDelay = 0.1,
  className = ''
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay: index * staggerDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { AnimatedSection, AnimatedHeading, AnimatedText, AnimatedCard }
export default AnimatedSection
