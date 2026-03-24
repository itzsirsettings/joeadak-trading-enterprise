import { ArrowRight, Plus } from "lucide-react";

export function CallToAction({ 
  title = "Ready to Take Your Business to the Next Level?",
  subtitle = "Partner with JOEADAK TRADING ENTERPRISE for professional solutions that drive results.",
  buttonText = "Contact Us Today",
  buttonLink = "/contact",
  phoneNumber = "+234 706 193 4478"
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-6 border-y bg-gradient-to-r from-deepBlue to-sapphire px-6 py-8">
      <Plus
        className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6 text-gold"
        strokeWidth={1}
      />
      <Plus
        className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6 text-gold"
        strokeWidth={1}
      />
      <Plus
        className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6 text-gold"
        strokeWidth={1}
      />
      <Plus
        className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6 text-gold"
        strokeWidth={1}
      />

      <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l border-gold/30" />
      <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r border-gold/30" />

      <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed border-gold/30" />


      <div className="space-y-1">
        <h2 className="text-center font-bold text-xl md:text-2xl text-white">
          {title}
        </h2>
        <p className="text-center text-iceBlue/80 text-sm">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-6 mt-8">
        <a 
          href={`tel:${phoneNumber.replace(/\s/g, '')}`} 
          className="bg-gold text-deepBlue w-full sm:w-auto justify-center font-semibold px-6 py-4 transition-all duration-300 hover:bg-yellow-500 hover:shadow-gold flex items-center mb-6 sm:mb-0"
        >
          <i className="fas fa-phone-alt mr-3 text-sm"></i>
          {phoneNumber}
        </a>
        <a 
          href={buttonLink} 
          className="bg-transparent border-2 border-gold text-gold w-full sm:w-auto justify-center font-semibold px-6 py-4 transition-all duration-300 hover:bg-gold hover:text-deepBlue flex items-center"
        >
          {buttonText} <ArrowRight className="ml-3 size-4" />
        </a>
      </div>
    </div>
  );
}

export default CallToAction;
