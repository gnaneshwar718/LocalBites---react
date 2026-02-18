import React, { useEffect, useState } from 'react';
import { API_ROUTES } from '../../../../constants.js';
import { FaqItem } from '../molecules/FaqItem';

export const FaqSection = () => {
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
        <section id="faq" className="questions-section">
            <h2 className="info">Questions</h2>
            <p className="info">Everything you need to know about using LocalBites.</p>

            <div className="faq-list">
                <FaqItem
                    question="How accurate are the prices?"
                    answer="LocalBites pulls pricing from recent visitor data and restaurant menus. Prices change, so use our estimates as a guide, not gospel. Always check current menus before you order."
                />
                <FaqItem
                    question="Can I trust these recommendations?"
                    answer="Every restaurant on LocalBites is vetted by our team. We focus on places with rich history and authentic food, not tourist marketing. If a place doesn't meet our standards, it doesn't appear."
                />
                <FaqItem
                    question="Is the app available everywhere?"
                    answer="LocalBites covers major cities and growing regions worldwide. We're expanding constantly. Check the app to see if your destination is covered."
                />
                <FaqItem
                    question="How do I plan my budget?"
                    answer="Enter your total budget and number of people. LocalBites calculates per-person meal costs and shows you restaurants within your range. It's that simple."
                />
            </div>

            <div className="questions-footer">
                <h3>Still have questions?</h3>
                <p className="questions-subtext">Reach out to our team anytime.</p>

                <p className="contact-link">
                    <a href={contactEmail} id="faq-contact-link">CONTACT US</a>
                </p>
            </div>
        </section>
    );
};
