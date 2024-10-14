import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faUtensils, faJugDetergent, faShieldHalved, faSquareParking, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Facilities({ facilities }) {
    const facilityStyles = {
        available: { color: "green" },
        notAvailable: { color: "red" },
    };

    return (
        <div className="Facilities d-flex flex-wrap justify-content-between mb-2">
            {/* Facility Cards */}
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faWifi} 
                    className="facility-icon" 
                    style={facilities.wifi ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>Wifi</strong></p>
            </div>
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faUtensils} 
                    className="facility-icon" 
                    style={facilities.food ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>Food</strong></p>
            </div>
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faJugDetergent} 
                    className="facility-icon" 
                    style={facilities.laundry ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>Laundry</strong></p>
            </div>
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faShieldHalved} 
                    className="facility-icon" 
                    style={facilities.security ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>Security</strong></p>
            </div>
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faSquareParking} 
                    className="facility-icon" 
                    style={facilities.parking ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>Parking</strong></p>
            </div>
            <div className='Facility d-flex align-items-center flex-column mb-4'>
                <FontAwesomeIcon 
                    icon={faSnowflake} 
                    className="facility-icon" 
                    style={facilities.ac ? facilityStyles.available : facilityStyles.notAvailable} 
                />
                <p className="mb-0 mt-3"><strong>AC</strong></p>
            </div>
        </div>
    );
}

export default Facilities;
