import React, { useState } from 'react';
import { Logo } from '../atoms/Logo';
import { NavLinks } from '../molecules/NavLinks';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header>
            <div className="header-layout">
                <div className="logo">
                    <Logo src="/assets/logo-header-svg.svg" alt="LocalBites Logo" />
                </div>
                <NavLinks isOpen={isMenuOpen} />
                <button className="hamburger" aria-label="Toggle navigation" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="profile-link">
                    <Link to="/auth">Logout</Link>
                </div>
            </div>
        </header>
    );
};
