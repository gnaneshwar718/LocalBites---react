import React from 'react';
import { Modal } from '../molecules/Modal';
import { PlacesApi } from '../../services/placesApi';
import '../../styles/explore/map.css';

export const MapModal = ({ isOpen, onClose, restaurant }) => {
    if (!restaurant) return null;
    const apiKey = PlacesApi.apiKey;
    const mapUrl = restaurant.coordinates
        ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`
        : `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(restaurant.name + ' ' + restaurant.location)}`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="map-modal-content">
            <div className="modal-body map-body">
                <div id="map">
                    <div id="mapError" className="error-message hidden">
                        Map configuration missing.
                    </div>
                    <iframe
                        id="mapFrame"
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        title={`Map of ${restaurant.name}`}
                    />
                </div>
                <div className="map-info">
                    <div>
                        <span className="text-light">Distance:</span>
                        <span className="distance-text" id="routeDistance">-</span>
                    </div>
                    <div>
                        <span className="text-light">ETA:</span>
                        <span className="distance-text" id="routeDuration">-</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
