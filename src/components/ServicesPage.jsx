import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/service-pricing`; // Update with your actual backend API

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, service: "", estimatedTime: "", estimatedPrice: "" });

  // Fetch services from the backend
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleOpen = (service = { id: null, service: "", estimatedTime: "", estimatedPrice: "" }) => {
    setFormData(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`${API_URL}/${formData.id}`, formData); // Update existing service
      } else {
        await axios.post(API_URL, formData); // Add new service
      }
      fetchServices();
      handleClose();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Services</Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Service
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Service Name</b></TableCell>
              <TableCell><b>Estimated Time</b></TableCell>
              <TableCell><b>Estimated Price (Rs.)</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.service}</TableCell>
                <TableCell>{service.estimatedTime}</TableCell>
                <TableCell>Rs. {service.estimatedPrice}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(service)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(service.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Service Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit Service" : "Add New Service"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Service Name"
            name="name"
            value={formData.service}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Estimated Time (e.g., 1 hour)"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Estimated Price (Rs.)"
            name="estimatedPrice"
            type="number"
            value={formData.estimatedPrice}
            onChange={handleChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{formData.id ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServicesPage;
