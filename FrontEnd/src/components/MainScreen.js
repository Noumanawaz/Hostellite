import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Mainpic from "../images/religious-travel-destination-shiny-religions-evening.jpg";
import './style2.css';

const MainScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm) return;
        navigate(`/searchedhostels?query=${searchTerm}`);
    };

    return (
        <div className='container'>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <div className="card main-card">
                    <img src={Mainpic} className="card-img-top" alt="Main" />
                    <div className="card-img-overlay d-flex flex-column justify-content-end">
                        <form className="search-form" onSubmit={handleSearch}>
                            <div className="input-group" style={{ borderRadius: '10' }}>
                                <span className="input-group-text search-icon">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control SpecialNeed"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for hostels in an area"
                                />

                                <button
                                    type="submit"
                                    className="btn search-button d-none d-md-block"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
