import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[SpotlightButton] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[SpotlightButton] ${context}:`, error, data)
  }
}

export function SpotlightButton({
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
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicked, setIsClicked] = useState(false)

  try {
    const handleMouseMove = useCallback((e) => {
      if (!buttonRef.current || disabled) return
      
      try {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPosition({ x, y })
        logger.info('mouseMove', `Position: ${x}, ${y}`)
      } catch (error) {
        logger.error('handleMouseMove', error, { event: 'mouse_move' })
      }
    }, [disabled])

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true)
      logger.info('mouseEnter', 'Button hover started')
    }, [])

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false)
      logger.info('mouseLeave', 'Button hover ended')
    }, [])

    const handleClick = useCallback((e) => {
      if (disabled) return
      
      try {
        setIsClicked(true)
        logger.info('click', 'Button clicked', { position })
        
        setTimeout(() => setIsClicked(false), 200)
        
        if (onClick) {
          onClick(e)
        }
      } catch (error) {
        logger.error('handleClick', error, { position })
      }
    }, [disabled, onClick, position])

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
          isClicked && "scale-95",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        disabled={disabled}
        {...props}
      >
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none rounded-full bg-white/20 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    )
  } catch (error) {
    logger.error('render', error, { variant, size, disabled })
    return (
      <button className={cn("px-6 py-3 rounded-lg font-semibold", className)} disabled={disabled}>
        {children}
      </button>
    )
  }
}
