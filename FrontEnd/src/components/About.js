// components/About.js
import React from 'react';
import Footer from "./footer";
import './About.css'; // Import the custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faFileAlt
} from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome solid icons
import {
    faLinkedinIn,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'; // Import Font Awesome brand icons

function About() {
    return (
        <div className="about-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8">
                        <h1>About Me</h1>
                        <p className="lead">
                            We are currently students pursuing a Bachelor's degree with a keen interest in web development and chatbots. Here's a bit more about us:
                        </p>

                        <ul className="list-group">
                            <li className="list-group-item">🎓 Studying for a Bachelor's degree</li>
                            <li className="list-group-item">💻 Passionate about web development</li>
                            <li className="list-group-item">🤖 Experience in developing chatbots</li>
                            <li className="list-group-item">🌐 Completed internships at reputable companies</li>
                        </ul>

                        <p className="mt-4">
                            Feel free to contact us on social media or drop us an email if you'd like to know more!
                        </p>

                        <div className="button-container">
                            <a href="https://www.linkedin.com/in/nouman-nawaz-14120022b/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedinIn} className="icon" /> LinkedIn
                            </a>
                            <a href="https://instagram.com/nomi_2k4/" className="btn btn-info" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="icon" /> Instagram
                            </a>
                            <a href="mailto:noumannawaz2004@gmail.com" className="btn btn-success">
                                <FontAwesomeIcon icon={faEnvelope} className="icon" /> Email
                            </a>
                            <a href="../resources/Nouman Nawaz_1699685434608.pdf" className="btn btn-warning" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFileAlt} className="icon" /> View Resume
                            </a>
                            <a href="../resources/Nouman_Nawaz_240109_202824.pdf" className="btn btn-danger" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFileAlt} className="icon" /> View Internship Certificate
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer isFixed={false} />
        </div>
    );
}

export default About;
