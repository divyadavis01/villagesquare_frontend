import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css"
import Face6Icon from '@mui/icons-material/Face6';


function UserRegister() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState({});
  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profile_image: null
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    setSuccess("");
    return;
  }

  try {
    // Replace with your actual backend URL
    const data = new FormData();
data.append("username", formData.username);
data.append("email", formData.email);
data.append("phone", formData.phone);
data.append("password", formData.password);
data.append("address", formData.address);
if (formData.profile_image) {
  data.append("profile_image", formData.profile_image);
}

const response = await axios.post(
  "http://localhost:8000/credentials/local-register/",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

    if (response.status === 201 || response.status === 200) {
      setSuccess("Registration successful!");
      setError("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }

  } catch (err) {
    // Detailed error message from backend if available
    if (err.response && err.response.data) {
      setError(err.response.data.detail || "Registration failed. Try again.");
    } else {
      setError("Network error. Could not connect to server.");
    }
    setSuccess("");
  }
};

  return (
    <div className="user-register-container">
      <h2> <Face6Icon fontSize="large"/>User Registration</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="file"
          name="profile_image"
          onChange={(e) =>
            setFormData({ ...formData, profile_image: e.target.files[0] })
          }
        />
        <br/><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;