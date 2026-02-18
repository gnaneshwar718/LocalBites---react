import React, { useState, useEffect } from 'react';
import { CAROUSEL_INTERVAL } from '../../../constants.js';

const images = [
    "https://static.india.com/wp-content/uploads/2024/08/FEATURE-IMAGE-31.jpg##image/jpg",
    "https://blog.swiggy.com/wp-content/uploads/2024/02/Thatte-Idli-1024x538.jpg",
    "https://b.zmtcdn.com/data/pictures/chains/3/53923/06e0e3449f73bb7cd9eeee55c73bd1ef.jpg",
    "https://static.toiimg.com/thumb/54308405.cms?imgsize=510571&width=800&height=800",
    "https://b.zmtcdn.com/data/pictures/chains/2/18712912/ce0341e58cf96f163101b4dff77ed938.jpg?fit=around|960:500&crop=960:500;*,*"
];

export const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, CAROUSEL_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-image carousel">
            <div className="carousel-inner">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={src} alt="Local Food" />
                    </div>
                ))}
            </div>
        </div>
    );
};
