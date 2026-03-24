import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus, Minus } from 'lucide-react'

const AccordionItem = ({ 
  item, 
  isOpen, 
  onToggle, 
  allowMultiple = false,
  variant = 'default'
}) => {
  const Icon = item.icon || ChevronDown

  return (
    <div className="border-b border-iceBlue/50">
      <button
        onClick={() => onToggle(item.id)}
        className={`w-full flex items-center justify-between py-4 px-4 text-left transition-colors duration-300 ${
          variant === 'dark' 
            ? 'bg-deepBlue text-white hover:bg-deepBlue/80' 
            : 'bg-white text-deepBlue hover:bg-iceBlue/30'
        } ${isOpen ? (variant === 'dark' ? 'bg-deepBlue/90' : 'bg-iceBlue/30') : ''}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <div className={`w-10 h-10 flex items-center justify-center ${
              isOpen ? 'bg-gold text-deepBlue' : 'bg-gold/20 text-gold'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className="font-semibold text-sm md:text-base">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`${isOpen ? 'text-gold' : 'text-gray-400'}`}
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`p-4 ${variant === 'dark' ? 'bg-deepBlue/80 text-iceBlue' : 'bg-iceBlue/20 text-gray-600'}`}>
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Accordion = ({ 
  items, 
  allowMultiple = false,
  variant = 'default',
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(allowMultiple ? [] : null)

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      )
    } else {
      setOpenItems(prev => prev === id ? null : id)
    }
  }

  return (
    <div className={`rounded-lg overflow-hidden ${variant === 'dark' ? '' : 'border border-iceBlue/50'} ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={allowMultiple ? openItems.includes(item.id) : openItems === item.id}
          onToggle={handleToggle}
          allowMultiple={allowMultiple}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default Accordion
