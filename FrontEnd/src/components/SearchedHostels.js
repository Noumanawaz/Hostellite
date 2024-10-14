import React, { useEffect, useState } from 'react';
import HostelCard from './HostelCard'; // Assuming you have a component to display each hostel
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import loader from '../images/Walk.gif'; // Assuming you have a loading gif
import SearchBar from './SearchBar';
export default function SearchedHostels() {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query'); // Extract query parameter

        if (query) {
            axios.post('http://localhost:4000/search', { query })
                .then(response => {
                    setHostels(response.data); // Set the hostels with search results
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false); // No query provided
        }
    }, [location.search]);

    if (loading) {
        return (
            <div>
                <img src={loader} alt="Loading..." style={{ width: '50px', height: '50px' }} />
            </div>
        );
    }

    return (
        <div>
            <SearchBar />
            <div className="container py-5">
                <h1>Searched Hostels</h1>
                {hostels.length > 0 ? (
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
