import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[AnimatedGridBackground] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[AnimatedGridBackground] ${context}:`, error, data)
  }
}

export function AnimatedGridBackground({
  children,
  className,
  gridSize = 40,
  gridColor = "rgba(255, 255, 255, 0.03)",
  glowColor = "rgba(255, 111, 60, 0.1)",
  intensity = 1,
  disabled = false,
  ...props
}) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { stiffness: 50, damping: 20 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e) => {
    if (disabled || !containerRef.current) return
    
    try {
      const rect = containerRef.current.getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100
      
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
      setGlowPosition({ x: xPct, y: yPct })
      
      logger.info('mouseMove', `Glow position: ${xPct.toFixed(1)}%, ${yPct.toFixed(1)}%`)
    } catch (error) {
      logger.error('handleMouseMove', error, {})
    }
  }, [disabled, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setGlowPosition({ x: 50, y: 50 })
    logger.info('mouseLeave', 'Glow reset to center')
  }, [mouseX, mouseY])

  try {
    const gridStyle = {
      backgroundSize: `${gridSize}px ${gridSize}px`,
      backgroundImage: `
        linear-gradient(${gridColor} 1px, transparent 1px),
        linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
      `,
    }

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={gridStyle}
        />
        
        {!disabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 50%)`,
              opacity: intensity,
            }}
            animate={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 50%)`,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        )}
        
        {children}
      </div>
    )
  } catch (error) {
    logger.error('render', error, { gridSize, intensity })
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {children}
      </div>
    )
  }
}

export function AnimatedGradientBackground({
  children,
  className,
  colors = ["#0D3B66", "#FF6F3C", "#0D3B66"],
  animationDuration = 10,
  disabled = false,
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (disabled) return

    try {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % colors.length)
      }, animationDuration * 1000 / colors.length)

      logger.info('animate', `Color cycling every ${animationDuration * 1000 / colors.length}ms`)

      return () => {
        clearInterval(intervalId)
        logger.info('cleanup', 'Animation interval cleared')
      }
    } catch (error) {
      logger.error('animation', error, {})
    }
  }, [disabled, colors.length, animationDuration])

  try {
    const gradientStyle = {
      background: `linear-gradient(135deg, ${colors[currentIndex]}, ${colors[(currentIndex + 1) % colors.length]}, ${colors[(currentIndex + 2) % colors.length]})`,
      backgroundSize: "200% 200%",
      animation: `gradientShift ${animationDuration}s ease infinite`,
    }

    return (
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
        <div className="absolute inset-0" style={gradientStyle} />
        {children}
      </div>
    )
  } catch (error) {
    logger.error('render', error, { colors })
    return <div className={cn("relative", className)}>{children}</div>
  }
}
