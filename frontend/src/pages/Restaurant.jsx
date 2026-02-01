import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { STATIC_PATHS, FRONTEND_ROUTES } from '../../../constants.js';
import '../styles/restaurant.css';

export const Restaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(STATIC_PATHS.CULTURE_DATA)
            .then(res => res.json())
            .then(data => {
                const foundRestaurant = data.restaurants[id];
                if (foundRestaurant) {
                    setRestaurant(foundRestaurant);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching restaurant data:', err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
                    Loading restaurant details...
                </div>
            </MainLayout>
        );
    }

    if (error || !restaurant) {
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
                    <h2 className="not-found-text">Restaurant not found</h2>
                    <Link to={FRONTEND_ROUTES.CULTURE} className="return-link btn-secondary">
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
                    style={{ backgroundImage: `url(${restaurant.image})` }}
                >
                    <div className="banner-overlay">
                        <h1 className="banner-title">{restaurant.name}</h1>
                    </div>
                </section>

                <div id="content-container" className="content-container">
                    <div className="restaurant-details">
                        <div
                            id="restaurant-description"
                            className="restaurant-description"
                            dangerouslySetInnerHTML={{ __html: restaurant.description }}
                        />

                        <div className="action-buttons">
                            {restaurant.location && (
                                <a
                                    id="location-link"
                                    href={restaurant.location}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary"
                                >
                                    <i className="fas fa-map-marker-alt"></i> View on Map
                                </a>
                            )}
                            <Link to={FRONTEND_ROUTES.CULTURE} className="btn-secondary">
                                <i className="fas fa-arrow-left"></i> Back to Culture
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
};
