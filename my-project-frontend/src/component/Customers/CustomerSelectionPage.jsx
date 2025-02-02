import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, Grid } from '@mui/joy';
// import './CustomerSelectionPage.css';

const CustomerSelectionPage = () => {
  const navigate = useNavigate();

  const handleNewCustomer = () => {
    navigate('/new-customer');
  };

  const handleExistingCustomer = () => {
    navigate('/existing-customer');
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Grid container spacing={6} sx={{ maxWidth: '100%', width: '100%' }}>
        {/* New Customer Card */}
        <Grid item xs={12} md={6}>  {/* Ensure the card takes up half the horizontal space */}
          <Card
            variant="outlined"
            onClick={handleNewCustomer}
            sx={{
              height: '200px',  // Adjust the height based on your preference
              width: '100%',  // Make the card take full width of its container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              opacity: 0.9,  // Increased opacity
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'primary.softBg',
                opacity: 1,  // Full opacity on hover
              }
            }}
          >
            <Typography level="h3"sx={{ fontFamily: "'Roboto', sans-serif",fontSize: '2rem', fontWeight: 500, lineHeight: 1.5 }}>🤝🏻New Customer</Typography>
          </Card>
        </Grid>

        {/* Existing Customer Card */}
        <Grid item xs={12} md={6}>  {/* Ensure the card takes up half the horizontal space */}
          <Card
            variant="outlined"
            onClick={handleExistingCustomer}
            sx={{
              height: '200px',  // Adjust the height based on your preference
              width: '100%',  // Make the card take full width of its container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              opacity: 0.9,  // Increased opacity
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'primary.softBg',
                opacity: 1,  // Full opacity on hover
              }
            }}
          >
            <Typography level="h3" sx={{ fontFamily: "'Roboto', sans-serif",fontSize: '2rem', fontWeight: 500, lineHeight: 1.5 }}>Existing Customer🛍️</Typography>
          </Card>
        </Grid>
      </Grid>

    </Box>
  );
};

export default CustomerSelectionPage;
