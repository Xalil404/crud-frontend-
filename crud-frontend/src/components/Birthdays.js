// src/components/Birthdays.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Birthdays = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchBirthdays = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/birthdays/');
            setBirthdays(response.data);
        };

        fetchBirthdays();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/birthdays/', {
            name,
            date,
        });
        setName('');
        setDate('');
        // Re-fetch birthdays after adding
        const response = await axios.get('http://127.0.0.1:8000/api/birthdays/');
        setBirthdays(response.data);
    };

    return (
        <div>
            <h2>Birthdays</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
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
                <button type="submit">Add Birthday</button>
            </form>
            <ul>
                {birthdays.map((birthday) => (
                    <li key={birthday.id}>
                        {birthday.name} - {birthday.date}
                        {/* Add buttons for update and delete */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Birthdays;
