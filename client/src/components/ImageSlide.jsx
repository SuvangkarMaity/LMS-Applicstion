import React, { useState, useEffect } from 'react';

const images = [
  '/images/slide1.png',
  '/images/slide2.png',
  '/images/slide3.png',
];

const ImageSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-full h-[400px] relative overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Slide"
        className="w-full h-full object-cover transition-all duration-1000"
      />
    </div>
  );
};

export default ImageSlide;
