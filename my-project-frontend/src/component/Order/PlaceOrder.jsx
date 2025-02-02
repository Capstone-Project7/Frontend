import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sheet, FormControl, FormLabel, Input, Button, Stack, Typography, Box, IconButton } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const PlaceOrder = ({ onSubmit }) => {
  const location = useLocation();
  const {customerId} = location.state || {};
  
  const [formData, setFormData] = useState({
    customerId: customerId,
    orderDate: "",
    deliveryDate: new Date().toISOString().split('T')[0],
    items: [],
    totalPrice: 0,
  });

  const [catalogueItems, setCatalogueItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setFormData({ ...formData, orderDate: formattedDate });
    fetchedCatalogueItems();
  }, []);

  async function fetchedCatalogueItems() {
    try {
      const response = await axios.get('http://localhost:8060/catalogue/product-types');
      setCatalogueItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching catalogue items:", error);
      setCatalogueItems([]);
    }
  }

  const handleItemChange = (e, index) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: e.target.value,
    };
    updateFormData(updatedItems);
  };

  const handleAddItem = (itemId, workload) => {
    const item = catalogueItems.find((item) => item.catalogueId === itemId);
    const existingItemIndex = formData.items.findIndex((orderItem) => orderItem.itemId === itemId);

    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.items];
      updatedItems[existingItemIndex].quantity += 1;
      updateFormData(updatedItems);
    } else {
      const newItem = {
        itemId: item.catalogueId,
        name: item.productCategory,
        price: item.productPrice,
        workload: workload,
        quantity: 1,
      };
      const updatedItems = [...formData.items, newItem].sort((a, b) => b.workload - a.workload);
      updateFormData(updatedItems);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = formData.items.filter((item) => item.itemId !== itemId);
    updateFormData(updatedItems);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity += 1;
    updateFormData(updatedItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...formData.items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      updateFormData(updatedItems);
    }
  };

  const updateFormData = (items) => {
    const updatedPrice = calculateTotalPrice(items);
    const updatedDate = calculateDeliveryDate(items);
    setFormData({
      ...formData,
      items,
      totalPrice: updatedPrice,
      deliveryDate: updatedDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const orderData = {
      ...formData,
      orderDate: new Date(formData.orderDate),
      deliveryDate: new Date(formData.deliveryDate),
    };
    try {
      const updateResponse = await axios.post('http://localhost:8081/orders', {
        deliveryDate: formData.deliveryDate,
        customerId: formData.customerId
      });
      console.log("Order saved successfully:", updateResponse.data);
      if (updateResponse.data.orderId) {
        const orderId = updateResponse.data.orderId;
        formData.items.map(async (item) => {
          for (let i = 0; i < item.quantity; i++) {
          const res = await axios.post('http://localhost:8060/api/items', {
            orderId: orderId,
            catalogueId: item.itemId
          });
          console.log("Order item saved successfully:", res.data);
        }
        });
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDeliveryDate = (items) => {
    const baseDeliveryDays = 2;
    if(items.length === 0) return new Date().toISOString().split('T')[0];
    const extraDaysPerItem = items[0].workload + tailors[tailors.length - 1].workload;
    const totalDays = baseDeliveryDays + extraDaysPerItem;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + totalDays);
    return deliveryDate.toISOString().split("T")[0];
  };

  const [tailors, setTailors] = useState([]);

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const response = await axios.get('http://localhost:8060/api/tailors/workload');
        setTailors(response.data);
      } catch (error) {
        console.error("Error fetching tailors:", error);
      }
    };
    fetchTailors();
  }, []);

  return (
    <Sheet 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 1600, // Increased from 1200
        mx: 'auto',
        p: 6, // Increased from 3
        display: 'flex',
        flexDirection: 'column',
        gap: 4, // Increased from 2
        backgroundColor: 'transparent'
      }}
    >
      <Typography level="h1" sx={{ mb: 4, fontSize: '3rem', textAlign: 'center' }}>
        Place Order
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}> {/* Increased gap from 2 */}
        {/* Left Column - Customer Info */}
        <Sheet 
          variant="outlined"
          sx={{ 
            flex: 0.4,
            minWidth: 350, // Increased from 250
            p: 4, // Increased from 2
            borderRadius: 'md' // Changed from 'sm'
          }}
        >
          <Typography level="h3" sx={{ mb: 3, fontSize: '2rem' }}>Order Information</Typography>
          
          <Stack spacing={2.5}> {/* Increased from 1.5 */}
            <FormControl size="lg"> {/* Changed from sm */}
              <FormLabel sx={{ fontSize: '1.2rem' }}>Customer ID</FormLabel>
              <Input
                value={formData.customerId}
                readOnly
                required
                size="lg"
                sx={{ fontSize: '1.2rem' }}
              />
            </FormControl>

            <FormControl size="lg">
              <FormLabel sx={{ fontSize: '1.2rem' }}>Order Date</FormLabel>
              <Input
                value={formData.orderDate}
                readOnly
                required
                size="lg"
                sx={{ fontSize: '1.2rem' }}
              />
            </FormControl>

            {formData.items.length > 0 && (
              <Box>
                <FormLabel sx={{ mb: 1, fontSize: '1.2rem' }}>Selected Items</FormLabel>
                <Stack spacing={1}>
                  {formData.items.map((item, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: 'background.level1',
                        p: 1.5,
                        borderRadius: 'md',
                        fontSize: '1.1rem'
                      }}
                    >
                      <Typography level="body1" sx={{ flex: 1, fontSize: '1.1rem' }}>{item.name}</Typography>
                      <IconButton 
                        size="md"
                        variant="plain"
                        onClick={() => handleDecreaseQuantity(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography level="body1" sx={{ fontSize: '1.1rem' }}>{item.quantity}</Typography>
                      <IconButton
                        size="md"
                        variant="plain"
                        onClick={() => handleIncreaseQuantity(index)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        size="md"
                        color="danger"
                        variant="plain"
                        onClick={() => handleRemoveItem(item.itemId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Sheet>

        {/* Right Column - Items & Payment */}
        <Sheet
          variant="outlined"
          sx={{ 
            flex: 0.6,
            minWidth: 400, // Increased from 300
            p: 4, // Increased from 2
            borderRadius: 'md'
          }}
        >
          <Typography level="h3" sx={{ mb: 3, fontSize: '2rem' }}>Select Items</Typography>
          
          <Stack spacing={3}> {/* Increased from 2 */}
            <Box>
              <FormLabel sx={{ mb: 2, fontSize: '1.2rem' }}>Available Items</FormLabel>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Increased from 150px
                gap: 2 
              }}>
                {Array.isArray(catalogueItems) && catalogueItems.map((item) => (
                  <Box 
                    key={item.catalogueId}
                    sx={{
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 'md',
                      p: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <Box 
                      sx={{
                        height: 150, // Increased from 100
                        backgroundImage: `url(${item.productImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 'sm',
                        mb: 1
                      }}
                    />
                    <Typography level="h6" sx={{ fontSize: '1.2rem' }}>{item.productCategory}</Typography>
                    <Typography level="h6" sx={{ color: 'primary.main', mb: 1, fontSize: '1.2rem' }}>₹{item.productPrice}</Typography>
                    <Button
                      size="lg"
                      variant="soft"
                      fullWidth
                      onClick={() => handleAddItem(item.catalogueId, item.productWorkload)}
                      sx={{ fontSize: '1.1rem' }}
                    >
                      Add
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>

            <FormControl size="lg">
              <FormLabel sx={{ fontSize: '1.2rem' }}>Estimated Delivery Date</FormLabel>
              <Input
                type="date"
                value={formData.deliveryDate}
                readOnly
                size="lg"
                sx={{ fontSize: '1.2rem' }}
              />
            </FormControl>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 3,
              mt: 3,
              pt: 3,
              borderTop: '2px solid', // Made border thicker
              borderColor: 'divider'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h4" sx={{ fontSize: '1.8rem' }}>Total Price:</Typography>
                <Typography level="h4" sx={{ color: 'primary.main', fontSize: '1.8rem' }}>₹{formData.totalPrice}</Typography>
              </Box>

              <Button 
                type="submit" 
                color="success" 
                fullWidth
                size="lg"
                sx={{ 
                  fontSize: '1.3rem',
                  py: 1.5
                }}
              >
                Place Order
              </Button>
            </Box>
          </Stack>
        </Sheet>
      </Box>
    </Sheet>
  );
};

export default PlaceOrder;
