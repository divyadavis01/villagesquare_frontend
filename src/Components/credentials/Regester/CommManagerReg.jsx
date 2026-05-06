import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CommunityManagerRegister.css";
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';


function CommManagerReg() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    area_name: "",
    password: "",
    confirmPassword: "",
    id_proof: null,
    profile_image: null
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match");
    return;
  }

  const data = new FormData();
  data.append("username", formData.username);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("area_name", formData.area_name);
  data.append("password", formData.password);
  data.append("id_proof", formData.id_proof);
  data.append("profile_image", formData.profile_image);

  try {
    await axios.post(
      "https://divyadavis.pythonanywhere.com/credentials/manager-register/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMessage("Request submitted! Wait for admin approval.");

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    setMessage("Something went wrong.");
  }
};

  return (
     <div className="comm-manager-container">
      <h2><Face6OutlinedIcon fontSize="large"/>Community Manager Registration</h2>

      {message && <p className="comm-manager-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <br /><br />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <br /><br />

        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <br /><br />

       <input type="text" name="area_name" placeholder="Area Name" onChange={handleChange} required />        
       <br /><br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br /><br />

        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <br /><br />
        <p>Upload ID Proof</p>
        <input type="file" name="id_proof" onChange={(e) =>
            setFormData({ ...formData, id_proof: e.target.files[0] })}required />
        <br /><br />
        <p>Upload Profile image</p>
        <input type="file" name="profile_image" onChange={(e)=>setFormData({...formData,profile_image:e.target.files[0]})} required/>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default CommManagerReg;