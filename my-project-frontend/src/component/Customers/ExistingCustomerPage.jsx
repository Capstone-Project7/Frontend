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
        maxWidth: 800,
        mx: 'auto',
        my: 4,
        px: 3,
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
    >
      <Typography level="h2" textAlign="center">
        Enter Customer Mobile Number
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearchCustomer}
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          sx={{ width: '300px' }}
        />
        <Button type="submit">Search</Button>
      </Box>

      {errorMessage && (
        <Typography color="danger" textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {customerData && (
        <Card
          variant="outlined"
          sx={{
            mt: 2,
            p: 2,
          }}
        >
          <Typography level="h3" mb={2}>
            Customer Details
          </Typography>
          
          <Stack spacing={1} mb={3}>
            <Typography><strong>Name:</strong> {customerData.customerName}</Typography>
            <Typography><strong>ID:</strong> {customerData.customerId}</Typography>
            <Typography><strong>Phone:</strong> {customerData.phoneNumber}</Typography>
            <Typography><strong>Email:</strong> {customerData.email}</Typography>
            <Typography><strong>Status:</strong> {customerData.isActive ? 'Active' : 'Inactive'}</Typography>
          </Stack>

          <Divider />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 2,
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={handleNavigateToMeasurementsForm}
              sx={{ flex: 1 }}
            >
              Update Measurements
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => navigate('/place-order', { state: { customerId: customerData.customerId } })}
              sx={{ flex: 1 }}
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
