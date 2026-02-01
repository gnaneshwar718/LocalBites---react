import React, { useState, useEffect } from 'react';
import { PlacesApi } from '../services/placesApi';
import { RestaurantCard } from '../components/molecules/RestaurantCard';
import { MainLayout } from '../components/templates/MainLayout';
import { SearchBox } from '../components/molecules/SearchBox';
import { Button } from '../components/atoms/Button';
import { FilterModal } from '../components/organisms/FilterModal';
import { BudgetModal } from '../components/organisms/BudgetModal';
import { MapModal } from '../components/organisms/MapModal';
import { Modal } from '../components/molecules/Modal';
import { API_ROUTES } from '../../../constants.js';
import '../styles/explore.css';

export const Explore = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({ cuisine: 'all', mealType: 'all' });
    const [budgetFilter, setBudgetFilter] = useState(0);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetch(API_ROUTES.CONFIG);
                const config = await res.json();
                if (config.googleMapsApiKey) {
                    PlacesApi.setApiKey(config.googleMapsApiKey);
                    const data = await PlacesApi.fetchRestaurants();
                    if (data && data.length > 0) {
                        setRestaurants(data);
                        setFilteredRestaurants(data);
                    }
                }
            } catch (error) {
                console.error('Failed to load restaurants', error);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    useEffect(() => {
        let result = restaurants;

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(r =>
                r.name.toLowerCase().includes(lower) ||
                r.cuisine.toLowerCase().includes(lower) ||
                r.location.toLowerCase().includes(lower)
            );
        }

        if (activeFilters.cuisine !== 'all') {
            result = result.filter(r => r.cuisine.toLowerCase().includes(activeFilters.cuisine.toLowerCase()) || (activeFilters.cuisine === 'North Indian' && r.cuisine.toLowerCase().includes('andhra')));
        }

        if (activeFilters.mealType !== 'all') {
            result = result.filter(r => r.mealType && r.mealType.includes(activeFilters.mealType));
        }

        if (budgetFilter > 0) {
            result = result.filter(r => r.price <= budgetFilter);
        }

        setFilteredRestaurants(result);
    }, [searchTerm, restaurants, activeFilters, budgetFilter]);

    return (
        <MainLayout>
            <section className="explore-section container">
                <div className="explore-header">
                    <div className="explore-title-group">
                        <h1>Popular Local Discoveries</h1>
                    </div>
                    <div className="explore-actions">
                        <SearchBox
                            placeholder="Search by name or cuisine..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button id="budgetBtn" className="btn btn-outline" onClick={() => setIsBudgetOpen(true)}>
                            Budget Planner
                        </Button>
                        <Button id="filterBtn" className="btn btn-outline" onClick={() => setIsFilterOpen(true)}>
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="restaurant-grid" id="restaurantGrid">
                    {loading ? (
                        <p>Loading amazing spots...</p>
                    ) : filteredRestaurants.length === 0 ? (
                        <div className="no-results">
                            <p>No restaurants found trying adjusting your search.</p>
                        </div>
                    ) : (
                        filteredRestaurants.map(r => (
                            <RestaurantCard
                                key={r.id}
                                restaurant={r}
                                onClick={(item) => setSelectedRestaurant(item)}
                            />
                        ))
                    )}
                </div>

                <FilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onApply={setActiveFilters}
                    currentFilters={activeFilters}
                />

                <BudgetModal
                    isOpen={isBudgetOpen}
                    onClose={() => setIsBudgetOpen(false)}
                    onApply={setBudgetFilter}
                />

                {selectedRestaurant && (
                    <Modal isOpen={!!selectedRestaurant} onClose={() => setSelectedRestaurant(null)} className="">
                        <div className="detail-modal-content">
                            <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="modal-img" />
                            <div className="modal-info">
                                <div className="modal-header-row">
                                    <h2>{selectedRestaurant.name}</h2>
                                </div>
                                <div className="modal-meta">
                                    <span className="meta-item"><strong>Cuisine:</strong> {selectedRestaurant.cuisine}</span>
                                    <span className="meta-divider">•</span>
                                    <span className="meta-item"><strong>Location:</strong> {selectedRestaurant.location}</span>
                                    <span className="meta-divider">•</span>
                                    <span className="meta-item card-price">{selectedRestaurant.priceString}</span>
                                </div>
                                <div className="modal-description">
                                    <p className="desc-text">{selectedRestaurant.description}</p>
                                </div>
                                <div className="modal-actions">
                                    {selectedRestaurant.website && (
                                        <a href={selectedRestaurant.website} target="_blank" rel="noreferrer" className="btn btn-outline btn-website">
                                            <i className="fa-solid fa-globe"></i> Website
                                        </a>
                                    )}
                                    {selectedRestaurant.phoneNumber && (
                                        <a href={`tel:${selectedRestaurant.phoneNumber}`} className="btn btn-outline btn-call">
                                            <i className="fa-solid fa-phone"></i> Call
                                        </a>
                                    )}
                                    <button
                                        className="btn btn-primary btn-map"
                                        onClick={() => {
                                            setSelectedMapRestaurant(selectedRestaurant);
                                            setSelectedRestaurant(null);
                                        }}
                                    >
                                        <i className="fa-solid fa-map-location-dot"></i> Visit Spot
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}

                <MapModal
                    isOpen={!!selectedMapRestaurant}
                    onClose={() => setSelectedMapRestaurant(null)}
                    restaurant={selectedMapRestaurant}
                />
            </section>
        </MainLayout>
    );
};
