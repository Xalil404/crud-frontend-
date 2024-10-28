// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import Birthdays from './components/Birthdays';
import Dashboard from './components/Dashboard';
import Anniversaries from './components/Anniversaries';
import Holidays from './components/Holidays';
import Logout from './components/auth/Logout'; // Import the Logout component
import PrivateRoute from './components/auth/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route 
                    path="/birthdays" 
                    element={
                        <PrivateRoute>
                            <Birthdays />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/logout" 
                    element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } 
                /> {/* Make Logout a private route */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                /> 
                <Route 
                    path="/anniversaries" 
                    element={
                        <PrivateRoute>
                            <Anniversaries />
                        </PrivateRoute>
                    } 
                /> 
                <Route 
                    path="/holidays" 
                    element={
                        <PrivateRoute>
                            <Holidays />
                        </PrivateRoute>
                    } 
                /> 
            </Routes>
        </Router>
    );
};

export default App;
