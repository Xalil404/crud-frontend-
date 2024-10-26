// src/services/api.js
import axios from 'axios';

const AUTH_URL = 'http://127.0.0.1:8000/auth'; // Authentication base URL
const API_URL = 'http://127.0.0.1:8000/api'; // API base URL for birthdays



// Set up Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
        config.headers.Authorization = `Token ${token}`; // Assuming your backend uses 'Token' scheme
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/registration/`, userData);
        return response.data; // Returns the user data from the response
    } catch (error) {
        throw error.response.data; // Customize this based on your needs
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login/`, credentials);
        console.log('Login Response:', response.data); // Log the response data
        // Store user ID in local storage
        localStorage.setItem('user', response.data.user); // Use 'userId' for consistency
        console.log('User ID saved:', response.data.user);
        return { token: response.data.key }; // Return the token
    } catch (error) {
        throw error.response.data;
    }
};




// Function to fetch birthdays
export const fetchBirthdays = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/birthdays/`, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the list of birthdays
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to create a new birthday
export const createBirthday = async (birthdayData, token) => {
    try {
        const response = await axios.post(`${API_URL}/birthdays/`, birthdayData, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the created birthday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to update a birthday
export const updateBirthday = async (birthdayId, birthdayData, token) => {
    try {
        const response = await axios.put(`${API_URL}/birthdays/${birthdayId}/`, birthdayData, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the updated birthday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to delete a birthday
export const deleteBirthday = async (birthdayId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/birthdays/${birthdayId}/`, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Optionally return a success message or response
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to fetch user profile
export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the user profile data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};
