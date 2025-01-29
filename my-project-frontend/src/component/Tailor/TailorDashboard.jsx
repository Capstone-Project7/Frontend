import React, { useEffect, useState } from "react";

const TailorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const tailorId = sessionStorage.getItem("tailorId"); // Fetch tailorId from sessionStorage
      if (!tailorId) {
        setError("Tailor ID not found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8060/api/orders/${tailorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <h1>Tailor Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Order List</h2>
        {orders.length === 0 && <p>No orders found.</p>}
        <ul>
          {orders.map((order) => (
            <li key={order.orderId} onClick={() => handleOrderClick(order)}>
              Order ID: {order.orderId} | Customer: {order.customerName}
            </li>
          ))}
        </ul>
      </div>
      {selectedOrder && (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {selectedOrder.orderId}</p>
          <p>Customer Name: {selectedOrder.customerName}</p>
          <p>Measurement Details: {selectedOrder.measurements}</p>
        </div>
      )}
    </div>
  );
};

export default TailorDashboard;
