import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchstyle.css';

export default function SearchBar({ transparent }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm) return;
        navigate(`/searchedhostels?query=${searchTerm}`);
    };

    // Effect to handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 576);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="container-fluid p-0">
            <div
                className={`row d-flex align-items-center justify-content-center search-bar-container mx-0 ${transparent ? 'transparent' : ''}`}
            >
                <div className="col-lg-12 col-10 d-flex align-items-center position-relative moveForm">
                    <form onSubmit={handleSearch} className="w-100">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text " style={{ color: "#3c6786" }}>
                                    <FontAwesomeIcon icon={faLocationDot} className="map-icon fa-2x" />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Search for hostels"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    borderRadius: isSmallScreen ? '0 32px 32px 0' : '0',
                                }}
                            />
                            <button className="btn btn-primary search-button" type="submit" style={{ justifyContent: "center" }}>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
