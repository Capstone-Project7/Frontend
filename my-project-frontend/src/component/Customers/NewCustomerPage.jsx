import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const NewCustomerPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      customerName,
      phoneNumber,
      email,
      isActive: "true",
    };

    try {
      const response = await axios.post("http://localhost:8060/customers", customerData);
      console.log("Customer Created:", response.data);
      setCustomerDetails(response.data);
    } catch (error) {
      console.error("There was an error creating the customer:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}> 
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3,
        }}
      >
        <Typography level="h1" align="center" sx={{ mb: 3, fontFamily: 'Rock Salt, cursive', fontSize: '1.75rem' }}>
          Customer Details
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="customerName"
            label="Customer Name"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            autoFocus
            sx={{ mb: 3 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/measurements-form`, {state: {customerId: customerDetails.customerId}})} // Passing customerId to the MeasurementForm
              sx={{ width: '48%' }}
            >
              Add Measurements
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ width: '48%' }}
            >
              Save Customer
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewCustomerPage;
