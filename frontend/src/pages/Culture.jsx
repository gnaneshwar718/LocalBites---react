import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { HERO_DATA, CAROUSEL_INTERVAL, CULTURE_IMAGES } from '../../../constants.js';
import '../styles/culture.css';
import '../styles/restaurant/parallax.css';

const LIMIT = 6;

export const Culture = () => {
    const [dishData, setDishData] = useState({});
    const [restaurantData, setRestaurantData] = useState({});
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [allDishes, setAllDishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = 'Culture - LocalBites';
        fetch('/data/culture-data.json')
            .then(res => res.json())
            .then(data => {
                setDishData(data.dishes);
                setRestaurantData(data.restaurants);
                const dishes = Object.entries(data.dishes).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setAllDishes(dishes);
                setFilteredDishes(dishes);
            })
            .catch(err => console.error('Error fetching culture data:', err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex(prev => (prev + 1) % HERO_DATA.length);
        }, CAROUSEL_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredDishes(allDishes);
            return;
        }
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = allDishes.filter(dish =>
            dish.name.toLowerCase().includes(lowerTerm) ||
            dish.description.toLowerCase().includes(lowerTerm) ||
            dish.restaurants.some(rId =>
                (restaurantData[rId]?.name || '').toLowerCase().includes(lowerTerm)
            )
        );
        setFilteredDishes(filtered);
        setCurrentPage(0);
    }, [searchTerm, allDishes, restaurantData]);

    const totalPages = Math.ceil(filteredDishes.length / LIMIT);
    const visibleDishes = filteredDishes.slice(currentPage * LIMIT, (currentPage + 1) * LIMIT);
    const heroItem = HERO_DATA[currentSlideIndex];

    const images = CULTURE_IMAGES;

    return (
        <MainLayout>
            <section className="culture-hero">
                <div className="culture-hero-content">
                    <div className="culture-hero-text" key={currentSlideIndex}>
                        <span className="hero-tagline">{heroItem?.t}</span>
                        <h1>{heroItem?.h}</h1>
                        <p>{heroItem?.d}</p>
                    </div>
                    <div className="culture-hero-image carousel">
                        <div className="carousel-inner">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${index === currentSlideIndex ? 'active' : index === (currentSlideIndex - 1 + images.length) % images.length ? 'slide-out' : ''}`}
                                >
                                    <Link to={`/dish/${HERO_DATA[index]?.id}`}>
                                        <img src={src} alt={HERO_DATA[index]?.h} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="must-try-section">
                <div className="must-try-container">
                    <div className="section-header">
                        <h2>Timeless Tastes of Bengaluru</h2>
                        <div className="search-box">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="dishes-grid">
                        {visibleDishes.length === 0 ? (
                            <p className="no-results-message">No dishes found.</p>
                        ) : (
                            visibleDishes.map(dish => (
                                <article key={dish.id} className="dish-card" id={dish.id}>
                                    <div className="dish-image">
                                        <Link to={`/dish/${dish.id}`}>
                                            <img src={dish.image} alt={dish.name} loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="dish-content">
                                        <Link to={`/dish/${dish.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <h3>{dish.name}</h3>
                                        </Link>
                                        <p>{dish.description}</p>
                                        <div className="famous-restaurants">
                                            <h4>Iconic places to try</h4>
                                            <ul className="restaurant-list">
                                                {dish.restaurants.map(rId => {
                                                    const res = restaurantData[rId];
                                                    if (!res) return null;
                                                    return (
                                                        <li key={rId} className="restaurant-item">
                                                            <div className="restaurant-header">
                                                                <Link to={`/dish/${dish.id}#${res.id}`} className="restaurant-name-link">
                                                                    <span className="restaurant-name">{res.name}</span>
                                                                </Link>
                                                                <div className="restaurant-actions">
                                                                    {res.location && res.location !== '#' && (
                                                                        <a href={res.location} className="location-icon" target="_blank" rel="noreferrer">
                                                                            <i className="fas fa-map-marker-alt"></i>
                                                                        </a>
                                                                    )}
                                                                    <Link to={`/dish/${dish.id}#${res.id}`} className="nav-arrow">
                                                                        <i className="fas fa-chevron-right"></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                    <div className="pagination-controls">
                        <button
                            className="page-btn prev-btn"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="page-dots">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`dot ${i === currentPage ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(i)}
                                ></div>
                            ))}
                        </div>
                        <button
                            className="page-btn next-btn"
                            disabled={currentPage >= totalPages - 1}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
