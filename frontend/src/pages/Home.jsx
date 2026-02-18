import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { Carousel } from '../components/organisms/Carousel';
import { FaqSection } from '../components/organisms/FaqSection';
import { FeatureCard } from '../components/molecules/FeatureCard';
import { Link } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../../constants.js';

export const Home = () => {
    return (
        <MainLayout>
            <section className="hero container">
                <div className="hero-text">
                    <h1>Discover Authentic Local Food Hidden from Tourist Maps</h1>
                    <p>
                        Experience a city through its food - from neighborhood favorites to
                        time-honored recipes cherished across generations, each dish telling
                        a story shaped by place, people, and tradition
                    </p>
                </div>
                <Carousel />
            </section>

            <section className="discover-section">
                <div className="container">
                    <h2>Start Your Local Food Journey Today</h2>
                    <p>
                        Join thousands of travelers discovering authentic local cuisine
                        hidden from mainstream platforms.
                    </p>
                    <div className="discover-buttons">
                        <Link to={FRONTEND_ROUTES.EXPLORE} className="btn btn-primary">Explore Local Food</Link>
                        <Link to={FRONTEND_ROUTES.CULTURE} className="btn btn-primary">Stories Behind Food</Link>
                    </div>
                </div>
            </section>

            <section className="features-section container">
                <div className="info">
                    <h2>Find restaurants that matter</h2>
                    <p>
                        LocalBites maps the places locals actually eat, the ones with real
                        stories behind them.
                    </p>
                </div>

                <div className="features-grid">
                    <FeatureCard
                        title="Search"
                        subtitle="Discover Local Food Spots"
                        description="Find authentic eateries loved by locals, not tourists."
                        image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                        link={FRONTEND_ROUTES.EXPLORE}
                    />

                    <FeatureCard
                        title="Plan"
                        subtitle="Plan Meals by Budget"
                        description="Know what you'll spend before you arrive anywhere."
                        image="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800"
                    />

                    <FeatureCard
                        title="Learn"
                        subtitle="History behind each dish"
                        description="Every meal has a story worth understanding."
                        link={FRONTEND_ROUTES.CULTURE}
                        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
                    />
                </div>
            </section>

            <FaqSection />
        </MainLayout>
    );
};
