// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('authToken', response.token);
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.non_field_errors
                ? error.non_field_errors[0]
                : 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729335598/flag-icon_1_qrosti.png"
                        className="img-fluid"
                        alt="Login"
                    />
                </div>

                {/* Right Column for Login Form */}
                <div className="col-md-6">
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header text-center card-header-custom">
                            <h2>Sign in to Dates</h2>
                        </div>
                        <div className="card-body">
                            {/* Social Media Login Buttons */}
                            <div className="social-login-buttons text-center mb-3">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block mb-4"
                                    onClick={() => navigate('/auth/google')}
                                >
                                    <i className="fab fa-google"></i> Login with Google
                                </button>
                            </div>

                            {/* Divider with text */}
                            <div className="text-center mb-5">
                                <div className="divider">
                                    <span className="divider-text">or sign in with email</span>
                                </div>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="social-login-buttons">
                                    <button
                                        type="submit"
                                        className="btn btn-lg mx-auto d-block"
                                        style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Sign In'}
                                    </button>
                                </div>
                            </form>

                            {/* Error Message */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <hr />

                            {/* Links for Forgot Password and Sign Up */}
                            <p className="text-center">
                                <a href="/reset-password" className="text-dark">
                                    Forgot Password?
                                </a>
                            </p>
                            <p className="text-center">
                                Don't have an account?{' '}
                                <a href="/register" className="text-dark">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
