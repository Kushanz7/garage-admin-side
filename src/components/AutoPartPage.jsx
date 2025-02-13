import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./sidebar";

const AutoPartPage = () => {
  const [autoParts, setAutoParts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    vehicle: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAutoParts();
  }, []);

  const fetchAutoParts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/autoParts");
      setAutoParts(response.data);
    } catch (error) {
      console.error("Error fetching auto parts:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/autoParts", formData);
      alert("Auto part added successfully!");
      fetchAutoParts();
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        brand: "",
        vehicle: "",
        imageUrl: "",
      });
    } catch (error) {
      alert("Error adding auto part!");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this auto part?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/autoParts/${id}`);
        alert("Auto part deleted successfully!");
        fetchAutoParts();
      } catch (error) {
        alert("Error deleting auto part!");
        console.error(error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-auto-part/${id}`);
  };

  return (
    <Box display="flex">
      <Sidebar />

      <Box flex={1} p={3} bgcolor="#F9FAFC">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Auto Parts Management
        </Typography>

        {/* Add Auto Part Form */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Add Auto Part
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Brand" name="brand" value={formData.brand} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Auto Part
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        {/* View Auto Parts */}
        <Typography variant="h6" gutterBottom>
          Available Auto Parts
        </Typography>
        <Grid container spacing={3}>
          {autoParts.map((part) => (
            <Grid item xs={12} sm={6} md={4} key={part.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6">{part.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Category:</strong> {part.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price:</strong> ${part.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Stock:</strong> {part.stock}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Brand:</strong> {part.brand || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Vehicle:</strong> {part.vehicle || "N/A"}
                  </Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <img
                      src={part.imageUrl}
                      alt={part.name}
                      style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => handleUpdate(part.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(part.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AutoPartPage;
