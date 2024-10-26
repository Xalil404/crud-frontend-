// src/components/Dashboard.js
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';


const Dashboard = () => {
  const location = useLocation();

  // Determine the background class based on the current route
  const getClassName = () => {
    return location.pathname === '/birthdays' ? 'body-birthdays' : '';
  };

  return (
    <div className='dashboard-background'>
    <div className={`container-fluid ${getClassName()}`}> {/* Add background class */}
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
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
          <div className="text-center mb-4 d-flex align-items-center justify-content-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729505462/static/favicon_io/apple-touch-icon.234aad4ee54e.png"
              alt="Logo"
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <h1 className="d-inline mb-0">Dates</h1>
          </div>

          {/* Welcome section for the homepage */}
          {location.pathname === '/dashboard' && (
            <div className="row align-items-center justify-content-center" style={{ flex: 1 }}>
              <div className="col-md-6">
                <h1 className="mb-3">Welcome to DATES!</h1>
                <h6>Keep your most important birthdays, anniversaries & holidays all in one place.</h6>
              </div>
              <div className="col-md-6 text-center">
                <img
                  src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
                  alt="Welcome"
                  className="img-fluid"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          )}

          {/* Render child routes */}
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
