import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

function Empty({ className, ...props }) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed p-6 text-center md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "relative flex size-14 shrink-0 items-center justify-center rounded-xl border bg-white/10 text-white shadow-sm [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn("relative mb-4", className)}
      {...props}
    >
      {variant === "icon" && (
        <>
          <div
            className={cn(
              emptyMediaVariants({ variant, className }),
              "pointer-events-none absolute bottom-0 origin-bottom-left -translate-x-1 scale-90 -rotate-6 shadow-none opacity-50"
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              emptyMediaVariants({ variant, className }),
              "pointer-events-none absolute bottom-0 origin-bottom-right translate-x-1 scale-90 rotate-6 shadow-none opacity-50"
            )}
            aria-hidden="true"
          />
        </>
      )}
      <div
        className={cn(emptyMediaVariants({ variant, className }))}
        {...props}
      />
    </div>
  )
}

function EmptyTitle({ className, ...props }) {
  return (
    <div
      data-slot="empty-title"
      className={cn("font-heading text-xl leading-none", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-white/70",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
