// Accordian.js

import React, { Component } from 'react';

export class Accordian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSmallScreen: window.innerWidth <= 768,
        };
    }

    updateScreenSize = () => {
        this.setState({ isSmallScreen: window.innerWidth <= 768 });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateScreenSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateScreenSize);
    }

    render() {
        const { id, question, answer, isOpen, onClick } = this.props;
        const { isSmallScreen } = this.state;

        return (
            <div
                className="accordion accordion-flush"
                style={{
                    flex: isSmallScreen ? "1 1 100%" : "1 1 45%",
                    marginBottom: "20px",
                    minHeight: "12vh",
                    maxWidth: isSmallScreen ? "100%" : "100%",
                    margin: isSmallScreen ? "0 auto" : "auto",
                }}
                id={`accordionFlushExample${id}`}
            >
                <div
                    className="accordion-item"
                    style={{
                        marginBottom: "10px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #e7e7e7",
                        width: "100%",
                        minHeight: isSmallScreen ? "auto" : "12vh",
                    }}
                >
                    <h2 className="accordion-header" style={{ height: 'auto' }}>
                        <button
                            className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${id}`}
                            aria-expanded={isOpen}
                            aria-controls={`flush-collapse${id}`}
                            style={{
                                fontWeight: "300",
                                color: '#3C6786',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => onClick(id)}
                        >
                            {question}
                        </button>
                    </h2>
                    <div
                        id={`flush-collapse${id}`}
                        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                        data-bs-parent={`#accordionFlushExample${id}`}
                        style={{
                            height: isOpen ? 'auto' : '0',
                            transition: 'height 0.35s ease',
                        }}
                    >
                        <div className="accordion-body" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {answer}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accordian;
