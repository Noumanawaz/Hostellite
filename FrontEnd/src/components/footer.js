import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        const { isFixed } = this.props;
        return (
            <div className='container-fluid mt-5' style={{
                backgroundColor: "#3C6786",
                color: "#ffffff",
                padding: "20px 0",
                position: isFixed ? "fixed" : "relative",
                bottom: isFixed ? 0 : "auto",
                left: 0,
                width: "100%",
                zIndex: 1000,
                boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
            }}>
                <div className='row text-center text-md-start m-3'>
                    <div className='col-12 col-lg-3 col-md-6' style={{ marginBottom: "10px" }}>
                        <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>HOSTELITE</h3>
                        <p style={{ marginBottom: 0, fontSize: "large" }}>Helping students find the perfect hostel in Islamabad.</p>
                    </div>
                    <div className='col-lg-3'>

                    </div>
                    <div className='col-12 col-md-6 text-md-end'>
                        <a href="/" style={{ color: "#ffffff", marginRight: "20px", textDecoration: "none", fontWeight: "bold" }}>Home</a>
                        <a href="./about" style={{ color: "#ffffff", marginRight: "20px", textDecoration: "none", fontWeight: "bold" }}>About Us</a>
                        <a href="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold" }}>Contact Us</a>
                    </div>
                </div>
                <div className='text-center' style={{ marginTop: "10px", fontSize: "1rem" }}>
                    © 2024 A Project By Nouman Nawaaz and Muhammad Qasim Hassan
                </div>

            </div>

        );
    }
}

export default Footer;
