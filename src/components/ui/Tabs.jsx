import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import Accordion from './Accordion'

const TabButton = ({ 
  tab, 
  isActive, 
  onClick,
  variant = 'default'
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
        variant === 'pills'
          ? `rounded-full ${isActive ? 'bg-gold text-deepBlue' : 'text-gray-500 hover:text-deepBlue'}`
          : `${isActive ? 'text-deepBlue' : 'text-gray-500 hover:text-deepBlue'}`
      }`}
    >
      {tab.icon && (
        <span className="mr-2">
          {tab.icon}
        </span>
      )}
      {tab.label}
      {variant === 'underline' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  )
}

const TabContent = ({ content, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Tabs = ({ 
  tabs, 
  defaultTab = 0,
  variant = 'underline',
  mobileAccordion = true,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const isMobile = useIsMobile()

  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  const handleTabChange = (index) => {
    setActiveTab(index)
  }

  const accordionItems = tabs.map(tab => ({
    id: tab.id || tab.label.toLowerCase().replace(/\s+/g, '-'),
    title: tab.label,
    content: tab.content,
    icon: tab.icon
  }))

  return (
    <div className={className}>
      {mobileAccordion && isMobile ? (
        <Accordion 
          items={accordionItems} 
          variant="light"
        />
      ) : (
        <>
          <div className={`flex gap-1 ${
            variant === 'underline' ? 'border-b border-iceBlue/50' : ''
          } ${variant === 'pills' ? 'bg-iceBlue/30 p-1 rounded-full' : ''}`}>
            {tabs.map((tab, index) => (
              <TabButton
                key={tab.id || index}
                tab={tab}
                isActive={activeTab === index}
                onClick={() => handleTabChange(index)}
                variant={variant}
              />
            ))}
          </div>
          
          <TabContent 
            content={tabs[activeTab]?.content} 
            isActive={true} 
          />
        </>
      )}
    </div>
  )
}

const TabPanel = ({ children, isActive }) => {
  if (!isActive) return null
  return children
}

export { Tabs, TabPanel, TabButton }
export default Tabs
