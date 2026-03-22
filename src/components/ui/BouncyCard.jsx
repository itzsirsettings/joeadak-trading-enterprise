import { useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[BouncyCard] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[BouncyCard] ${context}:`, error, data)
  }
}

export function BouncyCard({
  children,
  className,
  disabled = false,
  springConfig = { stiffness: 300, damping: 20 },
  ...props
}) {
  const cardRef = useRef(null)
  
  try {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const mouseXSpring = useSpring(x, {
      stiffness: springConfig.stiffness,
      damping: springConfig.damping,
    })
    
    const mouseYSpring = useSpring(y, {
      stiffness: springConfig.stiffness,
      damping: springConfig.damping,
    })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    const handleMouseMove = useCallback((e) => {
      if (!cardRef.current || disabled) return
      
      try {
        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        
        const clientX = e.clientX - rect.left
        const clientY = e.clientY - rect.top
        
        const xPct = clientX / width - 0.5
        const yPct = clientY / height - 0.5
        
        x.set(xPct)
        y.set(yPct)
        
        logger.info('mouseMove', `Position: ${xPct.toFixed(2)}, ${yPct.toFixed(2)}`)
      } catch (error) {
        logger.error('handleMouseMove', error, {})
      }
    }, [disabled])

    const handleMouseLeave = useCallback(() => {
      x.set(0)
      y.set(0)
      logger.info('mouseLeave', 'Card tilt reset')
    }, [x, y])

    return (
      <motion.div
        ref={cardRef}
        className={cn(
          "relative transition-all duration-300",
          disabled && "pointer-events-none",
          className
        )}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, {})
    return (
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    )
  }
}
