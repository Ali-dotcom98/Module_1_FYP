import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // optional icons

const Banner = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.9; // scroll by ~90% of visible width
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const banners = [
    {
      title: "LeetCode's Interview Crash Course:",
      subtitle: 'System Design for Interviews and Beyond',
      button: 'Start Learning',
      bg: 'bg-green-600',
    },
    {
      title: "LeetCode's Interview Crash Course:",
      subtitle: 'Data Structures and Algorithms',
      button: 'Start Learning',
      bg: 'bg-purple-600',
    },
    {
      title: 'Top Interview Questions',
      subtitle: '',
      button: 'Get Started',
      bg: 'bg-blue-600',
    },
     {
      title: 'Top Interview Questions',
      subtitle: '',
      button: 'Get Started',
      bg: 'bg-blue-600',
    },
     {
      title: 'Top Interview Questions',
      subtitle: '',
      button: 'Get Started',
      bg: 'bg-blue-600',
    },
  ];

  return (
    <div className="font-urbanist relative w-full max-w-6xl mx-auto px-4">
      {/* Scrollable Banner Container */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scroll Area */}
       <div
  ref={scrollRef}
  className="flex overflow-hidden space-x-4 scroll-smooth py-4"
>
    
          {banners.map((item, idx) => (
            <div
              key={idx}
              className={`min-w-[280px] sm:min-w-[340px] rounded-xl p-4 text-white ${item.bg} flex-shrink-0`}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm mb-4">{item.subtitle}</p>
              <button className="bg-white text-black px-4 py-1 rounded shadow">
                {item.button}
              </button>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
