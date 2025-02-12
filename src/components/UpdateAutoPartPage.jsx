import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    imageUrl: "" // Store Google Drive link
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
      await axios.put(`http://localhost:8080/api/autoParts/${id}`, formData);
      alert("Auto part updated successfully!");
      navigate("/auto-parts");
    } catch (error) {
      alert("Error updating auto part!");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Auto Part</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
        <input type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />

        <button type="submit">Update Auto Part</button>
      </form>
    </div>
  );
}

export default UpdateAutoPartPage;
