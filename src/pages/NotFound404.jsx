import { ArrowLeft, Home, Ghost } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "../components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/Empty"

function NotFound404({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist. It may have been moved or deleted.",
  className,
}) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-gradient-primary flex items-center justify-center px-6",
        className
      )}
    >
      <Empty className="border-white/20 bg-white/5 backdrop-blur-sm">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Ghost className="h-10 w-10 text-white/70" />
          </EmptyMedia>
          <EmptyTitle className="text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            404
          </EmptyTitle>
          <h2 className="text-2xl font-heading font-bold text-white mt-2">{title}</h2>
          <EmptyDescription className="text-base">{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row mt-4">
            <Link to="/">
              <Button className="group">
                <Home className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Go Home
              </Button>
            </Link>

            <Button 
              onClick={() => window.history.back()} 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 hover:text-white group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFound404
