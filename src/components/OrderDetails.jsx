import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent } from "@mui/material";

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/byUser/${id}`);
      setOrder(response.data);
      setStatus(response.data.status); // Set initial status
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Update order status
  const updateOrderStatus = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/order/byUser/${id}`, {
        ...order,
        status, // Update the status
      });
      alert("Order status updated successfully!");
      navigate("/orders"); // Navigate back to orders page
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Order Details - ID: {order.id}
        </Typography>
        <Typography variant="body1">User ID: {order.userId}</Typography>
        <Typography variant="body1">
          Order Date: {new Date(order.orderDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
        <Typography variant="body1">Current Status: {order.status}</Typography>

        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="SHIPPED">Shipped</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={updateOrderStatus}
        >
          Update Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;