import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HostelHeader from './HostelHeader';
import Slider from "react-slick";
import Footer from "./footer";
import SearchBar from './SearchBar';
import Review from './Review';
import Facilities from './Facilities';
import "./HostelDetailPage.css";
import loader from '../images/Walk.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
};

function HostelDetail() {
    const { name } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);

    // Custom hardcoded reviews
    const customReviews = [
        { id: 1, user: "User 1", text: "It was a great hostel, very nice experience living there." },
        { id: 2, user: "User 2", text: "Friendly staff and comfortable rooms." },
        { id: 3, user: "User 3", text: "Great location and value for money." },
        { id: 4, user: "User 4", text: "I had a wonderful stay with excellent amenities." },
        { id: 5, user: "User 5", text: "Very clean and well-maintained hostel." }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/hostel/${name}`);
                setHostel(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [name]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <img src={loader} alt="Loading..." style={{ width: '50px' }} />
            </div>
        );
    }

    if (!hostel) {
        return <div>Hostel not found</div>;
    }

    const facilities = {
        wifi: true,
        food: false,
        laundry: true,
        security: true,
        parking: false,
        ac: true
    };

    return (
        <div>
            <SearchBar />
            <div className="container mt-4 text-start">
                <HostelHeader key={hostel._id} name={hostel.name} location={hostel.location} rating={hostel.rating ? `${hostel.rating}/10` : 'N/A'} />
                <div className='images-slider'>
                    <Slider {...sliderSettings}>
                        {hostel.images.map((image, index) => (
                            <div key={index}>
                                <img src={`data:image/jpeg;base64,${image}`} alt={`Hostel view ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <h1 className='Facilitesheading d-flex py-4'> Facilities </h1>
                <Facilities facilities={hostel.facilities || facilities} />

                <div className="row">
                    {/* About Us Card */}
                    <div className="col-md-6 mb-4 py-4">
                        <div className="card about-card d-flex flex-column">
                            <div className="card-body flex-grow-1">
                                <h4 className="card-title text-start">About Hostel</h4>
                                <p className="card-text py-3">
                                    {hostel.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Us Card */}
                    <div className="col-md-6 mb-4 py-4">
                        <div className="card contact-card d-flex flex-column">
                            <div className="card-body flex-grow-1">
                                <h4 className="card-title">Contact Details</h4>
                                <p className="card-text py-3">
                                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                                    +123 456 7890
                                </p>
                                <p className="card-text">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3" />
                                    <a href={`https://maps.google.com/?q=${encodeURIComponent(hostel.location)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'White' }}>
                                        {hostel.location}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='Reviewheading d-flex py-2 mb-4'> Reviews </h1>
                <div className="row">
                    {customReviews.length > 0 ? (
                        customReviews.map(review => (
                            <Review key={review.id} user={review.user} text={review.text} />
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HostelDetail;
