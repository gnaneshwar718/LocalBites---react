import React from 'react';
import { Input } from '../atoms/Input';

export const SearchBox = ({ value, onChange, placeholder, className }) => {
    return (
        <div className={`search-wrapper ${className || ''}`}>
            <i className="fas fa-search"></i>
            <Input
                id="restaurantSearch"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
