import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './ExistingCustomerPage.css';
import { Sheet, Input, Button, Typography, Box, Card, Stack, Divider } from '@mui/joy';

const ExistingCustomerPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchCustomerDataByMobile = async (mobile) => {
    try {
      const response = await axios.get(`http://localhost:8060/customers/phone/${mobile}`);
      setCustomerData(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Customer not found. Please check the mobile number.');
      setCustomerData(null);
    }
  };

  const handleSearchCustomer = (e) => {
    e.preventDefault();
    if (mobileNumber.trim()) {
      fetchCustomerDataByMobile(mobileNumber.trim());
    }
  };

  const handleNavigateToMeasurementsForm = () => {
    if (customerData) {
      navigate('/measurements-form', { state: { customerId: customerData.customerId } });
    } else {
      setErrorMessage('Please search for a valid customer.');
    }
  };

  return (
    <Sheet
      sx={{
        maxWidth: 1200, // Increased from 800
        mx: 'auto',
        my: 8, // Increased from 4
        px: 6, // Increased from 3
        py: 8, // Increased from 4
        display: 'flex',
        flexDirection: 'column',
        gap: 4, // Increased from 2
        borderRadius: 'md', // Changed from 'sm'
        boxShadow: 'lg', // Changed from 'md'
      }}
    >
      <Typography level="h1" textAlign="center" sx={{ fontSize: '3rem', mb: 4 }}>
        Enter Customer Mobile Number
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearchCustomer}
        sx={{
          display: 'flex',
          gap: 4, // Increased from 2
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          sx={{ 
            width: '400px', // Increased from 300px
            fontSize: '1.2rem',
            '--Input-minHeight': '3rem' 
          }}
        />
        <Button 
          type="submit"
          size="lg"
          sx={{ 
            fontSize: '1.2rem',
            px: 4,
            py: 1
          }}
        >
          Search
        </Button>
      </Box>

      {errorMessage && (
        <Typography 
          color="danger" 
          textAlign="center"
          sx={{ fontSize: '1.2rem' }}
        >
          {errorMessage}
        </Typography>
      )}

      {customerData && (
        <Card
          variant="outlined"
          sx={{
            mt: 4, // Increased from 2
            p: 4, // Increased from 2
          }}
        >
          <Typography level="h2" mb={4} sx={{ fontSize: '2.5rem' }}>
            Customer Details
          </Typography>
          
          <Stack spacing={2} mb={4}>
            <Typography sx={{ fontSize: '1.4rem' }}><strong>Name:</strong> {customerData.customerName}</Typography>
            <Typography sx={{ fontSize: '1.4rem' }}><strong>ID:</strong> {customerData.customerId}</Typography>
            <Typography sx={{ fontSize: '1.4rem' }}><strong>Phone:</strong> {customerData.phoneNumber}</Typography>
            <Typography sx={{ fontSize: '1.4rem' }}><strong>Email:</strong> {customerData.email}</Typography>
            <Typography sx={{ fontSize: '1.4rem' }}><strong>Status:</strong> {customerData.isActive ? 'Active' : 'Inactive'}</Typography>
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: 'flex',
              gap: 4,
              mt: 4,
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={handleNavigateToMeasurementsForm}
              sx={{ 
                flex: 1,
                fontSize: '1.3rem',
                py: 2
              }}
            >
              Update Measurements
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => navigate('/place-order', { state: { customerId: customerData.customerId } })}
              sx={{ 
                flex: 1,
                fontSize: '1.3rem',
                py: 2
              }}
            >
              Place Order
            </Button>
          </Box>
        </Card>
      )}
    </Sheet>
  );
};

export default ExistingCustomerPage;
