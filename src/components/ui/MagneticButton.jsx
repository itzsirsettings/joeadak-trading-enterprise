import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"

const MagneticButton = ({ 
    children, 
    className, 
    variant = "default", 
    size = "default",
    particleCount = 10,
    ...props 
}) => {
    const [isAttracting, setIsAttracting] = useState(false)
    const [particles, setParticles] = useState([])
    const particlesControl = useAnimation()
    const buttonRef = useRef(null)

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
        }))
        setParticles(newParticles)
    }, [particleCount])

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true)
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        })
    }, [particlesControl])

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false)
        await particlesControl.start((i) => ({
            x: particles[i]?.x || 0,
            y: particles[i]?.y || 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }))
    }, [particlesControl, particles])

    const variantStyles = {
        default: "bg-secondary text-white hover:bg-orange-600",
        primary: "bg-primary text-white hover:bg-blue-800",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white",
        white: "bg-white text-primary hover:bg-gray-100",
    }

    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    }

    return (
        <div ref={buttonRef} className="relative inline-block">
            <motion.button
                className={cn(
                    "relative rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                onMouseEnter={handleInteractionStart}
                onMouseLeave={handleInteractionEnd}
                onTouchStart={handleInteractionStart}
                onTouchEnd={handleInteractionEnd}
                {...props}
            >
                {particles.map((_, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial={{ x: particles[index]?.x || 0, y: particles[index]?.y || 0 }}
                        animate={particlesControl}
                        className={cn(
                            "absolute w-1 h-1 rounded-full transition-opacity duration-300",
                            variant === "primary" ? "bg-secondary" : "bg-white/60",
                            isAttracting ? "opacity-100" : "opacity-30"
                        )}
                    />
                ))}
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </motion.button>
        </div>
    )
}

export { MagneticButton }
