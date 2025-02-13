import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";

function UpdateAutoPartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    vehicle: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchAutoPart();
  }, []);

  const fetchAutoPart = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/autoParts/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching auto part:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Convert Google Drive link to direct link before storing
    const formattedImageUrl = formData.imageUrl.includes("drive.google.com")
      ? formData.imageUrl.replace("file/d/", "uc?export=view&id=").replace("/view?usp=sharing", "")
      : formData.imageUrl;

    try {
      await axios.put(`http://localhost:8080/api/autoParts/${id}`, {
        ...formData,
        imageUrl: formattedImageUrl,
      });
      alert("Auto part updated successfully!");
      navigate("/auto-parts");
    } catch (error) {
      alert("Error updating auto part!");
      console.error(error);
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1565c0" }}>
              Update Auto Part
            </Typography>

            <form onSubmit={handleUpdate}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="dense"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <TextField
                label="Category"
                name="category"
                fullWidth
                margin="dense"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                margin="dense"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <TextField
                label="Stock"
                name="stock"
                type="number"
                fullWidth
                margin="dense"
                value={formData.stock}
                onChange={handleChange}
                required
              />

              <TextField
                label="Brand"
                name="brand"
                fullWidth
                margin="dense"
                value={formData.brand}
                onChange={handleChange}
              />

              <TextField
                label="Vehicle"
                name="vehicle"
                fullWidth
                margin="dense"
                value={formData.vehicle}
                onChange={handleChange}
              />

              <TextField
                label="Image URL"
                name="imageUrl"
                fullWidth
                margin="dense"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />

              <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Update Auto Part
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary" onClick={() => navigate("/auto-parts")}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UpdateAutoPartPage;
