import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[ShinyButton] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[ShinyButton] ${context}:`, error, data)
  }
}

export function ShinyButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  ...props
}) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const shinePosition = useRef({ x: -100, y: -100 })

  try {
    const handleMouseMove = useCallback((e) => {
      if (!buttonRef.current || disabled) return
      
      try {
        const rect = buttonRef.current.getBoundingClientRect()
        shinePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      } catch (error) {
        logger.error('handleMouseMove', error, {})
      }
    }, [disabled])

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true)
      logger.info('mouseEnter', 'Shine effect activated')
    }, [])

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false)
      logger.info('mouseLeave', 'Shine effect deactivated')
    }, [])

    const handleClick = useCallback((e) => {
      if (disabled) return
      
      try {
        logger.info('click', 'Button clicked')
        onClick?.(e)
      } catch (error) {
        logger.error('handleClick', error, {})
      }
    }, [disabled, onClick])

    const variantStyles = {
      default: "bg-secondary text-white hover:bg-orange-600",
      primary: "bg-primary text-white hover:bg-blue-800",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white",
      white: "bg-white text-primary hover:bg-gray-100",
    }

    const sizeStyles = {
      sm: "px-4 py-2 text-sm min-h-[36px]",
      default: "px-6 py-3 text-base min-h-[44px]",
      lg: "px-8 py-4 text-lg min-h-[52px]",
    }

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden rounded-lg font-semibold shadow-md transition-all duration-300",
          "flex items-center justify-center gap-2 cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        disabled={disabled}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={false}
          animate={isHovered ? {
            opacity: 1,
            x: ['-100%', '100%'],
          } : {
            opacity: 0,
            x: '0%'
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            x: { duration: 0.6, ease: "easeInOut" }
          }}
          style={{
            left: shinePosition.current.x,
            top: shinePosition.current.y,
            width: '60%',
            height: '200%',
            transform: 'translateX(-50%) translateY(-50%) rotate(25deg)',
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    )
  } catch (error) {
    logger.error('render', error, { variant, size })
    return (
      <button className={cn("px-6 py-3 rounded-lg font-semibold", className)} disabled={disabled}>
        {children}
      </button>
    )
  }
}
