import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Sheet, FormControl, FormLabel, Input, Button, Stack, Typography } from '@mui/joy';
// import './MeasurementForm.css';

const MeasurementForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {customerId} = location.state || {};
  console.log(customerId);
  

  const [formData, setFormData] = useState({
    customerId: customerId || "",
    neckSize: initialData.neckSize || "",
    chestSize: initialData.chestSize || "", 
    shoulderLength: initialData.shoulderLength || "",
    sleeveLength: initialData.sleeveLength || "",
    jacketLength: initialData.jacketLength || "",
    waistSize: initialData.waistSize || "",
    hipSize: initialData.hipSize || "",
    pantLength: initialData.pantLength || "",
  });

  useEffect(() => {
    const fetchMeasurements = async () => {
    
      const response = await axios.get(`http://localhost:8060/measurements/${customerId}`);
  
      // If measurements exist, update them
      if (response.data) {
        console.log(response.data);
        
        setFormData(response.data);
      }
    }
    fetchMeasurements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Create the measurement data
    const measurementData = {
      ...formData,
      customerId,
    };
  
    try {
      // Check if measurements already exist for the customer
      const response = await axios.get(`http://localhost:8060/measurements/${customerId}`);
  
      // If measurements exist, update them
      if (response.data) {
        const updateResponse = await axios.put(
          `http://localhost:8060/measurements/${customerId}`,
          measurementData
        );
        console.log("Measurement updated successfully:", updateResponse.data);
        alert('Measurements updated successfully!');
      }
    } catch (error) {
      // If no measurements are found (404), create new measurements
      if (error.response && error.response.status === 404) {
        const createResponse = await axios.post("http://localhost:8060/measurements", measurementData);
        console.log("Measurement created successfully:", createResponse.data);
        alert('New measurements created successfully!');
      } else {
        console.error("Error saving measurement:", error);
        alert('An error occurred while saving measurements');
      }
    }
  };

  const handlePlaceOrder = () => {
    navigate('/place-order', { state: { customerId: formData.customerId } })
  };

  const measurementFields = [
    { id: 'customerId', label: 'Customer ID', readonly: true },
    { id: 'neckSize', label: 'Neck Size (in inches)' },
    { id: 'chestSize', label: 'Chest Size (in inches)' },
    { id: 'shoulderLength', label: 'Shoulder Length (in inches)' },
    { id: 'sleeveLength', label: 'Sleeve Length (in inches)' },
    { id: 'jacketLength', label: 'Jacket Length (in inches)' },
    { id: 'waistSize', label: 'Waist Size (in inches)' },
    { id: 'hipSize', label: 'Hip Size (in inches)' },
    { id: 'pantLength', label: 'Pant Length (in inches)' }
  ];

  return (
    <Sheet
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        my: 8,
        py: 6,
        px: 6,
        borderRadius: 'md',
        boxShadow: 'lg',
      }}
    >
      <Typography level="h1" textAlign="center" sx={{ fontSize: '3rem', mb: 6 }}>
        Customer Measurements
      </Typography>

      <form onSubmit={handleSave}>
        <Stack spacing={4}>
          {measurementFields.map((field) => (
            <FormControl key={field.id}>
              <FormLabel sx={{ fontSize: '1.4rem', mb: 1 }}>{field.label}</FormLabel>
              <Input
                type={field.id === 'customerId' ? 'text' : 'number'}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                readOnly={field.readonly}
                required
                sx={{
                  fontSize: '1.3rem',
                  '--Input-minHeight': '3rem'
                }}
              />
            </FormControl>
          ))}

          <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 6 }}>
            <Button
              type="submit"
              onClick={handleSave}
              variant="solid"
              color="primary"
              sx={{ 
                fontSize: '1.3rem',
                px: 6,
                py: 2
              }}
            >
              Save Measurements
            </Button>
            
            <Button
              onClick={handlePlaceOrder}
              variant="outlined"
              color="neutral"
              sx={{ 
                fontSize: '1.3rem',
                px: 6,
                py: 2
              }}
            >
              Place Order
            </Button>
          </Stack>
        </Stack>
      </form>
    </Sheet>
  );
};

export default MeasurementForm;
