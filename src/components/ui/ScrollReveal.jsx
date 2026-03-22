import { useRef, useCallback } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[ScrollReveal] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[ScrollReveal] ${context}:`, error, data)
  }
}

export function ScrollReveal({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  disabled = false,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const getVariants = useCallback(() => {
    try {
      const baseVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }

      switch (animation) {
        case "fadeUp":
          return {
            ...baseVariants,
            hidden: { ...baseVariants.hidden, y: 60 },
            visible: { ...baseVariants.visible, y: 0 },
          }
        case "fadeDown":
          return {
            ...baseVariants,
            hidden: { ...baseVariants.hidden, y: -60 },
            visible: { ...baseVariants.visible, y: 0 },
          }
        case "fadeLeft":
          return {
            ...baseVariants,
            hidden: { ...baseVariants.hidden, x: 60 },
            visible: { ...baseVariants.visible, x: 0 },
          }
        case "fadeRight":
          return {
            ...baseVariants,
            hidden: { ...baseVariants.hidden, x: -60 },
            visible: { ...baseVariants.visible, x: 0 },
          }
        case "scale":
          return {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }
        case "scaleUp":
          return {
            hidden: { opacity: 0, scale: 0.8, y: 40 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }
        case "blur":
          return {
            hidden: { opacity: 0, filter: "blur(20px)" },
            visible: { opacity: 1, filter: "blur(0px)" },
          }
        case "rotate":
          return {
            hidden: { opacity: 0, rotate: -10, scale: 0.9 },
            visible: { opacity: 1, rotate: 0, scale: 1 },
          }
        case "slide":
          return {
            hidden: { opacity: 0, x: "-100%" },
            visible: { opacity: 1, x: 0 },
          }
        default:
          return baseVariants
      }
    } catch (error) {
      logger.error('getVariants', error, { animation })
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    }
  }, [animation])

  try {
    return (
      <motion.div
        ref={ref}
        className={cn("will-change-transform", disabled && "opacity-100", className)}
        variants={getVariants()}
        initial="hidden"
        animate={disabled ? "visible" : isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay: disabled ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { animation, delay })
    return <div className={className}>{children}</div>
  }
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  disabled = false,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  try {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2,
        },
      },
    }

    return (
      <motion.div
        ref={ref}
        className={cn("w-full", className)}
        variants={containerVariants}
        initial="hidden"
        animate={disabled ? "visible" : isInView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { staggerDelay })
    return <div className={className}>{children}</div>
  }
}

export function StaggerItem({
  children,
  className,
  animation = "fadeUp",
  disabled = false,
  ...props
}) {
  const getItemVariants = useCallback(() => {
    try {
      switch (animation) {
        case "fadeUp":
          return {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }
        case "fadeDown":
          return {
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
          }
        case "scale":
          return {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }
        default:
          return {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }
      }
    } catch (error) {
      logger.error('getItemVariants', error, { animation })
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }
    }
  }, [animation])

  try {
    return (
      <motion.div
        className={cn("will-change-transform", disabled && "opacity-100", className)}
        variants={getItemVariants()}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { animation })
    return <div className={className}>{children}</div>
  }
}

export function ParallaxReveal({
  children,
  className,
  speed = 0.5,
  direction = "up",
  disabled = false,
  ...props
}) {
  const ref = useRef(null)

  try {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })

    const y = useTransform(
      scrollYProgress,
      [0, 1],
      direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
    )
    const x = useTransform(
      scrollYProgress,
      [0, 1],
      direction === "left" ? [100 * speed, -100 * speed] : direction === "right" ? [-100 * speed, 100 * speed] : 0
    )
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
      <motion.div
        ref={ref}
        className={cn("will-change-transform", className)}
        style={{ y: disabled ? 0 : y, x: disabled ? 0 : x, opacity }}
        {...props}
      >
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { speed, direction })
    return <div className={className}>{children}</div>
  }
}

export function FadeInOnScroll({
  children,
  className,
  disabled = false,
  ...props
}) {
  const ref = useRef(null)

  try {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
      <motion.div ref={ref} style={{ opacity: disabled ? 1 : opacity }} className={cn(className)} {...props}>
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, {})
    return <div className={className}>{children}</div>
  }
}
