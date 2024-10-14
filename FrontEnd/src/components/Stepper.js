import React from 'react';

const StepsSection = () => {
  const steps = [
    {
      number: 1,
      description: 'Search for a hostel by area or name to find the perfect place to stay.',
    },
    {
      number: 2,
      description: 'Explore the hostel’s details, amenities, and reviews to make an informed decision.',
    },
    {
      number: 3,
      description: 'Contact the hostel and secure your room with a booking.',
    },
    {
      number: 4,
      description: 'Enjoy your stay at the hostel and experience the best service.',
    },
  ];

  const stepContainerStyle = {
    position: 'relative',
    marginBottom: '20px',
    paddingRight: '10px',
    overflow: 'hidden',
    textAlign: 'center',
    width: "100%",
  };

  const stepNumberStyle = {
    width: '54px',
    height: '54px',
    backgroundColor: '#3C6786',
    fontSize: '1.2rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const stepDescriptionStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#3C6786',
    padding: '0 1rem',
  };

  return (
    <section style={{ paddingTop: '3rem', backgroundColor: 'white' }}>
      <h1 className="col-12 text-start container" style={{ margin: "0px", marginBottom: '3rem' }}>
        Finding a Hostel Made Easy
      </h1>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 15px' }}>
        <div className="row" style={{ display: 'flex', justifyContent: 'space-around', margin: '0' }}>
          {steps.map((step, index) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              style={{ marginBottom: index < steps.length - 1 ? '20px' : '0', padding: '0' }}
              key={index}
            >
              <div style={stepContainerStyle}>
                <div style={{ display: 'inline-flex', padding: '0 1rem', backgroundColor: 'white', borderRadius: '50px' }}>
                  <div style={stepNumberStyle}>
                    <span>{step.number}</span>
                  </div>
                </div>
                <p style={stepDescriptionStyle}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default StepsSection;
