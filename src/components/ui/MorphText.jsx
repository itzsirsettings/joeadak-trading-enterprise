import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[MorphText] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[MorphText] ${context}:`, error, data)
  }
}

export function MorphText({
  words = [],
  textClassName = "",
  animationType = "slideUp",
  interval = 3000,
  className,
  disabled = false,
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (disabled || words.length <= 1) return

    try {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
      }, interval)

      logger.info('autoRotate', `Interval set to ${interval}ms`)

      return () => {
        clearInterval(intervalId)
        logger.info('cleanup', 'Interval cleared')
      }
    } catch (error) {
      logger.error('interval', error, { interval })
    }
  }, [disabled, words.length, interval])

  const getVariants = useCallback((type) => {
    try {
      switch (type) {
        case "slideUp":
          return {
            initial: { y: 50, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -50, opacity: 0 },
          }
        case "fade":
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }
        case "scale":
          return {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 1.2, opacity: 0 },
          }
        case "blur":
          return {
            initial: { filter: "blur(20px)", opacity: 0 },
            animate: { filter: "blur(0px)", opacity: 1 },
            exit: { filter: "blur(20px)", opacity: 0 },
          }
        case "rotate":
          return {
            initial: { rotateX: 90, opacity: 0 },
            animate: { rotateX: 0, opacity: 1 },
            exit: { rotateX: -90, opacity: 0 },
          }
        default:
          return {
            initial: { y: 30, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -30, opacity: 0 },
          }
      }
    } catch (error) {
      logger.error('getVariants', error, { type })
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    }
  }, [])

  if (words.length === 0) {
    logger.warn('empty', 'No words provided')
    return null
  }

  try {
    return (
      <div className={cn("relative inline-flex overflow-hidden", className)} {...props}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={cn("inline-block", textClassName)}
            variants={getVariants(animationType)}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    )
  } catch (error) {
    logger.error('render', error, { currentIndex, wordsLength: words.length })
    return <span className={textClassName}>{words[0]}</span>
  }
}
