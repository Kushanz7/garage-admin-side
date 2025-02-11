import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    contactNo: '',
    dateJoin: '',
    nationality: '',
    nic: '',
    gender: '',
    role: 'employee', // Default role; admin can change this.
    authProvider: 'LOCAL',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/customer/add', userData);
      alert('User registered successfully!');
      navigate('/admin-home');
    } catch (error) {
      alert('Error registering user.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register a New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={userData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={userData.age} onChange={handleChange} required />
        <input type="text" name="contactNo" placeholder="Contact No" value={userData.contactNo} onChange={handleChange} required />
        <input type="datetime-local" name="dateJoin" placeholder="Date Joined" value={userData.dateJoin} onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="Nationality" value={userData.nationality} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC" value={userData.nic} onChange={handleChange} required />
        <select name="gender" value={userData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <select name="authProvider" value={userData.authProvider} onChange={handleChange}>
          <option value="LOCAL">Local</option>
          <option value="GOOGLE">Google</option>
        </select>
        <button type="submit">Register User</button>
      </form>
    </div>
  );
}

export default RegisterUser;
