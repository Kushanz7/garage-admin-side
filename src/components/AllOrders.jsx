import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/all`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body1">User ID: {order.userId}</Typography>
                <Typography variant="body1">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
                <Typography variant="body1">Status: {order.status}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate(`/order-details/${order.id}`)} // Navigate to OrderDetails page
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllOrders;