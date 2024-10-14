import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function HostelHeader({ name, location, rating }) {
    return (
        <div className="row align-items-center">
            <div className="col-12 col-md-10 mb-2">
                <h1 className='hostelname'>{name}</h1>
            </div>
            <div className='col-12 col-md-2 d-flex justify-content-md-end justify-content-start'>
                <div className='rating d-flex align-items-center'>
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <h3 className='hostelrating mb-0 ms-2'><strong>{rating}</strong></h3>
                </div>
            </div>
            <p className='hosteladdress mx-1'><strong>{location}</strong></p>
        </div>
    );
}

export default HostelHeader;
