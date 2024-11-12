import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Section 1: Left Column for Text and Button */}
                <div className="col-md-6 d-flex align-items-center">
                    <div className="content-wrapper px-5">
                        <div>
                            <h1 className="display-4 mb-4 fw-bold">Never forget an important date again</h1>
                            <h5 className="mb-4">Mark all important birthdays, anniversaries and holidays all in one place.</h5>
                            <div className="text-center">
                                {/* Conditional rendering based on user authentication status */}
                                {localStorage.getItem('authToken') ? (
                                    <Link to="/dashboard" className="btn btn-lg mt-5 rounded-pill px-5" style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <Link to="/register" className="btn btn-lg mt-5 rounded-pill px-5" style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                                        Get Started
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 1: Right Column for Image */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729347868/computer-icon_1_1_niq4si.png" className="img-fluid" alt="Web Talent" />
                </div>
            </div>

            {/* Section 2 */}
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729348179/burger_1_vv4v6j.png" className="img-fluid" alt="Web Talent" />
                </div>

                {/* Right Column for Text and Button */}
                <div className="col-md-6 d-flex align-items-center">
                    <div className="content-wrapper px-5">
                        <div>
                            <h1 className="display-4 mb-4 fw-bold">Your most important birthdays in one place</h1>
                            <h5 className="mb-4">Mark all of your important birthdays and never miss a reminder.</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="row justify-content-center mt-5">
                {/* Center Column for Image */}
                <div className="col-md-6 text-center">
                    <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729348455/Group_wgoe2u.png" className="img-fluid" alt="Web Talent" />
                    <h1 className="display-4 mb-4 fw-bold mt-4">Never forget mother’s day again</h1>
                </div>
            </div>

            {/* Section 4 */}
            <div className="row align-items-center">
                {/* Left Column for Text */}
                <div className="col-md-6">
                    <div className="content-wrapper px-5">
                        <h1 className="display-4 mb-4 fw-bold">Holidays coming up?</h1>
                        <h5 className="mb-4">Plan for your favourite holidays in advance to make sure your guests have the best experience possible.</h5>
                    </div>
                </div>

                {/* Right Column for Image */}
                <div className="col-md-6 d-flex justify-content-center">
                    <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729348664/attachment-pin-icon_1_hepy1a.png" className="img-fluid" alt="Web Talent" />
                </div>
            </div>

            {/* Section 5 - Get mobile app */}
            <div className="container-fluid p-0 text-center">
                <h1 className="display-5 fw-bold mb-5">Get the Dates mobile app for iPhone</h1>
                {/* Full-Width Image */}
                <div className="row">
                    <div className="col-12">
                        <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1731409764/smartmockups_m3e7gs81_mjludu.jpg" className="img-fluid w-100" alt="Full Width" />
                    </div>
                </div>

                {/* Text Below the Image */}
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="my-5">
                            {/* Button to link to App Store */}
                            <a href="https://apps.apple.com/app/idYOUR_APP_ID" target="_blank" rel="noopener noreferrer">
                                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&amp;releaseDate=1314144000&h=91ef6f52d049d3387a50498048775082" alt="Download on the App Store" style={{ width: '200px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                <Link to="/" className="footer">
                    <img 
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729341444/Screenshot_2024-10-19_at_1.36.53_PM-removebg-preview_lr1fpv.png"
                        alt="Logo" 
                        className="logo-image" 
                        style={{ width: '200px', marginLeft: '20px' }} 
                    />
                </Link>
                <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item px-2">
                        <Link 
                            to="/contact" 
                            className="nav-link px-2 text-dark" 
                        >
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item px-2">
                        <a 
                            href="https://www.termsfeed.com/live/1fd2ca25-0553-48c4-97d8-308e55709144" 
                            className="nav-link px-2 text-dark" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Terms
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a 
                            href="https://www.termsfeed.com/live/ba80401d-3f01-4082-96ce-a0196d9cd3ac" 
                            className="nav-link px-2 text-dark" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Privacy
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default Home;
