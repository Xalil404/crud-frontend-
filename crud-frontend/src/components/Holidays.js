import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { fetchHolidays, createHoliday, updateHoliday, deleteHoliday, fetchUserProfile } from '../services/api';

const Holidays = () => {
    const [holidays, setHolidays] = useState([]);
    const [description, setDescription] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null); 
    const [userProfile, setUserProfile] = useState(null); 
    const [confirmDelete, setConfirmDelete] = useState(null);
    const token = localStorage.getItem('authToken'); 
    const navigate = useNavigate(); 

    // Load user profile and holidays when the component mounts
    useEffect(() => {
        const loadProfileAndHolidays = async () => {
            try {
                const profileData = await fetchUserProfile(token);
                setUserProfile(profileData); 

                const holidayData = await fetchHolidays(token);
                setHolidays(holidayData); 
            } catch (err) {
                setError(err.detail || 'Error fetching data');
                console.error('Error fetching data:', err);
            }
        };

        loadProfileAndHolidays(); 
    }, [token]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const holidayData = {
            user: userProfile ? userProfile.id : null,
            description: description,
            month: month,
            day: day
        };

        try {
            if (editId) {
                await updateHoliday(editId, holidayData, token);
                setEditId(null); 
            } else {
                await createHoliday(holidayData, token);
            }
            setDescription('');
            setMonth('');
            setDay('');
            const data = await fetchHolidays(token);
            setHolidays(data);
        } catch (error) {
            const errorMessage = error.user ? error.user[0] : 'Error saving holiday: ' + (error.detail || 'An error occurred.');
            setError(errorMessage);
            console.error('Error saving holiday:', error);
        }
    };

    const handleEdit = (holiday) => {
        setDescription(holiday.description); 
        setMonth(holiday.month);
        setDay(holiday.day);
        setEditId(holiday.id); 
    };

    const confirmDeleteHoliday = (id) => {
        setConfirmDelete(id);
    };

    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await deleteHoliday(confirmDelete, token);
                const data = await fetchHolidays(token);
                setHolidays(data);
                setConfirmDelete(null);
            } catch (error) {
                setError('Error deleting holiday: ' + (error.detail || 'An error occurred.'));
                console.error('Error deleting holiday:', error);
            }
        }
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    return (
        <div className='dashboard-background-holiday'>
            <div className='container-fluid'>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <h2 className="sidebar-heading text-center">Menu</h2>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link" to="/birthdays">Birthdays</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link" to="/anniversaries">Anniversaries</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link" to="/holidays">Holidays</Link>
                            </li>
                            <hr className="divider" />
                        </ul>
                        <div className="sidebar-user-info mt-4 text-center">
                            {userProfile && (
                                <p>Welcome, {userProfile.username}! (ID: {userProfile.id})</p>
                            )}
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-sm btn-danger"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                    
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729505462/static/favicon_io/apple-touch-icon.234aad4ee54e.png"
                                alt="Logo"
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <h1 className="d-inline mb-0">Holidays</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="number"
                                    placeholder="Month (1-12)"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    required
                                    className="form-control"
                                    min="1"
                                    max="12"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="number"
                                    placeholder="Day (1-31)"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    required
                                    className="form-control"
                                    min="1"
                                    max="31"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {editId ? 'Update Holiday' : 'Add Holiday'}
                            </button>
                        </form>

                        <div className="row">
                            {holidays.length === 0 ? (
                                <div className="col-12 text-center">
                                    <p><strong>No holidays added yet.</strong></p>
                                    <p>Click the button above to add your first holiday!</p>
                                    <img
                                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
                                        alt="No Holidays"
                                        className="img-fluid mb-3"
                                        style={{ width: '450px' }}
                                    />
                                </div>
                            ) : (
                                holidays.map((holiday) => (
                                    <div key={holiday.id} className="col-md-4 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{holiday.description}</h5>
                                                <p className="card-text">{holiday.month}/{holiday.day}</p>
                                                <button onClick={() => handleEdit(holiday)} className="btn btn-warning btn-sm me-2">Edit</button>
                                                <button onClick={() => confirmDeleteHoliday(holiday.id)} className="btn btn-danger btn-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {confirmDelete && (
                            <div className="modal fade show" style={{ display: 'block' }} id="confirmDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="confirmDeleteModalLabel">Confirm Deletion</h5>
                                            <button type="button" className="btn-close" onClick={() => setConfirmDelete(null)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure you want to delete this holiday?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Holidays;
