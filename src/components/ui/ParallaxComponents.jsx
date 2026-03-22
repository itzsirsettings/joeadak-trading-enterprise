import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[TextParallaxContent] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[TextParallaxContent] ${context}:`, error, data)
  }
}

export function TextParallaxContent({
  children,
  className,
  ...props
}) {
  const ref = useRef(null)

  try {
    useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  } catch (error) {
    logger.error('render', error, {})
    return <div className={cn("w-full", className)}>{children}</div>
  }
}

export function ParallaxText({
  children,
  className,
  speed = 0.5,
  as: Component = "p",
  ...props
}) {
  const ref = useRef(null)

  try {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

    return (
      <motion.div ref={ref} style={{ y }} className="overflow-hidden">
        <Component className={cn("", className)} {...props}>
          {children}
        </Component>
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { speed })
    return <Component className={className} {...props}>{children}</Component>
  }
}

export function ParallaxImage({
  children,
  className,
  speed = 0.5,
  ...props
}) {
  const ref = useRef(null)

  try {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

    return (
      <motion.div ref={ref} style={{ y }} className={cn("overflow-hidden", className)}>
        {children}
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { speed })
    return <div className={cn("overflow-hidden", className)}>{children}</div>
  }
}

export function TextReveal({
  children,
  className,
  staggerDelay = 0.05,
  ...props
}) {
  const ref = useRef(null)

  try {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 80%", "end 20%"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

    return (
      <motion.div ref={ref} style={{ opacity, y }} className="overflow-hidden">
        <span className={cn("inline-block", className)} {...props}>
          {children}
        </span>
      </motion.div>
    )
  } catch (error) {
    logger.error('render', error, { staggerDelay })
    return <span className={className} {...props}>{children}</span>
  }
}
