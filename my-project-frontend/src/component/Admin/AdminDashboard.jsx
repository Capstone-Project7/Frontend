import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/joy';

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        p: 8, // Increased padding
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      {/* Heading */}
      <Typography 
        level="h1" 
        sx={{
          mb: 6, // Increased margin
          fontSize: '3.5rem', // Increased font size
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.main'
        }}
      >
        Welcome Stitching Strategist!
      </Typography>

      <Grid container spacing={6} sx={{ maxWidth: 1600 }}> {/* Increased spacing and maxWidth */}
        {/* Manage Customers Card */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              p: 4 // Added padding
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 3, fontSize: '2.5rem' }}> {/* Increased font size and margin */}
                  Manage Customers
                </Typography>
                <Typography sx={{ mb: 4, fontSize: '1.2rem' }}> {/* Increased font size and margin */}
                  View and manage customer details.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/customer-selection"
                variant="solid"
                size="lg"
                sx={{ fontSize: '1.2rem', py: 2 }} // Increased button size
              >
                Go to Customers
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Tailors Card */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              p: 4 // Added padding
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 3, fontSize: '2.5rem' }}> {/* Increased font size and margin */}
                  Manage Tailors
                </Typography>
                <Typography sx={{ mb: 4, fontSize: '1.2rem' }}> {/* Increased font size and margin */}
                  View and manage tailor details.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/tailors"
                variant="solid"
                size="lg"
                sx={{ fontSize: '1.2rem', py: 2 }} // Increased button size
              >
                Go to Tailors
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Orders Card */}
        <Grid xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              p: 4 // Added padding
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 3, fontSize: '2.5rem' }}> {/* Increased font size and margin */}
                  Manage Orders
                </Typography>
                <Typography sx={{ mb: 4, fontSize: '1.2rem' }}> {/* Increased font size and margin */}
                  Create and manage orders.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/orders"
                variant="solid"
                size="lg"
                sx={{ fontSize: '1.2rem', py: 2 }} // Increased button size
              >
                Go to Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
