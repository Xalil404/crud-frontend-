import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
    const responseGoogle = (response) => {
        console.log("Google Response:", response);

        // Construct user data with token
        const userData = {
            token: response.credential,
        };

        // Send token to your Django backend
        fetch('http://127.0.0.1:8000/api/auth/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Backend Response:", data);
            // Handle successful login (e.g., store token, redirect user)
            if (data.token) {
                // Save the token locally or redirect
                localStorage.setItem('authToken', data.token);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <GoogleOAuthProvider clientId="17966200055-rc9cu06jutt8mo0cqob43vhnejvbltd4.apps.googleusercontent.com">
            <div>
                <h1>Google Login</h1>
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={() => console.error('Login Failed')}
                    ux_mode="popup"
                    cookiePolicy="single_host_origin"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginPage;
