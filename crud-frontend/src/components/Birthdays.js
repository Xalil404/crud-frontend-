import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { fetchBirthdays, createBirthday, updateBirthday, deleteBirthday, fetchUserProfile } from '../services/api'; 

const Birthdays = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null); 
    const [userProfile, setUserProfile] = useState(null); 
    const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation
    const token = localStorage.getItem('authToken'); 
    const navigate = useNavigate(); 

    // Load user profile and birthdays when the component mounts
    useEffect(() => {
        const loadProfileAndBirthdays = async () => {
            try {
                const profileData = await fetchUserProfile(token);
                setUserProfile(profileData); 

                const birthdayData = await fetchBirthdays(token);
                setBirthdays(birthdayData); 
            } catch (err) {
                setError(err.detail || 'Error fetching data');
                console.error('Error fetching data:', err);
            }
        };

        loadProfileAndBirthdays(); 
    }, [token]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        
        // Prepare birthday data with user ID
        const birthdayData = {
            user: userProfile ? userProfile.id : null,
            description: name,
            date: date 
        };

        try {
            if (editId) {
                // Update existing birthday
                await updateBirthday(editId, birthdayData, token);
                setEditId(null); 
            } else {
                // Create new birthday
                await createBirthday(birthdayData, token);
            }
            setName('');
            setDate('');
            const data = await fetchBirthdays(token);
            setBirthdays(data);
        } catch (error) {
            const errorMessage = error.user ? error.user[0] : 'Error saving birthday: ' + (error.detail || 'An error occurred.');
            setError(errorMessage);
            console.error('Error saving birthday:', error);
        }
    };

    const handleEdit = (birthday) => {
        setName(birthday.description); 
        setDate(birthday.date);
        setEditId(birthday.id); 
    };

    const confirmDeleteBirthday = (id) => {
        setConfirmDelete(id);
    };

    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await deleteBirthday(confirmDelete, token);
                const data = await fetchBirthdays(token);
                setBirthdays(data);
                setConfirmDelete(null); // Reset confirmation
            } catch (error) {
                setError('Error deleting birthday: ' + (error.detail || 'An error occurred.'));
                console.error('Error deleting birthday:', error);
            }
        }
    };

    const handleLogout = () => {
        // Redirect to the Logout component
        navigate('/logout');
    };

    return (
        <div className='dashboard-background-bday'>
            <div className='container-fluid'>
                {/* Show error message if it exists */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    {/* Sidebar */}
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
                        </ul>
                        
                        {/* User Info and Logout Section */}
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

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729505462/static/favicon_io/apple-touch-icon.234aad4ee54e.png"
                                alt="Logo"
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <h1 className="d-inline mb-0">Birthdays</h1>
                        </div>

                        

                        {/* Birthday Form */}
                        <form onSubmit={handleSubmit} className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {editId ? 'Update Birthday' : 'Add Birthday'}
                            </button>
                        </form>


                        {/* Birthday Cards */}
                        <div className="row">
                            {birthdays.length === 0 ? (
                                <div className="col-12 text-center">
                                    <p><strong>No birthdays added yet.</strong></p>
                                    <p>Click the button above to add your first birthday!</p>
                                    <img
                                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
                                        alt="No Birthdays"
                                        className="img-fluid mb-3"
                                        style={{ width: '450px' }} // Optional: Adjust the size of the image
                                    />
                                </div>
                            ) : (
                                birthdays.map((birthday) => (
                                    <div key={birthday.id} className="col-md-4 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{birthday.description}</h5>
                                                <p className="card-text">{birthday.date}</p>
                                                <button onClick={() => handleEdit(birthday)} className="btn btn-warning btn-sm me-2" data-toggle="modal" data-target="#editBirthdayModal">Edit</button>
                                                <button onClick={() => confirmDeleteBirthday(birthday.id)} className="btn btn-danger btn-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>


                        {/* Edit Birthday Modal */}
                        <div className={`modal fade ${editId ? 'show' : ''}`} style={{ display: editId ? 'block' : 'none' }} id="editBirthdayModal" tabIndex="-1" role="dialog" aria-labelledby="editBirthdayModalLabel" aria-hidden={!editId}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="editBirthdayModalLabel">Edit Birthday</h5>
                                        <button type="button" className="btn-close" onClick={() => setEditId(null)} aria-label="Close">   
                                            </button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                                className="form-control mb-2"
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">
                                                Update Birthday
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Confirmation Pop-up for Deletion */}
                        {confirmDelete && (
                            <div className="modal fade show" style={{ display: 'block' }} id="confirmDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="confirmDeleteModalLabel">Confirm Deletion</h5>
                                            <button type="button" className="btn-close" onClick={() => setConfirmDelete(null)} aria-label="Close">
                                                
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure you want to delete this birthday?
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

export default Birthdays;
