import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/slides')
      .then(res => setSlides(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0){
    return null;
  } else {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={slide._id}
          src={slide.url}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
