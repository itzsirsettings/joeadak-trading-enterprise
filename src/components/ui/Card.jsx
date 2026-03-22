import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, variant = "default", title, description, children, ...props }, ref) => {
  const baseClasses = "w-full relative"

  const variantClasses = {
    default: "border border-gray-200 rounded-lg bg-white",
    dots: "relative mx-auto w-full rounded-lg border-2 border-dashed border-gray-300 px-4 sm:px-6 md:px-8 bg-white",
    gradient: "relative mx-auto w-full px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 rounded-lg",
    plus: "border border-dashed border-gray-400 relative bg-white rounded-lg",
    neubrutalism: "border border-gray-400 relative rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-white",
    inner: "border border-gray-300 rounded-sm p-2 bg-gradient-to-br from-white to-gray-100 shadow-[2px_0_8px_rgba(0,0,0,0.15)]",
    lifted: "border border-gray-400 relative rounded-xl shadow-[0px_5px_0px_0px_rgba(0,0,0,0.7)] bg-gray-50",
    corners: "border-2 border-gray-200 relative rounded-md bg-white",
  }

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props}>
    {props.children}
  </div>
))
CardContent.displayName = "CardContent"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4 pb-2", className)} {...props}>
    {props.children}
  </div>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-bold text-gray-900 leading-tight font-heading", className)} {...props}>
    {props.children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props}>
    {props.children}
  </p>
))
CardDescription.displayName = "CardDescription"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-4 pt-0", className)} {...props}>
    {props.children}
  </div>
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter }
