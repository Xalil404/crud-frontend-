// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the token from local storage
        localStorage.removeItem('authToken');

        // Redirect to the home page
        navigate('/'); // Change this to your home route
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
            {/* Optionally, you can show a loading spinner or message */}
        </div>
    );
};

export default Logout;
