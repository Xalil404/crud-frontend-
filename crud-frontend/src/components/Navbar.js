import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const location = useLocation();
    const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Replace with your auth logic

    // Check if the current path is the home page
    const isHomePage = location.pathname === '/';

    // Render nothing if not on the home page
    if (!isHomePage) return null;

    return (
        <div className="navcolor">
            <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top">
                <div className="container-fluid">
                    {/* Logo (Top Left) */}
                    <Link className="navbar-brand ms-5 order-2 order-lg-1" to="/">
                        <img 
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729341444/Screenshot_2024-10-19_at_1.36.53_PM-removebg-preview_lr1fpv.png" 
                            alt="Logo" 
                            className="logo-image" 
                            style={{ width: '200px' }} 
                        />
                    </Link>

                    {/* Navbar Links (Top Left) */}
                    <div className="collapse navbar-collapse order-3 order-lg-2" id="navbarText">
                        <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active" to="/logout">Logout</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Sign In and Sign Up Buttons (Top Right) */}
                    <div className="d-flex order-2 order-lg-3">
                        {!isAuthenticated && (
                            <>
                                <Link className="nav-link d-none d-lg-block text-dark" to="/login">Sign in</Link>
                                <Link className="nav-link btn btn-sm rounded-pill px-4 me-2" style={{ backgroundColor: '#E8BF73', color: 'black' }} to="/register">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
