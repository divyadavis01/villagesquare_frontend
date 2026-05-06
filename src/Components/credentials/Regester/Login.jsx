import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { LoginOutlined } from "@mui/icons-material";
import Face6Icon from '@mui/icons-material/Face6';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://divyadavis.pythonanywhere.com/credentials/login/",
      formData
    );

    const { access, refresh, role, user_id } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("role", role);
    localStorage.setItem("user_id",user_id)

    if (role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (role === "MANAGER") {
      navigate("/manager-dashboard");
    } else {
      navigate("/user-dashboard");
    }

  } catch (err) {
    setError("Invalid username or password");
  }
};

  return (
     <div className="login-container">
      <h2><LoginOutlined/> Login</h2>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleLogin}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
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

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;
