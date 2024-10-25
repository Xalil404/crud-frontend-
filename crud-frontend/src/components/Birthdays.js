import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchBirthdays, createBirthday, updateBirthday, deleteBirthday } from '../services/api'; // Import from api.js

const Birthdays = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null); // To store any error messages
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    const navigate = useNavigate(); // Initialize navigate function
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

    // Load birthdays when the component mounts
    useEffect(() => {
        const loadBirthdays = async () => {
            try {
                const data = await fetchBirthdays(token); // Pass token to the fetch function
                setBirthdays(data);
            } catch (err) {
                setError(err.detail || 'Error fetching birthdays');
                console.error('Error fetching birthdays:', err);
            }
        };

        loadBirthdays(); // Call the fetch function when component mounts
    }, [token]); // Dependencies: token

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error on submit
        
        // Prepare birthday data with user ID
        const birthdayData = {
            user: userId, // Ensure this is set to the correct user ID
            description: name, // Use `description` for name
            date: date // Ensure this date is in the correct format (YYYY-MM-DD)
        };

        try {
            if (editId) {
                // Update existing birthday
                await updateBirthday(editId, birthdayData, token);
                setEditId(null); // Reset edit ID after saving
            } else {
                // Create new birthday
                await createBirthday(birthdayData, token);
            }
            setName('');
            setDate('');
            // Re-fetch birthdays after creating or updating
            const data = await fetchBirthdays(token);
            setBirthdays(data);
        } catch (error) {
            // Handle error and show appropriate message
            const errorMessage = error.user ? error.user[0] : 'Error saving birthday: ' + (error.detail || 'An error occurred.');
            setError(errorMessage);
            console.error('Error saving birthday:', error);
        }
    };

    const handleEdit = (birthday) => {
        setName(birthday.description); // Set name as description for editing
        setDate(birthday.date);
        setEditId(birthday.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBirthday(id, token);
            // Re-fetch birthdays after deletion
            const data = await fetchBirthdays(token);
            setBirthdays(data);
        } catch (error) {
            setError('Error deleting birthday: ' + (error.detail || 'An error occurred.'));
            console.error('Error deleting birthday:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token from local storage
        localStorage.removeItem('userId'); // Optionally remove userId
        navigate('/'); // Redirect to the home page
    };

    return (
        <div>
            <h2>Birthdays</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show error messages */}
            <button onClick={handleLogout} style={{ marginBottom: '10px' }}>Logout</button> {/* Logout button */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">{editId ? 'Update Birthday' : 'Add Birthday'}</button>
            </form>
            <ul>
                {birthdays.length > 0 ? (
                    birthdays.map((birthday) => (
                        <li key={birthday.id}>
                            {birthday.description} - {birthday.date}
                            <button onClick={() => handleEdit(birthday)}>Edit</button>
                            <button onClick={() => handleDelete(birthday.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No birthdays found.</li> // Handle empty state
                )}
            </ul>
        </div>
    );
};

export default Birthdays;
