import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[FlipCard] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[FlipCard] ${context}:`, error, data)
  }
}

export function FlipCard({
  frontContent,
  backContent,
  className,
  flipAxis = "y",
  flipDirection = "cw",
  disabled = false,
  duration = 0.6,
  ...props
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const containerRef = useRef(null)

  const handleFlip = useCallback(() => {
    if (disabled) return
    
    try {
      setIsFlipped((prev) => !prev)
      logger.info('flip', `Card flipped: ${!isFlipped}`)
    } catch (error) {
      logger.error('flip', error, {})
    }
  }, [disabled, isFlipped])

  useEffect(() => {
    if (disabled) {
      setIsFlipped(false)
    }
  }, [disabled])

  try {
    const rotateValue = flipAxis === "y" ? 180 : 0
    const initialRotate = flipDirection === "ccw" ? -rotateValue : 0

    return (
      <div
        ref={containerRef}
        className={cn("relative cursor-pointer perspective-1000", disabled && "pointer-events-none", className)}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleFlip()
          }
        }}
        {...props}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateY: isFlipped ? (flipDirection === "ccw" ? -rotateValue : rotateValue) : 0,
            rotateX: flipAxis === "x" ? (isFlipped ? (flipDirection === "ccw" ? -rotateValue : rotateValue) : 0) : 0,
          }}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {frontContent}
          </div>
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: flipAxis === "y" ? "rotateY(180deg)" : "rotateX(180deg)",
            }}
          >
            {backContent}
          </div>
        </motion.div>
      </div>
    )
  } catch (error) {
    logger.error('render', error, { isFlipped, flipAxis })
    return (
      <div className={cn("relative", className)}>
        {frontContent}
      </div>
    )
  }
}
