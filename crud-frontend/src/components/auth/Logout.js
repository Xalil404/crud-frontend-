import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('authToken');

        // Redirect to the home page
        navigate('/'); // Change this to your home route
    };

    const handleCancel = () => {
        // Redirect back to the previous page or home page
        navigate('/birthdays'); // You can change this to navigate to a different page if needed
    };

    return (
        <div>
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout} style={{ marginRight: '10px' }}>Confirm Logout</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Logout;
