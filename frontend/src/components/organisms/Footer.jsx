import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COPYRIGHT_TEXT, API_ROUTES } from '../../../constants.js';


export const Footer = () => {
    const [contactEmail, setContactEmail] = useState('#');

    useEffect(() => {
        fetch(API_ROUTES.CONFIG)
            .then(res => res.json())
            .then(config => {
                if (config.contactEmail) {
                    setContactEmail(`mailto:${config.contactEmail}`);
                }
            })
            .catch(err => console.error('Failed to load config:', err));
    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img
                            src="/assets/logo-footer.svg"
                            alt="LocalBites Logo"
                            className="footer-logo-img"
                        />
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About Us</Link>
                        <a href={contactEmail} id="footer-contact-link">Contact us</a>
                        <Link to="/#faq">FAQ</Link>
                    </div>
                </div>
                <div
                    className="footer-copyright"
                    id="footer-copyright"
                    dangerouslySetInnerHTML={{ __html: COPYRIGHT_TEXT }}
                ></div>
            </div>
        </footer>
    );
};
