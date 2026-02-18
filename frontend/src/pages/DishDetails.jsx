import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { ANIMATION_TIMINGS } from '../../../constants.js';
import '../styles/restaurant.css';
import '../styles/restaurant/parallax.css';

export const DishDetails = () => {
    const { id: dishId } = useParams();
    const location = useLocation();
    const [dish, setDish] = useState(null);
    const [associatedRestaurants, setAssociatedRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/data/culture-data.json')
            .then(res => res.json())
            .then(data => {
                const foundDish = data.dishes[dishId];
                if (foundDish) {
                    setDish(foundDish);
                    const rests = (foundDish.restaurants || []).map(rId =>
                        data.restaurants[rId] ? { ...data.restaurants[rId], id: rId } : null
                    ).filter(Boolean);
                    setAssociatedRestaurants(rests);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching dish data:', err);
                setError(true);
                setLoading(false);
            });
    }, [dishId]);

    useEffect(() => {
        if (!loading && location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, ANIMATION_TIMINGS.HASH_SCROLL_RENDER_DELAY);
            }
        } else if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [loading, location.hash, associatedRestaurants, location.pathname]);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                    Loading dish details...
                </div>
            </MainLayout>
        );
    }

    if (error || !dish) {
        return (
            <MainLayout>
                <div className="not-found-message" style={{
                    padding: '4rem',
                    textAlign: 'center',
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <i className="fas fa-exclamation-circle not-found-icon" style={{ fontSize: '3rem', color: 'var(--color-accent)' }}></i>
                    <h2 className="not-found-text">Dish not found</h2>
                    <Link to="/culture" className="return-link btn-secondary">
                        Return to Culture Page
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <main className="restaurant-main">
                <section
                    className="parallax-banner"
                    style={{ backgroundImage: `url(${dish.image})` }}
                >
                    <div className="banner-overlay">
                        <h2 className="banner-title">{dish.name}</h2>
                    </div>
                </section>

                <div id="content-container" className="content-container">
                    <section className="content-block">
                        <div className="content-wrapper">
                            <div
                                className="restaurant-desc"
                                dangerouslySetInnerHTML={{ __html: dish.description }}
                            />
                        </div>
                    </section>
                </div>
                {associatedRestaurants.map((restaurant) => (
                    <React.Fragment key={restaurant.id}>
                        <section
                            className="parallax-banner"
                            style={{ backgroundImage: `url(${restaurant.image})` }}
                        >
                            <div className="banner-overlay">
                            </div>
                        </section>
                        <div className="content-container">
                            <section className="content-block" id={restaurant.id}>
                                <div className="content-wrapper">
                                    <h2 className="content-title">{restaurant.name}</h2>
                                    <div
                                        className="restaurant-desc"
                                        dangerouslySetInnerHTML={{ __html: restaurant.description }}
                                    />
                                    {restaurant.location && (
                                        <a
                                            href={restaurant.location}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="location-btn btn-primary"
                                            style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <i className="fas fa-map-marker-alt"></i> View Location
                                        </a>
                                    )}
                                </div>
                            </section>
                        </div>
                    </React.Fragment>
                ))}
                <div className="content-container" style={{ marginTop: '2rem', paddingBottom: '2rem', textAlign: 'center' }}>
                    <div className="restaurant-footer-nav">
                        <Link to="/culture" className="back-link btn-secondary">
                            <i className="fas fa-arrow-left"></i> Back to Dish Gallery
                        </Link>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
};
