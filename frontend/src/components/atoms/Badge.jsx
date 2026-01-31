import React from 'react';

export const Badge = ({ children, isOpen }) => {
    const style = {
        background: isOpen ? '#d1fae5' : '#fee2e2',
        color: isOpen ? '#065f46' : '#991b1b',
        display: children ? 'block' : 'none'
    };

    return (
        <span className="card-badge" style={style}>
            {children}
        </span>
    );
};
