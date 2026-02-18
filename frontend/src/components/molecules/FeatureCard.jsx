import React from 'react';
import { Link } from 'react-router-dom';

export const FeatureCard = ({ title, subtitle, description, image, link }) => {
    return (
        <article className="home-feature-card">
            <div>
                <h3>{title}</h3>
                <div className="subtitle">{subtitle}</div>
                <p>{description}</p>
                {link ? (
                    <Link to={link} className="feature-link">
                        Explore <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                ) : (
                    <a href="#" className="feature-link">
                        Explore <i className="fa-solid fa-chevron-right"></i>
                    </a>
                )}
            </div>
            <div className="feature-image">
                <img src={image} alt={title} />
            </div>
        </article>
    );
};
