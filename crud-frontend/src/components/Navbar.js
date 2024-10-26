// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for route checking

const Navbar = () => {
    const location = useLocation(); // Get the current location

    // Check if the current route is the home page
    if (location.pathname !== '/') {
        return null; // Don't render Navbar if not on the home page
    }

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>My App</h1>
            <div style={styles.buttonContainer}>
                <Link to="/login" style={styles.button}>Login</Link>
                <Link to="/register" style={styles.button}>Register</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    title: {
        margin: 0,
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px', // Space between buttons
    },
    button: {
        color: '#fff',
        textDecoration: 'none',
        padding: '8px 12px',
        backgroundColor: '#555',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
};

export default Navbar;
