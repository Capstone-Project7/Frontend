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
        maxWidth: 1200,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Left Column - Customer Info */}
        <Sheet 
          variant="outlined"
          sx={{ 
            flex: 0.4,
            minWidth: 250,
            p: 2,
            borderRadius: 'sm'
          }}
        >
          <Typography level="h4" sx={{ mb: 2 }}>Order Information</Typography>
          
          <Stack spacing={1.5}>
            <FormControl size="sm">
              <FormLabel>Customer ID</FormLabel>
              <Input
                value={formData.customerId}
                readOnly
                required
                size="sm"
              />
            </FormControl>

            <FormControl size="sm">
              <FormLabel>Order Date</FormLabel>
              <Input
                value={formData.orderDate}
                readOnly
                required
                size="sm"
              />
            </FormControl>

            {formData.items.length > 0 && (
              <Box>
                <FormLabel sx={{ mb: 0.5 }}>Selected Items</FormLabel>
                <Stack spacing={0.5}>
                  {formData.items.map((item, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        backgroundColor: 'background.level1',
                        p: 0.5,
                        borderRadius: 'sm'
                      }}
                    >
                      <Typography level="body2" sx={{ flex: 1 }}>{item.name}</Typography>
                      <IconButton 
                        size="sm"
                        variant="plain"
                        onClick={() => handleDecreaseQuantity(index)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography level="body2">{item.quantity}</Typography>
                      <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() => handleIncreaseQuantity(index)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="danger"
                        variant="plain"
                        onClick={() => handleRemoveItem(item.itemId)}
                      >
                        <DeleteIcon fontSize="small" />
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
            minWidth: 300,
            p: 2,
            borderRadius: 'sm'
          }}
        >
          <Typography level="h4" sx={{ mb: 2 }}>Select Items </Typography>
          
          <Stack spacing={2}>
            <Box>
              <FormLabel sx={{ mb: 1 }}>Available Items</FormLabel>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 1.5 
              }}>
                {Array.isArray(catalogueItems) && catalogueItems.map((item) => (
                  <Box 
                    key={item.catalogueId}
                    sx={{
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 'sm',
                      p: 1,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 1
                      }
                    }}
                  >
                    <Box 
                      sx={{
                        height: 100,
                        backgroundImage: `url(${item.productImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 'xs',
                        mb: 0.5
                      }}
                    />
                    <Typography level="body2" fontWeight="md">{item.productCategory}</Typography>
                    <Typography level="body2" sx={{ color: 'primary.main', mb: 0.5 }}>₹{item.productPrice}</Typography>
                    <Button
                      size="sm"
                      variant="soft"
                      fullWidth
                      onClick={() => handleAddItem(item.catalogueId, item.productWorkload)}
                    >
                      Add
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>

            <FormControl size="md">
              <FormLabel>Estimated Delivery Date</FormLabel>
              <Input
                type="date"
                value={formData.deliveryDate}
                readOnly
                size="sm"
              />
            </FormControl>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
              mt: 2,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h6">Total Price:</Typography>
                <Typography level="h6" sx={{ color: 'primary.main' }}>₹{formData.totalPrice}</Typography>
              </Box>

              <Button type="submit" color="success" fullWidth>
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
