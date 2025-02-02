import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/joy';

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column' // Added flexDirection column for the heading positioning
      }}
    >
      {/* Heading */}
      <Typography 
        level="h1" 
        sx={{
          mb: 4, 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: 'primary.main'
        }}
      >
        Welcome Stitching Strategist!
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
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
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 2 }}>
                  Manage Customers
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  View and manage customer details.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/customer-selection"
                variant="solid"
                size="lg"
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
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 2 }}>
                  Manage Tailors
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  View and manage tailor details.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/tailors"
                variant="solid"
                size="lg"
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
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Typography level="h2" sx={{ mb: 2 }}>
                  Manage Orders
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Create and manage orders.
                </Typography>
              </div>
              <Button
                component={Link}
                to="/orders"
                variant="solid"
                size="lg"
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
