import React from 'react';
import Slider from 'react-slick';
import hostelimg from '../images/hostel_img_1.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function HostelImageSlider({ images }) {
    return (
        <div className='images-slider'>
            <Slider {...sliderSettings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Hostel view ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HostelImageSlider;
