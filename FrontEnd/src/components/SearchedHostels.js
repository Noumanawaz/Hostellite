import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HostelCard from './HostelCard';
import SearchBar from './SearchBar';
import loader from '../images/Walk.gif';

function SearchedHostels() {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');

        if (query) {
            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/search`, { query })
                .then(response => {
                    setHostels(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [location.search]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <img src={loader} alt="Loading..." style={{ width: '50px' }} />
            </div>
        );
    }

    return (
        <div>
            <SearchBar />
            <div className="container py-5">
                <h1>Searched Hostels</h1>
                {hostels.length ? (
                    hostels.map((hostel) => (
                        <HostelCard key={hostel._id} name={hostel.name} address={hostel.location} image={hostel.images[0]} />
                    ))
                ) : (
                    <p>No hostels found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchedHostels;
