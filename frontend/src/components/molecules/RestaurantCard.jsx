import React from 'react';
import { Badge } from '../atoms/Badge';

const renderStars = (rating) => {
    const stars = 5;
    let color = '#ef4444';
    if (rating >= 4.0) color = '#22c55e';
    else if (rating >= 3.0) color = '#eab308';

    const starIcons = [];
    for (let i = 0; i < stars; i++) {
        if (i < Math.floor(rating)) {
            starIcons.push(<i key={i} className="fa-solid fa-star"></i>);
        } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            starIcons.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
        } else {
            starIcons.push(<i key={i} className="fa-regular fa-star"></i>);
        }
    }

    return (
        <span style={{ color, display: 'inline-flex', gap: '2px' }}>
            {starIcons} <span style={{ color: '#666', fontSize: '0.9em', marginLeft: '4px' }}>({rating})</span>
        </span>
    );
};

export const RestaurantCard = ({ restaurant, onClick }) => {
    return (
        <article className="restaurant-card" data-id={restaurant.id} onClick={() => onClick(restaurant)}>
            <div className="card-image-wrapper">
                <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
                <Badge isOpen={restaurant.isOpen}>{restaurant.openStatusText}</Badge>
            </div>
            <div className="card-content">
                <div className="card-header">
                    <h3>{restaurant.name}</h3>
                    <span className="card-price">{restaurant.priceString}</span>
                </div>
                <div className="card-meta">
                    <span className="card-cuisine">{restaurant.cuisine}</span>
                    <span className="rating">{renderStars(restaurant.rating)}</span>
                </div>
                <div className="card-footer">
                    <span className="tag">
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="value"> {restaurant.location}</span>
                    </span>
                </div>
            </div>
        </article>
    );
};
