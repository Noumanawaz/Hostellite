import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Mainpic from '../images/hostel_img_1.jpg';

export class Hostel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSmallScreen: window.innerWidth <= 768 // Check if screen width is small (<=768px)
        };
    }

    // Helper function to truncate text to a maximum length
    truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    // Add an event listener to track window resizing
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isSmallScreen: window.innerWidth <= 768 });
    };

    render() {
        const { name, location } = this.props.hostel;
        const cardLink = `/hostel/${name}`;
        const { isSmallScreen } = this.state;

        const cardContent = (
            <div
                className="card mx-auto mb-3"
                style={{
                    width: '20rem',
                    height: '100%',
                    borderRadius: '32px',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                }}
            >
                <img
                    src={Mainpic}
                    alt={name}
                    className="card-img-top hostel-image"
                    style={{
                        width: '100%',
                        height: '12rem',
                        objectFit: 'cover'
                    }}
                />
                <div
                    className="card-body d-flex flex-column justify-content-between align-items-center"
                    style={{
                        padding: '1rem',
                        textAlign: 'center'
                    }}
                >
                    <div>
                        <h5
                            className="card-title text-start"
                            style={{
                                marginBottom: '0.5rem',
                                fontSize: '1.25rem',
                                color: '#3C6786'
                            }}
                        >
                            {this.truncateText(name, 18)}
                        </h5>
                        <p
                            className="text-start"
                            style={{
                                marginBottom: '1rem',
                                color: '#3C6786'
                            }}
                        >
                            <strong>Address:</strong> {this.truncateText(location, 40)}
                        </p>
                    </div>
                    {!isSmallScreen && (
                        <Link
                            to={cardLink}
                            className="btn btn-primary btn-hide-on-small"
                            style={{
                                backgroundColor: '#3C6786',
                                border: 'none',
                                borderRadius: '32px',
                                padding: '0.5rem 1rem',
                                color: '#fff',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                transition: 'background-color 0.3s ease, transform 0.3s ease',
                                display: 'inline-block',
                                marginTop: 'auto'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#345a6f';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#3C6786';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            View Hostel
                        </Link>
                    )}
                </div>
            </div>
        );

        // If on a small screen, wrap the entire card in a Link to make the whole card clickable
        return isSmallScreen ? (
            <Link to={cardLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                {cardContent}
            </Link>
        ) : (
            cardContent
        );
    }
}

export default Hostel;
