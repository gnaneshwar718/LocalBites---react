import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ children, to, href, className, variant = 'primary', ...props }) => {
    const btnClass = `btn btn-${variant} ${className || ''}`;

    if (to) {
        return <Link to={to} className={btnClass} {...props}>{children}</Link>;
    }
    if (href) {
        return <a href={href} className={btnClass} {...props}>{children}</a>;
    }
    return <button className={btnClass} {...props}>{children}</button>;
};
