import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AutoPartPage() {
  const [autoParts, setAutoParts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    vehicle: "",
    imageUrl: "" // Store Google Drive link
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
    console.log("Submitting data:", formData); // Debugging

    try {
        await axios.post("http://localhost:8080/api/autoParts", formData);
        alert("Auto part added successfully!");
        fetchAutoParts();
    } catch (error) {
        console.error("Error adding auto part:", error.response?.data || error);
        alert("Error adding auto part!");
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
    <div className="auto-part-page">
      <h2>Auto Parts Management</h2>
      
      {/* Add Auto Part Form */}
      <div className="form-container">
        <h3>Add Auto Part</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
          <input type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} />
          <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />

          <button type="submit">Add Auto Part</button>
        </form>
      </div>

      {/* View Auto Parts */}
      <div className="parts-list">
        <h3>Available Auto Parts</h3>
        <ul>
          {autoParts.map((part) => (
            <li key={part.id}>
              <h4>{part.name}</h4>
              <p>Category: {part.category}</p>
              <p>Price: ${part.price}</p>
              <p>Stock: {part.stock}</p>
              <p>Brand: {part.brand || "N/A"}</p>
              <p>Vehicle: {part.vehicle || "N/A"}</p>
              <img
  src={part.imageUrl}
  alt={part.name}
  style={{ width: "150px", height: "150px", objectFit: "cover" }}
/>

              <br />
              <button onClick={() => handleUpdate(part.id)}>Update</button>
              <button onClick={() => handleDelete(part.id)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoPartPage;
