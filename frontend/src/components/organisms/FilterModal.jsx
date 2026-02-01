import React, { useState } from 'react';
import { Modal } from '../molecules/Modal';
import { Button } from '../atoms/Button';
import '../../styles/explore/filters.css';

export const FilterModal = ({ isOpen, onClose, onApply, currentFilters = { cuisine: 'all', mealType: 'all' } }) => {
    const [cuisine, setCuisine] = useState(currentFilters.cuisine);
    const [mealType, setMealType] = useState(currentFilters.mealType);

    const handleApply = () => {
        onApply({ cuisine, mealType });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Filter Restaurants" className="filter-modal">
            <div className="filter-section">
                <h3>Cuisine</h3>
                <div className="filter-options" id="cuisineFilters">
                    {['all', 'South Indian', 'North Indian'].map((c) => (
                        <button
                            key={c}
                            className={`filter-chip ${cuisine === c ? 'active' : ''}`}
                            onClick={() => setCuisine(c)}
                        >
                            {c === 'all' ? 'All' : c}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-section">
                <h3>Meal Type</h3>
                <div className="filter-options" id="mealTypeFilters">
                    {['all', 'breakfast', 'lunch', 'dinner', 'snacks'].map((m) => (
                        <button
                            key={m}
                            className={`filter-chip ${mealType === m ? 'active' : ''}`}
                            onClick={() => setMealType(m)}
                        >
                            {m === 'all' ? 'All' : m.charAt(0).toUpperCase() + m.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="modal-footer">
                <Button className="btn btn-primary w-full" onClick={handleApply}>
                    Apply Filters
                </Button>
            </div>
        </Modal>
    );
};
