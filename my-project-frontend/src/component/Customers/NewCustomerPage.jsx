import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const NewCustomerPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

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
    } catch (error) {
      console.error("There was an error creating the customer:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}> {/* Background color of the page */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4, // Increased padding for the form
          borderRadius: 2, // Rounded corners for the form box
          boxShadow: 3, // Optional: add a subtle shadow to the form box
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
            sx={{ mb: 3 }} // Increased margin for spacing
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
            sx={{ mb: 3 }} // Increased margin for spacing
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
            sx={{ mb: 3 }} // Increased margin for spacing
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.href = "/measurements-form"}
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
