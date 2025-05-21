import React, { useState, useEffect } from "react";
import notice1 from '../assets/votexmlogo.png';
import notice2 from "../assets/CITC.png";
import notice3 from "../assets/SITE.png";

const images = [notice1, notice2, notice3];

const AnnouncementCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div className="carousel-wrapper">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Announcement ${index + 1}`}
          className={`carousel-image ${
            index === currentIndex ? "active" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default AnnouncementCarousel;
