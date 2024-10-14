import React, { useEffect, useState } from "react";
import HostelCard from "./HostelCard";
import SearchBar from "./SearchBar";
import FilterCard from "./FilterCard";
import axios from 'axios';
import loader from "../images/Walk.gif";
// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function HostelList() {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        fetchHostelData(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    const fetchHostelData = (page, category) => {
        setLoading(true);
        let url = `http://localhost:4000/hostel-data?page=${page}&limit=${itemsPerPage}`;
        if (category) {
            url = `http://localhost:4000/hostels?category=${category}&page=${page}&limit=${itemsPerPage}`;
        }

        axios.get(url)
            .then(response => {
                const { hostels, totalPages } = response.data;
                setHostels(hostels);
                setTotalPages(totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hostel data:', error);
                setLoading(false);
            });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <div>
                <img src={loader} alt="Loading..." style={{ width: '50px', height: '50px' }} />
            </div>
        );
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const pageButton = {
        border: '2px solid #3C6786',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: '#3C6786',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const pageButtonActive = {
        backgroundColor: '#3C6786',
        color: 'white',
    };

    return (
        <div style={{ margin: '0', padding: '0' }}>
            <SearchBar />
            <div className="container py-4" style={{ marginTop: '0' }}>
                <div className="Location text-start">
                    <h2 className="hostelnumber">{hostels.length} Hostels found</h2>
                </div>
                {hostels.map((hostel) => (
                    <HostelCard key={hostel._id} name={hostel.name} address={hostel.location} facilities={hostel.facilities ? hostel.facilities : "none"} image={hostel.images[0]} />
                ))}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                }}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        style={{
                            border: '2px solid #3C6786',
                            borderRadius: '50%',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            backgroundColor: 'transparent',
                            color: '#3C6786',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? '0.5' : '1',
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div style={{ display: 'flex', gap: '14px' }}>
                        {pageNumbers.map((page) => (
                            <button
                                className="PageButton"
                                key={page}
                                onClick={() => handlePageClick(page)}
                                style={{
                                    ...pageButton,
                                    ...(page === currentPage ? pageButtonActive : {}),
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{
                            border: '2px solid #3C6786',
                            borderRadius: '50%',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            backgroundColor: 'transparent',
                            color: '#3C6786',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages ? '0.5' : '1',
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <FilterCard onCategoryChange={handleCategoryChange} />

            {/* Adding media query for button styling */}
            <style>{`
    @media (max-width: 600px) {
        .PageButton {
            width: 20px;
            height: 20px;
        }
    }
`}</style>

        </div>
    );
}
