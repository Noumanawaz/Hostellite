import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HostelCard from "./HostelCard";
import FilterCard from "./FilterCard";
import SearchBar from "./SearchBar";

export default function FilteredHostelList() {
    const location = useLocation();
    const { category = '', rating = '', facilities = [] } = location.state || {};
    const [filteredHostels, setFilteredHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilteredHostels = () => {
            setLoading(true);
            const queryParams = new URLSearchParams({
                category,
                rating,
                facilities: Array.isArray(facilities) ? facilities.join(',') : '',
            }).toString();

            console.log(`Fetching from: /hostels?${queryParams}`);

            // Using relative URL
            axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/hostels?${queryParams}`)
                .then(response => {
                    console.log('API Response:', response.data);
                    setFilteredHostels(response.data || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching filtered hostels:', error);
                    setLoading(false);
                });
        };

        if (category || rating || facilities.length > 0) {
            fetchFilteredHostels();
        } else {
            setLoading(false);
        }
    }, [category, rating, facilities]);

    if (loading) {
        return <div>Loading filtered hostels...</div>;
    }

    const hostelCount = filteredHostels.length;

    return (
        <div className="filtered-hostel-list" style={{ margin: '0', padding: '0' }}>
            <SearchBar />
            <div className="Location text-start py-4">
                <h4 className="hostelnumber" style={{ marginLeft: '1.2vw', }}> Hostels found: {hostelCount}</h4>
            </div>
            {hostelCount > 0 ? (
                filteredHostels.map((hostel) => (
                    <div className='container' key={hostel._id}>
                        <HostelCard
                            key={hostel._id}
                            name={hostel.name}
                            address={hostel.location}
                            image={hostel.images[0]}
                        />
                        <FilterCard />
                    </div>
                ))
            ) : (
                <p>No hostels match the selected filters.</p>
            )}
        </div>
    );
}
