import React, { useEffect } from 'react';
import '../../styles/explore/modal.css';

export const Modal = ({ isOpen, onClose, children, title, className = '' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`modal active ${className}`}>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className={`modal-content ${className.includes('filter') ? 'filter-modal-content' : ''} ${className.includes('map') ? 'map-modal-content' : ''}`}>
                <span className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </span>

                {title ? (
                    <div className="modal-info">
                        <h2>{title}</h2>
                        {children}
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};
