import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWifi,
    faUtensils,
    faJugDetergent,
    faSquareParking,
    faShieldHalved,
    faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./Hostelcardstyle.css";

export default function App({ name, address, facilities = {}, image }) {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        cursor: 'pointer',
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #ddd',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        height: '100%',
        boxShadow: '0 8px 20px rgba(64, 101, 106, 0.5)',
        textDecoration: 'none',
        color: 'inherit',
    };

    const imgStyle = {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: '0.25rem 0 0 0.25rem',
    };

    const cardBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
    };

    const buttonstyle = {
        backgroundColor: 'white',
        color: '#3C6786',
        border: 'none',
        borderRadius: '8px',
        padding: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const facilityStyle = { fontSize: "1.5rem" };

    // Ensure facilities have default values when not provided
    const {
        wifi = false,
        food = false,
        laundry = false,
        parking = false,
        security = false,
        ac = false,
    } = facilities;

    // Handle empty images gracefully
    const displayImage = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg'; // Add a default image path if needed

    return (
        <Link to={`/hostel/${name}`} style={{ textDecoration: 'none' }}>
            <div style={containerStyle}>
                <div style={cardStyle} className="hostel-card card my-4 col-lg-8 col-md-8 text-start w-80">
                    <div className="row g-0 w-100">
                        <div className="col-md-5 col-lg-5" style={{ display: 'flex' }}>
                            <img
                                style={imgStyle}
                                src={displayImage}
                                alt="Hostel"
                            />
                        </div>

                        <div className="col-md-6 col-lg-6" style={{ display: 'flex' }}>
                            <div style={cardBodyStyle}>
                                <div>
                                    <h3 className="card-title" style={{ fontWeight: '600' }}>{name}</h3>
                                    <h5 className="card-text" style={{ fontWeight: '200' }}>{address}</h5>
                                    <hr />
                                    <h5 className="Facilities-text text-start" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>Facilities</h5>
                                    <div className="Facilities d-flex align-items-center mt-3 mb-4">
                                        {wifi && (
                                            <FontAwesomeIcon
                                                icon={faWifi}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: wifi ? "white" : "red" }}
                                            />
                                        )}
                                        {food && (
                                            <FontAwesomeIcon
                                                icon={faUtensils}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: food ? "white" : "red" }}
                                            />
                                        )}
                                        {laundry && (
                                            <FontAwesomeIcon
                                                icon={faJugDetergent}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: laundry ? "white" : "red" }}
                                            />
                                        )}
                                        {parking && (
                                            <FontAwesomeIcon
                                                icon={faSquareParking}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: parking ? "white" : "red" }}
                                            />
                                        )}
                                        {security && (
                                            <FontAwesomeIcon
                                                icon={faShieldHalved}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: security ? "white" : "red" }}
                                            />
                                        )}
                                        {ac && (
                                            <FontAwesomeIcon
                                                icon={faSnowflake}
                                                className="me-3"
                                                style={{ ...facilityStyle, color: ac ? "white" : "red" }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={buttonstyle}>View Hostel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
