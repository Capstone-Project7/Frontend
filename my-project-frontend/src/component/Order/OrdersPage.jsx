import React, { useState, useEffect } from "react";
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from an API or use a mock list
    const fetchedOrders = [
      { id: 1, status: "In Progress", tailor: "John", deadline: "2025-02-10" },
      { id: 2, status: "Completed", tailor: "Anna", deadline: "2025-01-30" },
      { id: 3, status: "In Progress", tailor: "Mike", deadline: "2025-02-05" },
      // Add more mock orders here
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="orders-container">
      <h1>Current Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Tailor</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.tailor}</td>
              <td>{order.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;