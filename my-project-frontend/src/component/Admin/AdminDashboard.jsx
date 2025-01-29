import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">

      <div className="dashboard-cards row">
        {/* Manage Customers Card */}
        <div className="col-md-4">
          <div
            className="card animate__animated animate__zoomIn"
            style={{ backgroundImage: "url('/src/assets/image1.jpg')" }}
          >
            <h2>Manage Customers</h2>
            <p>View and manage customer details.</p>
            {/* Corrected link to /customer-selection */}
            <Link to="/customer-selection">Go to Customers</Link>
          </div>
        </div>

        {/* Manage Tailors Card */}
        <div className="col-md-4">
          <div
            className="card animate__animated animate__zoomIn"
            style={{ backgroundImage: "url('/src/assets/image2.jpg')" }}
          >
            <h2>Manage Tailors</h2>
            <p>View and manage tailor details.</p>
            <Link to="/tailors">Go to Tailors</Link>
          </div>
        </div>

        {/* Manage Orders Card */}
        <div className="col-md-4">
          <div
            className="card animate__animated animate__zoomIn"
            style={{ backgroundImage: "url('/src/assets/image3.jpg')" }}
          >
            <h2>Manage Orders</h2>
            <p>Create and manage orders.</p>
            <Link to="/orders">Go to Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;