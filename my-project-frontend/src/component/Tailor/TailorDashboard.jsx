import React, { useEffect, useState } from "react";
import { Box, Sheet, Typography, List, ListItem, ListDivider, Card, CardContent, Stack, Button, Select, Option } from '@mui/joy';

const TailorDashboard = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const [tailorId, setTailorId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [catalogue, setCatalogue] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchTailorId = async () => {
      const username = sessionStorage.getItem("username");
      if (!username) {
        setError("Username not found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8060/api/tailors/username/${username}`);
        if (!response.ok) throw new Error("Failed to fetch tailor details.");
        const data = await response.json();
        setTailorId(data.tailorId);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTailorId();
  }, []);

  useEffect(() => {
    if (!tailorId) return;

    const fetchData = async () => {
      try {
        const [itemsResponse, catalogueResponse] = await Promise.all([
          fetch(`http://localhost:8060/api/items/tailor/${tailorId}`),
          fetch(`http://localhost:8060/catalogue/product-types`)
        ]);

        if (!itemsResponse.ok) throw new Error("Failed to fetch assigned items.");
        if (!catalogueResponse.ok) throw new Error("Failed to fetch catalogue.");

        const [itemsData, catalogueData] = await Promise.all([
          itemsResponse.json(),
          catalogueResponse.json()
        ]);

        // Filter out finished items
        const unfinishedItems = itemsData.filter(item => item.itemStatus !== 'finished');
        setItems(unfinishedItems);
        setCatalogue(catalogueData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [tailorId]);

  const fetchCustomerDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8081/orders/v1/${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch customer details.");
      const data = await response.json();
      setCustomerDetails(data);
      await fetchMeasurements(data.customerId);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMeasurements = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8060/measurements/${customerId}`);
      if (!response.ok) throw new Error("Failed to fetch measurements.");
      const data = await response.json();
      setMeasurements(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setSelectedStatus(item.itemStatus);
    if (item.orderId) {
      await fetchCustomerDetails(item.orderId);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const endpoint = selectedStatus === 'in_progress' 
        ? `http://localhost:8060/api/items/updateStatus/inProgress/${selectedItem.itemId}` 
        : `http://localhost:8060/api/items/updateStatus/finished/${selectedItem.itemId}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) throw new Error("Failed to update status");
  
      // If status is changed to finished, remove item from the list
      if (selectedStatus === 'finished') {
        setItems(items.filter(item => item.itemId !== selectedItem.itemId));
        setSelectedItem(null);
      } else {
        // Update local state after successful API response
        setItems(items.map(item =>
          item.itemId === selectedItem.itemId
            ? { ...item, itemStatus: selectedStatus }
            : item
        ));
        setSelectedItem({ ...selectedItem, itemStatus: selectedStatus });
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const getProductCategory = (item) => {
    const catalogueItem = catalogue.find((cat) => cat.catalogueId === item.catalogueId);
    return catalogueItem?.productCategory || "Category not found";
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, maxWidth: 1200, margin: '0 auto'}}>
      <Typography level="h2" sx={{ mb: 2, textAlign: 'center' }}>
      🧵Tailor Dashboard✂️
      </Typography>

      {error && (
        <Sheet color="danger" variant="soft" sx={{ p: 2, borderRadius: 'sm' }}>
          <Typography color="danger">{error}</Typography>
        </Sheet>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Sheet variant="outlined" sx={{ flex: 1, borderRadius: 'sm', p: 2 }}>
          <Typography level="h4" sx={{ mb: 2 }}>ASSIGNED ITEMS</Typography>
          
          {items.length === 0 ? (
            <Typography level="body1">No items assigned.</Typography>
          ) : (
            <List>
              {items.map((item, index) => (
                <React.Fragment key={item.itemId}>
                  <ListItem
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'background.level1' },
                      border: '1px solid', // Add a border around each item
                      borderColor: 'divider', // Use a predefined color for the border (you can change it)
                      borderRadius: 'sm', // Optional: add rounded corners
                      padding: 2, // Optional: add some padding inside the item
                      }}
                    onClick={() => handleItemClick(item)}
                  >
                    <Stack spacing={1} sx={{ width: '100%' }}>
                      <Typography level="h6">Item ID: {item.itemId}</Typography>
                      <Typography level="body2">Order ID: {item.orderId}</Typography>
                      <Typography level="body2">Status:&nbsp;
                        <span
                          style={{
                            fontWeight: 'bold',
                            color: item.itemStatus === 'not_started' ? 'red' : item.itemStatus === 'in_progress' ? 'green' : 'inherit'
                          }}
                        >
                           {item.itemStatus}
                        </span>
                       </Typography>
                      <Typography level="body2">Category: {getProductCategory(item)}</Typography>
                    </Stack>
                  </ListItem>
                  {index < items.length - 1 && <ListDivider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Sheet>

        {selectedItem && (
          <Card variant="outlined" sx={{ flex: 1, maxWidth: 400 }}>
            <CardContent>
              <Typography level="h4" sx={{ mb: 2 }}>ITEM DETAILS</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography level="body2" sx={{ color: 'text.secondary' }}>
                    <span style={{ fontWeight: 'bold' }}>Product Category:</span> {getProductCategory(selectedItem)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography level="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Status</Typography>
                    <Select
                      value={selectedStatus}
                      onChange={(_, value) => setSelectedStatus(value)}
                      sx={{ minWidth: 120 }}
                    >
                      <Option value="in_progress">In Progress</Option>
                      <Option value="finished">Finished</Option>
                    </Select>
                  </Box>

                  <Button 
                    onClick={handleStatusUpdate}
                    sx={{ mt: 2 }}
                    disabled={selectedItem.itemId !== items[0]?.itemId}
                  >
                    Update Status
                  </Button>
                </Box>
                <Box>
                  <Typography level="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}> Customer Measurements</Typography>
                  {measurements ? (
                    <>
                      <Typography>Neck Size: {measurements.neckSize || 'Not available'}</Typography>
                      <Typography>Chest Size: {measurements.chestSize || 'Not available'}</Typography>
                      <Typography>Shoulder Size: {measurements.shoulderLength || 'Not available'}</Typography>
                      <Typography>Sleeve Length: {measurements.sleeveLength || 'Not available'}</Typography>
                      <Typography>Jacket Length: {measurements.jacketLength || 'Not available'}</Typography>
                      <Typography>Waist Size: {measurements.waistSize || 'Not available'}</Typography>
                      <Typography>Hip Size: {measurements.hipSize || 'Not available'}</Typography>
                      <Typography>Pant Length: {measurements.pantLength || 'Not available'}</Typography>
                    </>
                  ) : (
                    'Not available'
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default TailorDashboard;
