import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/Button"

interface MagnetizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    particleCount?: number
    attractRadius?: number
    variant?: "default" | "primary" | "outline"
    size?: "default" | "sm" | "lg"
}

interface Particle {
    id: number
    x: number
    y: number
}

function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    variant = "default",
    size = "default",
    children,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false)
    const [particles, setParticles] = useState<Particle[]>([])
    const particlesControl = useAnimation()

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
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

    const particleColor = variant === "primary" ? "bg-primary" : variant === "outline" ? "bg-primary" : "bg-secondary"

    return (
        <Button
            className={cn(
                "relative touch-none overflow-visible",
                variant === "primary" && "bg-primary text-white hover:bg-blue-800",
                variant === "outline" && "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white",
                className
            )}
            size={size}
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
                        "absolute w-1.5 h-1.5 rounded-full",
                        particleColor,
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-40"
                    )}
                />
            ))}
            <span className="relative flex items-center justify-center gap-2">
                {children}
            </span>
        </Button>
    )
}

export { MagnetizeButton }
