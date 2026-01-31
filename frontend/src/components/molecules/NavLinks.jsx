import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavLinks = ({ isOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/explore" className={isActive('/explore')}>Explore</Link>
            <Link to="/culture" className={isActive('/culture')}>Culture</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
        </nav>
    );
};
