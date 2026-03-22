import { ArrowRight, Plus } from "lucide-react";
import { Button } from '@/components/ui/Button'

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[CallToAction] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[CallToAction] ${context}:`, error, data)
  }
}

export function CallToAction({ 
  title = "Ready to Take Your Business to the Next Level?",
  subtitle = "Partner with JOEADAK TRADING ENTERPRISE for professional solutions that drive results.",
  buttonText = "Contact Us Today",
  buttonLink = "/contact",
  phoneNumber = "+234 706 193 4478"
}) {
  logger.info('render', 'Rendering CallToAction component', { title, buttonText })

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-6 border-y bg-[radial-gradient(35%_80%_at_25%_0%,rgba(13,59,102,0.08),transparent)] px-6 py-8">
      <Plus
        className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6 text-primary"
        strokeWidth={1}
      />
      <Plus
        className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6 text-primary"
        strokeWidth={1}
      />
      <Plus
        className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6 text-primary"
        strokeWidth={1}
      />
      <Plus
        className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6 text-primary"
        strokeWidth={1}
      />

      <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l border-gray-200" />
      <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r border-gray-200" />

      <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed border-gray-200" />


      <div className="space-y-1">
        <h2 className="text-center font-bold text-xl md:text-2xl text-primary">
          {title}
        </h2>
        <p className="text-center text-gray-500 text-sm">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button variant="moving" size="sm">
          <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="flex items-center gap-1">
            <i className="fas fa-phone-alt text-xs"></i>
            {phoneNumber}
          </a>
        </Button>
        <Button variant="moving" size="sm">
          <a href={buttonLink} className="flex items-center gap-1">
            {buttonText} <ArrowRight className="size-3 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default CallToAction;
