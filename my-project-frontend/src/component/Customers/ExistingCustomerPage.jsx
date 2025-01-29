import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './ExistingCustomerPage.css'; // Correct file path

const ExistingCustomerPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch customers data (replace with actual API call or data source)
  useEffect(() => {
    const fetchedCustomers = [
      { id: 'customer1', name: 'Customer 1' },
      { id: 'customer2', name: 'Customer 2' },
      // Add more customers dynamically
    ];
    setCustomers(fetchedCustomers);
  }, []);

  const handleSelectCustomer = () => {
    if (selectedCustomer) {
      // Logic to handle the selected customer for order placement
      console.log('Customer Selected:', selectedCustomer);
    } else {
      console.log('Please select a customer.');
    }
  };

  const handleNavigate = (route) => {
    navigate(route); // Navigate to specified route
  };

  return (
    <div className="existing-customer-page">
      <h2>Select Existing Customer</h2>
      <select
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        required
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>

      <div className="action-cards">
        <div className="card" onClick={() => handleNavigate('/measurements-form')}>
          <h3>Update Measurements</h3>
        </div>
        <div className="card" onClick={() => handleNavigate('/place-order')}>
          <h3>Place Order</h3>
        </div>
      </div>
    </div>
  );
};

export default ExistingCustomerPage;