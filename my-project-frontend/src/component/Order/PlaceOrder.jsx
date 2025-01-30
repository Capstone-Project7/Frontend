import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PlaceOrder.css';
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
    deliveryDate: "2025-01-20",
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

  const handleAddItem = (itemId) => {
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
        quantity: 1,
      };
      updateFormData([...formData.items, newItem]);
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
            catalogueId: item.itemId,
            tailorId: 202
          });
          console.log("Order item saved successfully:", res.data);
        }
        });

      }
      // navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDeliveryDate = (items) => {
    const baseDeliveryDays = 5;
    const extraDaysPerItem = 2;
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalDays = baseDeliveryDays + extraDaysPerItem * totalItems;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + totalDays);
    return deliveryDate.toISOString().split("T")[0];
  };

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
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Left Column */}
        <Sheet 
          variant="outlined"
          sx={{ 
            flex: 1,
            minWidth: 300,
            p: 3,
            borderRadius: 'sm'
          }}
        >
          <Typography level="h5" sx={{ mb: 2 }}>Customer and Order Information</Typography>
          
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Customer ID</FormLabel>
              <Input
                value={formData.customerId}
                readOnly
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Order Date</FormLabel>
              <Input
                value={formData.orderDate}
                readOnly
                required
              />
            </FormControl>

            {formData.items.length > 0 && (
              <Box>
                <FormLabel sx={{ mb: 1 }}>Selected Items</FormLabel>
                <Stack spacing={1}>
                  {formData.items.map((item, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <Typography sx={{ flex: 1 }}>{item.name}</Typography>
                      <IconButton 
                        size="sm"
                        variant="outlined"
                        onClick={() => handleDecreaseQuantity(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={() => handleIncreaseQuantity(index)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="danger"
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

        {/* Right Column */}
        <Sheet
          variant="outlined"
          sx={{ 
            flex: 1,
            minWidth: 300,
            p: 3,
            borderRadius: 'sm'
          }}
        >
          <Typography level="h5" sx={{ mb: 2 }}>Select Items & Payment Details</Typography>
          
          <Stack spacing={2}>
            <Box>
              <FormLabel sx={{ mb: 1 }}>Select Items</FormLabel>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {Array.isArray(catalogueItems) && catalogueItems.map((item) => (
                  <Button
                    key={item.catalogueId}
                    variant="outlined"
                    onClick={() => handleAddItem(item.catalogueId)}
                  >
                    {item.productCategory} - ₹{item.productPrice}
                  </Button>
                ))}
              </Box>
            </Box>

            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={formData.deliveryDate}
                readOnly
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Total Price:</Typography>
              <Typography>₹{formData.totalPrice}</Typography>
            </Box>

            <Button type="submit" color="success">
              Save Order
            </Button>
          </Stack>
        </Sheet>
      </Box>
    </Sheet>
  );
};

export default PlaceOrder;
