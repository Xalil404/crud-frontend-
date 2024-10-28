import React, { useState } from 'react';
import { registerUser } from '../../services/api'; // Import the registerUser function
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [showEmailFields, setShowEmailFields] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await registerUser({ username, email, password1, password2 });
            console.log(response); // Handle success (e.g., log response)

            // Redirect to the email verification page
            navigate('/verify-email'); // Replace with your actual verification page path
        } catch (error) {
            console.error(error); // Log the error response
            setError('Registration failed. Please check your details.'); // Display error
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729336214/credit-card-icon_1_q9qpcd.png" 
                        className="img-fluid" 
                        alt="Login" 
                    />
                </div>

                <div className="col-md-6">
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header-1 text-center card-header-custom">
                            <h2>Sign Up to Dates</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Social Media Login Buttons */}
                                <div className="social-login-buttons text-center mb-3">
                                    <a href="/accounts/google/login/" type="button" className="btn btn-danger mb-4 w-100 py-3 mx-auto d-block rounded-button">
                                        <i className="fab fa-google"></i> Sign up with Google
                                    </a>
                                </div>

                                {/* Divider with text */}
                                <div className="text-center mb-5">
                                    <div className="divider-login">
                                        <hr className="divider-line" />
                                        <span className="divider-text mx-2">or sign in with email</span>
                                        <hr className="divider-line" />
                                    </div>
                                </div>

                                {/* Continue with email button */}
                                <div className="social-login-buttons text-center mb-3">
                                    <button 
                                        type="button" 
                                        className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button" 
                                        id="email-button" 
                                        style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                        onClick={() => setShowEmailFields(true)}
                                    >
                                        Continue with Email
                                    </button>
                                </div>

                                {/* Email registration fields (initially hidden) */}
                                {showEmailFields && (
                                    <div id="email-fields">
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
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
                                            value={password1}
                                            onChange={(e) => setPassword1(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            className="form-control mb-3"
                                            placeholder="Confirm Password"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                            required
                                        />
                                        <div className="social-login-buttons">
                                            <button 
                                                type="submit" 
                                                className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button" 
                                                id="signup-button" 
                                                style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </form>
                            <hr />
                            <p className="text-center">
                                Already have an account? <a href="/login" className="text-dark">Sign in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
