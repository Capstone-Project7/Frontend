import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerSelectionPage.css';

const CustomerSelectionPage = () => {
  const navigate = useNavigate();

  const handleNewCustomer = () => {
    navigate('/new-customer');
  };

  const handleExistingCustomer = () => {
    navigate('/existing-customer');
  };

  return (
    <div className="customer-selection-page">
      <div className="card-container">
        {/* New Customer Card */}
        <div
          className="card new-customer"
          onClick={handleNewCustomer}
        >
          <h3>New Customer</h3>
        </div>

        {/* Existing Customer Card */}
        <div
          className="card existing-customer"
          onClick={handleExistingCustomer}
        >
          <h3>Existing Customer</h3>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelectionPage;