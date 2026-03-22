import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ImageAccordion = ({ items, basePath }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemHover = (index) => {
    setActiveIndex(index);
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
      onMouseLeave={handleItemLeave}
    >
      <div 
        className="flex flex-row items-center justify-center gap-1 p-3"
        style={{ height: '200px', overflow: 'hidden' }}
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={`
              relative rounded-xl overflow-hidden cursor-pointer
              transition-all duration-500 ease-in-out
              ${activeIndex === index ? 'w-[180px] h-full' : 'w-[40px] h-[90%]'}
            `}
            onMouseEnter={() => handleItemHover(index)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <span
              className={`
                absolute text-white text-xs font-semibold whitespace-nowrap font-heading
                transition-all duration-300 ease-in-out
                ${activeIndex === index
                  ? 'bottom-3 left-1/2 -translate-x-1/2 rotate-0'
                  : 'w-auto text-left bottom-16 left-1/2 -translate-x-1/2'
                }
              `}
              style={{ writingMode: activeIndex === index ? 'horizontal-tb' : 'vertical-rl', textOrientation: 'mixed' }}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <Link
          to={basePath}
          className="flex items-center justify-center gap-2 text-secondary font-semibold text-xs font-heading hover:bg-secondary/10 py-2 px-4 rounded-lg transition-colors"
        >
          <span>View All</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </motion.div>
  );
};

export { ImageAccordion };
