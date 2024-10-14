import React, { Component } from 'react';
import Slider from 'react-slick';
import { Hostel } from './components/hostel.js';
import axios from 'axios';
import Prices from './components/Prices.js';
import MainScreen from "./components/MainScreen.js";
import Accordian from "./components/Accordian.js";
import Footer from "./components/footer.js";
import WalkingGif from './images/Walk.gif'; // Import the walking GIF
import dataset from './Dataset.json';
import Stepper from './components/Stepper.js';

const containerStyle = {
    backgroundColor: "#3C6786",
    padding: "20px",
    borderRadius: "20px",
    maxWidth: "75%", // Limit the width of the container
    margin: "0 auto", // Center the container
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px', // Adjust the gap between items as needed
};

const faqs = [
    {
        id: 1,
        question: "Q1: What amenities are typically available in the hostels?",
        answer: "Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the first item's accordion body."
    },
    {
        id: 2,
        question: "Q2: How do I book a room in the hostel?",
        answer: "Details about booking rooms and the process involved."
    },
    {
        id: 3,
        question: "Q3: What is the check-in and check-out time?",
        answer: "Information about the hostel's check-in and check-out times."
    },
    {
        id: 4,
        question: "Q4: What is the check-in and check-out time?",
        answer: "Information about the hostel's check-in and check-out times."
    }
];

export class Home extends Component {
    state = {
        hostels: dataset, // Initialize state with an empty array
        loading: true, // New state to track loading status
        openId: null, // State to track the open accordion item
        currentStep: 0 // Add currentStep state
    };

    componentDidMount() {
        // Fetch the hostel data from the Express backend
        axios.get('http://localhost:4000/hostel-limit')
            .then(response => {
                this.setState({ hostels: response.data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false }); // Set loading to false even if there's an error
            });
    }

    handleClick = (id) => {
        this.setState(prevState => ({
            openId: prevState.openId === id ? null : id
        }));
    };

    render() {
        const { hostels, loading, openId } = this.state;

        const settings = {
            dots: true,  // Enable dots
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            color: "#3C6786",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerPadding: '20px'
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerPadding: '20px'
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        if (loading) {
            // Show a walking GIF as a loading indicator while data is being fetched
            return (
                <div style={{ textAlign: 'center' }}>
                    <img src={WalkingGif} alt="Loading..." style={{ width: '50px' }} />
                </div>
            );
        }

        return (
            <div>
                <MainScreen />
                <div className="container mb-3">
                    <div className="row d-flex justify-content-center">
                        <h1 className='mt-3' style={{ color: '#3C6786' }}>Popular Hostels in ISLAMABAD</h1>
                    </div>
                    <div className="row mt-3">
                        <Slider {...settings}>
                            {hostels.map((hostel, index) => (
                                <div key={hostel._id} style={{ padding: '0 10px' }}>
                                    <Hostel key={hostel._id} hostel={hostel} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='container' style={{ marginTop: "20px" }}>
                    <div className="row text-start mt-4">
                        <h1 className='' style={{ color: '#3C6786' }}>Average Hostel Prices</h1>
                        <div className="col-12 col-md-4">
                            <Prices title="Single Bed Room" />
                        </div>
                        <div className="col-12 col-md-4">
                            <Prices title="Double Bed Room" />
                        </div>
                        <div className="col-12 col-md-4">
                            <Prices title="Shared Bed Room" />
                        </div>
                    </div>
                </div>

                <Stepper />

                <div className='h2 text-center m-4' style={{ color: "#3C6786", fontWeight: "700" }}>
                    FAQ's
                </div>
                <div style={containerStyle}>
                    {faqs.map(item => (
                        <Accordian
                            key={item.id}
                            id={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openId === item.id}
                            onClick={() => this.handleClick(item.id)}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
