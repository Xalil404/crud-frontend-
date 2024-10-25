// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Birthdays from './components/Birthdays';
import Logout from './components/Logout'; // Import the Logout component
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/birthdays" 
                    element={
                        <PrivateRoute>
                            <Birthdays />
                        </PrivateRoute>
                    } 
                />
                <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
            </Routes>
        </Router>
    );
};

export default App;
