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
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}> 
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 6,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography level="h1" align="center" sx={{ mb: 4, fontFamily: 'Rock Salt, cursive', fontSize: '2.5rem' }}>
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
            sx={{ mb: 4 }}
            InputProps={{
              style: { fontSize: '1.2rem' }
            }}
            InputLabelProps={{
              style: { fontSize: '1.2rem' }
            }}
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
            sx={{ mb: 4 }}
            InputProps={{
              style: { fontSize: '1.2rem' }
            }}
            InputLabelProps={{
              style: { fontSize: '1.2rem' }
            }}
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
            sx={{ mb: 4 }}
            InputProps={{
              style: { fontSize: '1.2rem' }
            }}
            InputLabelProps={{
              style: { fontSize: '1.2rem' }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/measurements-form`, {state: {customerId: customerDetails.customerId}})}
              sx={{ 
                width: '48%',
                fontSize: '1.1rem',
                padding: '12px 0'
              }}
            >
              Add Measurements
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ 
                width: '48%',
                fontSize: '1.1rem',
                padding: '12px 0'
              }}
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
