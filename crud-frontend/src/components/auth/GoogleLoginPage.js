import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
    const responseGoogle = (response) => {
        console.log(response);
        // Send user data to the backend
        const userData = {
            token: response.credential, // Use response.credential for the token
            // profile information is not directly available in this package, you may need to fetch it separately if required
        };

        fetch('http://127.0.0.1:8000/api/auth/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // Handle successful login (e.g., store token, redirect user)
            if (data.message) {
                // Redirect or perform additional actions here
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
                    onError={(error) => console.error('Login Failed:', error)}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginPage;
