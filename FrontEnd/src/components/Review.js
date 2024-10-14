import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Review({ user, text }) {
    // Inline styles
    const reviewCardStyle = {
        padding: '10px',
        backgroundColor: '#3C6786',
        border: '1px solid #ddd',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '150px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
        width: '100%',
        height: 'auto',
        flexGrow: 1,
    };

    const profileIconStyle = {
        backgroundColor: '#3C6786',
        padding: '10px',
        color: 'white',
        marginRight: '1.5rem',

    };

    const cardBodyStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    };

    const cardTitleStyle = {
        color: 'white',
        fontWeight: 700,
        marginBottom: '5px',
    };

    const cardTextStyle = {
        color: 'white',
    };

    return (
        <div className="col-md-4 mb-3 d-flex align-items-center">
            <div className="card reviewcard" style={reviewCardStyle}>
                <div className="card-body d-flex align-items-center" style={cardBodyStyle}>
                    <div className="profile-icon" style={profileIconStyle}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="card-title mb-1" style={cardTitleStyle}>{user}</h5>
                        <p className="card-text" style={cardTextStyle}>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
