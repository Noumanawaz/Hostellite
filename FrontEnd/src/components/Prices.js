import React from 'react';

const Prices = ({ title }) => {
    return (
        <div
            className="card price-card mt-4"
            style={{
                border: "none", // Remove border to allow the shadow and gradient to stand out
                borderRadius: "15px",
                boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)", // Add a deeper shadow for better depth
                maxWidth: "100%",
                margin: "20px auto",
                height: "auto",
                background: "linear-gradient(135deg, #3C6786 0%, #4A7B9A 100%)", // Subtle gradient for more visual interest
                transition: "transform 0.4s ease, box-shadow 0.4s ease", // Smoother transition
                transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 25px 45px rgba(0, 0, 0, 0.3)"; // Intensify shadow on hover
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 25px rgba(0, 0, 0, 0.3)"; // Reset shadow after hover
            }}
        >
            <div
                className="card-body d-flex flex-column align-items-center"
                style={{
                    gap: "15px",
                }}
            >
                <h3
                    className="card-title text-center"
                    style={{
                        fontSize: "1.5rem",
                        color: "white",
                        marginBottom: "10px",
                        letterSpacing: "1px", // Add some letter spacing for elegance
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" // Subtle text shadow for depth
                    }}
                >
                    {title}
                </h3>
                <p
                    className="card-text text-center"
                    style={{
                        fontSize: "1rem",
                        color: "white",
                        opacity: "0.9", // Slightly reduce opacity for a softer look

                    }}
                >
                    With supporting text below as a natural lead-in to additional content.
                </p>
                <a
                    href="/"
                    className="btn btn-primary btn-lg"
                    style={{
                        backgroundColor: "#fff",
                        padding: "5px 20px",
                        fontSize: "1rem",
                        color: "#3C6786",
                        borderRadius: "5px",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease, color 0.3s ease",
                        borderColor: '#f0f0f0',
                        fontWeight: '600',
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f0f0";
                        e.currentTarget.style.color = "#4A7B9A"; // Change text color on hover for consistency
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.color = "#3C6786"; // Reset text color
                    }}
                >
                    30000/Rs
                </a>
            </div>
        </div>
    );
};

export default Prices;
