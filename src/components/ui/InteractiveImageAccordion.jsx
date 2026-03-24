import React, { useState } from 'react';

const accordionItems = [
  {
    id: 1,
    title: 'Business Consulting',
    imageUrl: '/images/Hero-images/op1.jpg',
  },
  {
    id: 2,
    title: 'Project Management',
    imageUrl: '/images/Hero-images/op2.jpg',
  },
  {
    id: 3,
    title: 'Administrative Support',
    imageUrl: '/images/Hero-images/op3.jpg',
  },
  {
    id: 4,
    title: 'Community Engagement',
    imageUrl: '/images/Hero-images/op4.jpg',
  },
  {
    id: 5,
    title: 'Event Planning',
    imageUrl: '/images/Hero-images/op5.jpg',
  },
];

const AccordionItem = ({ item, isActive, onMouseEnter, onClick }) => {
  return (
    <div
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'h-[250px] lg:h-[450px] w-full lg:w-[400px]' : 'h-[60px] lg:h-[450px] w-full lg:w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <span
        className={`
          absolute text-white font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'text-lg bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'text-base lg:text-lg lg:w-auto lg:text-left lg:bottom-24 lg:left-1/2 lg:-translate-x-1/2 lg:rotate-90 top-1/2 -translate-y-1/2 left-6 rotate-0'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleItemHover = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <section className="container mx-auto px-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deepBlue leading-tight tracking-tighter">
              Professional Solutions for Your Business
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              JOEADAK Trading Enterprise delivers expert freelance and consulting services to help businesses, organizations, and communities thrive.
            </p>
            <div className="mt-8 mb-8 lg:mb-0">
              <a
                href="/contact"
                className="inline-block bg-gold text-deepBlue font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-500 hover:shadow-gold-lg transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
