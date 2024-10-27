import React from 'react';


const VerifyEmail = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729338885/add-icon_1_h8e41f.png"
                        className="img-fluid"
                        alt="Background"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="col-md-6">
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header text-center" style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                            <h1>Verify Your Email Address</h1>
                        </div>
                        <div className="card-body">
                            <p className="text-center">
                                We have sent an email to you for verification. <br />
                                Follow the link provided to finalize the signup process. <br />
                                If you do not see the verification email in your main inbox, check your spam folder. <br />
                                Please contact us if you do not receive the verification email within a few minutes.
                            </p>
                        </div>
                        <div className="text-center">
                            <a href="/login"
                                className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button"
                                style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                                Go to Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
