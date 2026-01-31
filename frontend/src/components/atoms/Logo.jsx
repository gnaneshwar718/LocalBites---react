import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ src, alt, to = '/', className }) => {
    const img = <img src={src} alt={alt} className={className} />;
    return to ? <Link to={to}>{img}</Link> : img;
};
