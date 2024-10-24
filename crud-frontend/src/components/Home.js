import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Birthday App</h1>
            <p>Manage your birthdays efficiently.</p>
            <div>
                <Link to="/login" style={{ marginRight: '10px' }}>Log In</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Home;
