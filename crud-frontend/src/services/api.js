// src/services/api.js
import axios from 'axios';

const AUTH_URL = 'https://crud-backend-for-react-841cbc3a6949.herokuapp.com/auth'; // Authentication base URL
const API_URL = 'https://crud-backend-for-react-841cbc3a6949.herokuapp.com/api'; // API base URL for birthdays
const GOOGLE_AUTH_URL = 'https://crud-backend-for-react-841cbc3a6949.herokuapp.com/accounts/google/login/'; // Google login URL



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


// Function to fetch anniversaries
export const fetchAnniversaries = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/anniversaries/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the list of anniversaries
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to create a new anniversary
export const createAnniversary = async (anniversaryData, token) => {
    try {
        const response = await axios.post(`${API_URL}/anniversaries/`, anniversaryData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the created anniversary data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to update an anniversary
export const updateAnniversary = async (anniversaryId, anniversaryData, token) => {
    try {
        const response = await axios.put(`${API_URL}/anniversaries/${anniversaryId}/`, anniversaryData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the updated anniversary data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to delete an anniversary
export const deleteAnniversary = async (anniversaryId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/anniversaries/${anniversaryId}/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Optionally return a success message or response
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to fetch holidays
export const fetchHolidays = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/holidays/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the list of holidays
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to create a new holiday
export const createHoliday = async (holidayData, token) => {
    try {
        const response = await axios.post(`${API_URL}/holidays/`, holidayData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the created holiday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to update a holiday
export const updateHoliday = async (holidayId, holidayData, token) => {
    try {
        const response = await axios.put(`${API_URL}/holidays/${holidayId}/`, holidayData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the updated holiday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to delete a holiday
export const deleteHoliday = async (holidayId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/holidays/${holidayId}/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Optionally return a success message or response
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};




// Function to log in using Google
export const loginWithGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL; // Redirect to Google login
};