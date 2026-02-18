import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { ABOUT_DATA } from '../../../constants.js';
import '../styles/about.css';

export const About = () => {
    return (
        <MainLayout>
            <section className="about-hero">
                <div className="container text-center">
                    <h1>About LocalBites</h1>
                </div>
            </section>

            <section className="about-info-section">
                <div className="container">
                    <div className="info-grid">
                        <article className="info-block">
                            <h2>Our Mission</h2>
                            <p id="mission-text">{ABOUT_DATA.MISSION}</p>
                        </article>
                        <article className="info-block">
                            <h2>Our Story</h2>
                            <p id="story-text">{ABOUT_DATA.STORY}</p>
                        </article>
                        <article className="info-block">
                            <h2>Our Vision</h2>
                            <p id="vision-text">{ABOUT_DATA.VISION}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <h2 className="text-center">Why LocalBites?</h2>
                    <div className="features-grid">
                        {ABOUT_DATA.FEATURES.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <i className={`feature-icon ${feature.icon}`}></i>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <h2 className="text-center">Meet the Team</h2>
                    <div className="team-grid">
                        {ABOUT_DATA.TEAM.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                <h3>{member.name}</h3>
                                <span className="role">{member.role}</span>
                                <p>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="discover-community-section">
                <div className="container text-center">
                    <h2>Join Our Food Journey</h2>
                    <p>Start exploring the most authentic dishes in your city today.</p>
                    <Link to="/explore" className="btn btn-primary">Explore Now</Link>
                </div>
            </section>
        </MainLayout>
    );
};
