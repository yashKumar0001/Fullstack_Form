import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [users, setUsers] = useState([]); // To store fetched users
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log("Fetched users:", response.data);  // Check if data is coming
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^[0-9]*$/.test(value)) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      alert("Form submitted successfully!");
      console.log("Form data submitted:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      });
      fetchUsers(); // Refresh user list after form submission
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Failed to submit form!");
    }
  };

  // Handle user selection from dropdown
  const handleUserSelect = (e) => {
    const userId = e.target.value;
    const selected = users.find((user) => user._id === userId);
    setSelectedUser(selected);
  };

  return (
    <div className="form-container">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]*"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      
      <div className="form-group">
        <label>Select a User</label>
        <select className="selectuser" onChange={handleUserSelect}>
          <option value="">-- Select User --</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))
          ) : (
            <option disabled>No users found</option>
          )}
        </select>
      </div>

      {/* Display selected user details */}
      {selectedUser && (
        <div className="user-details">
          <h2>Selected User Details</h2>
          <p><strong>First Name:</strong> {selectedUser.firstName}</p>
          <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <p><strong>City:</strong> {selectedUser.city}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
