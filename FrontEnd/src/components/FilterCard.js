import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCoffee, faSnowflake, faTint, faParking, faShieldAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./FilterCard.css";

export default function FilterCard() {
    const navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isBottomReached, setIsBottomReached] = useState(false); // New state for bottom detection
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [facilities, setFacilities] = useState({
        wifi: false,
        breakfast: false,
        ac: false,
        laundry: false,
        parking: false,
        security: false,
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);

            // Check if the user has reached the bottom of the page
            const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            setIsBottomReached(reachedBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFacilityChange = (event) => {
        const { id, checked } = event.target;
        setFacilities((prevFacilities) => ({
            ...prevFacilities,
            [id]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const activeFacilities = Object.keys(facilities).filter((key) => facilities[key]);
        navigate('/filtered-hostels', { state: { category, rating, facilities: activeFacilities } });
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Filter toggle button, only visible on small screens and not when at bottom */}
            {!isBottomReached && (
                <button className="filter-toggle-button d-md-none" onClick={toggleFilterVisibility}>
                    <FontAwesomeIcon icon={faFilter} /> Filters
                </button>
            )}

            {/* Filter card */}
            <div className={`filter-card ${isSticky ? 'sticky' : ''} ${isFilterVisible ? 'visible' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="filter-option text-start">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            className="filter-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="boys">Boys</option>
                            <option value="girls">Girls</option>
                        </select>
                    </div>
                    <div className="filter-option text-start">
                        <label htmlFor="rating">Rating:</label>
                        <select
                            id="rating"
                            name="rating"
                            className="filter-select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Select Rating</option>
                            <option value="high-to-low">High to Low</option>
                            <option value="low-to-high">Low to High</option>
                        </select>
                    </div>

                    <div className="filter-option facilities-filter text-start">
                        <label>Facilities:</label>
                        <div className="facilities-icons">
                            {Object.keys(facilities).map((facility) => (
                                <div key={facility} className="facility-item">
                                    <input
                                        type="checkbox"
                                        id={facility}
                                        checked={facilities[facility]}
                                        onChange={handleFacilityChange}
                                    />
                                    <label htmlFor={facility}>
                                        <FontAwesomeIcon
                                            icon={
                                                facility === 'wifi'
                                                    ? faWifi
                                                    : facility === 'breakfast'
                                                        ? faCoffee
                                                        : facility === 'ac'
                                                            ? faSnowflake
                                                            : facility === 'laundry'
                                                                ? faTint
                                                                : facility === 'parking'
                                                                    ? faParking
                                                                    : faShieldAlt
                                            }
                                            className="facility-icon"
                                        />
                                    </label>
                                    <span>{facility.charAt(0).toUpperCase() + facility.slice(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="apply-button">Apply Filters</button>
                </form>
            </div>
        </div>
    );
}
